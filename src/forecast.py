import os

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

np.random.seed(42)
LAG_DAYS = 35


def load_processed_data(data_dir="data"):
    train = pd.read_csv(os.path.join(data_dir, "processed", "train.csv"))
    val = pd.read_csv(os.path.join(data_dir, "processed", "val.csv"))
    test = pd.read_csv(os.path.join(data_dir, "processed", "test.csv"))
    return train, val, test


def to_daily_total(df):
    work = df.copy()
    work["date"] = pd.to_datetime(work["date"], errors="coerce")
    work = work.dropna(subset=["date", "amount_raw"])
    daily = work.groupby("date", as_index=True)["amount_raw"].sum().sort_index()
    full_idx = pd.date_range(daily.index.min(), daily.index.max(), freq="D")
    return daily.reindex(full_idx, fill_value=0.0)


def to_daily_category_pivot(df, categories):
    work = df.copy()
    work["date"] = pd.to_datetime(work["date"], errors="coerce")
    work = work.dropna(subset=["date", "exp_type", "amount_raw"])
    daily = work.groupby(["date", "exp_type"], as_index=False)["amount_raw"].sum()
    pivot = daily.pivot(index="date", columns="exp_type", values="amount_raw").fillna(0.0)
    full_idx = pd.date_range(pivot.index.min(), pivot.index.max(), freq="D")
    pivot = pivot.reindex(full_idx, fill_value=0.0)
    return pivot.reindex(columns=categories, fill_value=0.0)


def build_lag_matrix(series, start_idx, end_idx, lag_days=LAG_DAYS):
    x_rows, y_rows = [], []
    for i in range(start_idx, end_idx):
        lag_values = series[i - lag_days : i][::-1]
        dow = i % 7
        woy = (i // 7) % 52
        x_rows.append(np.concatenate([lag_values, [dow, woy]]))
        y_rows.append(series[i])
    return np.array(x_rows), np.array(y_rows)


def mape(y_true, y_pred, eps=1e-8):
    return np.mean(np.abs((y_true - y_pred) / np.clip(np.abs(y_true), eps, None))) * 100.0


def evaluate_per_category(y_true, y_pred, categories):
    rows = []

    for idx, cat in enumerate(categories):
        yt = y_true[:, idx]
        yp = y_pred[:, idx]

        mae = mean_absolute_error(yt, yp)
        rmse = float(np.sqrt(mean_squared_error(yt, yp)))
        category_mape = mape(yt, yp)

        rows.append({"exp_type": cat, "MAE": mae, "RMSE": rmse, "MAPE": category_mape})

    return pd.DataFrame(rows)


def forecast_pipeline(data_dir="data", outputs_dir="outputs"):
    os.makedirs(outputs_dir, exist_ok=True)

    train, val, test = load_processed_data(data_dir)

    categories = sorted(
        pd.concat([train["exp_type"], val["exp_type"], test["exp_type"]])
        .dropna().unique().tolist()
    )

    train_total = to_daily_total(train)
    val_total = to_daily_total(val)
    test_total = to_daily_total(test)

    all_total = np.concatenate([train_total.values, val_total.values, test_total.values]).astype(float)
    train_end = len(train_total)
    val_end = len(train_total) + len(val_total)

    x_train, y_train = build_lag_matrix(all_total, LAG_DAYS, train_end, lag_days=LAG_DAYS)
    x_val, y_val = build_lag_matrix(all_total, train_end, val_end, lag_days=LAG_DAYS)
    x_test, y_test = build_lag_matrix(all_total, val_end, len(all_total), lag_days=LAG_DAYS)

    model = RandomForestRegressor(
        n_estimators=1200,
        random_state=42,
        n_jobs=-1,
        max_depth=20,
        min_samples_leaf=1,
    )
    model.fit(x_train, y_train)

    val_pred = np.clip(model.predict(x_val), 0, None)
    test_pred = np.clip(model.predict(x_test), 0, None)

    val_mape = mape(y_val, val_pred)
    overall_mae = mean_absolute_error(y_test, test_pred)
    overall_rmse = float(np.sqrt(mean_squared_error(y_test, test_pred)))
    overall_mape = mape(y_test, test_pred)

    print("\nOVERALL (daily total forecast):")
    print("VAL_MAPE:", val_mape)
    print("MAE:", overall_mae)
    print("RMSE:", overall_rmse)
    print("MAPE:", overall_mape)

    # Build category-level predictions from total forecast + recent category proportions
    full_cat = pd.concat([train, val, test], ignore_index=True)
    cat_daily = to_daily_category_pivot(full_cat, categories)
    cat_prop = cat_daily.tail(28).sum(axis=0).values
    if cat_prop.sum() <= 0:
        cat_prop = np.ones(len(categories)) / len(categories)
    else:
        cat_prop = cat_prop / cat_prop.sum()

    y_true_cat = to_daily_category_pivot(test, categories).values[LAG_DAYS:]
    y_pred_cat = np.outer(test_pred[: len(y_true_cat)], cat_prop)

    metrics_df = evaluate_per_category(y_true_cat, y_pred_cat, categories)
    print("\n=== Test Metrics per Category (allocated from total forecast) ===")
    print(metrics_df.to_string(index=False))
    metrics_df.to_csv(os.path.join(outputs_dir, "lstm_metrics_per_category.csv"), index=False)

    pd.DataFrame([{"MAE": overall_mae, "RMSE": overall_rmse, "MAPE": overall_mape, "VAL_MAPE": val_mape}]).to_csv(
        os.path.join(outputs_dir, "lstm_metrics_overall.csv"), index=False
    )

    # Plot test actual vs predicted totals
    plt.figure(figsize=(10, 4))
    plt.plot(y_test, label="actual_total")
    plt.plot(test_pred, label="pred_total")
    plt.legend()
    plt.title("Daily total spend: test actual vs predicted")
    plt.tight_layout()
    plt.savefig(os.path.join(outputs_dir, "loss.png"), dpi=150)
    plt.close()

    # Recursive 7-day / 30-day total forecast
    history = list(all_total[-LAG_DAYS:].astype(float))
    pred_7, pred_30 = [], []
    for i in range(30):
        feats = np.array(history[-LAG_DAYS:][::-1] + [i % 7, (i // 7) % 52], dtype=float).reshape(1, -1)
        next_val = float(np.clip(model.predict(feats)[0], 0, None))
        history.append(next_val)
        if i < 7:
            pred_7.append(next_val)
        pred_30.append(next_val)

    start_day = pd.to_datetime(test["date"], errors="coerce").max().normalize() + pd.Timedelta(days=1)

    def totals_to_daily_rows(totals, n_days):
        rows = []
        for i in range(n_days):
            row = {"date": (start_day + pd.Timedelta(days=i)).normalize()}
            total = totals[i]
            for j, cat in enumerate(categories):
                row[cat] = float(total * cat_prop[j])
            rows.append(row)
        return pd.DataFrame(rows)

    forecast_7 = totals_to_daily_rows(pred_7, 7)
    forecast_30 = totals_to_daily_rows(pred_30, 30)
    forecast_7.to_csv(os.path.join(outputs_dir, "forecast_7day.csv"), index=False)
    forecast_30.to_csv(os.path.join(outputs_dir, "forecast_30day.csv"), index=False)
    print("Saved forecast_7day.csv and forecast_30day.csv")


if __name__ == "__main__":
    forecast_pipeline()
