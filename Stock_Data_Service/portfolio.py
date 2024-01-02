from stock import Stock


class Portfolio:
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.stocks = []

    def add_stock(self, stock_):
        self.stocks.append(stock_)

    def remove_stock(self, stock_: Stock):
        self.stocks.remove(stock_)

    def calculate_value(self):
        value = 0.0
        for stock in self.stocks:
            value += stock.close_price
        return value

    def get_stocks(self):
        stocks = [ 
            {"name": stock.name, "close_price": stock.close_price} 
            for stock in self.stocks 
        ]
        return stocks
