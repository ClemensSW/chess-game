// src/components/MoveHistory/MoveHistory.jsx
import React, { useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { motion } from "framer-motion";
import {
  styles,
  containerVariants,
  itemVariants,
  getSymbolForPiece,
} from "./MoveHistory.styles";

/**
 * MoveHistory Component
 *
 * Displays the history of chess moves in a scrollable list
 *
 * @param {Array} moves - Array of chess moves
 * @param {Function} onMoveSelect - Callback when a move is selected
 * @param {Number} currentMoveIndex - Index of the currently selected move
 */
const MoveHistory = ({ moves = [], onMoveSelect, currentMoveIndex = -1 }) => {
  const theme = useTheme();
  const listRef = useRef(null);

  // Format moves into pairs (White & Black)
  const formattedMoves = [];
  for (let i = 0; i < moves.length; i += 2) {
    formattedMoves.push({
      index: Math.floor(i / 2) + 1,
      white: moves[i],
      black: i + 1 < moves.length ? moves[i + 1] : null,
    });
  }

  // Auto-scroll to current move only when index changes, not when new moves are added
  useEffect(() => {
    if (listRef.current && currentMoveIndex >= 0) {
      const selectedItem = listRef.current.querySelector(
        `[data-move-index="${currentMoveIndex}"]`
      );
      if (selectedItem) {
        // Don't auto-scroll on small screens or when the last move is selected
        const isMobileView = window.innerWidth < 768;
        const isLastMove = currentMoveIndex === moves.length - 1;

        if (!isMobileView || !isLastMove) {
          selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    }
  }, [currentMoveIndex]); // Only depend on currentMoveIndex, not moves.length

  return (
    <Paper
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      elevation={3}
      sx={styles.container(theme)}
    >
      {/* Header */}
      <Box sx={styles.header(theme)}>
        <Typography variant="h6" sx={styles.headerTitle(theme)}>
          <HistoryIcon sx={{ mr: 1, fontSize: "1.25rem" }} />
          Zughistorie
        </Typography>

        <Chip
          icon={<SwapVertIcon />}
          label={`${moves.length} Züge`}
          size="small"
          color="primary"
          variant="outlined"
          sx={styles.movesChip}
        />
      </Box>

      {/* Empty state */}
      {formattedMoves.length === 0 ? (
        <Box sx={styles.emptyState(theme)}>
          <HistoryIcon sx={styles.emptyStateIcon} />
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
        // Move list
        <List ref={listRef} sx={{ p: 0 }}>
          {formattedMoves.map((movePair) => (
            <motion.div key={movePair.index} variants={itemVariants}>
              <ListItem disablePadding sx={styles.moveListItem(theme)}>
                {/* Move number */}
                <Box sx={styles.moveNumberColumn(theme)}>{movePair.index}.</Box>

                {/* White move */}
                <Box
                  data-move-index={2 * movePair.index - 2}
                  onClick={() =>
                    onMoveSelect && onMoveSelect(2 * movePair.index - 2)
                  }
                  sx={styles.moveCell(
                    theme,
                    currentMoveIndex === 2 * movePair.index - 2,
                    true
                  )}
                >
                  {getSymbolForPiece(movePair.white)}
                </Box>

                {/* Black move */}
                {movePair.black && (
                  <Box
                    data-move-index={2 * movePair.index - 1}
                    onClick={() =>
                      onMoveSelect && onMoveSelect(2 * movePair.index - 1)
                    }
                    sx={styles.moveCell(
                      theme,
                      currentMoveIndex === 2 * movePair.index - 1,
                      false
                    )}
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
