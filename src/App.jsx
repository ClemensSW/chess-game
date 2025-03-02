import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChessBoard from "./components/ChessBoard";
import MoveHistory from "./components/MoveHistory";
import GameControls from "./components/GameControls";

function App() {
  const [mode, setMode] = useState("light");

  // Toggle-Funktion für den Dark/Light-Modus (Theme-Wechsel wäre idealerweise dynamisch via Context)
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    // Hinweis: Ein kompletter Theme-Wechsel erfordert die Aktualisierung des ThemeProviders
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Premium Chess Game
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <ChessBoard />
        </Box>
        <Box sx={{ flex: 0.4, maxWidth: "300px" }}>
          <GameControls />
          <MoveHistory />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
