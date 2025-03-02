// src/App.jsx - Aktualisierte Version
import React, { useState, useCallback } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ChessBoard from "./components/ChessBoard";
import MoveHistory from "./components/MoveHistory";
import GameControls from "./components/GameControls";
import ChessTimer from "./components/ChessTimer";
import { Chess } from "chess.js";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mode, setMode] = useState("light");
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("w"); // 'w' für weiß, 'b' für schwarz

  // Toggle-Funktion für den Dark/Light-Modus
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Callback für neue Züge vom Schachbrett
  const handleMoveChange = useCallback((moveHistory) => {
    // Hier stellen wir sicher, dass wir die SAN-Notation der Züge extrahieren
    const formattedMoves = moveHistory.map((move) =>
      typeof move === "string" ? move : move.san || move.toString()
    );
    setMoves(formattedMoves);
    // Spieler wechseln nach jedem Zug
    setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));
  }, []);

  // Neues Spiel starten
  const handleNewGame = useCallback((settings) => {
    setGame(new Chess());
    setMoves([]);
    setCurrentPlayer("w");
    // Hier könnten weitere Einstellungen angewendet werden
    console.log("Neues Spiel gestartet", settings);
  }, []);

  // Zug rückgängig machen
  const handleUndoMove = useCallback(() => {
    // Diese Methode würde mit der ChessBoard-Komponente kommunizieren
    console.log("Zug rückgängig");
    // Spielerzug entsprechend anpassen
    if (moves.length > 0) {
      setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));
    }
  }, [moves.length]);

  // Spiel speichern
  const handleSaveGame = useCallback(() => {
    const gameState = {
      fen: game.fen(),
      moves: moves,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("savedChessGame", JSON.stringify(gameState));
    console.log("Spiel gespeichert");
  }, [game, moves]);

  // Spiel laden
  const handleLoadGame = useCallback(() => {
    try {
      const savedGame = JSON.parse(localStorage.getItem("savedChessGame"));
      if (savedGame) {
        const loadedGame = new Chess();
        loadedGame.load(savedGame.fen);
        setGame(loadedGame);
        setMoves(savedGame.moves);
        setCurrentPlayer(loadedGame.turn());
        console.log("Spiel geladen");
      }
    } catch (error) {
      console.error("Fehler beim Laden des Spiels:", error);
    }
  }, []);

  // Zeit abgelaufen
  const handleTimeUp = useCallback((player) => {
    console.log(`Zeit abgelaufen für ${player === "w" ? "Weiß" : "Schwarz"}`);
    // Hier könnte ein Dialog oder eine Benachrichtigung angezeigt werden
  }, []);

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
          <ChessBoard onMoveChange={handleMoveChange} />
        </Box>

        {isMobile ? (
          // Mobile Layout - Steuerelemente unter dem Brett
          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <GameControls
                onNewGame={handleNewGame}
                onUndoMove={handleUndoMove}
                onSaveGame={handleSaveGame}
                onLoadGame={handleLoadGame}
              />
              <ChessTimer
                activePlayer={currentPlayer}
                initialTime={600} // 10 Minuten
                increment={5} // 5 Sekunden Inkrement pro Zug
                onTimeUp={handleTimeUp}
              />
              <MoveHistory moves={moves} />
            </Stack>
          </Box>
        ) : (
          // Desktop Layout - Steuerelemente neben dem Brett
          <Box sx={{ flex: 0.4, maxWidth: "300px" }}>
            <GameControls
              onNewGame={handleNewGame}
              onUndoMove={handleUndoMove}
              onSaveGame={handleSaveGame}
              onLoadGame={handleLoadGame}
            />
            <ChessTimer
              activePlayer={currentPlayer}
              initialTime={600}
              increment={5}
              onTimeUp={handleTimeUp}
            />
            <MoveHistory moves={moves} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
