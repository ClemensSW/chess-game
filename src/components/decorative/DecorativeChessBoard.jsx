// src/components/decorative/DecorativeChessBoard.jsx
import React, { useEffect } from "react";
import { Box, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Decorative animated chess board for the game mode selection screen
 * Shows a brief animation of chess pieces moving
 */
const DecorativeChessBoard = ({ size = 220, visible = true }) => {
  const theme = useTheme();

  // Board colors based on theme
  const lightSquareColor =
    theme.palette.mode === "dark"
      ? theme.chess?.lightSquare || "#ABABAB"
      : theme.chess?.lightSquare || "#F0D9B5";

  const darkSquareColor =
    theme.palette.mode === "dark"
      ? theme.chess?.darkSquare || "#5C5C5C"
      : theme.chess?.darkSquare || "#B58863";

  // Animation sequence states
  const moveSequence = [
    // Initial state - setup
    {
      pieces: [
        { symbol: "♙", position: "e2", color: "white" },
        { symbol: "♙", position: "d2", color: "white" },
        { symbol: "♘", position: "b1", color: "white" },
        { symbol: "♙", position: "e7", color: "black" },
        { symbol: "♟", position: "d7", color: "black" },
      ],
    },
    // Move 1: White pawn e2 to e4
    {
      pieces: [
        { symbol: "♙", position: "e4", color: "white" },
        { symbol: "♙", position: "d2", color: "white" },
        { symbol: "♘", position: "b1", color: "white" },
        { symbol: "♟", position: "e7", color: "black" },
        { symbol: "♟", position: "d7", color: "black" },
      ],
    },
    // Move 2: Black pawn e7 to e5
    {
      pieces: [
        { symbol: "♙", position: "e4", color: "white" },
        { symbol: "♙", position: "d2", color: "white" },
        { symbol: "♘", position: "b1", color: "white" },
        { symbol: "♟", position: "e5", color: "black" },
        { symbol: "♟", position: "d7", color: "black" },
      ],
    },
    // Move 3: White knight b1 to c3
    {
      pieces: [
        { symbol: "♙", position: "e4", color: "white" },
        { symbol: "♙", position: "d2", color: "white" },
        { symbol: "♘", position: "c3", color: "white" },
        { symbol: "♟", position: "e5", color: "black" },
        { symbol: "♟", position: "d7", color: "black" },
      ],
    },
    // Move 4: Black pawn d7 to d5
    {
      pieces: [
        { symbol: "♙", position: "e4", color: "white" },
        { symbol: "♙", position: "d2", color: "white" },
        { symbol: "♘", position: "c3", color: "white" },
        { symbol: "♟", position: "e5", color: "black" },
        { symbol: "♟", position: "d5", color: "black" },
      ],
    },
  ];

  // Position mappings - convert chess notation to grid coordinates
  const getSquareCoordinates = (position) => {
    const file = position.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
    const rank = 8 - parseInt(position.charAt(1)); // '1' = 7, '2' = 6, etc.
    return { file, rank };
  };

  // State for current animation step
  const [currentStep, setCurrentStep] = React.useState(0);

  // Cycle through the move sequence with a delay
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % moveSequence.length);
    }, 2000); // Change position every 2 seconds

    return () => clearInterval(interval);
  }, [visible, moveSequence.length]);

  // Render 8x8 chess board
  const renderBoard = () => {
    const squares = [];

    // Create 64 squares
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const isLightSquare = (rank + file) % 2 === 0;
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
          />
        );
      }
    }

    return squares;
  };

  // Render animated chess pieces
  const renderPieces = () => {
    if (!moveSequence[currentStep]) return null;

    return moveSequence[currentStep].pieces.map((piece, index) => {
      const { file, rank } = getSquareCoordinates(piece.position);

      return (
        <Box
          component={motion.div}
          key={`${piece.symbol}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: `${file * (100 / 8)}%`,
            y: `${rank * (100 / 8)}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.5,
          }}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${100 / 8}%`,
            height: `${100 / 8}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: size / 12,
              fontWeight: "bold",
              color: piece.color === "white" ? "#fff" : "#000",
              textShadow:
                piece.color === "white"
                  ? "0 1px 2px rgba(0,0,0,0.5)"
                  : "0 1px 1px rgba(255,255,255,0.3)",
            }}
          >
            {piece.symbol}
          </Box>
        </Box>
      );
    });
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
      {/* Chess board squares */}
      {renderBoard()}

      {/* Animated pieces */}
      {renderPieces()}
    </Box>
  );
};

export default DecorativeChessBoard;
