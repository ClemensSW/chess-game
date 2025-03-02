import React, { useState, useEffect } from "react";
import { Paper, Typography, List, ListItem } from "@mui/material";

// In einer realen Integration würden die Moves aus dem zentralen Spielzustand kommen
const MoveHistory = () => {
  const [moves, setMoves] = useState([]);

  // Platzhalter: Hier sollte man den Move-Array aus dem ChessBoard synchronisieren
  useEffect(() => {
    // Beispiel: setMoves(['e4', 'e5', 'Nf3', 'Nc6']);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, maxHeight: "300px", overflowY: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Zugliste
      </Typography>
      <List>
        {moves.length ? (
          moves.map((move, index) => (
            <ListItem key={index} disablePadding>
              {index + 1}. {move}
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">Noch keine Züge...</Typography>
        )}
      </List>
    </Paper>
  );
};

export default MoveHistory;
