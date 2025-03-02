// src/components/SettingsDialog.jsx - Modernisierte Version
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
  IconButton,
  Grid,
  useTheme,
  alpha,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TimerIcon from "@mui/icons-material/Timer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WidgetsIcon from "@mui/icons-material/Widgets";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ComputerIcon from "@mui/icons-material/Computer";
import SpeedIcon from "@mui/icons-material/Speed";
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
      style={{ height: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 0, height: "100%", overflow: "auto" }}>{children}</Box>
      )}
    </div>
  );
};

// Angepasster Slider mit besserer Lesbarkeit
const StyledSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  marks,
  label,
  icon,
  discrete = false,
  sx = {},
}) => {
  const theme = useTheme();

  const SliderIcon = icon;

  return (
    <Box sx={{ mt: 3, ...sx }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon && (
            <SliderIcon
              sx={{
                mr: 1.5,
                color:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.9)
                    : theme.palette.primary.main,
              }}
            />
          )}
          <Typography variant="subtitle2" fontWeight={500} color="text.primary">
            {label}
            {!discrete && (
              <Typography
                component="span"
                variant="body2"
                fontWeight={600}
                sx={{ ml: 1, color: theme.palette.primary.main }}
              >
                {value}
              </Typography>
            )}
          </Typography>
        </Box>
        {discrete && (
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: theme.palette.primary.main }}
          >
            {value}
          </Typography>
        )}
      </Box>
      <Slider
        value={value}
        onChange={onChange}
        step={step}
        marks={marks}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        sx={{
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.2)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${alpha(
                theme.palette.primary.main,
                0.16
              )}`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
    </Box>
  );
};

// Schaltflächegruppe für Optionen
const OptionButtonGroup = ({
  options,
  value,
  onChange,
  label,
  icon,
  getOptionLabel = (option) => option.label,
}) => {
  const theme = useTheme();

  const IconComponent = icon;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        {icon && (
          <IconComponent sx={{ mr: 1.5, color: theme.palette.primary.main }} />
        )}
        <Typography variant="subtitle2" fontWeight={500} color="text.primary">
          {label}
        </Typography>
      </Box>

      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {options.map((option) => (
          <Paper
            key={option.value}
            component={FormControlLabel}
            value={option.value}
            sx={{
              m: 0,
              p: 0,
              borderRadius: 2,
              overflow: "hidden",
              border: `1px solid ${
                value === option.value
                  ? theme.palette.primary.main
                  : alpha(theme.palette.divider, 0.5)
              }`,
              backgroundColor:
                value === option.value
                  ? alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === "dark" ? 0.15 : 0.08
                    )
                  : alpha(theme.palette.background.paper, 0.6),
              "&:hover": {
                backgroundColor:
                  value === option.value
                    ? alpha(
                        theme.palette.primary.main,
                        theme.palette.mode === "dark" ? 0.2 : 0.12
                      )
                    : alpha(theme.palette.background.paper, 0.8),
              },
              flex: option.fullWidth ? "1 0 100%" : "0 0 calc(50% - 4px)",
              transition: "all 0.2s ease",
            }}
            control={
              <Radio
                sx={{
                  p: 1,
                  color:
                    value === option.value
                      ? theme.palette.primary.main
                      : undefined,
                }}
              />
            }
            label={
              <Box
                sx={{
                  py: 0.5,
                  pr: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {option.icon && (
                  <Box
                    component={option.icon}
                    sx={{
                      mr: 1,
                      fontSize: "1.25rem",
                      color:
                        value === option.value
                          ? theme.palette.primary.main
                          : "text.secondary",
                    }}
                  />
                )}
                <Typography
                  variant="body2"
                  fontWeight={value === option.value ? 600 : 400}
                  color={value === option.value ? "primary" : "text.primary"}
                >
                  {getOptionLabel(option)}
                </Typography>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

// Hauptkomponente für das Settings-Dialog
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
    boardTheme: "modern", // "classic", "modern", "wood", "tournament"
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

  // Schwierigkeitsgrad-Text
  const getDifficultyLabel = (value) => {
    const levels = {
      1: "Sehr leicht",
      2: "Leicht",
      3: "Anfänger",
      4: "Mittel",
      5: "Fortgeschritten",
      6: "Schwer",
      7: "Sehr schwer",
      8: "Experte",
      9: "Meister",
      10: "Großmeister",
    };
    return levels[value] || `Stufe ${value}`;
  };

  // Zeitkontrollen-Optionen
  const timeControlOptions = [
    { value: "3min", label: "3 Min", icon: TimerIcon },
    { value: "5min", label: "5 Min", icon: TimerIcon },
    { value: "10min", label: "10 Min", icon: TimerIcon },
    { value: "15min", label: "15 Min", icon: TimerIcon },
    { value: "30min", label: "30 Min", icon: TimerIcon },
  ];

  // Board-Themen-Optionen
  const boardThemeOptions = [
    {
      value: "classic",
      label: "Klassisch",
      description: "Traditionelles braunes Schachbrett",
    },
    { value: "modern", label: "Modern", description: "Frisches grünes Design" },
    { value: "wood", label: "Holz", description: "Natürliches Holzdesign" },
    {
      value: "tournament",
      label: "Turnier",
      description: "Professionelles Turnierdesign",
    },
  ];

  // Figurenstil-Optionen
  const pieceStyleOptions = [
    { value: "standard", label: "Standard", description: "Klassische Figuren" },
    {
      value: "modern",
      label: "Modern",
      description: "Klare, moderne Darstellung",
    },
    {
      value: "minimalist",
      label: "Minimalistisch",
      description: "Einfache Buchstabendarstellung",
    },
  ];

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

    const colors = themes[boardTheme] || themes.modern;

    // Erstelle ein kleines 4x4 Schachbrett zur Vorschau
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            width: "100%",
            aspectRatio: "1",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 4px 20px rgba(0,0,0,0.3)`
                : `0 4px 20px rgba(0,0,0,0.15)`,
          }}
        >
          {[...Array(64)].map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const isDark = (row + col) % 2 === 1;

            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: isDark ? colors.dark : colors.light,
                  width: "100%",
                  height: "100%",
                  transition: "background-color 0.3s ease",
                }}
              />
            );
          })}
        </Box>
      </motion.div>
    );
  };

  // Brettgröße anzeigen
  const getBoardSizeLabel = (value) => {
    switch (value) {
      case 1:
        return "Klein";
      case 2:
        return "Mittel";
      case 3:
        return "Groß";
      default:
        return "Mittel";
    }
  };

  // Animationsgeschwindigkeit anzeigen
  const getAnimationSpeedLabel = (value) => {
    switch (value) {
      case 1:
        return "Langsam";
      case 2:
        return "Mittel";
      case 3:
        return "Schnell";
      default:
        return "Mittel";
    }
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
          borderRadius: 3,
          overflow: "hidden",
          backgroundImage:
            theme.palette.mode === "dark"
              ? `linear-gradient(to bottom right, ${alpha(
                  theme.palette.background.paper,
                  0.9
                )}, ${alpha(theme.palette.background.default, 0.95)})`
              : `linear-gradient(to bottom right, ${alpha(
                  "#fff",
                  0.97
                )}, ${alpha(theme.palette.background.default, 0.95)})`,
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 40px rgba(0,0,0,0.5)"
              : "0 10px 40px rgba(0,0,0,0.15)",
          height: "80vh",
          maxHeight: "750px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.dark,
                  0.2
                )}, transparent)`
              : `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.2
                )}, transparent)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SettingsIcon
            sx={{
              mr: 2,
              color: theme.palette.primary.main,
              fontSize: 28,
              filter: `drop-shadow(0 2px 4px ${alpha(
                theme.palette.primary.main,
                0.4
              )})`,
            }}
          />
          <Typography
            variant="h5"
            component="span"
            fontWeight={700}
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                  : `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Spieleinstellungen
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="large"
          edge="end"
          sx={{
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.3),
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box
        sx={{
          display: "flex",
          height: "calc(100% - 144px)", // Header + Footer Höhe abziehen
        }}
      >
        <Box
          sx={{
            width: { xs: 70, sm: 180 },
            bgcolor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.4)
                : alpha(theme.palette.background.paper, 0.6),
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="settings tabs"
            sx={{
              height: "100%",
              "& .MuiTabs-indicator": {
                right: "auto",
                left: 0,
                width: 3,
                borderRadius: "0 4px 4px 0",
              },
              "& .MuiTab-root": {
                minWidth: "auto",
                minHeight: 64,
                p: { xs: 2, sm: 3 },
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: { xs: "center", sm: "flex-start" },
                borderRadius: "0 8px 8px 0",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                },
              },
            }}
          >
            <Tab
              icon={<SettingsIcon />}
              label={
                <Box sx={{ display: { xs: "none", sm: "block" } }}>Spiel</Box>
              }
              id="settings-tab-0"
              aria-controls="settings-tabpanel-0"
              iconPosition="start"
            />
            <Tab
              icon={<ColorLensIcon />}
              label={
                <Box sx={{ display: { xs: "none", sm: "block" } }}>Design</Box>
              }
              id="settings-tab-1"
              aria-controls="settings-tabpanel-1"
              iconPosition="start"
            />
            <Tab
              icon={<VolumeUpIcon />}
              label={
                <Box sx={{ display: { xs: "none", sm: "block" } }}>Sound</Box>
              }
              id="settings-tab-2"
              aria-controls="settings-tabpanel-2"
              iconPosition="start"
            />
            <Tab
              icon={<AccessibilityNewIcon />}
              label={
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  Zugänglichkeit
                </Box>
              }
              id="settings-tab-3"
              aria-controls="settings-tabpanel-3"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <DialogContent
          sx={{
            p: 0,
            overflow: "hidden",
            width: { xs: "calc(100% - 70px)", sm: "calc(100% - 180px)" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Spiel-Einstellungen */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight={600}
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <WidgetsIcon
                    sx={{ mr: 1.5, color: theme.palette.primary.main }}
                  />
                  Spielmodus & Zeitkontrolle
                </Typography>

                <Card
                  elevation={0}
                  sx={{
                    mb: 4,
                    background: alpha(theme.palette.background.paper, 0.4),
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    overflow: "visible",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <OptionButtonGroup
                      options={[
                        {
                          value: "human",
                          label: "Gegen Mensch",
                          icon: PersonIcon,
                          fullWidth: true,
                        },
                        {
                          value: "computer",
                          label: "Gegen Computer",
                          icon: ComputerIcon,
                          fullWidth: true,
                        },
                      ]}
                      value={settings.gameMode}
                      onChange={(value) =>
                        handleSettingChange("game", "gameMode", value)
                      }
                      label="Spielmodus"
                      icon={SettingsIcon}
                    />

                    {settings.gameMode === "computer" && (
                      <Box sx={{ mt: 4, mb: 2 }}>
                        <StyledSlider
                          value={settings.computerDifficulty}
                          onChange={(e, val) =>
                            handleSettingChange(
                              "game",
                              "computerDifficulty",
                              val
                            )
                          }
                          step={1}
                          marks={[
                            { value: 1, label: "Anfänger" },
                            { value: 5, label: "Mittel" },
                            { value: 10, label: "Profi" },
                          ]}
                          min={1}
                          max={10}
                          label={`Computer-Schwierigkeit: ${getDifficultyLabel(
                            settings.computerDifficulty
                          )}`}
                          icon={SpeedIcon}
                        />
                      </Box>
                    )}

                    <Box sx={{ mt: 4 }}>
                      <OptionButtonGroup
                        options={timeControlOptions}
                        value={settings.timeControl}
                        onChange={(value) =>
                          handleSettingChange("game", "timeControl", value)
                        }
                        label="Zeitkontrolle pro Spieler"
                        icon={TimerIcon}
                      />
                    </Box>

                    <StyledSlider
                      value={settings.timeIncrement}
                      onChange={(e, val) =>
                        handleSettingChange("game", "timeIncrement", val)
                      }
                      step={1}
                      min={0}
                      max={15}
                      label={`Zusatzzeit pro Zug: ${settings.timeIncrement} Sekunden`}
                      icon={TimerIcon}
                      sx={{ mt: 4, mb: 1 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </TabPanel>

          {/* Darstellungs-Einstellungen */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight={600}
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ColorLensIcon
                    sx={{ mr: 1.5, color: theme.palette.primary.main }}
                  />
                  Brett- & Figurendesign
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={0}
                      sx={{
                        mb: { xs: 2, md: 0 },
                        height: "100%",
                        background: alpha(theme.palette.background.paper, 0.4),
                        borderRadius: 3,
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                          sx={{ mb: 2, display: "flex", alignItems: "center" }}
                        >
                          <ColorLensIcon
                            sx={{
                              mr: 1,
                              fontSize: "1.2rem",
                              color: theme.palette.primary.main,
                            }}
                          />
                          Brettdesign
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                          <Stack spacing={2}>
                            {boardThemeOptions.map((option) => (
                              <Paper
                                key={option.value}
                                elevation={0}
                                onClick={() =>
                                  handleSettingChange(
                                    "display",
                                    "boardTheme",
                                    option.value
                                  )
                                }
                                sx={{
                                  p: 2,
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  border: `1px solid ${
                                    settings.boardTheme === option.value
                                      ? theme.palette.primary.main
                                      : alpha(theme.palette.divider, 0.2)
                                  }`,
                                  backgroundColor:
                                    settings.boardTheme === option.value
                                      ? alpha(
                                          theme.palette.primary.main,
                                          theme.palette.mode === "dark"
                                            ? 0.15
                                            : 0.08
                                        )
                                      : alpha(
                                          theme.palette.background.paper,
                                          0.5
                                        ),
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor:
                                      settings.boardTheme === option.value
                                        ? alpha(
                                            theme.palette.primary.main,
                                            theme.palette.mode === "dark"
                                              ? 0.2
                                              : 0.12
                                          )
                                        : alpha(
                                            theme.palette.background.paper,
                                            0.8
                                          ),
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                  },
                                }}
                              >
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Radio
                                    checked={
                                      settings.boardTheme === option.value
                                    }
                                    onChange={() => {}}
                                    sx={{
                                      p: 0,
                                      mr: 1.5,
                                      color:
                                        settings.boardTheme === option.value
                                          ? theme.palette.primary.main
                                          : undefined,
                                    }}
                                  />
                                  <Box>
                                    <Typography
                                      variant="subtitle2"
                                      fontWeight={
                                        settings.boardTheme === option.value
                                          ? 600
                                          : 500
                                      }
                                      color={
                                        settings.boardTheme === option.value
                                          ? "primary"
                                          : "text.primary"
                                      }
                                    >
                                      {option.label}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {option.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Paper>
                            ))}
                          </Stack>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={0}
                      sx={{
                        background: alpha(theme.palette.background.paper, 0.4),
                        borderRadius: 3,
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                          sx={{ mb: 3, display: "flex", alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              mr: 1,
                              fontSize: "1.2rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            ♟
                          </Box>
                          Brettvorschau
                        </Typography>

                        {renderBoardPreview()}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Card
                  elevation={0}
                  sx={{
                    mt: 3,
                    background: alpha(theme.palette.background.paper, 0.4),
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                          sx={{ mb: 2, display: "flex", alignItems: "center" }}
                        >
                          <WidgetsIcon
                            sx={{
                              mr: 1,
                              fontSize: "1.2rem",
                              color: theme.palette.primary.main,
                            }}
                          />
                          Figurenstil
                        </Typography>

                        <Stack spacing={1.5}>
                          {pieceStyleOptions.map((option) => (
                            <Paper
                              key={option.value}
                              elevation={0}
                              onClick={() =>
                                handleSettingChange(
                                  "display",
                                  "pieceStyle",
                                  option.value
                                )
                              }
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: "pointer",
                                border: `1px solid ${
                                  settings.pieceStyle === option.value
                                    ? theme.palette.primary.main
                                    : alpha(theme.palette.divider, 0.2)
                                }`,
                                backgroundColor:
                                  settings.pieceStyle === option.value
                                    ? alpha(
                                        theme.palette.primary.main,
                                        theme.palette.mode === "dark"
                                          ? 0.15
                                          : 0.08
                                      )
                                    : alpha(
                                        theme.palette.background.paper,
                                        0.5
                                      ),
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor:
                                    settings.pieceStyle === option.value
                                      ? alpha(
                                          theme.palette.primary.main,
                                          theme.palette.mode === "dark"
                                            ? 0.2
                                            : 0.12
                                        )
                                      : alpha(
                                          theme.palette.background.paper,
                                          0.8
                                        ),
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                },
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Radio
                                checked={settings.pieceStyle === option.value}
                                onChange={() => {}}
                                sx={{
                                  p: 0,
                                  mr: 1.5,
                                  color:
                                    settings.pieceStyle === option.value
                                      ? theme.palette.primary.main
                                      : undefined,
                                }}
                              />
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={
                                    settings.pieceStyle === option.value
                                      ? 600
                                      : 500
                                  }
                                  color={
                                    settings.pieceStyle === option.value
                                      ? "primary"
                                      : "text.primary"
                                  }
                                >
                                  {option.label}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {option.description}
                                </Typography>
                              </Box>
                            </Paper>
                          ))}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <StyledSlider
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
                            label={`Brettgröße: ${getBoardSizeLabel(
                              settings.boardSize
                            )}`}
                            icon={WidgetsIcon}
                            discrete={true}
                          />
                        </Box>

                        <StyledSlider
                          value={settings.animationSpeed}
                          onChange={(e, val) =>
                            handleSettingChange(
                              "display",
                              "animationSpeed",
                              val
                            )
                          }
                          step={1}
                          marks={[
                            { value: 1, label: "Langsam" },
                            { value: 2, label: "Mittel" },
                            { value: 3, label: "Schnell" },
                          ]}
                          min={1}
                          max={3}
                          label={`Animationsgeschwindigkeit: ${getAnimationSpeedLabel(
                            settings.animationSpeed
                          )}`}
                          icon={SpeedIcon}
                          discrete={true}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </TabPanel>

          {/* Sound-Einstellungen */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight={600}
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <VolumeUpIcon
                    sx={{ mr: 1.5, color: theme.palette.primary.main }}
                  />
                  Soundeffekte
                </Typography>

                <Card
                  elevation={0}
                  sx={{
                    mb: 4,
                    background: alpha(theme.palette.background.paper, 0.4),
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
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
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: theme.palette.primary.main,
                              },
                          }}
                        />
                      }
                      label={
                        <Typography variant="subtitle1" fontWeight={500}>
                          Soundeffekte aktivieren
                        </Typography>
                      }
                      sx={{ mb: 2 }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        ml: 2.5,
                        pb: 2,
                        borderBottom: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                      }}
                    >
                      Aktiviere oder deaktiviere alle Spielsounds
                    </Typography>

                    <Grid container spacing={2}>
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
                          label={
                            <Typography
                              variant="body1"
                              color={
                                settings.soundEffects
                                  ? "text.primary"
                                  : "text.disabled"
                              }
                            >
                              Zug-Sound
                            </Typography>
                          }
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
                          label={
                            <Typography
                              variant="body1"
                              color={
                                settings.soundEffects
                                  ? "text.primary"
                                  : "text.disabled"
                              }
                            >
                              Schlagzug-Sound
                            </Typography>
                          }
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
                          label={
                            <Typography
                              variant="body1"
                              color={
                                settings.soundEffects
                                  ? "text.primary"
                                  : "text.disabled"
                              }
                            >
                              Schach-Sound
                            </Typography>
                          }
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
                          label={
                            <Typography
                              variant="body1"
                              color={
                                settings.soundEffects
                                  ? "text.primary"
                                  : "text.disabled"
                              }
                            >
                              Spielende-Sound
                            </Typography>
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </TabPanel>

          {/* Barrierefreiheit-Einstellungen */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight={600}
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessibilityNewIcon
                    sx={{ mr: 1.5, color: theme.palette.primary.main }}
                  />
                  Barrierefreiheit & Lesbarkeit
                </Typography>

                <Card
                  elevation={0}
                  sx={{
                    mb: 4,
                    background: alpha(theme.palette.background.paper, 0.4),
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: settings.highContrast
                              ? alpha(
                                  theme.palette.primary.main,
                                  theme.palette.mode === "dark" ? 0.15 : 0.08
                                )
                              : alpha(theme.palette.background.paper, 0.5),
                            border: `1px solid ${
                              settings.highContrast
                                ? theme.palette.primary.main
                                : alpha(theme.palette.divider, 0.2)
                            }`,
                            mb: 2,
                          }}
                        >
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
                            label={
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={500}
                                >
                                  Hoher Kontrast
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Verbessert die Sichtbarkeit durch stärkere
                                  Farbkontraste
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: settings.colorBlindMode
                              ? alpha(
                                  theme.palette.primary.main,
                                  theme.palette.mode === "dark" ? 0.15 : 0.08
                                )
                              : alpha(theme.palette.background.paper, 0.5),
                            border: `1px solid ${
                              settings.colorBlindMode
                                ? theme.palette.primary.main
                                : alpha(theme.palette.divider, 0.2)
                            }`,
                          }}
                        >
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
                            label={
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={500}
                                >
                                  Farbenblind-Modus
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Verwendet farbenblindfreundliche Farbpaletten
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: settings.largeText
                              ? alpha(
                                  theme.palette.primary.main,
                                  theme.palette.mode === "dark" ? 0.15 : 0.08
                                )
                              : alpha(theme.palette.background.paper, 0.5),
                            border: `1px solid ${
                              settings.largeText
                                ? theme.palette.primary.main
                                : alpha(theme.palette.divider, 0.2)
                            }`,
                            mb: 2,
                          }}
                        >
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
                            label={
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={500}
                                >
                                  Größere Texte
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Erhöht die Textgröße für bessere Lesbarkeit
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: settings.showCoordinates
                              ? alpha(
                                  theme.palette.primary.main,
                                  theme.palette.mode === "dark" ? 0.15 : 0.08
                                )
                              : alpha(theme.palette.background.paper, 0.5),
                            border: `1px solid ${
                              settings.showCoordinates
                                ? theme.palette.primary.main
                                : alpha(theme.palette.divider, 0.2)
                            }`,
                          }}
                        >
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
                            label={
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={500}
                                >
                                  Koordinaten anzeigen
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Zeigt Buchstaben und Zahlen auf dem
                                  Schachbrett an
                                </Typography>
                              </Box>
                            }
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: alpha(
                      theme.palette.info.main,
                      theme.palette.mode === "dark" ? 0.15 : 0.08
                    ),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <HelpOutlineIcon
                    sx={{ mr: 2, color: theme.palette.info.main, mt: 0.5 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      gutterBottom
                    >
                      Tip zur Barrierefreiheit
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Kombinieren Sie den Hochkontrastmodus mit größeren Texten
                      für die beste Lesbarkeit. Der Farbenblind-Modus ist
                      besonders hilfreich für Personen mit Rot-Grün-Schwäche.
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </TabPanel>
        </DialogContent>
      </Box>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: "flex",
          justifyContent: "space-between",
          bgcolor: alpha(theme.palette.background.paper, 0.3),
        }}
      >
        <Button
          onClick={onClose}
          color="inherit"
          size="large"
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 500,
          }}
        >
          Abbrechen
        </Button>

        <Button
          onClick={handleApply}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CheckCircleIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
          }}
        >
          Einstellungen übernehmen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Definiere ein PersonIcon für die Verwendung in OptionButtonGroup
const PersonIcon = ({ sx }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ ...sx }}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default SettingsDialog;
