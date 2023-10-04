
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

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

url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=3NC3CQTX6R7V0D21'
r = requests.get(url)
data = r.json()

print(data)

BASE_URL = 'https://www.alphavantage.co/query?'


@app.get("/stock/{ticker}")
async def get_stock_data(ticker: str):
    params = {
        'function': 'TIME_SERIES_DAILY',
        'symbol': ticker,
        'apikey': '3NC3CQTX6R7V0D21'
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    return data['Time Series (Daily)'][list(data['Time Series (Daily)'].keys())[0]]


def extract_article_and_sentiment(data):
    result = []
    for article in data.get("feed", []):
        title = article.get("title")
        sentiment_score = article.get("overall_sentiment_score")
        result.append({
            "title": title,
            "sentiment_score": sentiment_score
        })
    return result[:10]


@app.get("/stock_news/{ticker}")
async def get_stock_news(ticker: str):
    params = {
        'function': 'NEWS_SENTIMENT',
        'symbol': ticker,
        'apikey': '3NC3CQTX6R7V0D21'
    }
    response = requests.get(BASE_URL, params)
    data = response.json()

    return extract_article_and_sentiment(data)


@app.get("/search_stock/{query}")
async def search_stock(query: str):
    params = {
        'function': 'SYMBOL_SEARCH',
        'keywords': query,
        'apikey': '3NC3CQTX6R7V0D21'
    }
    response = requests.get(BASE_URL, params)
    data = response.json()

    return data
