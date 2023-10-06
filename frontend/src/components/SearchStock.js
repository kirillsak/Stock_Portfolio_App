import React, { useState } from "react";
import axios from "axios";
import PieChart from "./PieChart";

const BACKEND_URL = "http://localhost:8000"; // Assuming your FastAPI server runs on this URL
const BACKEND_URL_OPTIMISE = "http://localhost:8001";

function SearchStock() {
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [stockName, setStockName] = useState("");
  const [optimisedPortfolio, setOptimisedPortfolio] = useState({});

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
        setStockName(ticker);
        setStockNews(newsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const addToPortfolio = async () => {
    if (!portfolioStocks.includes(stockName)) {
      setPortfolioStocks((prevPortfolio) => [...prevPortfolio, stockName]);
    } else {
      console.log("Stock already exists in the portfolio!");
    }
  };

  const optimisePortfolio = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_OPTIMISE}/optimise_portfolio`,
        {
          stock_list: portfolioStocks,
        }
      );
      console.log(response.data);
      setOptimisedPortfolio(response.data);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  return (
    <div className="container">
      <div>
        <h4>Portfolio: </h4>
        <ul>
          {portfolioStocks.map((stock, index) => (
            <li key={index}>{stock}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={optimisePortfolio}>Optimise portfolio</button>
      </div>
      {Object.keys(optimisedPortfolio).length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <PieChart data={optimisedPortfolio} />
        </div>
      )}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a stock..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {stockData && (
        <div className="stock-data">
          <h3>
            Stock Data for {stockName}{" "}
            <button onClick={addToPortfolio}>Add to Portfolio</button>
          </h3>
          {/* Display stock data here */}
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
      {stockNews.length > 0 && (
        <div className="stock-news">
          <h3>Stock News</h3>
          {/* Display stock news here */}
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
