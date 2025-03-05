// src/components/game-end/GameEndDialog.jsx
import React, { useState, useEffect } from "react";
import { Dialog, Box, useTheme, useMediaQuery } from "@mui/material";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

// Components
import GameEndHeader from "./GameEndHeader";
import GameEndContent from "./GameEndContent";
import GameEndActions from "./GameEndActions";

/**
 * Dialog that appears when a chess game ends, showing the result and game statistics
 */
const GameEndDialog = ({
  open,
  result,
  onNewGame,
  onClose,
  onShare,
  onAnalyze,
  gameStats = {}, // {moveCount, gameDuration, capturedPieces, checks}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle starting a new game
  const handleStartNewGame = () => {
    if (typeof onNewGame === "function") {
      onNewGame();
    }
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // Check if there's a valid result
  if (!result) return null;

  const { title, message, winner } = result;
  const isCheckmate = title === "Schachmatt!";

  // Handle confetti effect for checkmate victories
  useEffect(() => {
    if (open && isCheckmate) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [open, isCheckmate]);

  return (
    <>
      {/* Confetti effect for winners */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperComponent={motion.div}
        PaperProps={{
          initial: { opacity: 0, y: -50, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          sx: {
            borderRadius: isMobile ? 0 : 3,
            overflow: "hidden",
            maxWidth: isMobile ? "100%" : 500,
            width: "100%",
            height: isMobile ? "100%" : "auto",
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
          },
        }}
      >
        {/* Dialog Header with title and result */}
        <GameEndHeader
          title={title}
          message={message}
          winner={winner}
          isCheckmate={isCheckmate}
          onClose={onClose}
        />

        {/* Dialog Content with game statistics */}
        <GameEndContent
          isCheckmate={isCheckmate}
          winner={winner}
          message={message}
          gameStats={gameStats}
        />

        {/* Dialog Actions with buttons */}
        <GameEndActions
          onClose={onClose}
          onShare={onShare}
          onAnalyze={onAnalyze}
          onNewGame={handleStartNewGame}
        />
      </Dialog>
    </>
  );
};

export default GameEndDialog;
