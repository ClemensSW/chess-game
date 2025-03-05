// src/components/ChessTimer.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ChessTimer = ({
  activePlayer,
  initialTime = 600, // 10 Minuten in Sekunden (Standard)
  increment = 0, // Zeitzugabe in Sekunden
  onTimeUp,
}) => {
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
    if (timeInSeconds < 30) return "error.main"; // Rot wenn unter 30 Sekunden
    if (timeInSeconds < 60) return "warning.main"; // Gelb wenn unter 1 Minute
    return "primary.main"; // Standard-Blau
  };

  return (
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
        <Typography variant="h6">Spielzeit</Typography>
        <Chip
          icon={<AccessTimeIcon />}
          label={isRunning ? "Läuft" : "Pausiert"}
          color={isRunning ? "success" : "default"}
          size="small"
          onClick={toggleTimer}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {/* Weißer Spieler */}
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            backgroundColor:
              activePlayer === "w" ? "rgba(0, 0, 0, 0.04)" : "transparent",
            border: activePlayer === "w" ? "1px solid #ddd" : "none",
            flex: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Weiß
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: getTimerColor(whiteTime),
            }}
          >
            {formatTime(whiteTime)}
          </Typography>
        </Box>

        {/* Schwarzer Spieler */}
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            backgroundColor:
              activePlayer === "b" ? "rgba(0, 0, 0, 0.04)" : "transparent",
            border: activePlayer === "b" ? "1px solid #ddd" : "none",
            flex: 1,
            textAlign: "center",
            ml: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Schwarz
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: getTimerColor(blackTime),
            }}
          >
            {formatTime(blackTime)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChessTimer;
