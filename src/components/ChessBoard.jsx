import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { Chess } from "chess.js";
import ChessSquare from "./ChessSquare";

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);

  // aktuelles Brett als 2D-Array (8x8)
  const board = game.board();

  // Klick-Handler: Erster Klick wählt ein Feld, zweiter versucht den Zug auszuführen
  const handleSquareClick = (square) => {
    if (selectedSquare) {
      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: "q",
      });
      if (move) {
        setGame(new Chess(game.fen()));
        setMoveHistory((prev) => [...prev, move.san]);
      }
      setSelectedSquare(null);
    } else {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: "90vw", sm: "80vw", md: "480px" },
        height: { xs: "90vw", sm: "80vw", md: "480px" },
        maxWidth: "480px",
        maxHeight: "480px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Grid container spacing={0} sx={{ width: "100%", height: "100%" }}>
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              piece={square}
              row={rowIndex}
              col={colIndex}
              onSquareClick={handleSquareClick}
              selectedSquare={selectedSquare}
            />
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default ChessBoard;
