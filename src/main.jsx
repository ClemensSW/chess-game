// src/main.jsx - Mit ErrorBoundary
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      title="Unerwarteter Fehler"
      message="Leider ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu, um fortzufahren."
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
