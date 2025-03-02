// src/components/settings/SettingsGameOptions.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import SettingsSection from "./shared/SettingsSection";
import OptionButtonGroup from "./shared/OptionButtonGroup";
import StyledSlider from "./shared/StyledSlider";

// Icons
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TimerIcon from "@mui/icons-material/Timer";
import SpeedIcon from "@mui/icons-material/Speed";

/**
 * Personicon-Komponente (für Konsistenz mit anderen Import-Icons)
 */
const PersonIconWrapper = (props) => <PersonIcon {...props} />;

/**
 * Komponente für die Spieloptionen
 */
const SettingsGameOptions = ({ settings, onSettingChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Spielmodus-Optionen
  const gameModeOptions = [
    {
      value: "human",
      label: "Gegen Mensch",
      icon: PersonIconWrapper,
      fullWidth: true,
    },
    {
      value: "computer",
      label: "Gegen Computer",
      icon: SmartToyIcon,
      fullWidth: true,
    },
  ];

  // Zeitkontroll-Optionen
  const timeControlOptions = [
    { value: "3min", label: "3 Min", icon: TimerIcon },
    { value: "5min", label: "5 Min", icon: TimerIcon },
    { value: "10min", label: "10 Min", icon: TimerIcon },
    { value: "15min", label: "15 Min", icon: TimerIcon },
    { value: "30min", label: "30 Min", icon: TimerIcon },
  ];

  // Funktion zur Anzeige des Schwierigkeitsgrads
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

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ p: 3, height: "100%", overflowY: "auto" }}
    >
      <SettingsSection title="Spielmodus & Zeitkontrolle" icon={WidgetsIcon}>
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
              options={gameModeOptions}
              value={settings.gameMode}
              onChange={(value) => onSettingChange("game", "gameMode", value)}
              label="Spielmodus"
              icon={WidgetsIcon}
              columns={1}
            />

            {settings.gameMode === "computer" && (
              <Box sx={{ mt: 4, mb: 2 }}>
                <StyledSlider
                  value={settings.computerDifficulty}
                  onChange={(e, val) =>
                    onSettingChange("game", "computerDifficulty", val)
                  }
                  step={1}
                  marks={[
                    { value: 1, label: "Anfänger" },
                    { value: 5, label: "Mittel" },
                    { value: 10, label: "Profi" },
                  ]}
                  min={1}
                  max={10}
                  label="Computer-Schwierigkeit"
                  valueDisplay={getDifficultyLabel}
                  icon={SpeedIcon}
                />
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <OptionButtonGroup
                options={timeControlOptions}
                value={settings.timeControl}
                onChange={(value) =>
                  onSettingChange("game", "timeControl", value)
                }
                label="Zeitkontrolle pro Spieler"
                icon={TimerIcon}
                columns={isMobile ? 2 : 5}
              />
            </Box>

            <StyledSlider
              value={settings.timeIncrement}
              onChange={(e, val) =>
                onSettingChange("game", "timeIncrement", val)
              }
              step={1}
              min={0}
              max={15}
              label="Zusatzzeit pro Zug"
              valueDisplay={(val) => `${val} Sekunden`}
              icon={TimerIcon}
              sx={{ mt: 4, mb: 1 }}
            />
          </CardContent>
        </Card>
      </SettingsSection>
    </Box>
  );
};

export default SettingsGameOptions;
