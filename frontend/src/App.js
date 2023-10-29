import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#yourPrimaryColor",
    },
    secondary: {
      main: "#yourSecondaryColor",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#yourTextColor",
      secondary: "#yourSecondaryTextColor",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <Dashboard />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
