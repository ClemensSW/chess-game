// src/components/layout/AppHeader.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Stack,
  Tooltip,
  alpha, // Added this import
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import FlipIcon from "@mui/icons-material/Flip";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import SportEsportsIcon from "@mui/icons-material/SportsEsports";

// Hooks
import { useTheme } from "../../contexts/ThemeContext";
import { useGame } from "../../contexts/GameContext";

const AppHeader = ({
  onDrawerToggle,
  onMenuOpen,
  onOpenTutorial,
  isMobile,
}) => {
  const { mode, toggleTheme } = useTheme();
  const { handleNewGame, handleUndoMove, handleFlipBoard } = useGame();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: (theme) =>
          theme.palette.mode === "dark"
            ? `linear-gradient(90deg, ${alpha(
                theme.palette.primary.dark,
                0.8
              )}, ${alpha(theme.palette.primary.main, 0.6)})`
            : `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(
                theme.palette.primary.dark,
                0.85
              )})`,
        borderBottom: (theme) =>
          `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onDrawerToggle}
          sx={{
            mr: 2,
            borderRadius: 2,
            backgroundColor: alpha("#fff", 0.1),
            "&:hover": {
              backgroundColor: alpha("#fff", 0.2),
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SportEsportsIcon
              sx={{
                mr: 1.5,
                fontSize: 28,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                background:
                  "linear-gradient(90deg, #fff, rgba(255,255,255,0.8))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              ChessMaster Pro
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <Stack direction="row" spacing={0.5} sx={{ mr: 2 }}>
            <Tooltip title="Chess Tutorial">
              <IconButton
                color="inherit"
                onClick={onOpenTutorial}
                size="small"
                sx={{
                  backgroundColor: alpha("#fff", 0.1),
                  "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                }}
              >
                <SchoolIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="New Game">
              <IconButton
                color="inherit"
                onClick={handleNewGame}
                size="small"
                sx={{
                  backgroundColor: alpha("#fff", 0.1),
                  "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Undo Move">
              <IconButton
                color="inherit"
                onClick={handleUndoMove}
                size="small"
                sx={{
                  backgroundColor: alpha("#fff", 0.1),
                  "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                }}
              >
                <UndoIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Flip Board">
              <IconButton
                color="inherit"
                onClick={handleFlipBoard}
                size="small"
                sx={{
                  backgroundColor: alpha("#fff", 0.1),
                  "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                }}
              >
                <FlipIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="More Actions">
              <IconButton
                color="inherit"
                onClick={onMenuOpen}
                aria-controls="action-menu"
                aria-haspopup="true"
                size="small"
                sx={{
                  backgroundColor: alpha("#fff", 0.1),
                  "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                }}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{
              borderRadius: 2,
              backgroundColor: alpha("#fff", 0.1),
              "&:hover": {
                backgroundColor: alpha("#fff", 0.2),
              },
            }}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
