// src/components/ChessTimer.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Chip, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";
import { styles, formatTime } from "./ChessTimer.styles";

/**
 * Chess Timer Component
 *
 * Displays and manages time for both players in a chess game
 *
 * @param {string} activePlayer - Currently active player ('w' for white, 'b' for black)
 * @param {number} initialTime - Initial time in seconds for both players (default: 600)
 * @param {number} increment - Time increment in seconds after each move (default: 0)
 * @param {function} onTimeUp - Callback when a player runs out of time
 */
const ChessTimer = ({
  activePlayer,
  initialTime = 600, // 10 minutes in seconds (default)
  increment = 0, // Time increment in seconds
  onTimeUp,
}) => {
  const theme = useTheme();
  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [blackTime, setBlackTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  // Timer logic
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

  // Add time increment when player changes
  useEffect(() => {
    if (increment > 0) {
      // Add increment to the previous player when turn changes
      if (activePlayer === "w") {
        setBlackTime((prev) => prev + increment);
      } else if (activePlayer === "b") {
        setWhiteTime((prev) => prev + increment);
      }
    }
  }, [activePlayer, increment]);

  // Toggle timer running state
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={3}
      sx={styles.container(theme)}
    >
      {/* Timer header */}
      <Box sx={styles.header(theme)}>
        <Typography variant="h6" sx={styles.headerTitle(theme)}>
          <AccessTimeIcon sx={{ mr: 1, fontSize: "1.25rem" }} />
          Spielzeit
        </Typography>

        <Chip
          icon={isRunning ? <PlayArrowIcon /> : <PauseIcon />}
          label={isRunning ? "Läuft" : "Pausiert"}
          color={isRunning ? "success" : "default"}
          size="small"
          onClick={toggleTimer}
          sx={styles.statusChip}
        />
      </Box>

      {/* Timer displays */}
      <Box sx={styles.timersContainer}>
        <Box sx={styles.timersLayout}>
          {/* White player timer */}
          <motion.div
            custom={true}
            variants={styles.timerVariants}
            initial="inactive"
            animate={activePlayer === "w" ? "active" : "inactive"}
            style={{ width: "50%" }}
          >
            <Box sx={styles.playerTimerBase(theme, activePlayer === "w", true)}>
              <Typography variant="subtitle1" sx={styles.playerLabel(theme)}>
                Weiß
              </Typography>

              <Typography
                variant="h3"
                sx={styles.timerDisplay(theme, whiteTime)}
              >
                {formatTime(whiteTime)}
              </Typography>

              {increment > 0 && (
                <Chip
                  label={`+${increment}s`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={styles.incrementChip}
                />
              )}
            </Box>
          </motion.div>

          {/* Black player timer */}
          <motion.div
            custom={false}
            variants={styles.timerVariants}
            initial="inactive"
            animate={activePlayer === "b" ? "active" : "inactive"}
            style={{ width: "50%" }}
          >
            <Box
              sx={styles.playerTimerBase(theme, activePlayer === "b", false)}
            >
              <Typography variant="subtitle1" sx={styles.playerLabel(theme)}>
                Schwarz
              </Typography>

              <Typography
                variant="h3"
                sx={styles.timerDisplay(theme, blackTime)}
              >
                {formatTime(blackTime)}
              </Typography>

              {increment > 0 && (
                <Chip
                  label={`+${increment}s`}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={styles.incrementChip}
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
