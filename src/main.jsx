// src/main.jsx - With ErrorBoundary
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      title="Unexpected Error"
      message="Unfortunately, an error has occurred. Please reload the page to continue."
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
