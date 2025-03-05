// src/components/board/ChessBoardContainer.jsx
import React from "react";
import { Box, Paper, IconButton, Tooltip, alpha } from "@mui/material";
import { motion } from "framer-motion";

// Components
import ChessBoard from "../ChessBoard";

// Icons
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import FlipIcon from "@mui/icons-material/Flip";
import SaveIcon from "@mui/icons-material/Save";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

// Hooks
import { useGame } from "../../contexts/GameContext";

const ChessBoardContainer = ({ isMobile }) => {
  const {
    boardRef,
    handleMoveChange,
    handleGameEnd,
    appSettings,
    handleNewGame,
    handleUndoMove,
    handleFlipBoard,
    handleSaveGame,
    handleLoadGame,
  } = useGame();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ChessBoard
        onMoveChange={handleMoveChange}
        boardRef={boardRef}
        onGameEnd={handleGameEnd}
        settings={appSettings}
      />

      {/* Mobile Controls - Only show on small screens */}
      {isMobile && (
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          elevation={1}
          sx={{
            mt: 2,
            width: "94vw",
            p: 1.5,
            display: "flex",
            justifyContent: "space-around",
            borderRadius: 3,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
          }}
        >
          <Tooltip title="New Game">
            <IconButton
              color="primary"
              onClick={handleNewGame}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Undo Move">
            <IconButton
              color="secondary"
              onClick={handleUndoMove}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.secondary.main, 0.1),
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.secondary.main, 0.2),
                },
              }}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Flip Board">
            <IconButton
              onClick={handleFlipBoard}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.text.primary, 0.05),
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.text.primary, 0.1),
                },
              }}
            >
              <FlipIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Save Game">
            <IconButton
              onClick={handleSaveGame}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.success.main, 0.1),
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.success.main, 0.2),
                },
              }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Load Game">
            <IconButton
              onClick={handleLoadGame}
              sx={{
                backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.info.main, 0.2),
                },
              }}
            >
              <FolderOpenIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      )}
    </Box>
  );
};

export default ChessBoardContainer;
