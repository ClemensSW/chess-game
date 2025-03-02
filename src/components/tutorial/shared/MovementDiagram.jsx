// src/components/tutorial/shared/MovementDiagram.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

const MovementDiagram = ({ type }) => {
  const theme = useTheme();
  const cellSize = 36;
  const boardSize = 7; // 7x7 Brett für Übersichtlichkeit

  // Zellen für verschiedene Figurtypen markieren
  const getMarkedCells = () => {
    const centerPos = Math.floor(boardSize / 2);

    // Definiere, welche Zellen für welche Figur markiert werden sollen
    switch (type) {
      case "king":
        return [
          { row: centerPos - 1, col: centerPos - 1 },
          { row: centerPos - 1, col: centerPos },
          { row: centerPos - 1, col: centerPos + 1 },
          { row: centerPos, col: centerPos - 1 },
          { row: centerPos, col: centerPos + 1 },
          { row: centerPos + 1, col: centerPos - 1 },
          { row: centerPos + 1, col: centerPos },
          { row: centerPos + 1, col: centerPos + 1 },
        ];
      case "queen":
        const queenMoves = [];
        // Horizontale und vertikale Linien
        for (let i = 0; i < boardSize; i++) {
          if (i !== centerPos) {
            queenMoves.push({ row: centerPos, col: i });
            queenMoves.push({ row: i, col: centerPos });
          }
        }
        // Diagonalen
        for (let i = 1; i < boardSize; i++) {
          if (centerPos + i < boardSize && centerPos + i < boardSize)
            queenMoves.push({ row: centerPos + i, col: centerPos + i });
          if (centerPos - i >= 0 && centerPos - i >= 0)
            queenMoves.push({ row: centerPos - i, col: centerPos - i });
          if (centerPos + i < boardSize && centerPos - i >= 0)
            queenMoves.push({ row: centerPos + i, col: centerPos - i });
          if (centerPos - i >= 0 && centerPos + i < boardSize)
            queenMoves.push({ row: centerPos - i, col: centerPos + i });
        }
        return queenMoves;
      case "rook":
        const rookMoves = [];
        for (let i = 0; i < boardSize; i++) {
          if (i !== centerPos) {
            rookMoves.push({ row: centerPos, col: i });
            rookMoves.push({ row: i, col: centerPos });
          }
        }
        return rookMoves;
      case "bishop":
        const bishopMoves = [];
        for (let i = 1; i < boardSize; i++) {
          if (centerPos + i < boardSize && centerPos + i < boardSize)
            bishopMoves.push({ row: centerPos + i, col: centerPos + i });
          if (centerPos - i >= 0 && centerPos - i >= 0)
            bishopMoves.push({ row: centerPos - i, col: centerPos - i });
          if (centerPos + i < boardSize && centerPos - i >= 0)
            bishopMoves.push({ row: centerPos + i, col: centerPos - i });
          if (centerPos - i >= 0 && centerPos + i < boardSize)
            bishopMoves.push({ row: centerPos - i, col: centerPos + i });
        }
        return bishopMoves;
      case "knight":
        return [
          { row: centerPos - 2, col: centerPos - 1 },
          { row: centerPos - 2, col: centerPos + 1 },
          { row: centerPos - 1, col: centerPos - 2 },
          { row: centerPos - 1, col: centerPos + 2 },
          { row: centerPos + 1, col: centerPos - 2 },
          { row: centerPos + 1, col: centerPos + 2 },
          { row: centerPos + 2, col: centerPos - 1 },
          { row: centerPos + 2, col: centerPos + 1 },
        ];
      case "pawn":
        return [
          { row: centerPos - 1, col: centerPos, special: "move" },
          { row: centerPos - 2, col: centerPos, special: "firstMove" },
          { row: centerPos - 1, col: centerPos - 1, special: "capture" },
          { row: centerPos - 1, col: centerPos + 1, special: "capture" },
        ];
      default:
        return [];
    }
  };

  const markedCells = getMarkedCells();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            boxShadow: theme.shadows[3],
          }}
        >
          {[...Array(boardSize * boardSize)].map((_, index) => {
            const row = Math.floor(index / boardSize);
            const col = index % boardSize;
            const isCenter =
              row === Math.floor(boardSize / 2) &&
              col === Math.floor(boardSize / 2);

            // Prüfe, ob die Zelle markiert werden soll
            const markedCell = markedCells.find(
              (cell) => cell.row === row && cell.col === col
            );
            const isMarked = !!markedCell;

            // Unterschiedliche Markierungen für Bauern-Zugtypen
            let specialStyle = {};
            if (markedCell?.special === "capture") {
              specialStyle = {
                backgroundColor: alpha(theme.palette.error.main, 0.3),
                border: `2px dashed ${theme.palette.error.main}`,
              };
            } else if (markedCell?.special === "firstMove") {
              specialStyle = {
                backgroundColor: alpha(theme.palette.info.main, 0.2),
                border: `2px dashed ${theme.palette.info.main}`,
              };
            }

            const isDark = (row + col) % 2 === 1;

            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: isCenter
                    ? alpha(theme.palette.primary.main, 0.3)
                    : isMarked
                    ? markedCell.special
                      ? specialStyle.backgroundColor
                      : alpha(theme.palette.success.main, 0.2)
                    : isDark
                    ? "#B58863"
                    : "#F0D9B5",
                  width: cellSize,
                  height: cellSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isCenter
                    ? `2px solid ${theme.palette.primary.main}`
                    : isMarked && markedCell.special
                    ? specialStyle.border
                    : isMarked
                    ? `2px dashed ${theme.palette.success.main}`
                    : "none",
                  boxShadow: isCenter
                    ? `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}`
                    : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {isCenter && (
                  <Typography
                    variant="h5"
                    sx={{
                      color: isDark ? "#F0D9B5" : "#B58863",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                      fontWeight: "bold",
                    }}
                  >
                    {type === "king"
                      ? "♔"
                      : type === "queen"
                      ? "♕"
                      : type === "rook"
                      ? "♖"
                      : type === "bishop"
                      ? "♗"
                      : type === "knight"
                      ? "♘"
                      : "♙"}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        {type === "pawn" && (
          <Card
            elevation={0}
            sx={{
              width: "100%",
              mt: 1,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Legende:
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: alpha(theme.palette.success.main, 0.2),
                      border: `2px dashed ${theme.palette.success.main}`,
                      mr: 1,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">Normaler Zug</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: alpha(theme.palette.info.main, 0.2),
                      border: `2px dashed ${theme.palette.info.main}`,
                      mr: 1,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">Erster Zug (2 Felder)</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: alpha(theme.palette.error.main, 0.3),
                      border: `2px dashed ${theme.palette.error.main}`,
                      mr: 1,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">Schlagzug (diagonal)</Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}
      </Box>
    </motion.div>
  );
};

export default MovementDiagram;
