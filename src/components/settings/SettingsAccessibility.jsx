// src/components/settings/SettingsAccessibility.jsx
import React from "react";
import { Box, Card, CardContent, Grid, alpha, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SettingsSection from "./shared/SettingsSection";
import OptionCard from "./shared/OptionCard";

// Icons
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ContrastIcon from "@mui/icons-material/Contrast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import GridOnIcon from "@mui/icons-material/GridOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

/**
 * Komponente für die Barrierefreiheitsoptionen
 */
const SettingsAccessibility = ({ settings, onSettingChange }) => {
  const theme = useTheme();

  const accessibilityOptions = [
    {
      id: "highContrast",
      title: "Hoher Kontrast",
      description: "Verbessert die Sichtbarkeit durch stärkere Farbkontraste",
      icon: ContrastIcon,
    },
    {
      id: "colorBlindMode",
      title: "Farbenblind-Modus",
      description: "Verwendet farbenblindfreundliche Farbpaletten",
      icon: VisibilityIcon,
    },
    {
      id: "largeText",
      title: "Größere Texte",
      description: "Erhöht die Textgröße für bessere Lesbarkeit",
      icon: TextIncreaseIcon,
    },
    {
      id: "showCoordinates",
      title: "Koordinaten anzeigen",
      description: "Zeigt Buchstaben und Zahlen auf dem Schachbrett an",
      icon: GridOnIcon,
    },
  ];

  // Animation für die Karten
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ p: 3, height: "100%", overflowY: "auto" }}
    >
      <SettingsSection
        title="Barrierefreiheit & Lesbarkeit"
        icon={AccessibilityNewIcon}
      >
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
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
                {accessibilityOptions.map((option) => (
                  <Grid item xs={12} sm={6} key={option.id}>
                    <motion.div variants={cardVariants}>
                      <OptionCard
                        title={option.title}
                        description={option.description}
                        icon={option.icon}
                        selected={settings[option.id]}
                        onClick={() =>
                          onSettingChange(
                            "accessibility",
                            option.id,
                            !settings[option.id]
                          )
                        }
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.info.main, 0.15)
                : alpha(theme.palette.info.main, 0.08),
            border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <HelpOutlineIcon
            sx={{ mr: 2, color: theme.palette.info.main, mt: 0.5 }}
          />
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Box sx={{ mb: 0.5 }}>
                <strong>Tip zur Barrierefreiheit</strong>
              </Box>
              <Box
                component="p"
                sx={{ m: 0, lineHeight: 1.6, color: "text.secondary" }}
              >
                Kombinieren Sie den Hochkontrastmodus mit größeren Texten für
                die beste Lesbarkeit. Der Farbenblind-Modus ist besonders
                hilfreich für Personen mit Rot-Grün-Schwäche.
              </Box>
            </motion.div>
          </Box>
        </Box>
      </SettingsSection>
    </Box>
  );
};

export default SettingsAccessibility;
