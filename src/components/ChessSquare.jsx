import React from "react";
import { Grid, Box } from "@mui/material";
import ChessPiece from "./ChessPiece";

const ChessSquare = ({ piece, row, col, onSquareClick, selectedSquare }) => {
  const isDark = (row + col) % 2 === 1;
  const backgroundColor = isDark ? "#b58863" : "#f0d9b5";

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rank = 8 - row;
  const file = files[col];
  const squareNotation = file + rank;

  const isSelected = selectedSquare === squareNotation;

  return (
    <Grid item xs={1.5} sx={{ width: "12.5%", height: "12.5%" }}>
      <Box
        onClick={() => onSquareClick(squareNotation)}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: isSelected ? "#ffeb3b" : backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {piece && <ChessPiece type={piece.type} color={piece.color} />}
      </Box>
    </Grid>
  );
};

export default ChessSquare;
