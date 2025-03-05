// src/components/decorative/AnimatedChessPieces.jsx
import React from "react";
import { Box, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Decorative animated chess pieces for the game mode selection screen
 */
const AnimatedChessPieces = () => {
  const theme = useTheme();

  // Define chess pieces with their positions and animations
  const pieces = [
    // White pieces
    {
      type: "king",
      color: "white",
      symbol: "♔",
      position: { top: "15%", left: "20%" },
      animation: {
        y: [0, -10, 0],
        rotate: [0, 3, 0],
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    {
      type: "queen",
      color: "white",
      symbol: "♕",
      position: { top: "35%", left: "12%" },
      animation: {
        y: [0, -8, 0],
        rotate: [0, -2, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        },
      },
    },
    {
      type: "knight",
      color: "white",
      symbol: "♘",
      position: { top: "60%", left: "18%" },
      animation: {
        y: [0, -12, 0],
        rotate: [0, 5, 0],
        transition: {
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        },
      },
    },
    {
      type: "pawn",
      color: "white",
      symbol: "♙",
      position: { top: "80%", left: "25%" },
      animation: {
        y: [0, -5, 0],
        rotate: [0, -1, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        },
      },
    },

    // Black pieces
    {
      type: "king",
      color: "black",
      symbol: "♚",
      position: { top: "20%", right: "15%" },
      animation: {
        y: [0, -8, 0],
        rotate: [0, -3, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        },
      },
    },
    {
      type: "queen",
      color: "black",
      symbol: "♛",
      position: { top: "40%", right: "22%" },
      animation: {
        y: [0, -10, 0],
        rotate: [0, 2, 0],
        transition: {
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        },
      },
    },
    {
      type: "knight",
      color: "black",
      symbol: "♞",
      position: { top: "65%", right: "14%" },
      animation: {
        y: [0, -7, 0],
        rotate: [0, -4, 0],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        },
      },
    },
    {
      type: "pawn",
      color: "black",
      symbol: "♟",
      position: { top: "75%", right: "25%" },
      animation: {
        y: [0, -6, 0],
        rotate: [0, 2, 0],
        transition: {
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        },
      },
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none", // So it doesn't interfere with clicks
      }}
    >
      {pieces.map((piece, index) => (
        <Box
          key={`${piece.color}-${piece.type}-${index}`}
          component={motion.div}
          animate={piece.animation}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          sx={{
            position: "absolute",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
            color:
              piece.color === "white"
                ? alpha(theme.palette.common.white, 0.7)
                : alpha(theme.palette.common.black, 0.6),
            textShadow:
              piece.color === "white"
                ? `0 2px 10px ${alpha(theme.palette.primary.main, 0.5)}`
                : `0 2px 10px ${alpha(theme.palette.secondary.main, 0.5)}`,
            filter: `blur(1px)`,
            ...piece.position,
          }}
        >
          {piece.symbol}
        </Box>
      ))}
    </Box>
  );
};

export default AnimatedChessPieces;
