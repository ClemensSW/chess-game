// src/components/game-end/GameEndHeader.jsx
import React from "react";
import {
  DialogTitle,
  Typography,
  IconButton,
  Box,
  alpha,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Header section of the GameEndDialog
 */
const GameEndHeader = ({ title, winner, isCheckmate, onClose }) => {
  const theme = useTheme();

  // Determine background color based on the game result
  const getHeaderBackground = () => {
    if (isCheckmate) {
      return winner === "w"
        ? alpha("#FFD700", 0.15) // Gold for white winner
        : alpha("#808080", 0.15); // Silver for black winner
    }
    return alpha(theme.palette.info.main, 0.15); // Blue for draw
  };

  // Determine text color based on the game result
  const getHeaderColor = () => {
    if (isCheckmate) {
      return winner === "w"
        ? theme.palette.mode === "dark"
          ? "#FFD700" // Gold in dark mode
          : "#B8860B" // DarkGoldenrod in light mode
        : theme.palette.mode === "dark"
        ? "#C0C0C0" // Silver in dark mode
        : "#696969"; // DimGray in light mode
    }
    return theme.palette.info.main; // Blue for draw
  };

  return (
    <DialogTitle
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: getHeaderBackground(),
        p: 2.5,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          color={getHeaderColor()}
          sx={{
            textShadow:
              theme.palette.mode === "dark"
                ? "0 0 10px rgba(255, 255, 255, 0.2)"
                : "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {title}
        </Typography>
      </Box>

      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          backgroundColor: alpha(theme.palette.background.paper, 0.2),
          "&:hover": {
            backgroundColor: alpha(theme.palette.background.paper, 0.3),
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default GameEndHeader;
