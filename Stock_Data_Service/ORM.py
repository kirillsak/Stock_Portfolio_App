from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import mapper, relationship, sessionmaker

from portfolio import Portfolio
from stock import Stock

# SQLAlchemy setup
engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Initialize the MetaData object
metadata = MetaData()

# Define the tables
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

# Call start_mappers to initialize the mappings
start_mappers()

# Create all tables in the database
metadata.create_all(bind=engine)
