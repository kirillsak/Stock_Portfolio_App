from unittest.mock import patch
from portfolio import Portfolio
from main import get_stock_data
import pytest


@pytest.mark.asyncio
async def test_adding_api_fetched_stock_to_portfolio():
    mock_api_response = {
        "Time Series (Daily)": {
            "2022-03-18": {
                "4. close": "152.00",
            }
        }
    }

    # Mock the external API call
    with patch('requests.get') as mock_get:
        mock_get.return_value.json.return_value = mock_api_response

        # Simulate fetching stock data
        stock = await get_stock_data("AAPL", "3NC3CQTX6R7V0D21")
        stock2 = await get_stock_data("NFLX", "3NC3CQTX6R7V0D21")

        # Create a Portfolio and add the fetched stock
        portfolio = Portfolio(1, "Fund 1")
        portfolio.add_stock(stock)
        portfolio.add_stock(stock2)
        print(portfolio.stocks)

        assert len(portfolio.stocks) == 2
        assert portfolio.stocks[0].name == "AAPL"
        assert portfolio.stocks[0].close_price == 152.00
        assert portfolio.calculate_value() == 304.00
