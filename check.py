import pandas as pd

train = pd.read_csv("data/processed/train.csv")
val = pd.read_csv("data/processed/val.csv")
test = pd.read_csv("data/processed/test.csv")

print("=== ROW COUNTS ===")
print(f"Train: {len(train)} rows")
print(f"Val: {len(val)} rows")
print(f"Test: {len(test)} rows")

print("\n=== COLUMNS ===")
print(train.columns.tolist())

print("\n=== amount_norm range (must be 0 to 1) ===")
print(f"Min: {train['amount_norm'].min():.4f} Max: {train['amount_norm'].max():.4f}")

print("\n=== No nulls? ===")
print(train.isnull().sum().sum(), "nulls in train")

print("\n=== Date order (train should be oldest, test newest) ===")
print("Train first date:", train["date"].iloc[0])
print("Test last date:", test["date"].iloc[-1])

print("\n=== Sample row ===")
print(train.head(2).T)
