from stock import Stock


class Portfolio:
    def __init__(self, id_, name):
        self.id = id_
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
