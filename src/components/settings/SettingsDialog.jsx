// src/components/settings/SettingsDialog.jsx - Updated Version
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  alpha,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Import settings sections
import SettingsGameOptions from "./SettingsGameOptions";
import SettingsDisplayOptions from "./SettingsDisplayOptions";
import SettingsSoundOptions from "./SettingsSoundOptions";
import SettingsAccessibility from "./SettingsAccessibility";

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
        <Box sx={{ height: "100%", overflow: "auto" }}>{children}</Box>
      )}
    </div>
  );
};

// Hauptkomponente für das Settings-Dialog
const SettingsDialog = ({ open, onClose, onApply, initialSettings = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  // Tab-Konfiguration
  const tabs = [
    {
      label: "Spiel",
      icon: SettingsIcon,
      component: SettingsGameOptions,
    },
    {
      label: "Design",
      icon: ColorLensIcon,
      component: SettingsDisplayOptions,
    },
    {
      label: "Sound",
      icon: VolumeUpIcon,
      component: SettingsSoundOptions,
    },
    {
      label: "Zugänglichkeit",
      icon: AccessibilityNewIcon,
      component: SettingsAccessibility,
    },
  ];

  // Funktion zum Rendern des Icons
  const getIconComponent = (Icon) => <Icon />;

  // Mobile-Navigation rendern
  const renderMobileNavigation = () => (
    <Box
      sx={{
        overflowX: "auto",
        width: "100%",
        display: "flex",
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        px: 1,
      }}
    >
      {tabs.map((tab, index) => (
        <Box
          key={tab.label}
          onClick={() => setTabValue(index)}
          sx={{
            py: 1.5,
            px: 2,
            minWidth: "auto",
            textAlign: "center",
            cursor: "pointer",
            borderBottom: `3px solid ${
              tabValue === index ? theme.palette.primary.main : "transparent"
            }`,
            transition: "all 0.2s ease",
            opacity: tabValue === index ? 1 : 0.7,
            "&:hover": {
              opacity: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              mx: "auto",
              mb: 0.5,
              bgcolor:
                tabValue === index
                  ? theme.palette.primary.main
                  : alpha(theme.palette.text.primary, 0.2),
              "& .MuiSvgIcon-root": {
                fontSize: 20,
              },
            }}
          >
            {getIconComponent(tab.icon)}
          </Avatar>
          <Typography
            variant="caption"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: tabValue === index ? 600 : 400,
              color: tabValue === index ? "primary.main" : "text.secondary",
              fontSize: "0.7rem",
            }}
          >
            {tab.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  // Desktop-Navigation rendern
  const renderDesktopNavigation = () => (
    <Box
      sx={{
        width: { xs: 70, sm: 180 },
        bgcolor: alpha(theme.palette.background.paper, 0.4),
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
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label}
            icon={<tab.icon />}
            label={
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {tab.label}
              </Box>
            }
            id={`settings-tab-${index}`}
            aria-controls={`settings-tabpanel-${index}`}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperComponent={motion.div}
      PaperProps={{
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        sx: {
          borderRadius: isMobile ? 0 : 3,
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
          height: isMobile ? "100%" : "90vh",
          maxHeight: isMobile ? "100%" : "750px",
          display: "flex",
          flexDirection: "column",
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
          flex: "0 0 auto",
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
          flexDirection: isMobile ? "column" : "row",
          height: "calc(100% - 144px)", // Header + Footer Höhe abziehen
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        {/* Mobile oder Desktop Navigation basierend auf Bildschirmgröße */}
        {isMobile ? renderMobileNavigation() : renderDesktopNavigation()}

        <DialogContent
          sx={{
            p: 0,
            overflow: "hidden",
            width: isMobile
              ? "100%"
              : { xs: "calc(100% - 70px)", sm: "calc(100% - 180px)" },
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Render TabPanels dynamically based on tabs configuration */}
          {tabs.map((tab, index) => {
            const TabComponent = tab.component;
            return (
              <TabPanel key={index} value={tabValue} index={index}>
                <TabComponent
                  settings={settings}
                  onSettingChange={handleSettingChange}
                />
              </TabPanel>
            );
          })}
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
          flexDirection: isMobile ? "column-reverse" : "row",
          gap: isMobile ? 1 : 0,
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
            width: isMobile ? "100%" : "auto",
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
            width: isMobile ? "100%" : "auto",
          }}
        >
          Einstellungen übernehmen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
