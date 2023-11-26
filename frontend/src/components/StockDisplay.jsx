import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import StockDataCard from "./StockDataCard";
import "../css/StockDisplayStyles.css";

function StockDisplay({ stockData, stockNews, stockName, addToPortfolio }) {
  const [displayedStockNews, setDisplayedStockNews] = useState(stockNews);
  const [averageSentiment, setAverageSentiment] = useState(0);

  useEffect(() => {
    setDisplayedStockNews(stockNews);
    const totalSentiment = stockNews.reduce(
      (acc, article) => acc + article.sentiment_score,
      0
    );
    const avgSentimentScore =
      stockNews.length > 0 ? totalSentiment / stockNews.length : 0;
    setAverageSentiment(avgSentimentScore);
  }, [stockNews]);

  return (
    <CardContent>
      <Typography variant="h5" component="div">
        Stock Information for {stockName}
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToPortfolio(stockName)}
          style={{ marginLeft: "16px" }}
        >
          Add to Portfolio
        </Button>
      </Typography>
      <div className="stock-info-wrapper">
        <CardContent>
          <div className="stock-cards-container">
            <StockDataCard title="Open" value={stockData["1. open"]} />
            <StockDataCard title="High" value={stockData["2. high"]} />
            <StockDataCard title="Low" value={stockData["3. low"]} />
            <StockDataCard title="Close" value={stockData["4. close"]} />
            <StockDataCard title="Volume" value={stockData["5. volume"]} />
            <StockDataCard
              title="Average Sentiment"
              value={averageSentiment || "N/A"}
            />
          </div>
        </CardContent>
      </div>
    </CardContent>
  );
}

export default StockDisplay;
