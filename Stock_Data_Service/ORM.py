from sqlalchemy import Table, MetaData, Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import mapper, relationship

from portfolio import Portfolio
from stock import Stock

metadata = MetaData()

stocks = Table(
    "stocks",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(255)),
    Column("close_price", Float)
)

portfolios = Table(
    "portfolios",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(255))
)

portfolio_stocks = Table(
    "portfolio_stocks",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("portfolio_id", ForeignKey("portfolios.id")),
    Column("stock_id", ForeignKey("stocks.id"))
)


def start_mappers():
    stocks_mapper = mapper(Stock, stocks)
    portfolios_mapper = mapper(
        Portfolio,
        portfolios,
        properties={
            'stocks': relationship(stocks_mapper, secondary=portfolio_stocks)
        }
    )
