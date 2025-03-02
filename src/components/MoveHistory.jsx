// src/components/MoveHistory.jsx - Modernisierte Version
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
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
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

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      elevation={3}
      sx={{
        p: 2,
        maxHeight: "300px",
        overflowY: "auto",
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e2023" : "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Zughistorie
        </Typography>

        <Chip
          icon={<HistoryIcon />}
          label={`${moves.length} Züge`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      <Divider sx={{ mb: 1 }} />

      {formattedMoves.length === 0 ? (
        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "text.secondary",
            bgcolor: "background.default",
            borderRadius: 1,
          }}
        >
          <HistoryIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            Noch keine Züge vorhanden
          </Typography>
          <Typography variant="caption" sx={{ mt: 1 }}>
            Die Zughistorie wird hier angezeigt
          </Typography>
        </Box>
      ) : (
        <List ref={listRef} sx={{ pl: 1, pr: 1 }}>
          {formattedMoves.map((movePair) => (
            <ListItem
              key={movePair.index}
              disablePadding
              sx={{
                display: "flex",
                mb: 0.5,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Box
                sx={{
                  width: "15%",
                  fontWeight: "bold",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  py: 0.5,
                  px: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  bgcolor:
                    currentMoveIndex === 2 * movePair.index - 2
                      ? theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.08)"
                      : "transparent",
                  fontWeight:
                    currentMoveIndex === 2 * movePair.index - 2
                      ? "bold"
                      : "normal",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(0, 0, 0, 0.12)",
                  },
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
                    py: 0.5,
                    px: 1,
                    cursor: "pointer",
                    borderRadius: 1,
                    bgcolor:
                      currentMoveIndex === 2 * movePair.index - 1
                        ? theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.08)"
                        : "transparent",
                    fontWeight:
                      currentMoveIndex === 2 * movePair.index - 1
                        ? "bold"
                        : "normal",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  {getSymbolForPiece(movePair.black)}
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MoveHistory;
