from pathlib import Path

import pandas as pd


def load_preview(path: str, rows: int = 5) -> pd.DataFrame:
    if not Path(path).exists():
        return pd.DataFrame()
    return pd.read_csv(path).head(rows)


if __name__ == "__main__":
    anomaly = load_preview("outputs/anomaly_df.csv")
    clusters = load_preview("outputs/cluster_labels.csv")

    print("Spendly dashboard placeholder")
    print("\nAnomaly preview:")
    print(anomaly if not anomaly.empty else "No anomaly_df.csv yet.")
    print("\nCluster preview:")
    print(clusters if not clusters.empty else "No cluster_labels.csv yet.")
