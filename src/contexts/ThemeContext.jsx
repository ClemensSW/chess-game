// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getThemeByMode } from "../theme/themeConfig";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Theme State
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  // Get the actual theme object based on the mode
  const theme = getThemeByMode(mode);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Toggle theme function
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Context value
  const value = {
    mode,
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
