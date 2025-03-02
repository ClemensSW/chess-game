// src/components/SettingsDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Tabs,
  Tab,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  TextField,
  IconButton,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TimerIcon from "@mui/icons-material/Timer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

// Tab-Panel Komponente
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const SettingsDialog = ({ open, onClose, onApply, initialSettings = {} }) => {
  const theme = useTheme();

  // Default-Werte für Einstellungen
  const defaultSettings = {
    // Spiel-Einstellungen
    gameMode: "human", // "human" oder "computer"
    computerDifficulty: 3, // 1-10
    timeControl: "10min", // "3min", "5min", "10min", "15min", "30min"
    timeIncrement: 5, // Sekunden pro Zug

    // Darstellung
    boardTheme: "classic", // "classic", "modern", "wood", "tournament"
    pieceStyle: "standard", // "standard", "modern", "3d", "minimalist"
    boardSize: 2, // 1-3 (klein, mittel, groß)
    animationSpeed: 2, // 1-3 (langsam, mittel, schnell)

    // Benachrichtigungen
    soundEffects: true,
    moveSound: true,
    captureSound: true,
    checkSound: true,
    gameEndSound: true,

    // Barrierefreiheit
    highContrast: false,
    colorBlindMode: false,
    largeText: false,
    showCoordinates: true,
  };

  // Tab-Zustand
  const [tabValue, setTabValue] = useState(0);

  // Einstellungen-Zustand (kombiniert Default mit übergebenen Einstellungen)
  const [settings, setSettings] = useState({
    ...defaultSettings,
    ...initialSettings,
  });

  // Aktualisiere Einstellungen, wenn sich initialSettings ändert
  useEffect(() => {
    setSettings({
      ...defaultSettings,
      ...initialSettings,
    });
  }, [initialSettings]);

  // Tab-Wechsel
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Einstellungen aktualisieren
  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  // Einstellungen anwenden
  const handleApply = () => {
    if (onApply) {
      onApply(settings);
    }
    onClose();
  };

  // Schachbrett-Vorschau basierend auf Thema
  const renderBoardPreview = () => {
    const { boardTheme } = settings;

    // Verschiedene Farben basierend auf gewähltem Theme
    const themes = {
      classic: {
        light: "#F0D9B5",
        dark: "#B58863",
      },
      modern: {
        light: "#EEEED2",
        dark: "#769656",
      },
      wood: {
        light: "#E8C99B",
        dark: "#A77E58",
      },
      tournament: {
        light: "#E6E6E6",
        dark: "#008000",
      },
    };

    const colors = themes[boardTheme] || themes.classic;

    // Erstelle ein kleines 4x4 Schachbrett zur Vorschau
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: "100%",
          aspectRatio: "1",
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {[...Array(16)].map((_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const isDark = (row + col) % 2 === 1;

          return (
            <Box
              key={index}
              sx={{
                backgroundColor: isDark ? colors.dark : colors.light,
                width: "100%",
                height: "100%",
              }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperComponent={motion.div}
      PaperProps={{
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          backgroundImage:
            theme.palette.mode === "dark"
              ? `linear-gradient(${alpha("#1E1E1E", 0.8)}, ${alpha(
                  "#1E1E1E",
                  0.9
                )}), 
               linear-gradient(45deg, ${alpha(
                 theme.palette.primary.dark,
                 0.05
               )}, ${alpha(theme.palette.secondary.dark, 0.05)})`
              : `linear-gradient(${alpha("#FFFFFF", 0.8)}, ${alpha(
                  "#FFFFFF",
                  0.9
                )}), 
               linear-gradient(45deg, ${alpha(
                 theme.palette.primary.light,
                 0.05
               )}, ${alpha(theme.palette.secondary.light, 0.05)})`,
          backgroundSize: "cover",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.divider}`,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SettingsIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          <Typography variant="h5" component="span" fontWeight={600}>
            Einstellungen
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" edge="end">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="settings tabs"
          sx={{
            "& .MuiTab-root": {
              minWidth: "auto",
              py: 1.5,
            },
          }}
        >
          <Tab
            icon={<SettingsIcon />}
            label="Spiel"
            id="settings-tab-0"
            aria-controls="settings-tabpanel-0"
          />
          <Tab
            icon={<ColorLensIcon />}
            label="Darstellung"
            id="settings-tab-1"
            aria-controls="settings-tabpanel-1"
          />
          <Tab
            icon={<NotificationsIcon />}
            label="Benachrichtigungen"
            id="settings-tab-2"
            aria-controls="settings-tabpanel-2"
          />
          <Tab
            icon={<AccessibilityNewIcon />}
            label="Barrierefreiheit"
            id="settings-tab-3"
            aria-controls="settings-tabpanel-3"
          />
        </Tabs>
      </Box>

      <DialogContent sx={{ px: 1, py: 2 }}>
        {/* Spiel-Einstellungen */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="game-mode-label">Spielmodus</InputLabel>
                <Select
                  labelId="game-mode-label"
                  id="game-mode"
                  value={settings.gameMode}
                  onChange={(e) =>
                    handleSettingChange("game", "gameMode", e.target.value)
                  }
                  label="Spielmodus"
                >
                  <MenuItem value="human">Gegen Mensch (lokal)</MenuItem>
                  <MenuItem value="computer">Gegen Computer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {settings.gameMode === "computer" && (
              <Grid item xs={12}>
                <Typography id="difficulty-slider-label" gutterBottom>
                  Computer-Schwierigkeit: {settings.computerDifficulty}
                </Typography>
                <Slider
                  aria-labelledby="difficulty-slider-label"
                  value={settings.computerDifficulty}
                  onChange={(e, val) =>
                    handleSettingChange("game", "computerDifficulty", val)
                  }
                  step={1}
                  marks
                  min={1}
                  max={10}
                  valueLabelDisplay="auto"
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="time-control-label">Zeitkontrolle</InputLabel>
                <Select
                  labelId="time-control-label"
                  id="time-control"
                  value={settings.timeControl}
                  onChange={(e) =>
                    handleSettingChange("game", "timeControl", e.target.value)
                  }
                  label="Zeitkontrolle"
                >
                  <MenuItem value="3min">3 Minuten</MenuItem>
                  <MenuItem value="5min">5 Minuten</MenuItem>
                  <MenuItem value="10min">10 Minuten</MenuItem>
                  <MenuItem value="15min">15 Minuten</MenuItem>
                  <MenuItem value="30min">30 Minuten</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TimerIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography id="increment-slider-label">
                  Inkrement pro Zug: {settings.timeIncrement} Sekunden
                </Typography>
              </Box>
              <Slider
                aria-labelledby="increment-slider-label"
                value={settings.timeIncrement}
                onChange={(e, val) =>
                  handleSettingChange("game", "timeIncrement", val)
                }
                step={1}
                min={0}
                max={15}
                valueLabelDisplay="auto"
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Darstellungs-Einstellungen */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="board-theme-label">Brettdesign</InputLabel>
                <Select
                  labelId="board-theme-label"
                  id="board-theme"
                  value={settings.boardTheme}
                  onChange={(e) =>
                    handleSettingChange("display", "boardTheme", e.target.value)
                  }
                  label="Brettdesign"
                >
                  <MenuItem value="classic">Klassisch (Braun)</MenuItem>
                  <MenuItem value="modern">Modern (Grün)</MenuItem>
                  <MenuItem value="wood">Holz</MenuItem>
                  <MenuItem value="tournament">Turnier (Grün/Weiß)</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mt: 2 }}>{renderBoardPreview()}</Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="piece-style-label">Figurenstil</InputLabel>
                <Select
                  labelId="piece-style-label"
                  id="piece-style"
                  value={settings.pieceStyle}
                  onChange={(e) =>
                    handleSettingChange("display", "pieceStyle", e.target.value)
                  }
                  label="Figurenstil"
                >
                  <MenuItem value="standard">Standard (Unicode)</MenuItem>
                  <MenuItem value="modern">Modern</MenuItem>
                  <MenuItem value="minimalist">Minimalistisch</MenuItem>
                </Select>
              </FormControl>

              <Typography
                id="board-size-slider-label"
                sx={{ mt: 3 }}
                gutterBottom
              >
                Brettgröße
              </Typography>
              <Slider
                aria-labelledby="board-size-slider-label"
                value={settings.boardSize}
                onChange={(e, val) =>
                  handleSettingChange("display", "boardSize", val)
                }
                step={1}
                marks={[
                  { value: 1, label: "Klein" },
                  { value: 2, label: "Mittel" },
                  { value: 3, label: "Groß" },
                ]}
                min={1}
                max={3}
              />

              <Typography
                id="animation-speed-slider-label"
                sx={{ mt: 3 }}
                gutterBottom
              >
                Animationsgeschwindigkeit
              </Typography>
              <Slider
                aria-labelledby="animation-speed-slider-label"
                value={settings.animationSpeed}
                onChange={(e, val) =>
                  handleSettingChange("display", "animationSpeed", val)
                }
                step={1}
                marks={[
                  { value: 1, label: "Langsam" },
                  { value: 2, label: "Mittel" },
                  { value: 3, label: "Schnell" },
                ]}
                min={1}
                max={3}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Benachrichtigungs-Einstellungen */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.soundEffects}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "soundEffects",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Soundeffekte aktivieren"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                disabled={!settings.soundEffects}
                control={
                  <Switch
                    checked={settings.moveSound}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "moveSound",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Zug-Sound"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                disabled={!settings.soundEffects}
                control={
                  <Switch
                    checked={settings.captureSound}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "captureSound",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Schlagzug-Sound"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                disabled={!settings.soundEffects}
                control={
                  <Switch
                    checked={settings.checkSound}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "checkSound",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Schach-Sound"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                disabled={!settings.soundEffects}
                control={
                  <Switch
                    checked={settings.gameEndSound}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "gameEndSound",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Spielende-Sound"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Barrierefreiheit-Einstellungen */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.highContrast}
                    onChange={(e) =>
                      handleSettingChange(
                        "accessibility",
                        "highContrast",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Hoher Kontrast"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.colorBlindMode}
                    onChange={(e) =>
                      handleSettingChange(
                        "accessibility",
                        "colorBlindMode",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Farbenblind-Modus"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.largeText}
                    onChange={(e) =>
                      handleSettingChange(
                        "accessibility",
                        "largeText",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Größere Texte"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.showCoordinates}
                    onChange={(e) =>
                      handleSettingChange(
                        "accessibility",
                        "showCoordinates",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label="Koordinaten anzeigen"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onClose} color="inherit">
          Abbrechen
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          color="primary"
          startIcon={<CheckCircleIcon />}
        >
          Einstellungen übernehmen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
