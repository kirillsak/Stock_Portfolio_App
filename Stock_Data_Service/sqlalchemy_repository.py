from repository import IPortfolioRepository
from ORM import SessionLocal
from portfolio import Portfolio
from stock import Stock
from ORM import SessionLocal

class SqlAlchemyPortfolioRepository(IPortfolioRepository):
    def __init__(self):
        self.db = SessionLocal()

    def create_portfolio(self):
        new_portfolio = Portfolio(id=1, name="Test Portfolio")
        self.db.add(new_portfolio)
        self.db.commit()
        return {"msg": "Portfolio created"}

    def add_stock_to_portfolio(self, portfolio_id, stock):
        # Find the portfolio by ID
        portfolio = self.db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
        if portfolio is None:
            return {"error": "Portfolio not found"}

        # Create a new stock and add it to the portfolio
        new_stock = Stock(name=stock.name, close_price=stock.close_price)
        portfolio.add_stock(new_stock)
        self.db.add(new_stock)
        self.db.commit()

        return {"msg": "Stock added to portfolio"}

    def get_portfolio_stocks(self, portfolio_id):

        portfolio = self.db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
        if portfolio is None:
            return {"error": "Portfolio not found"}

        return {"stocks": portfolio.get_stocks()}

    def get_portfolio_value(self, portfolio_id):

        portfolio = self.db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
        if portfolio is None:
            return {"error": "Portfolio not found"}
        
        return {"Portfolio value": portfolio.calculate_value()}

        