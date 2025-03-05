// src/components/layout/AppFooter.jsx
import React from "react";
import { Box, Paper, Typography, IconButton, alpha } from "@mui/material";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";

// App version
const APP_VERSION = "2.0.0";

const AppFooter = () => {
  return (
    <Box
      component={Paper}
      elevation={0}
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.6),
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        ChessMaster Pro v{APP_VERSION} | © {new Date().getFullYear()} Chess
        Solutions GmbH
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <GitHubIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <InfoIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AppFooter;
