// src/components/settings/shared/SettingsSection.jsx
import React from "react";
import { Typography, Box, alpha, useTheme } from "@mui/material";

/**
 * Wiederverwendbare Komponente für Abschnittsüberschriften in den Einstellungen
 */
const SettingsSection = ({ title, icon, children, sx = {} }) => {
  const theme = useTheme();
  const Icon = icon;

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 700,
          mb: 2.5,
          pb: 1,
          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon && <Icon sx={{ mr: 1.5, fontSize: 24 }} />}
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default SettingsSection;
