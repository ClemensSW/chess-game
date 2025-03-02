// src/components/settings/SettingsSoundOptions.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
  Grid,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import SettingsSection from "./shared/SettingsSection";

// Icons
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

/**
 * Komponente für die Sound-Einstellungen
 */
const SettingsSoundOptions = ({ settings, onSettingChange }) => {
  const theme = useTheme();

  // Animation für die einzelnen Optionen
  const soundOptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{ p: 3, height: "100%", overflowY: "auto" }}
    >
      <SettingsSection title="Soundeffekte" icon={VolumeUpIcon}>
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={soundOptionVariants}
              custom={0}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.soundEffects}
                    onChange={(e) =>
                      onSettingChange(
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <VolumeUpIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                    <Typography variant="subtitle1" fontWeight={500}>
                      Soundeffekte aktivieren
                    </Typography>
                  </Box>
                }
                sx={{ mb: 2 }}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={soundOptionVariants}
              custom={1}
            >
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
            </motion.div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={soundOptionVariants}
                  custom={2}
                >
                  <FormControlLabel
                    disabled={!settings.soundEffects}
                    control={
                      <Switch
                        checked={settings.moveSound}
                        onChange={(e) =>
                          onSettingChange(
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
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={soundOptionVariants}
                  custom={3}
                >
                  <FormControlLabel
                    disabled={!settings.soundEffects}
                    control={
                      <Switch
                        checked={settings.captureSound}
                        onChange={(e) =>
                          onSettingChange(
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
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={soundOptionVariants}
                  custom={4}
                >
                  <FormControlLabel
                    disabled={!settings.soundEffects}
                    control={
                      <Switch
                        checked={settings.checkSound}
                        onChange={(e) =>
                          onSettingChange(
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
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={soundOptionVariants}
                  custom={5}
                >
                  <FormControlLabel
                    disabled={!settings.soundEffects}
                    control={
                      <Switch
                        checked={settings.gameEndSound}
                        onChange={(e) =>
                          onSettingChange(
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
                </motion.div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Placeholder für zukünftige Erweiterungen (Musik, Benachrichtigungen) */}
        <Card
          elevation={0}
          sx={{
            background: alpha(theme.palette.background.paper, 0.2),
            borderRadius: 3,
            border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`,
            opacity: 0.7,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <MusicNoteIcon sx={{ mr: 1, opacity: 0.6 }} />
              Hintergrundmusik
              <Box
                sx={{
                  ml: 1,
                  px: 1,
                  py: 0.1,
                  borderRadius: 1,
                  fontSize: "0.7rem",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              >
                Demnächst
              </Box>
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <NotificationsActiveIcon sx={{ mr: 1, opacity: 0.6 }} />
              Benachrichtigungen
              <Box
                sx={{
                  ml: 1,
                  px: 1,
                  py: 0.1,
                  borderRadius: 1,
                  fontSize: "0.7rem",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              >
                Demnächst
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </SettingsSection>
    </Box>
  );
};

export default SettingsSoundOptions;
