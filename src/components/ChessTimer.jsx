// src/components/ChessTimer.jsx - Verbessertes Design
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Chip, useTheme, alpha } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";

const ChessTimer = ({
  activePlayer,
  initialTime = 600, // 10 Minuten in Sekunden (Standard)
  increment = 0, // Zeitzugabe in Sekunden
  onTimeUp,
}) => {
  const theme = useTheme();
  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [blackTime, setBlackTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  // Timer-Logik
  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (activePlayer === "w") {
          setWhiteTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              if (onTimeUp) onTimeUp("w");
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBlackTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              if (onTimeUp) onTimeUp("b");
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, activePlayer, onTimeUp]);

  // Zeitzugabe bei Spielerzug
  useEffect(() => {
    if (increment > 0) {
      // Wenn der Spieler wechselt, Inkrement zum vorherigen Spieler hinzufügen
      if (activePlayer === "w") {
        setBlackTime((prev) => prev + increment);
      } else if (activePlayer === "b") {
        setWhiteTime((prev) => prev + increment);
      }
    }
  }, [activePlayer, increment]);

  // Timer-Funktionen
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Formatiert die Zeit in MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Berechnet die Farbe basierend auf der verbleibenden Zeit
  const getTimerColor = (timeInSeconds) => {
    if (timeInSeconds < 30) return theme.palette.error.main; // Rot wenn unter 30 Sekunden
    if (timeInSeconds < 60) return theme.palette.warning.main; // Gelb wenn unter 1 Minute
    return theme.palette.primary.main; // Standard-Blau
  };

  // Animationsvarianten
  const timerVariants = {
    inactive: (isWhite) => ({
      scale: 0.98,
      opacity: 0.95,
      y: 0,
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    }),
    active: (isWhite) => ({
      scale: 1,
      opacity: 1,
      y: isWhite ? -3 : 3,
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    }),
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={3}
      sx={{
        p: 0,
        mb: 3,
        borderRadius: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? alpha("#1e2023", 0.9)
            : alpha("#fff", 0.95),
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0px 8px 25px rgba(0, 0, 0, 0.25)"
            : "0px 8px 25px rgba(0, 0, 0, 0.1)",
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) =>
            `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          p: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.4)
              : alpha(theme.palette.primary.light, 0.05),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <AccessTimeIcon sx={{ mr: 1, fontSize: "1.25rem" }} />
          Spielzeit
        </Typography>

        <Chip
          icon={isRunning ? <PlayArrowIcon /> : <PauseIcon />}
          label={isRunning ? "Läuft" : "Pausiert"}
          color={isRunning ? "success" : "default"}
          size="small"
          onClick={toggleTimer}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            "& .MuiChip-label": {
              fontWeight: 600,
              px: 1,
            },
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: 2,
          }}
        >
          {/* Weißer Spieler */}
          <motion.div
            custom={true}
            variants={timerVariants}
            initial="inactive"
            animate={activePlayer === "w" ? "active" : "inactive"}
            style={{ width: "50%" }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  activePlayer === "w"
                    ? theme.palette.mode === "dark"
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.light, 0.15)
                    : "transparent",
                border: (theme) =>
                  `1px solid ${
                    activePlayer === "w"
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.divider, 0.1)
                  }`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                "&::before":
                  activePlayer === "w"
                    ? {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: (theme) =>
                          `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      }
                    : {},
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: (theme) => alpha(theme.palette.text.secondary, 0.9),
                  mb: 1,
                }}
              >
                Weiß
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontWeight: "bold",
                  color: (time) => getTimerColor(whiteTime),
                  letterSpacing: "0.05em",
                  textShadow:
                    whiteTime < 30 ? "0 0 8px rgba(255,0,0,0.3)" : "none",
                  transition: "color 0.5s ease, text-shadow 0.5s ease",
                }}
              >
                {formatTime(whiteTime)}
              </Typography>

              {increment > 0 && (
                <Chip
                  label={`+${increment}s`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{
                    mt: 1,
                    height: "20px",
                    fontSize: "0.7rem",
                    opacity: 0.7,
                  }}
                />
              )}
            </Box>
          </motion.div>

          {/* Schwarzer Spieler */}
          <motion.div
            custom={false}
            variants={timerVariants}
            initial="inactive"
            animate={activePlayer === "b" ? "active" : "inactive"}
            style={{ width: "50%" }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  activePlayer === "b"
                    ? theme.palette.mode === "dark"
                      ? alpha(theme.palette.secondary.main, 0.1)
                      : alpha(theme.palette.secondary.light, 0.15)
                    : "transparent",
                border: (theme) =>
                  `1px solid ${
                    activePlayer === "b"
                      ? alpha(theme.palette.secondary.main, 0.2)
                      : alpha(theme.palette.divider, 0.1)
                  }`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                "&::before":
                  activePlayer === "b"
                    ? {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: (theme) =>
                          `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                      }
                    : {},
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: (theme) => alpha(theme.palette.text.secondary, 0.9),
                  mb: 1,
                }}
              >
                Schwarz
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontWeight: "bold",
                  color: (time) => getTimerColor(blackTime),
                  letterSpacing: "0.05em",
                  textShadow:
                    blackTime < 30 ? "0 0 8px rgba(255,0,0,0.3)" : "none",
                  transition: "color 0.5s ease, text-shadow 0.5s ease",
                }}
              >
                {formatTime(blackTime)}
              </Typography>

              {increment > 0 && (
                <Chip
                  label={`+${increment}s`}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{
                    mt: 1,
                    height: "20px",
                    fontSize: "0.7rem",
                    opacity: 0.7,
                  }}
                />
              )}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChessTimer;
