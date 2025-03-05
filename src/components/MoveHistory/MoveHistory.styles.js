// src/components/MoveHistory/MoveHistory.styles.js
import { alpha } from "@mui/material";

/**
 * MoveHistory component styles
 */
export const styles = {
  // Main container
  container: (theme) => ({
    p: 0,
    maxHeight: "350px",
    overflowY: "auto",
    borderRadius: 3,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha("#1e2023", 0.9)
        : alpha("#fff", 0.95),
    boxShadow:
      theme.palette.mode === "dark"
        ? "0px 8px 25px rgba(0, 0, 0, 0.25)"
        : "0px 8px 25px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  }),

  // Header section
  header: (theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    p: 2,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.4)
        : alpha(theme.palette.primary.light, 0.05),
  }),

  // Header title
  headerTitle: (theme) => ({
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
  }),

  // Moves count chip
  movesChip: {
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    "& .MuiChip-label": {
      fontWeight: 600,
      px: 1,
    },
  },

  // Empty state container
  emptyState: (theme) => ({
    py: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "text.secondary",
    bgcolor: alpha(theme.palette.background.default, 0.5),
    borderRadius: 1,
  }),

  // Empty state icon
  emptyStateIcon: {
    fontSize: 40,
    mb: 1,
    opacity: 0.5,
  },

  // Move list item
  moveListItem: (theme) => ({
    display: "flex",
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
    "&:last-child": {
      borderBottom: "none",
    },
    transition: "background-color 0.2s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: alpha(theme.palette.action.hover, 0.1),
    },
  }),

  // Move number column
  moveNumberColumn: (theme) => ({
    width: "15%",
    fontWeight: "bold",
    color: alpha(theme.palette.text.secondary, 0.9),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.3)
        : alpha(theme.palette.background.default, 0.5),
    py: 1.5,
  }),

  // Move cell (white or black)
  moveCell: (theme, isSelected, isWhite) => ({
    width: "42.5%",
    py: 1.5,
    px: 1.5,
    cursor: "pointer",
    borderRadius: 1,
    position: "relative",
    fontWeight: isSelected ? 700 : 500,
    color: isSelected
      ? isWhite
        ? theme.palette.primary.main
        : theme.palette.secondary.main
      : "text.primary",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha(
              isWhite
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
              0.1
            )
          : alpha(
              isWhite
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
              0.05
            ),
    },
    "&::after": isSelected
      ? {
          content: '""',
          position: "absolute",
          [isWhite ? "left" : "right"]: 0,
          top: "25%",
          height: "50%",
          width: "3px",
          backgroundColor: isWhite
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
          borderRadius: isWhite ? "0 2px 2px 0" : "2px 0 0 2px",
        }
      : {},
    transition: "all 0.2s ease",
  }),
};

// Animation variants for container
export const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

// Animation variants for items
export const itemVariants = {
  hidden: { opacity: 0, x: -5 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Formats a chess move to include symbols for pieces
 */
export const getSymbolForPiece = (move) => {
  if (!move) return "";

  // Ensure move is a string
  const moveString =
    typeof move === "string" ? move : move.san || move.toString();

  // Piece symbol mapping
  const pieceSymbols = {
    K: "♔", // King (White)
    Q: "♕", // Queen (White)
    R: "♖", // Rook (White)
    B: "♗", // Bishop (White)
    N: "♘", // Knight (White)
    P: "♙", // Pawn (White)
  };

  // Special moves like castling
  if (moveString === "O-O") return "0-0"; // Kingside castling
  if (moveString === "O-O-O") return "0-0-0"; // Queenside castling

  // Special handling for pawn moves (without letters)
  if (moveString.length === 2 || moveString.includes("x")) {
    return "♙" + moveString;
  }

  // Search for the piece letter at the beginning
  for (const [piece, symbol] of Object.entries(pieceSymbols)) {
    if (moveString.startsWith(piece)) {
      return symbol + moveString.substring(1);
    }
  }

  return moveString; // Fallback for unexpected cases
};
