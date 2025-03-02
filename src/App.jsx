// src/App.jsx - Modernisierte Version
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
  Grid,
  Divider,
  Button,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  Snackbar,
  Alert,
  Avatar,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import SettingsIcon from "@mui/icons-material/Settings";
import FlipIcon from "@mui/icons-material/Flip";
import InfoIcon from "@mui/icons-material/Info";
import SportEsportsIcon from "@mui/icons-material/SportsEsports";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

// Komponenten
import ChessBoard from "./components/ChessBoard";
import MoveHistory from "./components/MoveHistory";
import ChessTimer from "./components/ChessTimer";
import GameEndDialog from "./components/GameEndDialog";
import SettingsDialog from "./components/SettingsDialog";
import ChessTutorial from "./components/tutorial/ChessTutorial";
import { getThemeByMode } from "./theme";
import { Chess } from "chess.js";

// App-Version
const APP_VERSION = "2.0.0";

function App() {
  // Theme State
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );
  const theme = getThemeByMode(mode);
  const currentTheme = useTheme();

  // MediaQuery für responsive Anpassungen
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Drawer-State (für mobiles Menü)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Chess-Game State
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState("w"); // 'w' für weiß, 'b' für schwarz
  const [gameEndState, setGameEndState] = useState(null);

  // UI States
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [appSettings, setAppSettings] = useState({
    // Default-Einstellungen
    gameMode: "human",
    computerDifficulty: 3,
    timeControl: "10min",
    timeIncrement: 5,
    boardTheme: "modern", // Geändert von "classic" zu "modern" als Standard
    pieceStyle: "standard",
    boardSize: 2,
    animationSpeed: 2,
    soundEffects: true,
    moveSound: true,
    captureSound: true,
    checkSound: true,
    gameEndSound: true,
    highContrast: false,
    colorBlindMode: false,
    largeText: false,
    showCoordinates: true,
  });

  // Spielstatistiken
  const [gameStats, setGameStats] = useState({
    startTime: Date.now(),
    moveCount: 0,
    capturedPieces: {
      white: [],
      black: [],
    },
    checks: 0,
  });

  // Ref für Schachbrett-Funktionen
  const boardRef = useRef(null);

  // Theme beim Start aus dem LocalStorage laden
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setMode(savedTheme);
    }

    // Einstellungen aus dem LocalStorage laden
    const savedSettings = localStorage.getItem("chessSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setAppSettings((prev) => ({
          ...prev,
          ...parsedSettings,
        }));
      } catch (error) {
        console.error("Fehler beim Laden der Einstellungen:", error);
      }
    }
  }, []);

  // Einstellungen im LocalStorage speichern, wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem("chessSettings", JSON.stringify(appSettings));
  }, [appSettings]);

  // Toggle-Funktion für den Dark/Light-Modus
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // Drawer öffnen/schließen
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Action-Menü öffnen/schließen
  const handleActionMenuOpen = (event) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  // Snackbar-Funktionen
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Callback für neue Züge vom Schachbrett
  const handleMoveChange = useCallback(
    (moveHistory, capturedPiece, isCheck) => {
      // Hier stellen wir sicher, dass wir die SAN-Notation der Züge extrahieren
      const formattedMoves = moveHistory.map((move) =>
        typeof move === "string" ? move : move.san || move.toString()
      );
      setMoves(formattedMoves);
      setCurrentMoveIndex(formattedMoves.length - 1);

      // Spielerzug wechseln
      setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));

      // Spielstatistiken aktualisieren
      setGameStats((prev) => {
        const updatedStats = {
          ...prev,
          moveCount: prev.moveCount + 1,
        };

        // Geschlagene Figur hinzufügen, falls vorhanden
        if (capturedPiece) {
          const captureList = capturedPiece.color === "w" ? "white" : "black";

          updatedStats.capturedPieces = {
            ...prev.capturedPieces,
            [captureList]: [...prev.capturedPieces[captureList], capturedPiece],
          };
        }

        // Schach zählen
        if (isCheck) {
          updatedStats.checks = prev.checks + 1;
        }

        return updatedStats;
      });
    },
    []
  );

  // Neues Spiel starten
  const handleNewGame = useCallback((settings = {}) => {
    if (boardRef.current) {
      boardRef.current.newGame();
    } else {
      setGame(new Chess());
      setMoves([]);
      setCurrentMoveIndex(-1);
      setCurrentPlayer("w");
    }

    // Spielstatistiken zurücksetzen
    setGameStats({
      startTime: Date.now(),
      moveCount: 0,
      capturedPieces: {
        white: [],
        black: [],
      },
      checks: 0,
    });

    // Spielende-Zustand zurücksetzen
    setGameEndState(null);

    // Menü schließen, falls offen
    handleActionMenuClose();
  }, []);

  // Zug rückgängig machen
  const handleUndoMove = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.undoMove();
    }

    // Spielerzug entsprechend anpassen
    if (moves.length > 0) {
      setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));

      // Statistiken aktualisieren
      setGameStats((prev) => ({
        ...prev,
        moveCount: Math.max(0, prev.moveCount - 1),
      }));
    }

    // Menü schließen, falls offen
    handleActionMenuClose();
  }, [moves.length]);

  // Brett drehen
  const handleFlipBoard = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.flipBoard();
    }

    // Menü schließen, falls offen
    handleActionMenuClose();
  }, []);

  // Spiel speichern
  const handleSaveGame = useCallback(() => {
    try {
      if (!boardRef.current) {
        showSnackbar("Fehler beim Speichern des Spiels", "error");
        return;
      }

      const gameState = {
        fen: boardRef.current.getFEN(),
        moves: moves,
        currentPlayer: currentPlayer,
        gameStats: {
          ...gameStats,
          gameDuration: Math.floor((Date.now() - gameStats.startTime) / 1000),
        },
        timestamp: new Date().toISOString(),
        appVersion: APP_VERSION,
      };

      localStorage.setItem("savedChessGame", JSON.stringify(gameState));

      // Erfolgsmeldung
      showSnackbar("Spiel erfolgreich gespeichert", "success");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      showSnackbar("Fehler beim Speichern des Spiels", "error");
    }

    // Menü schließen, falls offen
    handleActionMenuClose();
  }, [moves, currentPlayer, gameStats]);

  // Spiel laden
  const handleLoadGame = useCallback(() => {
    try {
      const savedGameJson = localStorage.getItem("savedChessGame");
      if (!savedGameJson) {
        showSnackbar("Kein gespeichertes Spiel gefunden", "info");
        return;
      }

      const savedGame = JSON.parse(savedGameJson);
      if (savedGame && savedGame.fen) {
        const loadedGame = new Chess();
        try {
          const success = loadedGame.load(savedGame.fen);
          if (!success) {
            throw new Error("Ungültige FEN-Notation");
          }

          // Spielstand wiederherstellen
          setGame(loadedGame);
          setMoves(savedGame.moves || []);
          setCurrentPlayer(savedGame.currentPlayer || loadedGame.turn());
          setCurrentMoveIndex(
            savedGame.moves ? savedGame.moves.length - 1 : -1
          );

          // Statistiken wiederherstellen
          if (savedGame.gameStats) {
            setGameStats({
              ...savedGame.gameStats,
              startTime:
                Date.now() - (savedGame.gameStats.gameDuration * 1000 || 0),
            });
          }

          // Brett aktualisieren
          if (boardRef.current) {
            boardRef.current.loadPosition(savedGame.fen, savedGame.moves);
          }

          // Erfolgsmeldung
          showSnackbar("Spiel erfolgreich geladen", "success");
        } catch (error) {
          console.error("Fehler beim Laden des Spiels:", error);
          showSnackbar("Fehler beim Laden des Spiels", "error");
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Spiels:", error);
      showSnackbar("Fehler beim Laden des Spiels", "error");
    }

    // Menü schließen, falls offen
    handleActionMenuClose();
  }, []);

  // Spieleinstellungen anwenden
  const handleApplySettings = useCallback(
    (newSettings) => {
      setAppSettings((prev) => ({
        ...prev,
        ...newSettings,
      }));

      // Einstellungen speichern
      localStorage.setItem(
        "chessSettings",
        JSON.stringify({
          ...appSettings,
          ...newSettings,
        })
      );

      showSnackbar("Einstellungen übernommen", "success");
    },
    [appSettings]
  );

  // Zeit abgelaufen
  const handleTimeUp = useCallback((player) => {
    // Spielende durch Zeitüberschreitung
    setGameEndState({
      isOver: true,
      title: "Zeit abgelaufen!",
      message: `${
        player === "w" ? "Weiß" : "Schwarz"
      } hat die Zeit überschritten.`,
      winner: player === "w" ? "b" : "w",
      reason: "time",
    });

    // Spielstatistiken finalisieren
    setGameStats((prev) => ({
      ...prev,
      gameDuration: Math.floor((Date.now() - prev.startTime) / 1000),
    }));
  }, []);

  // Zug aus der Historie auswählen
  const handleMoveSelect = useCallback((index) => {
    setCurrentMoveIndex(index);

    // In einer erweiterten Version könnte man hier auch das Brett auf den Stand dieses Zuges setzen
    if (boardRef.current) {
      boardRef.current.goToMove(index);
    }
  }, []);

  // Spielende behandeln
  const handleGameEnd = useCallback((endState) => {
    // Spielstatistiken finalisieren
    setGameStats((prev) => ({
      ...prev,
      gameDuration: Math.floor((Date.now() - prev.startTime) / 1000),
    }));

    setGameEndState(endState);
  }, []);

  // Spielende-Dialog schließen
  const handleCloseGameEnd = useCallback(() => {
    setGameEndState(null);
  }, []);

  // Spiel teilen
  const handleShareGame = useCallback(() => {
    try {
      // FEN-Notation des aktuellen Spielstands
      const fen = boardRef.current?.getFEN() || game.fen();

      // Link zum Spiel erstellen (in einer realen App würde hier ein echter Link erzeugt)
      const shareText = `Schau dir meine Schachpartie an! FEN: ${fen}`;

      // In die Zwischenablage kopieren
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          showSnackbar("Spielstand in die Zwischenablage kopiert", "success");
        })
        .catch((err) => {
          console.error("Fehler beim Kopieren:", err);
          showSnackbar("Fehler beim Kopieren des Spielstands", "error");
        });
    } catch (error) {
      console.error("Fehler beim Teilen des Spiels:", error);
      showSnackbar("Fehler beim Teilen des Spiels", "error");
    }
  }, [game]);

  // Render-Methode für den Drawer (Mobiles Menü)
  const renderDrawer = () => (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          borderRadius: "0 16px 16px 0",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(145deg, ${alpha(
                  theme.palette.background.paper,
                  0.9
                )}, ${alpha(theme.palette.background.default, 0.95)})`
              : `linear-gradient(145deg, ${alpha("#fff", 0.97)}, ${alpha(
                  theme.palette.background.default,
                  0.95
                )})`,
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          background: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Avatar
          sx={{
            width: 60,
            height: 60,
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          <SportEsportsIcon sx={{ fontSize: 32 }} />
        </Avatar>

        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          sx={{ mb: 0.5 }}
        >
          ChessMaster Pro
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Version {APP_VERSION}
        </Typography>

        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: alpha(theme.palette.background.paper, 0.3),
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ pl: 1, display: "block", mb: 1 }}
        >
          Spieloptionen
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mb: 2,
            p: 1,
            backgroundColor: alpha(theme.palette.primary.main, 0.07),
            borderRadius: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleNewGame}
            fullWidth
            sx={{
              mb: 1,
              borderRadius: 1.5,
              py: 1,
              boxShadow: 2,
              background: `linear-gradient(135deg, ${
                theme.palette.primary.main
              }, ${alpha(theme.palette.primary.dark, 0.8)})`,
            }}
          >
            Neues Spiel
          </Button>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                startIcon={<UndoIcon />}
                onClick={handleUndoMove}
                fullWidth
                sx={{ borderRadius: 1.5 }}
              >
                Zurück
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                startIcon={<FlipIcon />}
                onClick={handleFlipBoard}
                fullWidth
                sx={{ borderRadius: 1.5 }}
              >
                Drehen
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ pl: 1, display: "block", mb: 1 }}
        >
          Spielstand
        </Typography>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSaveGame}
            fullWidth
            sx={{
              borderRadius: 1.5,
              justifyContent: "flex-start",
              px: 2,
              py: 1,
              backgroundColor: alpha(theme.palette.background.paper, 0.4),
            }}
          >
            Spiel speichern
          </Button>

          <Button
            variant="outlined"
            startIcon={<FolderOpenIcon />}
            onClick={handleLoadGame}
            fullWidth
            sx={{
              borderRadius: 1.5,
              justifyContent: "flex-start",
              px: 2,
              py: 1,
              backgroundColor: alpha(theme.palette.background.paper, 0.4),
            }}
          >
            Spiel laden
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ pl: 1, display: "block", mb: 1 }}
        >
          Einstellungen & Hilfe
        </Typography>

        <Stack spacing={0.5}>
          <Button
            variant="text"
            startIcon={<SchoolIcon />}
            onClick={() => {
              setTutorialOpen(true);
              toggleDrawer();
            }}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
              borderRadius: 1.5,
            }}
          >
            Schach-Anleitung
          </Button>

          <Button
            variant="text"
            startIcon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            onClick={toggleTheme}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
              borderRadius: 1.5,
            }}
          >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>

          <Button
            variant="text"
            startIcon={<SettingsIcon />}
            onClick={() => {
              setSettingsOpen(true);
              toggleDrawer();
            }}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
              borderRadius: 1.5,
            }}
          >
            Einstellungen
          </Button>

          <Button
            variant="text"
            startIcon={<HelpOutlineIcon />}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
              borderRadius: 1.5,
            }}
          >
            Hilfe & Support
          </Button>
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          p: 2,
          mt: "auto",
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          textAlign: "center",
        }}
      >
        <Button
          variant="text"
          size="small"
          startIcon={<PersonOutlineIcon />}
          sx={{ mb: 1, borderRadius: 4, textTransform: "none" }}
        >
          Profil & Account
        </Button>

        <Typography variant="caption" color="text.secondary" display="block">
          © {new Date().getFullYear()} ChessMaster Pro
        </Typography>
      </Box>
    </Drawer>
  );

  // Zeit für Timer berechnen
  const getTimerDuration = () => {
    const timeMap = {
      "3min": 180,
      "5min": 300,
      "10min": 600,
      "15min": 900,
      "30min": 1800,
    };

    return timeMap[appSettings.timeControl] || 600;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(145deg, ${alpha(
                  theme.palette.background.default,
                  0.97
                )}, ${alpha("#000", 0.95)})`
              : `linear-gradient(145deg, ${alpha(
                  theme.palette.background.default,
                  0.97
                )}, ${alpha("#f9f9f9", 0.95)})`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(90deg, ${alpha(
                    theme.palette.primary.dark,
                    0.8
                  )}, ${alpha(theme.palette.primary.main, 0.6)})`
                : `linear-gradient(90deg, ${
                    theme.palette.primary.main
                  }, ${alpha(theme.palette.primary.dark, 0.85)})`,
            borderBottom: `1px solid ${alpha(theme.palette.primary.dark, 0.1)}`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{
                mr: 2,
                borderRadius: 2,
                backgroundColor: alpha("#fff", 0.1),
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.2),
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SportEsportsIcon
                  sx={{
                    mr: 1.5,
                    fontSize: 28,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    background:
                      "linear-gradient(90deg, #fff, rgba(255,255,255,0.8))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  ChessMaster Pro
                </Typography>
              </Box>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <Stack direction="row" spacing={0.5} sx={{ mr: 2 }}>
                <Tooltip title="Schach-Anleitung">
                  <IconButton
                    color="inherit"
                    onClick={() => setTutorialOpen(true)}
                    size="small"
                    sx={{
                      backgroundColor: alpha("#fff", 0.1),
                      "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                    }}
                  >
                    <SchoolIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Neues Spiel">
                  <IconButton
                    color="inherit"
                    onClick={handleNewGame}
                    size="small"
                    sx={{
                      backgroundColor: alpha("#fff", 0.1),
                      "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Zug zurück">
                  <IconButton
                    color="inherit"
                    onClick={handleUndoMove}
                    size="small"
                    sx={{
                      backgroundColor: alpha("#fff", 0.1),
                      "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                    }}
                  >
                    <UndoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Brett drehen">
                  <IconButton
                    color="inherit"
                    onClick={handleFlipBoard}
                    size="small"
                    sx={{
                      backgroundColor: alpha("#fff", 0.1),
                      "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                    }}
                  >
                    <FlipIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Weitere Aktionen">
                  <IconButton
                    color="inherit"
                    onClick={handleActionMenuOpen}
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    size="small"
                    sx={{
                      backgroundColor: alpha("#fff", 0.1),
                      "&:hover": { backgroundColor: alpha("#fff", 0.2) },
                    }}
                  >
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="action-menu"
                  anchorEl={actionMenuAnchor}
                  keepMounted
                  open={Boolean(actionMenuAnchor)}
                  onClose={handleActionMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      borderRadius: 2,
                      minWidth: 200,
                      mt: 1,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? alpha(theme.palette.background.paper, 0.9)
                          : alpha(theme.palette.background.paper, 0.9),
                      backdropFilter: "blur(10px)",
                      overflow: "visible",
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: -5,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={handleSaveGame}
                    sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
                  >
                    <ListItemIcon>
                      <SaveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Spiel speichern</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={handleLoadGame}
                    sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
                  >
                    <ListItemIcon>
                      <FolderOpenIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Spiel laden</ListItemText>
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    onClick={() => {
                      setSettingsOpen(true);
                      handleActionMenuClose();
                    }}
                    sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
                  >
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Einstellungen</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleShareGame();
                      handleActionMenuClose();
                    }}
                    sx={{ py: 1.5, borderRadius: 1, mx: 0.5 }}
                  >
                    <ListItemIcon>
                      <ShareIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Spiel teilen</ListItemText>
                  </MenuItem>
                </Menu>
              </Stack>
            )}

            <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                  borderRadius: 2,
                  backgroundColor: alpha("#fff", 0.1),
                  "&:hover": {
                    backgroundColor: alpha("#fff", 0.2),
                  },
                }}
              >
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {renderDrawer()}

        <Container
          maxWidth="lg"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            mt: { xs: 3, md: 5 },
            mb: 4,
          }}
        >
          <Grid container spacing={3}>
            {/* Schachbrett */}
            <Grid item xs={12} md={8} lg={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ChessBoard
                  onMoveChange={handleMoveChange}
                  boardRef={boardRef}
                  onGameEnd={handleGameEnd}
                  settings={appSettings}
                />

                {/* Mobile Controls - Nur auf kleinen Bildschirmen anzeigen */}
                {isMobile && (
                  <Paper
                    elevation={1}
                    sx={{
                      mt: 2,
                      width: "94vw",
                      p: 1.5,
                      display: "flex",
                      justifyContent: "space-around",
                      borderRadius: 3,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.8
                      ),
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Tooltip title="Neues Spiel">
                      <IconButton
                        color="primary"
                        onClick={handleNewGame}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Zug zurück">
                      <IconButton
                        color="secondary"
                        onClick={handleUndoMove}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.secondary.main,
                            0.1
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.secondary.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <UndoIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Brett drehen">
                      <IconButton
                        onClick={handleFlipBoard}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.text.primary,
                            0.05
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.text.primary,
                              0.1
                            ),
                          },
                        }}
                      >
                        <FlipIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Spiel speichern">
                      <IconButton
                        onClick={handleSaveGame}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.success.main,
                            0.1
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.success.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Spiel laden">
                      <IconButton
                        onClick={handleLoadGame}
                        sx={{
                          backgroundColor: alpha(theme.palette.info.main, 0.1),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.info.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <FolderOpenIcon />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                )}
              </Box>
            </Grid>

            {/* Seitenleiste mit Spielinformationen */}
            <Grid item xs={12} md={4} lg={4}>
              <Box sx={{ mb: 3 }}>
                <ChessTimer
                  activePlayer={currentPlayer}
                  initialTime={getTimerDuration()}
                  increment={appSettings.timeIncrement}
                  onTimeUp={handleTimeUp}
                />
              </Box>

              <Box>
                <MoveHistory
                  moves={moves}
                  onMoveSelect={handleMoveSelect}
                  currentMoveIndex={currentMoveIndex}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Fußzeile */}
          <Box
            component={Paper}
            elevation={0}
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              ChessMaster Pro v{APP_VERSION} | © {new Date().getFullYear()}{" "}
              Chess Solutions GmbH
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Container>

        {/* Dialoge */}
        <AnimatePresence>
          {/* Spielende-Dialog */}
          {gameEndState && (
            <GameEndDialog
              open={!!gameEndState}
              result={gameEndState}
              onNewGame={handleNewGame}
              onClose={handleCloseGameEnd}
              onShare={handleShareGame}
              gameStats={{
                moveCount: gameStats.moveCount,
                gameDuration: gameStats.gameDuration || 0,
                capturedPieces: gameStats.capturedPieces,
                checks: gameStats.checks,
              }}
            />
          )}
        </AnimatePresence>

        {/* Einstellungen-Dialog */}
        <SettingsDialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onApply={handleApplySettings}
          initialSettings={appSettings}
        />

        {/* Schach-Anleitung */}
        <ChessTutorial
          open={tutorialOpen}
          onClose={() => setTutorialOpen(false)}
        />

        {/* Benachrichtigungen */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
