"""
preprocess.py — SPENDLY Data Pipeline
"""

import logging
from pathlib import Path

import pandas as pd
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).resolve().parent.parent
RAW_FILE = ROOT_DIR / "data" / "raw" / "Credit card transactions - India - Simple.csv"
PROCESSED_DIR = ROOT_DIR / "data" / "processed"

TRAIN_RATIO = 0.70
VAL_RATIO = 0.15

OUTPUT_COLUMNS = [
    "city", "date", "card_type", "exp_type", "gender",
    "amount_raw", "amount_norm",
    "day_of_week", "month", "week_number", "year",
    "card_type_encoded", "gender_encoded", "city_encoded", "exp_type_encoded",
]


def load_raw(filepath: Path = RAW_FILE) -> pd.DataFrame:
    log.info("Loading raw data from %s", filepath)
    df = pd.read_csv(filepath)
    log.info("Loaded %d rows × %d columns", *df.shape)
    return df


def clean(df: pd.DataFrame) -> pd.DataFrame:
    if "index" in df.columns:
        df = df.drop(columns=["index"])
    df = df.drop_duplicates()
    df = df[df["Amount"] > 0]
    df = df.dropna(subset=["City", "Date", "Card Type", "Exp Type", "Gender", "Amount"])
    return df.reset_index(drop=True)


def parse_dates_and_features(df: pd.DataFrame) -> pd.DataFrame:
    parsed = pd.to_datetime(df["Date"], dayfirst=True, errors="coerce")
    df = df.loc[parsed.notna()].copy()
    parsed = parsed.loc[parsed.notna()]
    df["date"] = parsed.dt.strftime("%Y-%m-%d")
    df["day_of_week"] = parsed.dt.dayofweek.astype(int)
    df["month"] = parsed.dt.month.astype(int)
    df["week_number"] = parsed.dt.isocalendar().week.astype(int)
    df["year"] = parsed.dt.year.astype(int)
    df["_date_parsed"] = parsed
    return df.drop(columns=["Date"])


def rename_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "City": "city",
            "Card Type": "card_type",
            "Exp Type": "exp_type",
            "Gender": "gender",
            "Amount": "amount_raw",
        }
    )


def encode_categoricals(df: pd.DataFrame, encoders: dict | None = None):
    cols = {
        "card_type": "card_type_encoded",
        "gender": "gender_encoded",
        "city": "city_encoded",
        "exp_type": "exp_type_encoded",
    }
    if encoders is None:
        encoders = {}
        for src in cols:
            le = LabelEncoder()
            le.fit(df[src])
            encoders[src] = le
    for src, tgt in cols.items():
        df[tgt] = encoders[src].transform(df[src])
    return df, encoders


def chronological_split(df: pd.DataFrame):
    df = df.sort_values("_date_parsed").reset_index(drop=True)
    n = len(df)
    train_end = int(n * TRAIN_RATIO)
    val_end = int(n * (TRAIN_RATIO + VAL_RATIO))
    return df.iloc[:train_end].copy(), df.iloc[train_end:val_end].copy(), df.iloc[val_end:].copy()


def normalise_amount(df: pd.DataFrame, scaler: MinMaxScaler | None = None):
    if scaler is None:
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaler.fit(df[["amount_raw"]])
    df["amount_norm"] = scaler.transform(df[["amount_raw"]]).flatten()
    return df, scaler


def save_splits(train: pd.DataFrame, val: pd.DataFrame, test: pd.DataFrame) -> None:
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    for name, split in [("train", train), ("val", val), ("test", test)]:
        split = split.drop(columns=["_date_parsed"], errors="ignore")
        split = split[OUTPUT_COLUMNS]
        split.to_csv(PROCESSED_DIR / f"{name}.csv", index=False)
        log.info("Saved %s.csv (%d rows)", name, len(split))


def run_pipeline():
    df = load_raw()
    df = clean(df)
    df = parse_dates_and_features(df)
    df = rename_columns(df)
    df, encoders = encode_categoricals(df)
    train, val, test = chronological_split(df)
    train, scaler = normalise_amount(train, None)
    val, _ = normalise_amount(val, scaler)
    test, _ = normalise_amount(test, scaler)
    save_splits(train, val, test)
    return train, val, test, encoders, scaler


if __name__ == "__main__":
    run_pipeline()
