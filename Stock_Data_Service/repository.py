from abc import ABC, abstractmethod

class IPortfolioRepository(ABC):
    @abstractmethod
    def create_portfolio(self):
        pass

    @abstractmethod
    def add_stock_to_portfolio(self, portfolio_id, stock):
        pass

    @abstractmethod
    def get_portfolio_stocks(self, portfolio_id):
        pass

    def get_portfolio_value(self, portfolio_id):
        pass