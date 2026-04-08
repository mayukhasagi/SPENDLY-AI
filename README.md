# SPENDLY-AI

AI-powered expense analysis and forecasting system that converts aggregated credit card transaction data into synthetic user time series.

## Project Structure

- `src/preprocess.py`: preprocessing pipeline
- `src/patterns.py`: anomaly detection and clustering
- `src/forecast.py`: LSTM forecasting engine
- `dashboard/app.py`: dashboard placeholder app
- `data/raw/`: input datasets
- `data/processed/`: generated `train.csv`, `val.csv`, `test.csv`
- `outputs/`: generated anomaly, clustering, metrics, and forecast artifacts
- `notebooks/01_EDA.ipynb`: EDA notebook
- `notebooks/figures/`: saved EDA visualizations

## Quick Start

```bash
py -3 src/preprocess.py
py -3 src/patterns.py
py -3 src/forecast.py
```
