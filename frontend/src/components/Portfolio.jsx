import "../Portfolio.css";
import PieChart from "./PieChart";
import PieChartWrapper from "./PieChartWrapper";

function Portfolio({
  portfolioStocks,
  onOptimise,
  onDelete,
  optimisedPortfolio,
}) {
  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h4>Portfolio</h4>
        <button className="optimise-button" onClick={onOptimise}>
          Optimise Portfolio
        </button>
      </div>
      <div className="portfolio-content">
        <div className="portfolio-stocks">
          {portfolioStocks.map((stock, index) => (
            <div key={index} className="stock-card">
              <span>
                {stock}{" "}
                <button className="flat-btn" onClick={() => onDelete(stock)}>
                  delete
                </button>
              </span>
            </div>
          ))}
        </div>
        <PieChartWrapper data={optimisedPortfolio} />
      </div>
    </div>
  );
}

export default Portfolio;
