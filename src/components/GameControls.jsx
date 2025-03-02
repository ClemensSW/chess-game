import React from "react";
import { Button, Stack, Paper, Typography } from "@mui/material";

const GameControls = () => {
  // Platzhalter-Funktionen – in einer realen Implementierung würden diese den Spielzustand steuern
  const handleNewGame = () => {
    // Logik für Neues Spiel
    console.log("Neues Spiel gestartet");
  };

  const handleUndoMove = () => {
    // Logik für Zug rückgängig
    console.log("Zug rückgängig gemacht");
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Spielsteuerung
      </Typography>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleNewGame}>
          Neues Spiel
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleUndoMove}>
          Rückgängig
        </Button>
      </Stack>
    </Paper>
  );
};

export default GameControls;
