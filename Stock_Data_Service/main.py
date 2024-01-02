
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from enum import Enum
from portfolio import Portfolio
from stock import Stock

from repository import IPortfolioRepository
from sqlalchemy_repository import SqlAlchemyPortfolioRepository
from portfolio_service import PortfolioService

app = FastAPI()


def get_portfolio_repository():
    return SqlAlchemyPortfolioRepository()

def get_portfolio_service():
    repository = get_portfolio_repository()
    return PortfolioService(repository)


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

url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=3NC3CQTX6R7V0D21'
r = requests.get(url)
data = r.json()
BASE_URL = 'https://www.alphavantage.co/query?'


# dependancy injenction to avoid repetition of api key across many uses.
def get_api_key():
    return '3NC3CQTX6R7V0D21'


class StockModel(BaseModel):
    name: str
    close_price: float


@app.post("/create_portfolio")
async def create_portfolio(service: PortfolioService = Depends(get_portfolio_service)):
    return await service.create_portfolio()

@app.post("/add_stock_to_portfolio/{portfolio_id}")
async def add_stock_to_portfolio(portfolio_id: int, stock_data: StockModel, service: PortfolioService = Depends(get_portfolio_service)):
    return await service.add_stock_to_portfolio(portfolio_id, stock_data)

@app.get("/get_portfolio_stocks/{portfolio_id}")
async def get_portfolio_stocks(portfolio_id: int, service: PortfolioService = Depends(get_portfolio_service)):
    stocks = await service.get_portfolio_stocks(portfolio_id)
    return {"stocks": stocks}

@app.get("/get_portfolio_value/{portfolio_id}")
async def get_portfolio_value(portfolio_id: int, service: PortfolioService = Depends(get_portfolio_service)):
    value = await service.get_portfolio_value(portfolio_id)
    return {"value": value}



@app.get("/stock/{ticker}")
async def get_stock_data(ticker: str, api_key: str = Depends(get_api_key)):
    params = {
        'function': 'TIME_SERIES_DAILY',
        'symbol': ticker,
        'apikey': api_key
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    latest_data = data['Time Series (Daily)'][list(
        data['Time Series (Daily)'].keys())[0]]

    return StockModel(
        id=1,
        name=ticker,
        close_price=float(latest_data['4. close'])
    )


def extract_article_and_sentiment(data):
    result = []
    for article in data.get("feed", []):
        title = article.get("title")
        sentiment_score = article.get("overall_sentiment_score")
        result.append({
            "title": title,
            "sentiment_score": sentiment_score
        })
    return result[:5]


@app.get("/stock_news/{ticker}")
async def get_stock_news(ticker: str, api_key: str = Depends(get_api_key)):
    params = {
        'function': 'NEWS_SENTIMENT',
        'symbol': ticker,
        'apikey': api_key
    }
    response = requests.get(BASE_URL, params)
    data = response.json()

    return extract_article_and_sentiment(data)


@app.get("/search_stock/{query}")
async def search_stock(query: str, api_key: str = Depends(get_api_key)):
    params = {
        'function': 'SYMBOL_SEARCH',
        'keywords': query,
        'apikey': api_key
    }
    response = requests.get(BASE_URL, params)
    data = response.json()
    print(data)
    return data
