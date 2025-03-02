// src/components/GameEndDialog.jsx - Verbesserte Version
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Paper,
  Grid,
  IconButton,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ReplayIcon from "@mui/icons-material/Replay";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

// Konfetti-Effekt für Gewinner-Animationen
import Confetti from "react-confetti";

const GameEndDialog = ({
  open,
  result,
  onNewGame,
  onClose,
  onShare,
  onAnalyze,
  gameStats = {}, // {moveCount, gameDuration, capturedPieces, checks}
}) => {
  const theme = useTheme();
  const [showConfetti, setShowConfetti] = React.useState(false);

  // Stats-Animationen
  const [animateStats, setAnimateStats] = React.useState(false);

  if (!result) return null;

  const { title, message, winner, reason } = result;

  const isCheckmate = title === "Schachmatt!";
  const isDraw = title === "Remis!";

  // Konfetti beim Öffnen des Dialogs anzeigen (nur bei Schachmatt)
  React.useEffect(() => {
    if (open && isCheckmate) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, isCheckmate]);

  // Statistiken animieren
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setAnimateStats(true);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setAnimateStats(false);
    }
  }, [open]);

  // Gewinner-Icon und -Farbe basierend auf Spielergebnis
  const getWinnerIcon = () => {
    if (isCheckmate) {
      return (
        <Avatar
          sx={{
            width: 80,
            height: 80,
            backgroundColor: winner === "w" ? "#f5f5f5" : "#2c2c2c",
            border: `3px solid ${winner === "w" ? "gold" : "silver"}`,
            boxShadow: `0 0 20px ${alpha(
              winner === "w" ? "gold" : "silver",
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

  // Spielstatistiken rendern
  const renderGameStats = () => {
    if (!gameStats || Object.keys(gameStats).length === 0) return null;

    const {
      moveCount = 0,
      gameDuration = 0,
      capturedPieces = {},
      checks = 0,
    } = gameStats;

    // Formatiere Spielzeit
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Berechne Anzahl geschlagener Figuren
    const whiteCaptured = capturedPieces.white?.length || 0;
    const blackCaptured = capturedPieces.black?.length || 0;

    return (
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
                elevation={1}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
                elevation={1}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
                elevation={1}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <LocalFireDepartmentIcon
                    sx={{ color: theme.palette.warning.main }}
                  />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  {whiteCaptured + blackCaptured}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Figuren geschlagen
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

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
                elevation={1}
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
    );
  };

  // Hauptrender-Funktion
  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}

      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={motion.div}
        PaperProps={{
          initial: { opacity: 0, y: -50, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            maxWidth: 500,
            width: "95%",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: isCheckmate
              ? winner === "w"
                ? alpha("#FFD700", 0.1)
                : alpha("#808080", 0.1)
              : alpha(theme.palette.info.main, 0.1),
            p: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color={
              isCheckmate
                ? winner === "w"
                  ? "black"
                  : theme.palette.mode === "dark"
                  ? "white"
                  : "black"
                : "inherit"
            }
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
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
              }}
            >
              {getWinnerIcon()}

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

              <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                {message}
              </Typography>
            </Box>
          </motion.div>

          {renderGameStats()}

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

        <DialogActions
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "stretch",
            "& > *": { m: 0.5 },
          }}
        >
          <Button
            onClick={onClose}
            color="inherit"
            startIcon={<CloseIcon />}
            fullWidth={window.innerWidth < 600}
          >
            Schließen
          </Button>

          {onShare && (
            <Button
              onClick={onShare}
              color="secondary"
              startIcon={<ShareIcon />}
              fullWidth={window.innerWidth < 600}
            >
              Teilen
            </Button>
          )}

          {onAnalyze && (
            <Button
              onClick={onAnalyze}
              color="info"
              variant="outlined"
              startIcon={<BarChartIcon />}
              fullWidth={window.innerWidth < 600}
            >
              Analysieren
            </Button>
          )}

          <Button
            onClick={onNewGame}
            variant="contained"
            color="primary"
            startIcon={<ReplayIcon />}
            fullWidth={window.innerWidth < 600}
          >
            Neue Partie
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GameEndDialog;
