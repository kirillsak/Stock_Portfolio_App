from fastapi import FastAPI
from fastapi import FastAPI, HTTPException
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt import risk_models, expected_returns

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


class StockInput(BaseModel):
    stock_list: list[str]


@app.post("/optimise_portfolio")
async def optimise_portfolio(stock: StockInput):
    stock_data = {}

    try:
        data = yf.download(stock.stock_list, period="2mo")
        if data.empty:
            raise HTTPException(status_code=400, detail="Error fetching data")
        stock_data = data["Adj Close"]
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error fetching data: {str(e)}")

    mu = expected_returns.mean_historical_return(stock_data)
    S = risk_models.sample_cov(stock_data)

    ef = EfficientFrontier(mu, S)
    weights = ef.min_volatility()

    cleaned_weights = ef.clean_weights()

    return cleaned_weights
