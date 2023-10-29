import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import StockDataCard from "./StockDataCard";

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <StockDataCard title="Open" value={stockData["1. open"]} />
            <StockDataCard title="High" value={stockData["2. high"]} />
            <StockDataCard title="Low" value={stockData["3. low"]} />
            <StockDataCard title="Close" value={stockData["4. close"]} />
            <StockDataCard title="Volume" value={stockData["5. volume"]} />
          </div>
          <Typography variant="h6" component="div">
            Stock News
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={filterNegativeArticles}
            style={{ marginBottom: "16px" }}
          >
            Positive Articles
          </Button>
          <List>
            {displayedStockNews.map((newsItem, idx) => (
              <ListItem key={idx}>
                <Typography color="text.secondary">
                  <strong>Title:</strong> {newsItem.title}
                </Typography>
                <Typography color="text.secondary">
                  <strong>Sentiment Score:</strong> {newsItem.sentiment_score}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </div>
    </CardContent>
  );
}

export default StockDisplay;
