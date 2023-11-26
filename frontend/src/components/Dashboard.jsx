import { useEffect, useState } from "react";
import StockSearch from "./StockSearch";
import axios from "axios";
import PieChartWrapper from "./PieChartWrapper";
import LargeCard from "./LargeCard";
import Sidebar from "./Sidebar";

const BACKEND_URL_OPTIMISE = "http://localhost:8001";

function Dashboard() {
  // stocks held in portfolio managed at dashboard level
  const [portfolio, setPortfolio] = useState(() => {
    const savedPortfolio = localStorage.getItem("portfolio");
    if (savedPortfolio) {
      try {
        return JSON.parse(savedPortfolio);
      } catch (error) {
        console.error("Error parsing portfolio from localStorage:", error);
        return [];
      }
    } else {
      return [];
    }
  });

  const [optimisedPortfolio, setOptimisedPortfolio] = useState(() => {
    const savedOptimisedPortfolio = localStorage.getItem("optimisedPortfolio");
    if (savedOptimisedPortfolio) {
      try {
        return JSON.parse(savedOptimisedPortfolio);
      } catch (error) {
        console.error(
          "Error parsing optimisedPortfolio from localStorage:",
          error
        );
        return [];
      }
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem(
      "optimisedPortfolio",
      JSON.stringify(optimisedPortfolio)
    );
  }, [optimisedPortfolio]);

  const addToPortfolio = (stockName) => {
    if (!portfolio.includes(stockName)) {
      setPortfolio([...portfolio, stockName]);
    }
  };

  const removeStock = async (stockToDelete) => {
    setPortfolio((prevPortfolioStocks) =>
      prevPortfolioStocks.filter((stock) => stock !== stockToDelete)
    );
  };

  const optimisePortfolio = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_OPTIMISE}/optimise_portfolio`,
        {
          stock_list: portfolio,
        }
      );
      console.log(response.data);
      setOptimisedPortfolio(response.data);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <Sidebar />
      </div>
      <div className="main-content">
        <StockSearch addToPortfolio={addToPortfolio} />
        <div className="portfolio-content">
          <div className="stock-list-card">
            <h3>Stocks In Portfolio</h3>
            <button onClick={optimisePortfolio}>optimise</button>
            {portfolio.length > 0 ? (
              <div>
                {portfolio.map((stock, index) => (
                  <div key={index} className="stock-list-item">
                    <span>{stock}</span>
                    <button
                      className="flat-btn"
                      onClick={() => removeStock(stock)}
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your portfolio is empty.</p>
            )}
          </div>
          <PieChartWrapper data={optimisedPortfolio} />
        </div>
      </div>

      <br />
    </div>
  );
}

export default Dashboard;
