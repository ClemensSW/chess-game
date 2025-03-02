// src/components/settings/SettingsHeader.jsx
import React from "react";
import {
  DialogTitle,
  Box,
  Typography,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Dialog-Header für die Einstellungen
 */
const SettingsHeader = ({ onClose }) => {
  const theme = useTheme();

  return (
    <DialogTitle
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(90deg, ${alpha(
                theme.palette.primary.dark,
                0.2
              )}, transparent)`
            : `linear-gradient(90deg, ${alpha(
                theme.palette.primary.light,
                0.2
              )}, transparent)`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SettingsIcon
          sx={{
            mr: 2,
            color: theme.palette.primary.main,
            fontSize: 28,
            filter: `drop-shadow(0 2px 4px ${alpha(
              theme.palette.primary.main,
              0.4
            )})`,
          }}
        />
        <Typography
          variant="h5"
          component="span"
          fontWeight={700}
          sx={{
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                : `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Spieleinstellungen
        </Typography>
      </Box>
      <IconButton
        onClick={onClose}
        size="large"
        edge="end"
        sx={{
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.3),
          "&:hover": {
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default SettingsHeader;
