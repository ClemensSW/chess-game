// src/components/game-end/GameEndContent.jsx
import React, { useState, useEffect } from "react";
import {
  DialogContent,
  Typography,
  Box,
  Divider,
  Chip,
  Paper,
  Grid,
  Avatar,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import SchoolIcon from "@mui/icons-material/School";

/**
 * Content section of the GameEndDialog showing result and statistics
 */
const GameEndContent = ({ isCheckmate, winner, message, gameStats }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [animateStats, setAnimateStats] = useState(false);

  // Animate statistics after a short delay
  useEffect(() => {
    setAnimateStats(false);

    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isCheckmate, winner, message]); // Re-run when game result changes

  // Renders the winner avatar/icon based on the game result
  const renderWinnerAvatar = () => {
    if (isCheckmate) {
      // The chess piece avatar for checkmate
      return (
        <Avatar
          sx={{
            width: 80,
            height: 80,
            backgroundColor: winner === "w" ? "#f5f5f5" : "#2c2c2c",
            border: `3px solid ${winner === "w" ? "#FFD700" : "#C0C0C0"}`,
            boxShadow: `0 0 20px ${alpha(
              winner === "w" ? "#FFD700" : "#C0C0C0",
              0.4
            )}`,
          }}
        >
          <Typography
            variant="h2"
            component="span"
            color={winner === "w" ? "black" : "white"}
          >
            {winner === "w" ? "♔" : "♚"}
          </Typography>
        </Avatar>
      );
    } else {
      // The handshake icon for draw
      return (
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: theme.palette.info.light,
          }}
        >
          <HandshakeIcon sx={{ fontSize: 42, color: "white" }} />
        </Avatar>
      );
    }
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get stats from the gameStats object or use defaults
  const {
    moveCount = 0,
    gameDuration = 0,
    capturedPieces = {},
    checks = 0,
  } = gameStats;

  // Calculate captured pieces
  const whiteCaptured = capturedPieces.white?.length || 0;
  const blackCaptured = capturedPieces.black?.length || 0;
  const totalCaptured = whiteCaptured + blackCaptured;

  return (
    <DialogContent
      sx={{
        p: 3,
        height: isMobile ? "calc(100vh - 128px)" : "auto", // Adjust for header and footer
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Winner display section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            pt: 1,
          }}
        >
          {renderWinnerAvatar()}

          <Typography
            variant="h6"
            align="center"
            sx={{
              mt: 2,
              fontWeight: 600,
              color: isCheckmate
                ? winner === "w"
                  ? theme.palette.success.main
                  : theme.palette.secondary.main
                : theme.palette.info.main,
            }}
          >
            {isCheckmate
              ? `${winner === "w" ? "Weiß" : "Schwarz"} gewinnt!`
              : "Unentschieden!"}
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              mt: 1,
              color: theme.palette.text.secondary,
              maxWidth: "90%",
            }}
          >
            {message}
          </Typography>
        </Box>
      </motion.div>

      {/* Game statistics section */}
      <Box sx={{ mt: 3 }}>
        <Divider sx={{ mb: 2 }}>
          <Chip
            label="Spielstatistik"
            size="small"
            color="primary"
            icon={<BarChartIcon />}
          />
        </Divider>

        <Grid container spacing={2}>
          {/* Game Duration */}
          <Grid item xs={6} sm={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animateStats ? 1 : 0,
                y: animateStats ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.6)
                      : theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <AccessTimeIcon color="primary" />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  {formatTime(gameDuration)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Spielzeit
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Move Count */}
          <Grid item xs={6} sm={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animateStats ? 1 : 0,
                y: animateStats ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.6)
                      : theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <WhatshotIcon color="error" />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  {moveCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Züge
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Captured Pieces */}
          <Grid item xs={6} sm={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animateStats ? 1 : 0,
                y: animateStats ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.6)
                      : theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <LocalFireDepartmentIcon
                    sx={{ color: theme.palette.warning.main }}
                  />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  {totalCaptured}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Figuren geschlagen
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Check Situations */}
          <Grid item xs={6} sm={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animateStats ? 1 : 0,
                y: animateStats ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.6)
                      : theme.palette.background.paper,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <MilitaryTechIcon color="secondary" />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  {checks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schach-Situationen
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Tip box */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.3)
              : alpha(theme.palette.background.default, 0.7),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <SchoolIcon
            sx={{ mt: 0.5, mr: 2, color: theme.palette.primary.main }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {isCheckmate ? "Schachmatt-Tipp:" : "Remis-Tipp:"}
            </Typography>
            <Typography variant="body2">
              {isCheckmate
                ? "Achte auf ungedeckte Figuren und halte immer ein Auge auf die Sicherheit deines Königs."
                : "In dieser Stellung kann keiner der Spieler gewinnen. Versuche in zukünftigen Partien, deine Figuren aktiver zu halten."}
            </Typography>
          </Box>
        </Box>
      </Box>
    </DialogContent>
  );
};

export default GameEndContent;
