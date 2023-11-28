
from main import app
from portfolio import Portfolio
from stock import Stock


def test_add_stock_to_portfolio():
    portfolio = Portfolio(1, "fund 1")
    stock = Stock(1, "AAPL", 300.0)
    portfolio.add_stock(stock)
    assert stock in portfolio.stocks


def test_remove_stock_from_portfolio():
    portfolio = Portfolio(1, "fund 1")
    AAPL_stock = Stock(1, "AAPL", 300.0)
    portfolio.add_stock(AAPL_stock)
    portfolio.remove_stock(AAPL_stock)
    assert AAPL_stock not in portfolio.stocks


def test_calculate_portfolio_value():
    portfolio = Portfolio(1, "fund 1")
    AAPL_stock = Stock(1, "AAPL", 300.0)
    portfolio.add_stock(AAPL_stock)
    value = portfolio.calculate_value()
    assert value == 300.0
