// src/components/decorative/DecorativeChessBoard.jsx
import React, { useState, useEffect } from "react";
import { Box, useTheme, alpha } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Dekoratives animiertes Schachbrett für den Spielmodusauswahlbildschirm
 * Zeigt eine realistische Simulation eines spannenden Schachspiels
 */
const DecorativeChessBoard = ({ size = 220, visible = true }) => {
  const theme = useTheme();
  const [moveIndex, setMoveIndex] = useState(-1); // Start mit -1 für die Initialposition
  const totalMoves = 5; // Anzahl der Züge in unserer Animation

  // Brett-Farben basierend auf dem Theme
  const lightSquareColor =
    theme.palette.mode === "dark"
      ? theme.chess?.lightSquare || "#ABABAB"
      : theme.chess?.lightSquare || "#F0D9B5";

  const darkSquareColor =
    theme.palette.mode === "dark"
      ? theme.chess?.darkSquare || "#5C5C5C"
      : theme.chess?.darkSquare || "#B58863";

  // Animation schrittweise durchlaufen
  useEffect(() => {
    if (!visible) return;

    // Initial delay um die Startposition zu zeigen
    const initialDelay = setTimeout(() => {
      setMoveIndex(0);
    }, 1000);

    const interval = setInterval(() => {
      setMoveIndex((prev) => {
        if (prev >= totalMoves - 1) {
          // Nach dem letzten Zug, warte kurz und starte dann neu
          setTimeout(() => setMoveIndex(-1), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 2000); // Alle 2 Sekunden einen neuen Zug machen

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [visible]);

  // Definiere eine reduzierte Anzahl von Figuren für eine klarere Darstellung
  const initialPosition = [
    { id: "wk", symbol: "♔", position: "g1", color: "white" }, // Weißer König
    { id: "wq", symbol: "♕", position: "d4", color: "white" }, // Weiße Dame
    { id: "wr", symbol: "♖", position: "h1", color: "white" }, // Weißer Turm

    { id: "bk", symbol: "♚", position: "e8", color: "black" }, // Schwarzer König
    { id: "bq", symbol: "♛", position: "d8", color: "black" }, // Schwarze Dame
    { id: "bn", symbol: "♞", position: "f6", color: "black" }, // Schwarzer Springer
  ];

  // Definiere die Züge - ein spannendes Endspiel mit Angriff und Schach
  const moves = [
    { piece: "wq", from: "d4", to: "h4", description: "Dame greift an" },
    { piece: "bn", from: "f6", to: "d5", description: "Springer verteidigt" },
    {
      piece: "wr",
      from: "h1",
      to: "h8",
      captures: "bq",
      description: "Turm schlägt Dame",
    },
    { piece: "bk", from: "e8", to: "d8", description: "König flieht" },
    {
      piece: "wq",
      from: "h4",
      to: "d4",
      check: "bk",
      description: "Dame gibt Schach!",
    },
  ];

  // Konvertiere Schachnotation (z.B. "e4") in Datei/Reihe (z.B. {file: 4, rank: 4})
  const notationToCoords = (notation) => {
    const file = notation.charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1, etc.
    const rank = 8 - parseInt(notation.charAt(1)); // '1' -> 7, '2' -> 6, etc.
    return { file, rank };
  };

  // Berechne die exakte Position für eine Figur
  const getSquarePosition = (notation) => {
    const { file, rank } = notationToCoords(notation);
    const squareSize = size / 8;
    return {
      left: file * squareSize + squareSize / 2,
      top: rank * squareSize + squareSize / 2,
    };
  };

  // Berechne die aktuelle Position jeder Figur basierend auf den bisherigen Zügen
  const getCurrentPositions = () => {
    // Kopiere die initiale Position
    let positions = [...initialPosition];

    if (moveIndex === -1) return positions;

    // Wende die Züge bis zum aktuellen Index an
    for (let i = 0; i <= moveIndex; i++) {
      const move = moves[i];

      // Entferne geschlagene Figur
      if (move.captures) {
        const capturedId = move.captures;
        positions = positions.filter((p) => p.id !== capturedId);
      }

      // Aktualisiere Position der bewegten Figur
      const pieceIndex = positions.findIndex((p) => p.id === move.piece);
      if (pieceIndex !== -1) {
        positions[pieceIndex] = {
          ...positions[pieceIndex],
          position: move.to,
          isMoving: i === moveIndex, // Markiere aktive bewegte Figur
          isChecking: move.check ? true : false, // Markiere, wenn der Zug Schach gibt
        };
      }

      // Markiere König im Schach
      if (move.check) {
        const kingIndex = positions.findIndex((p) => p.id === move.check);
        if (kingIndex !== -1) {
          positions[kingIndex] = {
            ...positions[kingIndex],
            inCheck: true,
          };
        }
      }
    }

    return positions;
  };

  // Rendere 8x8 Schachbrett
  const renderBoard = () => {
    const squares = [];

    // Erstelle 64 Felder
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const isLightSquare = (rank + file) % 2 === 0;

        // Highlight Felder für den aktiven Zug
        let isHighlighted = false;
        let isCapturingSquare = false;

        if (moveIndex >= 0 && moveIndex < moves.length) {
          const move = moves[moveIndex];
          const fromCoords = notationToCoords(move.from);
          const toCoords = notationToCoords(move.to);

          // Markiere Start- und Zielfeld des aktuellen Zuges
          if (
            (fromCoords.file === file && fromCoords.rank === rank) ||
            (toCoords.file === file && toCoords.rank === rank)
          ) {
            isHighlighted = true;
          }

          // Markiere Feld für Schlagzug
          if (
            toCoords.file === file &&
            toCoords.rank === rank &&
            move.captures
          ) {
            isCapturingSquare = true;
          }
        }

        squares.push(
          <Box
            key={`${rank}-${file}`}
            sx={{
              width: `${100 / 8}%`,
              height: `${100 / 8}%`,
              backgroundColor: isLightSquare
                ? lightSquareColor
                : darkSquareColor,
              position: "relative",
              transition: "all 0.3s ease",
              filter: isHighlighted ? "brightness(1.2)" : "none",
              boxShadow: isCapturingSquare
                ? "inset 0 0 8px rgba(255,0,0,0.6)"
                : "none",
              "&::before": isHighlighted
                ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: `2px solid ${alpha(
                      theme.palette.primary.main,
                      0.4
                    )}`,
                    zIndex: 1,
                    pointerEvents: "none",
                  }
                : {},
            }}
          />
        );
      }
    }

    return squares;
  };

  // Rendere die Schachfiguren in ihrer aktuellen Position
  const renderPieces = () => {
    const currentPositions = getCurrentPositions();
    const currentMove =
      moveIndex >= 0 && moveIndex < moves.length ? moves[moveIndex] : null;

    return currentPositions.map((piece) => {
      const position = getSquarePosition(piece.position);

      // Bestimme, ob die Figur bewegt wird oder im Schach steht
      const isMoving = piece.isMoving;
      const inCheck = piece.inCheck;

      // Für bewegte Figuren benötigen wir die Startposition für die Animation
      let startPosition = position;
      if (isMoving && currentMove) {
        startPosition = getSquarePosition(currentMove.from);
      }

      // Animation-Konfiguration
      const animationConfig = {
        duration: 0.7,
        ease: "easeInOut",
      };

      if (isMoving) {
        animationConfig.type = "spring";
        animationConfig.stiffness = 70;
        animationConfig.damping = 12;
      }

      return (
        <Box
          component={motion.div}
          key={piece.id}
          initial={{
            left: startPosition.left,
            top: startPosition.top,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: position.left,
            top: position.top,
            scale: isMoving ? 1.2 : inCheck ? 1.1 : 1,
            filter: isMoving
              ? `drop-shadow(0 0 10px ${alpha(
                  theme.palette.primary.main,
                  0.8
                )})`
              : inCheck
              ? `drop-shadow(0 0 10px ${alpha(theme.palette.error.main, 0.7)})`
              : "none",
          }}
          transition={animationConfig}
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)", // Wichtig: Zentriert die Figur auf dem Punkt
            width: `${size / 10}px`,
            height: `${size / 10}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size / 10,
            fontWeight: "bold",
            color: piece.color === "white" ? "#fff" : "#000",
            textShadow:
              piece.color === "white"
                ? "0 1px 2px rgba(0,0,0,0.5)"
                : "0 1px 1px rgba(255,255,255,0.3)",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: isMoving ? 20 : 10,
          }}
        >
          {piece.symbol}

          {/* Zeige roten Ring für König im Schach */}
          {inCheck && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              sx={{
                position: "absolute",
                width: "160%",
                height: "160%",
                borderRadius: "50%",
                border: `2px solid ${theme.palette.error.main}`,
                boxShadow: `0 0 10px 2px ${alpha(
                  theme.palette.error.main,
                  0.4
                )}`,
                zIndex: -1,
              }}
            />
          )}
        </Box>
      );
    });
  };

  // Rendere Schlaganimation
  const renderCaptures = () => {
    if (moveIndex < 0 || moveIndex >= moves.length) return null;

    const currentMove = moves[moveIndex];
    if (!currentMove.captures) return null;

    // Finde die geschlagene Figur in der Initialposition
    const capturedPiece = initialPosition.find(
      (p) => p.id === currentMove.captures
    );
    if (!capturedPiece) return null;

    // Position der geschlagenen Figur
    const position = getSquarePosition(currentMove.to);

    return (
      <Box
        component={motion.div}
        key={`capture-${currentMove.captures}-${moveIndex}`}
        initial={{
          left: position.left,
          top: position.top,
          opacity: 1,
          scale: 1.2,
        }}
        animate={{
          opacity: 0,
          scale: 0.5,
          rotate: capturedPiece.color === "white" ? 45 : -45,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          fontSize: size / 10,
          fontWeight: "bold",
          color: capturedPiece.color === "white" ? "#fff" : "#000",
          textShadow:
            capturedPiece.color === "white"
              ? "0 1px 2px rgba(0,0,0,0.5)"
              : "0 1px 1px rgba(255,255,255,0.3)",
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        {capturedPiece.symbol}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: theme.shadows[8],
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Schachbrettfelder */}
      {renderBoard()}

      {/* Animierte Figuren */}
      {renderPieces()}

      {/* Schlaganimationen */}
      <AnimatePresence>{renderCaptures()}</AnimatePresence>
    </Box>
  );
};

export default DecorativeChessBoard;
