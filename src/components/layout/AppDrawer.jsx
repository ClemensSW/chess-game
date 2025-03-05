// src/components/layout/AppDrawer.jsx
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  Avatar,
  Paper,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import FlipIcon from "@mui/icons-material/Flip";
import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SportEsportsIcon from "@mui/icons-material/SportsEsports";

// Hooks
import { useTheme } from "../../contexts/ThemeContext";
import { useGame } from "../../contexts/GameContext";

// App version
const APP_VERSION = "2.0.0";

const AppDrawer = ({ open, onClose, onOpenSettings, onOpenTutorial }) => {
  const { mode, toggleTheme } = useTheme();
  const {
    handleNewGame,
    handleUndoMove,
    handleFlipBoard,
    handleSaveGame,
    handleLoadGame,
  } = useGame();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          borderRadius: "0 16px 16px 0",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(145deg, ${alpha(
                  theme.palette.background.paper,
                  0.9
                )}, ${alpha(theme.palette.background.default, 0.95)})`
              : `linear-gradient(145deg, ${alpha("#fff", 0.97)}, ${alpha(
                  theme.palette.background.default,
                  0.95
                )})`,
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: (theme) =>
            `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          background: (theme) => alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              mb: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: (theme) =>
                `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <SportEsportsIcon sx={{ fontSize: 32 }} />
          </Avatar>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            sx={{ mb: 0.5 }}
          >
            ChessMaster Pro
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Typography variant="caption" color="text.secondary">
            Version {APP_VERSION}
          </Typography>
        </motion.div>

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.3),
            "&:hover": {
              backgroundColor: (theme) =>
                alpha(theme.palette.background.paper, 0.5),
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ pl: 1, display: "block", mb: 1 }}
        >
          Game Options
        </Typography>

        <Paper
          component={motion.div}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          elevation={0}
          sx={{
            mb: 2,
            p: 1,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.07),
            borderRadius: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={() => {
              handleNewGame();
              onClose();
            }}
            fullWidth
            sx={{
              mb: 1,
              borderRadius: 1.5,
              py: 1,
              boxShadow: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(
                  theme.palette.primary.dark,
                  0.8
                )})`,
            }}
          >
            New Game
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<UndoIcon />}
              onClick={() => {
                handleUndoMove();
                onClose();
              }}
              fullWidth
              sx={{ borderRadius: 1.5 }}
            >
              Undo
            </Button>
            <Button
              variant="outlined"
              startIcon={<FlipIcon />}
              onClick={() => {
                handleFlipBoard();
                onClose();
              }}
              fullWidth
              sx={{ borderRadius: 1.5 }}
            >
              Flip
            </Button>
          </Stack>
        </Paper>

        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ pl: 1, display: "block", mb: 1 }}
        >
          Game State
        </Typography>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => {
                handleSaveGame();
                onClose();
              }}
              fullWidth
              sx={{
                borderRadius: 1.5,
                justifyContent: "flex-start",
                px: 2,
                py: 1,
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.paper, 0.4),
              }}
            >
              Save Game
            </Button>

            <Button
              variant="outlined"
              startIcon={<FileOpenIcon />}
              onClick={() => {
                handleLoadGame();
                onClose();
              }}
              fullWidth
              sx={{
                borderRadius: 1.5,
                justifyContent: "flex-start",
                px: 2,
                py: 1,
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.paper, 0.4),
              }}
            >
              Load Game
            </Button>
          </Stack>
        </motion.div>
      </Box>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ pl: 1, display: "block", mb: 1 }}
        >
          Settings & Help
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Stack spacing={0.5}>
            <Button
              variant="text"
              startIcon={<SchoolIcon />}
              onClick={() => {
                onOpenTutorial();
                onClose();
              }}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                borderRadius: 1.5,
              }}
            >
              Chess Tutorial
            </Button>

            <Button
              variant="text"
              startIcon={
                mode === "light" ? <DarkModeIcon /> : <LightModeIcon />
              }
              onClick={() => {
                toggleTheme();
                onClose();
              }}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                borderRadius: 1.5,
              }}
            >
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>

            <Button
              variant="text"
              startIcon={<SettingsIcon />}
              onClick={() => {
                onOpenSettings();
                onClose();
              }}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                borderRadius: 1.5,
              }}
            >
              Settings
            </Button>

            <Button
              variant="text"
              startIcon={<HelpOutlineIcon />}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                borderRadius: 1.5,
              }}
            >
              Help & Support
            </Button>
          </Stack>
        </motion.div>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        sx={{
          p: 2,
          mt: "auto",
          borderTop: (theme) =>
            `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          textAlign: "center",
        }}
      >
        <Button
          variant="text"
          size="small"
          startIcon={<PersonOutlineIcon />}
          sx={{ mb: 1, borderRadius: 4, textTransform: "none" }}
        >
          Profile & Account
        </Button>

        <Typography variant="caption" color="text.secondary" display="block">
          © {new Date().getFullYear()} ChessMaster Pro
        </Typography>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
