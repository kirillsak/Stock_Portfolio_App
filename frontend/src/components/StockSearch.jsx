import { useState } from "react";
import axios from "axios";
import StockDisplay from "./StockDisplay";

const BACKEND_URL = "http://localhost:8000";

function StockSearch({ addToPortfolio }) {
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [stockName, setStockName] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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
        setHasSearched(true);
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
      <button className="flat-btn" onClick={handleSearch}>
        Search
      </button>
      {hasSearched && (
        <StockDisplay
          stockData={stockData}
          stockNews={stockNews}
          stockName={stockName}
          addToPortfolio={addToPortfolio}
        />
      )}
    </div>
  );
}

export default StockSearch;
