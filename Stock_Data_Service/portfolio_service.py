from repository import IPortfolioRepository

class PortfolioService:
    def __init__(self, repository: IPortfolioRepository):
        self.repository = repository

    async def create_portfolio(self):
        return self.repository.create_portfolio()

    async def add_stock_to_portfolio(self, portfolio_id, stock_data):
        return self.repository.add_stock_to_portfolio(portfolio_id, stock_data)

    async def get_portfolio_stocks(self, portfolio_id):
        stocks = self.repository.get_portfolio_stocks(portfolio_id)
        return stocks

    async def get_portfolio_value(self, portfolio_id):
        portfolio_value = self.repository.get_portfolio_value(portfolio_id)
        return portfolio_value