// src/components/settings/shared/OptionCard.jsx
import React from "react";
import { Box, Paper, Typography, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Wiederverwendbare Karten-Komponente für Einstellungsoptionen
 */
const OptionCard = ({
  title,
  description,
  icon,
  selected = false,
  onClick,
  children,
  sx = {},
}) => {
  const theme = useTheme();
  const Icon = icon;

  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 2,
        cursor: onClick ? "pointer" : "default",
        backgroundColor: selected
          ? alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.15 : 0.08
            )
          : alpha(theme.palette.background.paper, 0.6),
        border: `1px solid ${
          selected
            ? theme.palette.primary.main
            : alpha(theme.palette.divider, 0.2)
        }`,
        transition: "all 0.2s ease",
        boxShadow: selected
          ? `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`
          : "none",
        ...sx,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", mb: description ? 1 : 0 }}
      >
        {icon && (
          <Icon
            sx={{
              mr: 1.5,
              color: selected ? theme.palette.primary.main : "text.secondary",
              fontSize: 20,
            }}
          />
        )}
        <Typography
          variant="subtitle2"
          fontWeight={selected ? 700 : 600}
          color={selected ? "primary" : "text.primary"}
        >
          {title}
        </Typography>
      </Box>

      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: icon ? 4 : 0 }}
        >
          {description}
        </Typography>
      )}

      {children && (
        <Box
          sx={{
            mt: 1.5,
            ml: icon ? 4 : 0,
          }}
        >
          {children}
        </Box>
      )}
    </Paper>
  );
};

export default OptionCard;
