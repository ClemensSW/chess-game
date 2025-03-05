// src/components/MoveHistory.jsx - Verbessertes Design
import React, { useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Box,
  Divider,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { motion } from "framer-motion";

const MoveHistory = ({ moves = [], onMoveSelect, currentMoveIndex = -1 }) => {
  const theme = useTheme();
  const listRef = useRef(null);

  // Formatieren der Züge in Paare (Weiß & Schwarz)
  const formattedMoves = [];
  for (let i = 0; i < moves.length; i += 2) {
    formattedMoves.push({
      index: Math.floor(i / 2) + 1,
      white: moves[i],
      black: i + 1 < moves.length ? moves[i + 1] : null,
    });
  }

  // Für einfacheres Styling und besseres Verständnis
  const getSymbolForPiece = (move) => {
    if (!move) return "";

    // Stellen Sie sicher, dass move ein String ist
    const moveString =
      typeof move === "string" ? move : move.san || move.toString();

    const pieceSymbols = {
      K: "♔", // König
      Q: "♕", // Dame
      R: "♖", // Turm
      B: "♗", // Läufer
      N: "♘", // Springer
      // Keine Symbole für Bauern notwendig
    };

    // Einige Beispiele für spezielle Züge
    if (moveString === "O-O") return "0-0"; // Kurze Rochade
    if (moveString === "O-O-O") return "0-0-0"; // Lange Rochade

    // Fügt das passende Symbol hinzu, falls es ein Nicht-Bauer ist
    for (const [piece, symbol] of Object.entries(pieceSymbols)) {
      if (moveString.startsWith(piece)) {
        return symbol + moveString.substring(1);
      }
    }

    return moveString; // Bauernzug oder unerkannter Zug
  };

  // Automatisches Scrollen zum aktuellen Zug
  useEffect(() => {
    if (listRef.current && currentMoveIndex >= 0) {
      const selectedItem = listRef.current.querySelector(
        `[data-move-index="${currentMoveIndex}"]`
      );
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentMoveIndex, moves.length]);

  // Container-Animation
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  // Element-Animation
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Paper
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      elevation={3}
      sx={{
        p: 0,
        maxHeight: "350px",
        overflowY: "auto",
        borderRadius: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? alpha("#1e2023", 0.9)
            : alpha("#fff", 0.95),
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0px 8px 25px rgba(0, 0, 0, 0.25)"
            : "0px 8px 25px rgba(0, 0, 0, 0.1)",
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) =>
            `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          p: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.4)
              : alpha(theme.palette.primary.light, 0.05),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <HistoryIcon sx={{ mr: 1, fontSize: "1.25rem" }} />
          Zughistorie
        </Typography>

        <Chip
          icon={<SwapVertIcon />}
          label={`${moves.length} Züge`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            "& .MuiChip-label": {
              fontWeight: 600,
              px: 1,
            },
          }}
        />
      </Box>

      {formattedMoves.length === 0 ? (
        <Box
          sx={{
            py: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "text.secondary",
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
            borderRadius: 1,
          }}
        >
          <HistoryIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            Noch keine Züge vorhanden
          </Typography>
          <Typography
            variant="body2"
            sx={{ maxWidth: "80%", textAlign: "center" }}
          >
            Die Zughistorie wird hier angezeigt, sobald du einen Zug ausführst
          </Typography>
        </Box>
      ) : (
        <List ref={listRef} sx={{ p: 0 }}>
          {formattedMoves.map((movePair) => (
            <motion.div key={movePair.index} variants={itemVariants}>
              <ListItem
                disablePadding
                sx={{
                  display: "flex",
                  borderBottom: (theme) =>
                    `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                  "&:last-child": {
                    borderBottom: "none",
                  },
                  transition: "background-color 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.action.hover, 0.1),
                  },
                }}
              >
                <Box
                  sx={{
                    width: "15%",
                    fontWeight: "bold",
                    color: (theme) => alpha(theme.palette.text.secondary, 0.9),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: (theme) =>
                      `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? alpha(theme.palette.background.paper, 0.3)
                        : alpha(theme.palette.background.default, 0.5),
                    py: 1.5,
                  }}
                >
                  {movePair.index}.
                </Box>

                <Box
                  data-move-index={2 * movePair.index - 2}
                  onClick={() =>
                    onMoveSelect && onMoveSelect(2 * movePair.index - 2)
                  }
                  sx={{
                    width: "42.5%",
                    py: 1.5,
                    px: 1.5,
                    cursor: "pointer",
                    borderRadius: 1,
                    position: "relative",
                    fontWeight:
                      currentMoveIndex === 2 * movePair.index - 2 ? 700 : 500,
                    color:
                      currentMoveIndex === 2 * movePair.index - 2
                        ? (theme) => theme.palette.primary.main
                        : "text.primary",
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? alpha(theme.palette.primary.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.05),
                    },
                    "&::after":
                      currentMoveIndex === 2 * movePair.index - 2
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "25%",
                            height: "50%",
                            width: "3px",
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            borderRadius: "0 2px 2px 0",
                          }
                        : {},
                    transition: "all 0.2s ease",
                  }}
                >
                  {getSymbolForPiece(movePair.white)}
                </Box>

                {movePair.black && (
                  <Box
                    data-move-index={2 * movePair.index - 1}
                    onClick={() =>
                      onMoveSelect && onMoveSelect(2 * movePair.index - 1)
                    }
                    sx={{
                      width: "42.5%",
                      py: 1.5,
                      px: 1.5,
                      cursor: "pointer",
                      borderRadius: 1,
                      position: "relative",
                      fontWeight:
                        currentMoveIndex === 2 * movePair.index - 1 ? 700 : 500,
                      color:
                        currentMoveIndex === 2 * movePair.index - 1
                          ? (theme) => theme.palette.secondary.main
                          : "text.primary",
                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? alpha(theme.palette.secondary.main, 0.1)
                            : alpha(theme.palette.secondary.main, 0.05),
                      },
                      "&::after":
                        currentMoveIndex === 2 * movePair.index - 1
                          ? {
                              content: '""',
                              position: "absolute",
                              right: 0,
                              top: "25%",
                              height: "50%",
                              width: "3px",
                              backgroundColor: (theme) =>
                                theme.palette.secondary.main,
                              borderRadius: "2px 0 0 2px",
                            }
                          : {},
                      transition: "all 0.2s ease",
                    }}
                  >
                    {getSymbolForPiece(movePair.black)}
                  </Box>
                )}
              </ListItem>
            </motion.div>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MoveHistory;
