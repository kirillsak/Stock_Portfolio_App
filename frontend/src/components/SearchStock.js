import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

function SearchStock() {
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState(null);
  const [stockNews, setStockNews] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/search_stock/${query}`);
      const stockInfo = response.data;
      if (stockInfo?.bestMatches && stockInfo.bestMatches.length > 0) {
        const ticker = stockInfo.bestMatches[0]["1. symbol"];
        const stockResponse = await axios.get(`${BACKEND_URL}/stock/${ticker}`);
        const newsResponse = await axios.get(
          `${BACKEND_URL}/stock_news/${ticker}`
        );
        setStockData(stockResponse.data);
        setStockNews(newsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a stock..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {stockData && (
        <div>
          <h3>Stock Data</h3>
          {}
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
      {stockNews.length > 0 && (
        <div>
          <h3>Stock News</h3>
          {}
          <ul>
            {stockNews.map((newsItem, idx) => (
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
      )}
    </div>
  );
}

export default SearchStock;
