from fastapi import FastAPI
from fastapi.testclient import TestClient
from requests_mock import Mocker
from main import app

client = TestClient(app)


def test_get_stock_data():

    # sample fake response data
    fake_api_response = {
        "Time Series (Daily)": {
            "2022-03-18": {
                "1. open": "150.00",
                "2. high": "155.00",
                "3. low": "149.00",
                "4. close": "152.00",
                "5. volume": "100000"
            }
        }
    }

    api_url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=3NC3CQTX6R7V0D21'

    with Mocker() as mock:
        # Mock the API URL and return the fake response data
        mock.get(api_url, json=fake_api_response)

        # Call your FastAPI endpoint
        response = client.get("/stock/AAPL")

        # Check if the response is as expected
        assert response.status_code == 200
        assert response.json(
        ) == fake_api_response["Time Series (Daily)"]["2022-03-18"]