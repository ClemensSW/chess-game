// src/components/PawnPromotionDialog.jsx
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

// Material Icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const PawnPromotionDialog = ({
  open,
  position,
  color,
  onSelect,
  orientation = "white",
  pieceStyle = "standard",
}) => {
  const theme = useTheme();
  const { row, col, onTop } = position || { row: 0, col: 0, onTop: true };

  if (!open) return null;

  // Figurenauswahl für die Umwandlung
  const promotionPieces = ["q", "r", "n", "b"]; // Dame, Turm, Springer, Läufer

  // Figurennamen für Tooltips
  const pieceNames = {
    q: "Dame",
    r: "Turm",
    n: "Springer",
    b: "Läufer",
  };

  // Figurensymbole basierend auf Stil
  const getPieceSymbol = (piece) => {
    // Standard Unicode-Schachsymbole
    const standardSymbols = {
      q: color === "w" ? "♕" : "♛", // Dame
      r: color === "w" ? "♖" : "♜", // Turm
      n: color === "w" ? "♘" : "♞", // Springer
      b: color === "w" ? "♗" : "♝", // Läufer
    };

    // Minimalistische Textdarstellung
    const minimalistSymbols = {
      q: color === "w" ? "Q" : "q", // Dame
      r: color === "w" ? "R" : "r", // Turm
      n: color === "w" ? "N" : "n", // Springer
      b: color === "w" ? "B" : "b", // Läufer
    };

    switch (pieceStyle) {
      case "minimalist":
        return minimalistSymbols[piece];
      case "modern":
      case "standard":
      default:
        return standardSymbols[piece];
    }
  };

  // Animation für die Stücke
  const itemVariants = {
    hidden: { opacity: 0, y: onTop ? -20 : 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      sx={{
        position: "absolute",
        top: onTop ? 0 : "auto",
        bottom: onTop ? "auto" : 0,
        left: `${col * 12.5}%`,
        width: "12.5%",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: onTop ? "column" : "column-reverse",
          overflow: "hidden",
          borderRadius: 1,
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.95)
              : alpha(theme.palette.background.paper, 0.95),
          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.25)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        {/* Pfeil als Indikator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            p: 0.5,
          }}
        >
          <KeyboardArrowUpIcon
            sx={{
              transform: onTop ? "rotate(0deg)" : "rotate(180deg)",
              fontSize: "1.2rem",
            }}
          />
        </Box>

        {/* Figurenoptionen */}
        {promotionPieces.map((piece, i) => (
          <Tooltip
            key={piece}
            title={pieceNames[piece]}
            arrow
            placement="right"
          >
            <Box
              component={motion.div}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              onClick={() => onSelect(piece)}
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.background.paper, 0.95)
                    : alpha(theme.palette.background.paper, 0.95),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  transform: "scale(1.05)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2.2rem" },
                  color: color === "w" ? "#FFFFFF" : "#000000",
                  textShadow:
                    color === "w"
                      ? "0px 1px 2px rgba(0, 0, 0, 0.4)"
                      : "0px 1px 2px rgba(255, 255, 255, 0.1)",
                  fontFamily:
                    pieceStyle === "minimalist"
                      ? "'Courier New', monospace"
                      : "sans-serif",
                  fontWeight: 600,
                }}
              >
                {getPieceSymbol(piece)}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Paper>
    </Box>
  );
};

export default PawnPromotionDialog;
