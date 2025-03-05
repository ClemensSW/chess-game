// src/components/ChessTimer.styles.js
import { alpha } from "@mui/material";

/**
 * Chess timer component styles
 */
export const styles = {
  // Main container
  container: (theme) => ({
    p: 0,
    mb: 3,
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
    overflow: "hidden",
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

  // Status chip
  statusChip: {
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    "& .MuiChip-label": {
      fontWeight: 600,
      px: 1,
    },
  },

  // Timers container
  timersContainer: {
    p: 2,
  },

  // Timers layout
  timersLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 2,
  },

  // Player timer box (base styles)
  playerTimerBase: (theme, isActive, isWhite) => ({
    p: 2,
    borderRadius: 2,
    backgroundColor: isActive
      ? theme.palette.mode === "dark"
        ? alpha(
            isWhite ? theme.palette.primary.main : theme.palette.secondary.main,
            0.1
          )
        : alpha(
            isWhite
              ? theme.palette.primary.light
              : theme.palette.secondary.light,
            0.15
          )
      : "transparent",
    border: `1px solid ${
      isActive
        ? alpha(
            isWhite ? theme.palette.primary.main : theme.palette.secondary.main,
            0.2
          )
        : alpha(theme.palette.divider, 0.1)
    }`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    "&::before": isActive
      ? {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(to right, ${
            isWhite ? theme.palette.primary.main : theme.palette.secondary.main
          }, ${
            isWhite
              ? theme.palette.primary.light
              : theme.palette.secondary.light
          })`,
        }
      : {},
  }),

  // Player label
  playerLabel: (theme) => ({
    fontWeight: 600,
    color: alpha(theme.palette.text.secondary, 0.9),
    mb: 1,
  }),

  // Timer display
  timerDisplay: (theme, timeInSeconds) => ({
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: "bold",
    color: getTimerColor(theme, timeInSeconds),
    letterSpacing: "0.05em",
    textShadow: timeInSeconds < 30 ? "0 0 8px rgba(255,0,0,0.3)" : "none",
    transition: "color 0.5s ease, text-shadow 0.5s ease",
  }),

  // Increment chip
  incrementChip: {
    mt: 1,
    height: "20px",
    fontSize: "0.7rem",
    opacity: 0.7,
  },

  // Animation variants for the timers
  timerVariants: {
    inactive: {
      scale: 0.98,
      opacity: 0.95,
      y: 0,
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
    active: (isWhite) => ({
      scale: 1,
      opacity: 1,
      y: isWhite ? -3 : 3,
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    }),
  },
};

/**
 * Calculate timer text color based on remaining time
 */
export const getTimerColor = (theme, timeInSeconds) => {
  if (timeInSeconds < 30) return theme.palette.error.main; // Red when under 30 seconds
  if (timeInSeconds < 60) return theme.palette.warning.main; // Yellow when under 1 minute
  return theme.palette.primary.main; // Default blue
};

/**
 * Format time in seconds to MM:SS format
 */
export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
