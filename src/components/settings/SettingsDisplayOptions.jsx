// src/components/settings/SettingsDisplayOptions.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import SettingsSection from "./shared/SettingsSection";
import OptionCard from "./shared/OptionCard";
import StyledSlider from "./shared/StyledSlider";

// Icons
import ColorLensIcon from "@mui/icons-material/ColorLens";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SpeedIcon from "@mui/icons-material/Speed";

/**
 * Komponente für die Anzeigeoptionen
 */
const SettingsDisplayOptions = ({ settings, onSettingChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Brett-Theme-Optionen
  const boardThemeOptions = [
    {
      value: "classic",
      label: "Klassisch",
      description: "Traditionelles braunes Schachbrett",
    },
    {
      value: "modern",
      label: "Modern",
      description: "Frisches grünes Design",
    },
    {
      value: "wood",
      label: "Holz",
      description: "Natürliches Holzdesign",
    },
    {
      value: "tournament",
      label: "Turnier",
      description: "Professionelles Turnierdesign",
    },
  ];

  // Figurenstil-Optionen
  const pieceStyleOptions = [
    {
      value: "standard",
      label: "Standard",
      description: "Klassische Figuren",
    },
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

  // Funktion zur Anzeige der Brettgröße
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

  // Funktion zur Anzeige der Animationsgeschwindigkeit
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

  // State für Animation der Vorschau
  const [previewKey, setPreviewKey] = useState(0);

  // Schachbrett-Vorschau basierend auf Theme
  const renderBoardPreview = () => {
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

    const colors = themes[settings.boardTheme] || themes.modern;

    // Erstelle ein kleines 8x8 Schachbrett zur Vorschau
    return (
      <motion.div
        key={previewKey}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
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
            boxShadow: theme.shadows[4],
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

  // Handler für die Themeänderung, der auch die Vorschau aktualisiert
  const handleThemeChange = (value) => {
    onSettingChange("display", "boardTheme", value);
    setPreviewKey((prev) => prev + 1); // Animation erneut auslösen
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ p: 3, height: "100%", overflowY: "auto" }}
    >
      <SettingsSection title="Brett- & Figurendesign" icon={ColorLensIcon}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                mb: { xs: 2, md: 0 },
                height: "100%",
                background: alpha(theme.palette.background.paper, 0.4),
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
                  <Grid container spacing={2}>
                    {boardThemeOptions.map((option) => (
                      <Grid item xs={12} sm={6} key={option.value}>
                        <OptionCard
                          title={option.label}
                          description={option.description}
                          selected={settings.boardTheme === option.value}
                          onClick={() => handleThemeChange(option.value)}
                        />
                      </Grid>
                    ))}
                  </Grid>
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
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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

                <Grid container spacing={2}>
                  {pieceStyleOptions.map((option) => (
                    <Grid item xs={12} key={option.value}>
                      <OptionCard
                        title={option.label}
                        description={option.description}
                        selected={settings.pieceStyle === option.value}
                        onClick={() =>
                          onSettingChange("display", "pieceStyle", option.value)
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <StyledSlider
                    value={settings.boardSize}
                    onChange={(e, val) =>
                      onSettingChange("display", "boardSize", val)
                    }
                    step={1}
                    marks={[
                      { value: 1, label: "Klein" },
                      { value: 2, label: "Mittel" },
                      { value: 3, label: "Groß" },
                    ]}
                    min={1}
                    max={3}
                    label="Brettgröße"
                    valueDisplay={getBoardSizeLabel}
                    icon={WidgetsIcon}
                  />
                </Box>

                <StyledSlider
                  value={settings.animationSpeed}
                  onChange={(e, val) =>
                    onSettingChange("display", "animationSpeed", val)
                  }
                  step={1}
                  marks={[
                    { value: 1, label: "Langsam" },
                    { value: 2, label: "Mittel" },
                    { value: 3, label: "Schnell" },
                  ]}
                  min={1}
                  max={3}
                  label="Animationsgeschwindigkeit"
                  valueDisplay={getAnimationSpeedLabel}
                  icon={SpeedIcon}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </SettingsSection>
    </Box>
  );
};

export default SettingsDisplayOptions;
