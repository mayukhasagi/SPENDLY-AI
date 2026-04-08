# SPENDLY-AI

Current non-model project stage for deterministic preprocessing, anomaly tagging, and user segmentation prep.

## Project Structure

- `src/preprocess.yetpy`: main preprocessing script
- `dashboard/app.py`: basic dashboard placeholder
- `data/raw/`: input data
- `data/processed/`: generated `train.csv`, `val.csv`, `test.csv`
- `outputs/`: generated `anomaly_df.csv`, `cluster_labels.csv`
- `notebooks/figures/`: EDA figure directory

## What Gets Generated

- `data/processed/train.csv`
- `data/processed/val.csv`
- `data/processed/test.csv`
- `outputs/anomaly_df.csv`
- `outputs/cluster_labels.csv`

## Run

```bash
py -3 src/preprocess.yetpy --input "data/raw/Credit card transactions - India - Simple.csv"
```
