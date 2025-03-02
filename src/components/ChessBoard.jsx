// src/components/ChessBoard.jsx - Verbesserte Version
import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { Chess } from "chess.js";
import ChessSquare from "./ChessSquare";

const ChessBoard = ({ onMoveChange }) => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);

  // Aktuelles Brett als 2D-Array (8x8)
  const board = game.board();

  // Berechnet alle gültigen Züge für ein ausgewähltes Feld
  const calculateValidMoves = (square) => {
    if (!square) {
      setValidMoves([]);
      return;
    }

    const moves = game.moves({
      square: square,
      verbose: true,
    });

    setValidMoves(moves.map((move) => move.to));
  };

  // Klick-Handler: Erster Klick wählt ein Feld, zweiter versucht den Zug auszuführen
  const handleSquareClick = (square) => {
    if (selectedSquare) {
      // Versuche Zug auszuführen
      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: "q", // Immer zur Dame befördern (kann später erweitert werden)
      });

      if (move) {
        // Zug erfolgreich
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setMoveHistory((prev) => [...prev, move]);
        setLastMove({ from: selectedSquare, to: square });

        // Benachrichtige übergeordnete Komponenten über den Zug
        if (onMoveChange) {
          onMoveChange(moveHistory);
        }
      }

      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      // Wähle eine Figur aus
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        calculateValidMoves(square);
      }
    }
  };

  // Prüft, ob das Spiel vorbei ist
  useEffect(() => {
    if (game.isGameOver()) {
      let result = "";
      if (game.isCheckmate()) {
        result = `Schachmatt! ${
          game.turn() === "w" ? "Schwarz" : "Weiß"
        } gewinnt!`;
      } else if (game.isDraw()) {
        result = "Remis!";
        if (game.isStalemate()) {
          result += " (Patt)";
        } else if (game.isThreefoldRepetition()) {
          result += " (Dreifache Stellungswiederholung)";
        } else if (game.isInsufficientMaterial()) {
          result += " (Ungenügendes Material)";
        }
      }

      if (result) {
        console.log(result);
        // Hier könnte ein Dialog oder eine Benachrichtigung angezeigt werden
      }
    }
  }, [game]);

  // Neues Spiel starten
  const newGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setMoveHistory([]);
    setValidMoves([]);
    setLastMove(null);
  };

  // Zug rückgängig machen
  const undoMove = () => {
    const move = game.undo();
    if (move) {
      setGame(new Chess(game.fen()));
      setMoveHistory((prev) => prev.slice(0, -1));
      setSelectedSquare(null);
      setValidMoves([]);
      setLastMove(null);
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
              isValidMove={validMoves.includes(
                String.fromCharCode(97 + colIndex) + (8 - rowIndex)
              )}
              isLastMoveFrom={
                lastMove &&
                lastMove.from ===
                  String.fromCharCode(97 + colIndex) + (8 - rowIndex)
              }
              isLastMoveTo={
                lastMove &&
                lastMove.to ===
                  String.fromCharCode(97 + colIndex) + (8 - rowIndex)
              }
            />
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default ChessBoard;
