import math
import os

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import random
import tensorflow as tf

np.random.seed(42)
random.seed(42)
tf.random.set_seed(42)

from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.preprocessing import StandardScaler

from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.layers import Dense, Dropout, LSTM
from tensorflow.keras.models import Sequential


WINDOW_SIZE = 8  # increased from 4


def load_processed_data(data_dir="data"):
    train = pd.read_csv(os.path.join(data_dir, "processed", "train.csv"))
    val = pd.read_csv(os.path.join(data_dir, "processed", "val.csv"))
    test = pd.read_csv(os.path.join(data_dir, "processed", "test.csv"))
    return train, val, test


def to_weekly_pivot(df, categories):
    work = df.copy()
    work["date"] = pd.to_datetime(work["date"], errors="coerce")
    work = work.dropna(subset=["date", "exp_type", "amount_raw"])

    # Feature engineering
    work["week"] = work["date"].dt.to_period("W").dt.start_time
    work["month"] = work["date"].dt.month
    work["weekofyear"] = work["date"].dt.isocalendar().week.astype(int)

    weekly = work.groupby(["week", "exp_type"], as_index=False)["amount_raw"].sum()
    pivot = weekly.pivot(index="week", columns="exp_type", values="amount_raw").fillna(0.0)

    pivot = pivot.reindex(columns=categories, fill_value=0.0)

    return pivot.sort_index()


def make_sequences(array_2d, window_size=WINDOW_SIZE):
    x_list, y_list = [], []
    for i in range(len(array_2d) - window_size):
        x_list.append(array_2d[i : i + window_size])
        y_list.append(array_2d[i + window_size])

    return np.array(x_list), np.array(y_list)


def build_lstm_model(window_size, n_features):
    model = Sequential([
        LSTM(64, return_sequences=True, input_shape=(window_size, n_features)),
        Dropout(0.3),
        LSTM(32),
        Dropout(0.3),
        Dense(16, activation='relu'),
        Dense(n_features)
    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss="mae"   # changed from mse
    )
    return model


def evaluate_per_category(y_true, y_pred, categories):
    rows = []
    eps = 1e-8

    for idx, cat in enumerate(categories):
        yt = y_true[:, idx]
        yp = y_pred[:, idx]

        mae = mean_absolute_error(yt, yp)
        rmse = math.sqrt(mean_squared_error(yt, yp))
        mape = np.mean(np.abs((yt - yp) / np.clip(np.abs(yt), eps, None))) * 100.0

        rows.append({"exp_type": cat, "MAE": mae, "RMSE": rmse, "MAPE": mape})

    return pd.DataFrame(rows)


def forecast_pipeline(data_dir="data", outputs_dir="outputs"):
    os.makedirs(outputs_dir, exist_ok=True)

    train, val, test = load_processed_data(data_dir)

    categories = sorted(
        pd.concat([train["exp_type"], val["exp_type"], test["exp_type"]])
        .dropna().unique().tolist()
    )

    train_w = to_weekly_pivot(train, categories)
    val_w = to_weekly_pivot(val, categories)
    test_w = to_weekly_pivot(test, categories)

    # 🔥 LOG TRANSFORM (major improvement)
    train_w = np.log1p(train_w)
    val_w = np.log1p(val_w)
    test_w = np.log1p(test_w)

    # 🔥 SCALER FIX
    scaler = StandardScaler()
    train_s = scaler.fit_transform(train_w.values)
    val_s = scaler.transform(val_w.values)
    test_s = scaler.transform(test_w.values)

    x_train, y_train = make_sequences(train_s)
    x_val, y_val = make_sequences(val_s)
    x_test, y_test = make_sequences(test_s)

    model = build_lstm_model(WINDOW_SIZE, len(categories))

    # 🔥 BETTER CALLBACKS
    callbacks = [
        EarlyStopping(monitor="val_loss", patience=15, restore_best_weights=True),
        ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=5, min_lr=1e-5)
    ]

    history = model.fit(
        x_train, y_train,
        validation_data=(x_val, y_val),
        epochs=150,
        batch_size=16,
        callbacks=callbacks,
        verbose=1
    )

    # Plot loss
    plt.figure()
    plt.plot(history.history["loss"], label="train")
    plt.plot(history.history["val_loss"], label="val")
    plt.legend()
    plt.savefig(os.path.join(outputs_dir, "loss.png"))
    plt.close()

    # Predictions
    y_pred_test_s = model.predict(x_test)

    # 🔥 INVERSE TRANSFORM FIX
    y_true_test = np.expm1(scaler.inverse_transform(y_test))
    y_pred_test = np.expm1(scaler.inverse_transform(y_pred_test_s))

    metrics_df = evaluate_per_category(y_true_test, y_pred_test, categories)
    print(metrics_df)

    overall_mae = mean_absolute_error(y_true_test.reshape(-1), y_pred_test.reshape(-1))
    overall_rmse = math.sqrt(mean_squared_error(y_true_test.reshape(-1), y_pred_test.reshape(-1)))
    overall_mape = np.mean(
        np.abs((y_true_test.reshape(-1) - y_pred_test.reshape(-1)) /
               np.clip(np.abs(y_true_test.reshape(-1)), 1e-8, None))
    ) * 100

    print("\nOVERALL:")
    print("MAE:", overall_mae)
    print("RMSE:", overall_rmse)
    print("MAPE:", overall_mape)


if __name__ == "__main__":
    forecast_pipeline()
