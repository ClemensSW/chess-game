import React from "react";
import { Typography } from "@mui/material";

const pieceSymbols = {
  k: { w: "♔", b: "♚" },
  q: { w: "♕", b: "♛" },
  r: { w: "♖", b: "♜" },
  b: { w: "♗", b: "♝" },
  n: { w: "♘", b: "♞" },
  p: { w: "♙", b: "♟" },
};

const ChessPiece = ({ type, color }) => {
  return (
    <Typography
      variant="h3"
      component="span"
      sx={{ lineHeight: 1, userSelect: "none" }}
    >
      {pieceSymbols[type] ? pieceSymbols[type][color] : ""}
    </Typography>
  );
};

export default ChessPiece;
