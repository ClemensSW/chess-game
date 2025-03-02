// src/App.jsx - Verbesserte Version mit Fehlerbehebungen
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

// Komponenten
import ChessBoard from "./components/ChessBoard";
import MoveHistory from "./components/MoveHistory";
import ChessTimer from "./components/ChessTimer";
import GameEndDialog from "./components/GameEndDialog";
import SettingsDialog from "./components/SettingsDialog";
import ChessTutorial from "./components/ChessTutorial";
import { getThemeByMode } from "./theme";
import { Chess } from "chess.js";

// App-Verion
const APP_VERSION = "1.1.0";

function App() {
  // Theme State
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );
  const theme = getThemeByMode(mode);

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
    boardTheme: "classic",
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
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Premium Chess
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleNewGame}
          fullWidth
          sx={{ mb: 1 }}
        >
          Neues Spiel
        </Button>

        <Button
          variant="outlined"
          startIcon={<UndoIcon />}
          onClick={handleUndoMove}
          fullWidth
          sx={{ mb: 1 }}
        >
          Zug zurück
        </Button>

        <Button
          variant="outlined"
          startIcon={<FlipIcon />}
          onClick={handleFlipBoard}
          fullWidth
          sx={{ mb: 1 }}
        >
          Brett drehen
        </Button>

        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleSaveGame}
          fullWidth
          sx={{ mb: 1 }}
        >
          Spiel speichern
        </Button>

        <Button
          variant="outlined"
          startIcon={<FolderOpenIcon />}
          onClick={handleLoadGame}
          fullWidth
          sx={{ mb: 1 }}
        >
          Spiel laden
        </Button>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          variant="text"
          startIcon={<SchoolIcon />}
          onClick={() => setTutorialOpen(true)}
          fullWidth
          sx={{ mb: 1, justifyContent: "flex-start" }}
        >
          Schach-Anleitung
        </Button>

        <Button
          variant="text"
          startIcon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          onClick={toggleTheme}
          fullWidth
          sx={{ mb: 1, justifyContent: "flex-start" }}
        >
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>

        <Button
          variant="text"
          startIcon={<SettingsIcon />}
          onClick={() => setSettingsOpen(true)}
          fullWidth
          sx={{ mb: 1, justifyContent: "flex-start" }}
        >
          Einstellungen
        </Button>

        <Button
          variant="text"
          startIcon={<InfoIcon />}
          fullWidth
          sx={{ mb: 1, justifyContent: "flex-start" }}
        >
          Über Premium Chess
        </Button>
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
          backgroundColor: "background.default",
          overflow: "hidden",
        }}
      >
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            {isMobile ? (
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 600 }}
              >
                <SportEsportsIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Premium Chess
              </Typography>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <>
                <Tooltip title="Schach-Anleitung">
                  <IconButton
                    color="inherit"
                    onClick={() => setTutorialOpen(true)}
                  >
                    <SchoolIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Neues Spiel">
                  <IconButton color="inherit" onClick={handleNewGame}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Zug zurück">
                  <IconButton color="inherit" onClick={handleUndoMove}>
                    <UndoIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Brett drehen">
                  <IconButton color="inherit" onClick={handleFlipBoard}>
                    <FlipIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Weitere Aktionen">
                  <IconButton
                    color="inherit"
                    onClick={handleActionMenuOpen}
                    aria-controls="action-menu"
                    aria-haspopup="true"
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="action-menu"
                  anchorEl={actionMenuAnchor}
                  keepMounted
                  open={Boolean(actionMenuAnchor)}
                  onClose={handleActionMenuClose}
                >
                  <MenuItem onClick={handleSaveGame}>
                    <ListItemIcon>
                      <SaveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Spiel speichern</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleLoadGame}>
                    <ListItemIcon>
                      <FolderOpenIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Spiel laden</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => setSettingsOpen(true)}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Einstellungen</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleShareGame()}>
                    <ListItemIcon>
                      <ShareIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Spiel teilen</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            )}

            <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
              <IconButton color="inherit" onClick={toggleTheme}>
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
            mt: { xs: 2, md: 4 },
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
                    elevation={2}
                    sx={{
                      mt: 2,
                      width: "94vw",
                      p: 1.5,
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Tooltip title="Neues Spiel">
                      <IconButton color="primary" onClick={handleNewGame}>
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Zug zurück">
                      <IconButton color="secondary" onClick={handleUndoMove}>
                        <UndoIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Brett drehen">
                      <IconButton onClick={handleFlipBoard}>
                        <FlipIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Spiel speichern">
                      <IconButton onClick={handleSaveGame}>
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Spiel laden">
                      <IconButton onClick={handleLoadGame}>
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
              borderRadius: 2,
              textAlign: "center",
              backgroundColor: "transparent",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Premium Chess v{APP_VERSION} | © {new Date().getFullYear()} Your
              Company
            </Typography>
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
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
