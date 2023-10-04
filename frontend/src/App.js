import React from "react";
import "./App.css";
import SearchStock from "./components/SearchStock";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Search</h1>
        <SearchStock />
      </header>
    </div>
  );
}

export default App;
