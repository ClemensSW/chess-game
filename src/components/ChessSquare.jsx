// src/components/ChessSquare.jsx - Verbesserte Version
import React from "react";
import { Grid, Box } from "@mui/material";
import ChessPiece from "./ChessPiece";

const ChessSquare = ({
  piece,
  row,
  col,
  onSquareClick,
  selectedSquare,
  isValidMove,
  isLastMoveFrom,
  isLastMoveTo,
}) => {
  const isDark = (row + col) % 2 === 1;
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rank = 8 - row;
  const file = files[col];
  const squareNotation = file + rank;

  const isSelected = selectedSquare === squareNotation;

  // Basis-Hintergrundfarbe
  let backgroundColor = isDark ? "#b58863" : "#f0d9b5";

  // Visuelles Feedback für ausgewählte Felder, gültige Züge und letzten Zug
  if (isSelected) {
    backgroundColor = "#bbcb2b"; // ausgewähltes Feld
  } else if (isValidMove) {
    backgroundColor = piece ? "#f7c557" : "#d5e39a"; // gültiger Zug (unterschiedlich für leere vs. besetzte Felder)
  } else if (isLastMoveFrom || isLastMoveTo) {
    backgroundColor = isDark ? "#b39c56" : "#e6d9a2"; // letzter Zug
  }

  // Überlagerung für gültige Züge
  const renderMoveIndicator = () => {
    if (!isValidMove) return null;

    return (
      <Box
        sx={{
          position: "absolute",
          width: piece ? "85%" : "25%",
          height: piece ? "85%" : "25%",
          borderRadius: "50%",
          backgroundColor: piece
            ? "rgba(255, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0.1)",
          pointerEvents: "none",
        }}
      />
    );
  };

  // Anzeige der Koordinaten am Rand des Bretts
  const renderCoordinate = () => {
    if (
      (row === 7 && col === 0) ||
      (row === 7 && col === 7) ||
      (row === 0 && col === 0) ||
      (row === 0 && col === 7)
    ) {
      return (
        <Box
          sx={{
            position: "absolute",
            fontSize: "0.7rem",
            color: isDark ? "#f0d9b5" : "#b58863",
            bottom: row === 7 ? 2 : "auto",
            top: row === 0 ? 2 : "auto",
            left: col === 0 ? 2 : "auto",
            right: col === 7 ? 2 : "auto",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        >
          {row === 7 ? file : ""}
          {col === 0 ? rank : ""}
        </Box>
      );
    }
    return null;
  };

  return (
    <Grid item xs={1.5} sx={{ width: "12.5%", height: "12.5%" }}>
      <Box
        onClick={() => onSquareClick(squareNotation)}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          "&:hover": {
            filter: "brightness(1.1)",
          },
        }}
      >
        {renderMoveIndicator()}
        {renderCoordinate()}
        {piece && <ChessPiece type={piece.type} color={piece.color} />}
      </Box>
    </Grid>
  );
};

export default ChessSquare;
