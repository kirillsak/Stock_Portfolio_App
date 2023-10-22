import { useState, useEffect } from "react";

function StockDisplay({ stockData, stockNews, stockName, addToPortfolio }) {
  const [displayedStockNews, setDisplayedStockNews] = useState(stockNews);

  useEffect(() => {
    setDisplayedStockNews(stockNews);
  }, [stockNews]);

  const filterNegativeArticles = () => {
    const negativeArticles = displayedStockNews.filter(
      (article) => article.sentiment_score < 0
    );
    setDisplayedStockNews(negativeArticles);
  };

  return (
    <div>
      <h2>
        Stock Information for {stockName}
        <button className="flat-btn" onClick={() => addToPortfolio(stockName)}>
          Add to Portfolio
        </button>
      </h2>
      <div className="stock-info-wrapper">
        <div className="stock-data">
          <h3>Stock Price and Volume Data</h3>

          <div>
            <strong>Open:</strong> {stockData["1. open"]}
          </div>
          <div>
            <strong>High:</strong> {stockData["2. high"]}
          </div>
          <div>
            <strong>Low:</strong> {stockData["3. low"]}
          </div>
          <div>
            <strong>Close:</strong> {stockData["4. close"]}
          </div>
          <div>
            <strong>Volume:</strong> {stockData["5. volume"]}
          </div>
        </div>
        <div className="stock-news">
          <h3>Stock News</h3>
          <button onClick={filterNegativeArticles}>Positive articles</button>
          <ul>
            {displayedStockNews.map((newsItem, idx) => (
              <li key={idx}>
                <p>
                  <strong>Title:</strong> {newsItem.title}
                </p>
                <p>
                  <strong>Sentiment Score:</strong> {newsItem.sentiment_score}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StockDisplay;
