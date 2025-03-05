// src/components/controls/SidebarControls.jsx
import React from "react";
import { Box } from "@mui/material";

// Components
import ChessTimer from "../ChessTimer/ChessTimer";
import MoveHistory from "../MoveHistory/MoveHistory";

// Hooks
import { useGame } from "../../contexts/GameContext";

const SidebarControls = () => {
  const {
    currentPlayer,
    moves,
    currentMoveIndex,
    handleMoveSelect,
    handleTimeUp,
    getTimerDuration,
    appSettings,
  } = useGame();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <ChessTimer
          activePlayer={currentPlayer}
          initialTime={getTimerDuration()}
          increment={appSettings.timeIncrement}
          onTimeUp={handleTimeUp}
        />
      </Box>

      <Box>
        <MoveHistory
          moves={moves}
          onMoveSelect={handleMoveSelect}
          currentMoveIndex={currentMoveIndex}
        />
      </Box>
    </Box>
  );
};

export default SidebarControls;
