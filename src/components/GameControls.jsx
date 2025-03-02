// src/components/GameControls.jsx - Verbesserte Version
import React, { useState } from "react";
import {
  Button,
  Stack,
  Paper,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const GameControls = ({ onNewGame, onUndoMove, onSaveGame, onLoadGame }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gameMode, setGameMode] = useState("human"); // 'human' oder 'computer'
  const [difficulty, setDifficulty] = useState(3); // 1-10
  const [timeControl, setTimeControl] = useState("10min"); // Zeit pro Spieler

  // Settings Dialog öffnen/schließen
  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  // Spieleinstellungen anwenden
  const handleApplySettings = () => {
    // Hier die Einstellungen an die übergeordnete Komponente zurückgeben
    onNewGame({ gameMode, difficulty, timeControl });
    setSettingsOpen(false);
  };

  // Zeit-Optionen in Sekunden umrechnen
  const getTimeInSeconds = (timeOption) => {
    switch (timeOption) {
      case "3min":
        return 180;
      case "5min":
        return 300;
      case "10min":
        return 600;
      case "15min":
        return 900;
      case "30min":
        return 1800;
      default:
        return 600;
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e2023" : "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6">Spielsteuerung</Typography>

          <Tooltip title="Spieleinstellungen">
            <IconButton size="small" onClick={handleOpenSettings}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onNewGame && onNewGame()}
              startIcon={<RefreshIcon />}
              fullWidth
            >
              Neues Spiel
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onUndoMove && onUndoMove()}
              startIcon={<UndoIcon />}
              fullWidth
            >
              Rückgängig
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={() => onSaveGame && onSaveGame()}
              startIcon={<SaveIcon />}
              fullWidth
            >
              Speichern
            </Button>

            <Button
              variant="outlined"
              onClick={() => onLoadGame && onLoadGame()}
              startIcon={<FileOpenIcon />}
              fullWidth
            >
              Laden
            </Button>
          </Stack>
        </Stack>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Modus: {gameMode === "human" ? "Gegen Mensch" : "Gegen Computer"}
            {gameMode === "computer" && ` (Stufe ${difficulty})`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zeit: {timeControl}
          </Typography>
        </Box>
      </Paper>

      {/* Einstellungen Dialog */}
      <Dialog open={settingsOpen} onClose={handleCloseSettings}>
        <DialogTitle>Spieleinstellungen</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Spielmodus</InputLabel>
            <Select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
              label="Spielmodus"
            >
              <MenuItem value="human">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ mr: 1 }} /> Gegen Mensch
                </Box>
              </MenuItem>
              <MenuItem value="computer">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SmartToyIcon sx={{ mr: 1 }} /> Gegen Computer
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {gameMode === "computer" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Schwierigkeitsgrad</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                label="Schwierigkeitsgrad"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <MenuItem key={level} value={level}>
                    Stufe {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Zeitkontrolle</InputLabel>
            <Select
              value={timeControl}
              onChange={(e) => setTimeControl(e.target.value)}
              label="Zeitkontrolle"
            >
              <MenuItem value="3min">3 Minuten</MenuItem>
              <MenuItem value="5min">5 Minuten</MenuItem>
              <MenuItem value="10min">10 Minuten</MenuItem>
              <MenuItem value="15min">15 Minuten</MenuItem>
              <MenuItem value="30min">30 Minuten</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings}>Abbrechen</Button>
          <Button
            onClick={handleApplySettings}
            variant="contained"
            color="primary"
          >
            Anwenden
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GameControls;
