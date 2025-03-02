// src/components/MoveHistory.jsx - Verbesserte Version
import React from "react";
import { Paper, Typography, List, ListItem, Box, Divider } from "@mui/material";

const MoveHistory = ({ moves = [], onMoveSelect }) => {
  // Formatieren der Züge in Paare (Weiß & Schwarz)
  const formattedMoves = [];
  for (let i = 0; i < moves.length; i += 2) {
    formattedMoves.push({
      index: Math.floor(i / 2) + 1,
      white: moves[i],
      black: i + 1 < moves.length ? moves[i + 1] : null,
    });
  }

  // Für einfacheres Styling und besseres Verständnis
  const getSymbolForPiece = (move) => {
    if (!move) return "";

    // Stellen Sie sicher, dass move ein String ist
    const moveString =
      typeof move === "string" ? move : move.san || move.toString();

    const pieceSymbols = {
      K: "♔", // König
      Q: "♕", // Dame
      R: "♖", // Turm
      B: "♗", // Läufer
      N: "♘", // Springer
      // Keine Symbole für Bauern notwendig
    };

    // Einige Beispiele für spezielle Züge
    if (moveString === "O-O") return "0-0"; // Kurze Rochade
    if (moveString === "O-O-O") return "0-0-0"; // Lange Rochade

    // Fügt das passende Symbol hinzu, falls es ein Nicht-Bauer ist
    for (const [piece, symbol] of Object.entries(pieceSymbols)) {
      if (moveString.startsWith(piece)) {
        return symbol + moveString.substring(1);
      }
    }

    return moveString; // Bauernzug oder unerkannter Zug
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxHeight: "300px",
        overflowY: "auto",
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e2023" : "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Zughistorie
      </Typography>
      <Divider sx={{ mb: 1 }} />

      {formattedMoves.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", color: "text.secondary" }}
        >
          Noch keine Züge...
        </Typography>
      ) : (
        <List sx={{ pl: 1, pr: 1 }}>
          {formattedMoves.map((movePair) => (
            <ListItem
              key={movePair.index}
              disablePadding
              sx={{
                display: "flex",
                mb: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Box
                sx={{
                  width: "15%",
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              >
                {movePair.index}.
              </Box>

              <Box
                onClick={() =>
                  onMoveSelect && onMoveSelect(2 * movePair.index - 2)
                }
                sx={{
                  width: "42.5%",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {getSymbolForPiece(movePair.white)}
              </Box>

              {movePair.black && (
                <Box
                  onClick={() =>
                    onMoveSelect && onMoveSelect(2 * movePair.index - 1)
                  }
                  sx={{
                    width: "42.5%",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {getSymbolForPiece(movePair.black)}
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MoveHistory;
