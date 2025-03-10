// src/components/GameModeSelection.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
  Container,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SportEsportsIcon from "@mui/icons-material/SportsEsports";
import SpeedIcon from "@mui/icons-material/Speed";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";

// Components
import AnimatedChessPieces from "./decorative/AnimatedChessPieces";
import DecorativeChessBoard from "./decorative/DecorativeChessBoard";
import StyledSlider from "./settings/shared/StyledSlider";

// Hooks
import { useGame } from "../contexts/GameContext";

/**
 * Game Mode Selection Overlay
 *
 * Displays at app startup to let users choose between playing against
 * computer or human opponent
 */
const GameModeSelection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { setAppSettings, handleNewGame } = useGame();
  const [selectedMode, setSelectedMode] = useState(null);
  const [difficulty, setDifficulty] = useState(5);

  // Handle game mode selection
  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  // Handle difficulty change
  const handleDifficultyChange = (event, value) => {
    setDifficulty(value);
  };

  // Start the game with selected settings
  const handleStartGame = () => {
    const isComputerMode = selectedMode === "computer";

    // Update app settings with the selected game mode
    setAppSettings((prev) => ({
      ...prev,
      gameMode: selectedMode,
      computerDifficulty: isComputerMode ? difficulty : prev.computerDifficulty,
    }));

    // Start a new game
    handleNewGame();
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Card animation variants
  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5 },
    tap: { scale: 0.98 },
    selected: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      y: -8,
    },
  };

  // Get difficulty label based on value
  const getDifficultyLabel = (value) => {
    // All 10 difficulty levels
    const labels = {
      1: "Anfänger",
      2: "Sehr leicht",
      3: "Leicht",
      4: "Einfach",
      5: "Mittel",
      6: "Anspruchsvoll",
      7: "Fortgeschritten",
      8: "Schwer",
      9: "Sehr schwer",
      10: "Experte",
    };

    return labels[value] || `Stufe ${value}`;
  };

  // Get color for difficulty level
  const getDifficultyColor = (value) => {
    if (value <= 3) return theme.palette.success.main;
    if (value <= 7) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Create marks for slider
  const difficultyMarks = [
    { value: 1, label: "Anfänger" },
    { value: 3, label: "Leicht" },
    { value: 5, label: "Mittel" },
    { value: 7, label: "Fortgeschritten" },
    { value: 10, label: "Experte" },
  ];

  // Render difficulty selection if computer mode is selected
  const renderDifficultySelection = () => {
    if (selectedMode !== "computer") return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(8px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PsychologyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" fontWeight={600}>
              Schwierigkeitsgrad wählen
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Wähle aus 10 Schwierigkeitsstufen - von Anfänger bis Experte
          </Typography>

          <StyledSlider
            value={difficulty}
            onChange={handleDifficultyChange}
            min={1}
            max={10}
            step={1}
            marks={difficultyMarks}
            label="Computer-Stärke"
            valueDisplay={getDifficultyLabel}
            icon={EmojiEventsIcon}
            sx={{ mt: 2, mb: 1 }}
          />

          {/* Visual difficulty representation */}
          <Box
            sx={{
              mt: 3,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: alpha(getDifficultyColor(difficulty), 0.1),
              border: `1px solid ${alpha(getDifficultyColor(difficulty), 0.2)}`,
            }}
          >
            <SmartToyIcon
              sx={{ mr: 1.5, color: getDifficultyColor(difficulty) }}
            />
            <Typography fontWeight={600} color={getDifficultyColor(difficulty)}>
              {difficulty === 10
                ? "Bereit dich auf eine echte Herausforderung vor!"
                : difficulty >= 8
                ? "Diese Schwierigkeitsstufe ist nur für erfahrene Spieler geeignet."
                : difficulty >= 5
                ? "Eine ausgewogene Herausforderung für regelmäßige Spieler."
                : "Perfekt um die Grundlagen zu erlernen und Selbstvertrauen aufzubauen."}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    );
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        bgcolor: alpha(theme.palette.background.default, 0.3),
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        p: 2,
      }}
    >
      {/* Animated chess pieces in the background */}
      <AnimatedChessPieces />
      <Container
        maxWidth="lg"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              gap: { xs: 3, md: 4 },
            }}
          >
            {/* Decorative chess board */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <DecorativeChessBoard
                size={isMobile ? 180 : 220}
                visible={true}
              />
            </motion.div>

            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  textAlign: "center",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: -1,
                  textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                ChessMaster
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  color: alpha(theme.palette.text.primary, 0.7),
                  fontWeight: 500,
                  mt: 1,
                }}
              >
                Wähle deinen Spielmodus
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Grid container spacing={isMobile ? 3 : 4} sx={{ mb: 4 }}>
            {/* Computer Mode */}
            <Grid item xs={12} sm={6}>
              <motion.div
                initial="initial"
                whileHover={selectedMode !== "computer" ? "hover" : undefined}
                whileTap={selectedMode !== "computer" ? "tap" : undefined}
                animate={selectedMode === "computer" ? "selected" : "initial"}
                variants={cardVariants}
              >
                <Paper
                  elevation={selectedMode === "computer" ? 8 : 3}
                  onClick={() => handleModeSelect("computer")}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    border:
                      selectedMode === "computer"
                        ? `2px solid ${theme.palette.primary.main}`
                        : "2px solid transparent",
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      selectedMode === "computer" ? 0.95 : 0.85
                    ),
                    overflow: "hidden",
                  }}
                >
                  {/* Background glow effect */}
                  {selectedMode === "computer" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        boxShadow: `0 0 20px 3px ${alpha(
                          theme.palette.primary.main,
                          0.5
                        )}`,
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.15
                        ),
                        mb: 2,
                      }}
                    >
                      <SmartToyIcon
                        sx={{
                          fontSize: 40,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Gegen Computer
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 3, color: "text.secondary" }}
                    >
                      Fordere die künstliche Intelligenz heraus und verbessere
                      deine Fähigkeiten in verschiedenen Schwierigkeitsstufen.
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        mt: "auto",
                      }}
                    >
                      <PersonIcon />
                      <Typography variant="body2">vs</Typography>
                      <SmartToyIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Human Mode */}
            <Grid item xs={12} sm={6}>
              <motion.div
                initial="initial"
                whileHover={selectedMode !== "human" ? "hover" : undefined}
                whileTap={selectedMode !== "human" ? "tap" : undefined}
                animate={selectedMode === "human" ? "selected" : "initial"}
                variants={cardVariants}
              >
                <Paper
                  elevation={selectedMode === "human" ? 8 : 3}
                  onClick={() => handleModeSelect("human")}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    border:
                      selectedMode === "human"
                        ? `2px solid ${theme.palette.secondary.main}`
                        : "2px solid transparent",
                    backgroundColor: alpha(
                      theme.palette.background.paper,
                      selectedMode === "human" ? 0.95 : 0.85
                    ),
                    overflow: "hidden",
                  }}
                >
                  {/* Background glow effect */}
                  {selectedMode === "human" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                        boxShadow: `0 0 20px 3px ${alpha(
                          theme.palette.secondary.main,
                          0.5
                        )}`,
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: alpha(
                          theme.palette.secondary.main,
                          0.15
                        ),
                        mb: 2,
                      }}
                    >
                      <PeopleIcon
                        sx={{
                          fontSize: 40,
                          color: theme.palette.secondary.main,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Gegen Freunde
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 3, color: "text.secondary" }}
                    >
                      Spiele gegen einen Freund am selben Gerät. Perfekt für
                      gesellige Runden oder um deine Taktik zu verbessern.
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        mt: "auto",
                      }}
                    >
                      <PersonIcon
                        sx={{ color: theme.palette.secondary.main }}
                      />
                      <Typography variant="body2">vs</Typography>
                      <PersonIcon
                        sx={{ color: theme.palette.secondary.main }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Difficulty selection (visible only for computer mode) */}
        {renderDifficultySelection()}

        {/* Start button */}
        <motion.div
          variants={itemVariants}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: selectedMode ? 1 : 0,
              y: selectedMode ? 0 : 20,
            }}
            transition={{ delay: 0.1 }}
          >
            <Tooltip
              title={!selectedMode ? "Bitte wähle einen Spielmodus" : ""}
              arrow
            >
              <span>
                {" "}
                {/* Wrapper needed for disabled Button in Tooltip */}
                <Button
                  variant="contained"
                  color={selectedMode === "computer" ? "primary" : "secondary"}
                  size="large"
                  disabled={!selectedMode}
                  onClick={handleStartGame}
                  startIcon={<SportEsportsIcon />}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    mt: 3,
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    boxShadow: 4,
                    backgroundImage:
                      selectedMode === "computer"
                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                        : `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                  }}
                >
                  Spiel starten
                </Button>
              </span>
            </Tooltip>
          </motion.div>
        </motion.div>

        {/* Bottom decoration */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 8,
            opacity: 0.6,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} ChessMaster • Wähle einen Modus um zu
            starten
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GameModeSelection;
