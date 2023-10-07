import "../Search.css";
function Search({
  query,
  onQueryChange,
  onSearch,
  stockData,
  onAddToPortfolio,
  stockNews,
}) {
  return (
    <div className="search-section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a stock..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div className="content-wrapper">
        {stockData && (
          <div className="stock-data">
            <h3>
              Stock Data for {query} {/* Adjust this line */}
              <button onClick={onAddToPortfolio}>Add to Portfolio</button>
            </h3>
            <div className="stock-data-content">
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
          </div>
        )}
        {stockNews && stockNews.length > 0 && (
          <div className="stock-news">
            <h3>Stock News</h3>
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
    </div>
  );
}

export default Search;
