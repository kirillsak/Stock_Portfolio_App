import { useEffect, useState } from "react";
import StockSearch from "./StockSearch";
import axios from "axios";
import PieChartWrapper from "./PieChartWrapper";

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
    <div>
      {portfolio.length > 0 && (
        <>
          <div className="header-container">
            <h1>Portfolio</h1>
            <button className="flat-btn" onClick={optimisePortfolio}>
              Optimise
            </button>
          </div>
          <div className="card">
            <div className="dashboard-wrapper">
              <div className="portfolio-stocks">
                <h3 className="title">Stocks In Portfolio</h3>
                {portfolio.map((stock, index) => (
                  <div key={index} className="stock-card">
                    <span>
                      {stock}{" "}
                      <button
                        className="flat-btn"
                        onClick={() => removeStock(stock)}
                      >
                        delete
                      </button>
                    </span>
                  </div>
                ))}
              </div>
              <PieChartWrapper data={optimisedPortfolio} />
            </div>
          </div>
          <br />
          <br />
        </>
      )}
      <StockSearch addToPortfolio={addToPortfolio} />
    </div>
  );
}

export default Dashboard;
