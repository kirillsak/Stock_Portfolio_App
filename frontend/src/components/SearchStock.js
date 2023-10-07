import React, { useState } from "react";
import axios from "axios";
import PieChart from "./PieChart";
import Portfolio from "./Portfolio";
import Search from "./Search";

import async from "hbs/lib/async";
import "../SearchStock.css";

const BACKEND_URL = "http://localhost:8000"; // Assuming your FastAPI server runs on this URL
const BACKEND_URL_OPTIMISE = "http://localhost:8001";

function SearchStock() {
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [stockName, setStockName] = useState("");
  const [optimisedPortfolio, setOptimisedPortfolio] = useState({});
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

  const deleteStock = async (stockToDelete) => {
    setPortfolioStocks((prevPortfolioStocks) =>
      prevPortfolioStocks.filter((stock) => stock !== stockToDelete)
    );
  };

  return (
    <div className="container">
      {!hasSearched ? (
        <div className="search-init">
          <Search
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            stockData={stockData}
            onAddToPortfolio={addToPortfolio}
            stockNews={stockNews}
          />
        </div>
      ) : (
        <>
          <Portfolio
            portfolioStocks={portfolioStocks}
            onOptimise={optimisePortfolio}
            onDelete={deleteStock}
            optimisedPortfolio={optimisedPortfolio}
          />

          <Search
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            stockData={stockData}
            onAddToPortfolio={addToPortfolio}
            stockNews={stockNews}
          />
        </>
      )}
    </div>
  );
}

export default SearchStock;
