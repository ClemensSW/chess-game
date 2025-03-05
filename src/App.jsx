// src/App.jsx - Updated with Game Mode Selection
import React, { useState } from "react";
import {
  Container,
  Grid,
  CssBaseline,
  useMediaQuery,
  Box,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Components
import AppHeader from "./components/layout/AppHeader";
import AppDrawer from "./components/layout/AppDrawer";
import ActionMenu from "./components/layout/ActionMenu";
import AppFooter from "./components/layout/AppFooter";
import ChessBoardContainer from "./components/board/ChessBoardContainer";
import SidebarControls from "./components/controls/SidebarControls";
import { GameEndDialog } from "./components/game-end";
import SettingsDialog from "./components/settings/SettingsDialog";
import ChessTutorial from "./components/tutorial/ChessTutorial";
import GameModeSelection from "./components/GameModeSelection"; // Import the new component

// Context Providers
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { GameProvider, useGame } from "./contexts/GameContext";

// Import global styles
import "./styles/index";

function AppContent() {
  const { theme } = useTheme();
  const {
    gameEndState,
    handleCloseGameEnd,
    handleNewGame,
    handleShareGame,
    gameStats,
    appSettings,
    handleApplySettings,
    gameStarted, // Get if game has started from context
  } = useGame();

  // Media queries for responsive layout
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // UI States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  // Drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Action menu handlers
  const handleActionMenuOpen = (event) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(145deg, ${alpha(
                theme.palette.background.default,
                0.97
              )}, ${alpha("#000", 0.95)})`
            : `linear-gradient(145deg, ${alpha(
                theme.palette.background.default,
                0.97
              )}, ${alpha("#f9f9f9", 0.95)})`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Game Mode Selection Overlay - Show when game has not started */}
      <AnimatePresence>{!gameStarted && <GameModeSelection />}</AnimatePresence>

      {/* App Header */}
      <AppHeader
        onDrawerToggle={handleDrawerToggle}
        onMenuOpen={handleActionMenuOpen}
        onOpenTutorial={() => setTutorialOpen(true)}
        isMobile={isMobile}
      />

      {/* Drawer Menu */}
      <AppDrawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenTutorial={() => setTutorialOpen(true)}
      />

      {/* Action Menu */}
      <ActionMenu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
        onOpenSettings={() => {
          setSettingsOpen(true);
          handleActionMenuClose();
        }}
      />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          mt: { xs: 3, md: 5 },
          mb: 4,
        }}
      >
        <Grid container spacing={3}>
          {/* Chess Board */}
          <Grid item xs={12} md={8} lg={8}>
            <ChessBoardContainer isMobile={isMobile} />
          </Grid>

          {/* Sidebar Controls */}
          <Grid item xs={12} md={4} lg={4}>
            <SidebarControls />
          </Grid>
        </Grid>

        {/* Footer */}
        <AppFooter />
      </Container>

      {/* Dialogs */}
      <AnimatePresence>
        {/* Game End Dialog */}
        {gameEndState && (
          <GameEndDialog
            open={!!gameEndState}
            result={gameEndState}
            onNewGame={handleNewGame}
            onClose={handleCloseGameEnd}
            onShare={handleShareGame}
            gameStats={{
              moveCount: gameStats.moveCount,
              gameDuration: gameStats.gameDuration || 0,
              capturedPieces: gameStats.capturedPieces,
              checks: gameStats.checks,
            }}
          />
        )}
      </AnimatePresence>

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onApply={handleApplySettings}
        initialSettings={appSettings}
      />

      {/* Chess Tutorial */}
      <ChessTutorial
        open={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />
    </Box>
  );
}

// Main App component with all providers
function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <NotificationProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
