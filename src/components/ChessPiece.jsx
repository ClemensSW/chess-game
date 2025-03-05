// src/components/ChessPiece.jsx - Moderne Version
import React from "react";
import { Typography, Box } from "@mui/material";

// Moderne Schachfiguren mit Unicode-Symbolen
const pieceSymbols = {
  k: { w: "♔", b: "♚" }, // König
  q: { w: "♕", b: "♛" }, // Dame
  r: { w: "♖", b: "♜" }, // Turm
  b: { w: "♗", b: "♝" }, // Läufer
  n: { w: "♘", b: "♞" }, // Springer
  p: { w: "♙", b: "♟" }, // Bauer
};

// SVG-basierte Figuren können in zukünftigen Versionen implementiert werden

const ChessPiece = ({ type, color, isSelected }) => {
  // Fallback auf leeren String, wenn Symbol nicht gefunden wird
  const symbol = pieceSymbols[type] ? pieceSymbols[type][color] : "";

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "90%",
        userSelect: "none",
        filter: `drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))`,
        transform: isSelected ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
    >
      <Typography
        variant="h3"
        component="span"
        sx={{
          lineHeight: 1,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "2.75rem" },
          color: color === "w" ? "#FFFFFF" : "#000000",
          textShadow:
            color === "w"
              ? "0px 1px 2px rgba(0, 0, 0, 0.4)"
              : "0px 1px 2px rgba(255, 255, 255, 0.1)",
          fontWeight: isSelected ? 700 : 600,
        }}
      >
        {symbol}
      </Typography>
    </Box>
  );
};

// Alternate Implementation with SVG Icons (for future use)
const ChessPieceSVG = ({ type, color, isSelected }) => {
  // In future versions, this component could render SVG-based chess pieces
  // for a more modern, flat design approach

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "90%",
        transform: isSelected ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
    >
      {/* SVG Icon would go here */}
      <Typography variant="body2">
        {type}-{color}
      </Typography>
    </Box>
  );
};

export default React.memo(ChessPiece);
