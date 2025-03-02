// src/components/tutorial/shared/PieceDisplay.jsx
import React from "react";
import { Box, Typography, Avatar, useTheme, alpha } from "@mui/material";

const PieceDisplay = ({ type, color, description }) => {
  const theme = useTheme();

  // Figurensymbole
  const pieceSymbols = {
    king: { w: "♔", b: "♚" }, // König
    queen: { w: "♕", b: "♛" }, // Dame
    rook: { w: "♖", b: "♜" }, // Turm
    bishop: { w: "♗", b: "♝" }, // Läufer
    knight: { w: "♘", b: "♞" }, // Springer
    pawn: { w: "♙", b: "♟" }, // Bauer
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 1,
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          transform: "translateX(5px)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 50,
          height: 50,
          bgcolor: alpha(
            color === "w" ? "#FFFFFF" : "#000000",
            theme.palette.mode === "dark" ? 0.9 : 0.9
          ),
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          boxShadow: theme.shadows[2],
          mr: 2,
          color: color === "w" ? "#000000" : "#FFFFFF",
          fontSize: "2rem",
          fontWeight: "normal",
        }}
      >
        {pieceSymbols[type][color]}
      </Avatar>

      <Typography variant="body1" fontWeight={500}>
        {description}
      </Typography>
    </Box>
  );
};

export default PieceDisplay;
