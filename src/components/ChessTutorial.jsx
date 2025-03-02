// src/components/ChessTutorial.jsx - Modernisierte Version
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Paper,
  Grid,
  useTheme,
  alpha,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import CheckIcon from "@mui/icons-material/Check";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ExtensionIcon from "@mui/icons-material/Extension";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { motion } from "framer-motion";

// Figur-Komponente für die Anleitung
const PieceDisplay = ({ type, color, description }) => {
  const theme = useTheme();

  // Figurensymbole
  const pieceSymbols = {
    king: { w: "♔", b: "♚" }, // König
    queen: { w: "♕", b: "♛" }, // Dame
    rook: { w: "♖", b: "♜" }, // Turm
    bishop: { w: "♗", b: "♝" }, // Läufer
    knight: { w: "♘", b: "♞" }, // Springer
    pawn: { w: "♙", b: "♟" }, // Bauer
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 1,
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          transform: "translateX(5px)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 50,
          height: 50,
          bgcolor: alpha(
            color === "w" ? "#FFFFFF" : "#000000",
            theme.palette.mode === "dark" ? 0.9 : 0.9
          ),
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          boxShadow: theme.shadows[2],
          mr: 2,
          color: color === "w" ? "#000000" : "#FFFFFF",
          fontSize: "2rem",
          fontWeight: "normal",
        }}
      >
        {pieceSymbols[type][color]}
      </Avatar>

      <Typography variant="body1" fontWeight={500}>
        {description}
      </Typography>
    </Box>
  );
};

// Bewegungsmuster-Diagramm
const MovementDiagram = ({ type }) => {
  const theme = useTheme();
  const cellSize = 36;
  const boardSize = 7; // 7x7 Brett für Übersichtlichkeit

  // Zellen für verschiedene Figurtypen markieren
  const getMarkedCells = () => {
    const centerPos = Math.floor(boardSize / 2);

    // Definiere, welche Zellen für welche Figur markiert werden sollen
    switch (type) {
      case "king":
        return [
          { row: centerPos - 1, col: centerPos - 1 },
          { row: centerPos - 1, col: centerPos },
          { row: centerPos - 1, col: centerPos + 1 },
          { row: centerPos, col: centerPos - 1 },
          { row: centerPos, col: centerPos + 1 },
          { row: centerPos + 1, col: centerPos - 1 },
          { row: centerPos + 1, col: centerPos },
          { row: centerPos + 1, col: centerPos + 1 },
        ];
      case "queen":
        const queenMoves = [];
        // Horizontale und vertikale Linien
        for (let i = 0; i < boardSize; i++) {
          if (i !== centerPos) {
            queenMoves.push({ row: centerPos, col: i });
            queenMoves.push({ row: i, col: centerPos });
          }
        }
        // Diagonalen
        for (let i = 1; i < boardSize; i++) {
          if (centerPos + i < boardSize && centerPos + i < boardSize)
            queenMoves.push({ row: centerPos + i, col: centerPos + i });
          if (centerPos - i >= 0 && centerPos - i >= 0)
            queenMoves.push({ row: centerPos - i, col: centerPos - i });
          if (centerPos + i < boardSize && centerPos - i >= 0)
            queenMoves.push({ row: centerPos + i, col: centerPos - i });
          if (centerPos - i >= 0 && centerPos + i < boardSize)
            queenMoves.push({ row: centerPos - i, col: centerPos + i });
        }
        return queenMoves;
      case "rook":
        const rookMoves = [];
        for (let i = 0; i < boardSize; i++) {
          if (i !== centerPos) {
            rookMoves.push({ row: centerPos, col: i });
            rookMoves.push({ row: i, col: centerPos });
          }
        }
        return rookMoves;
      case "bishop":
        const bishopMoves = [];
        for (let i = 1; i < boardSize; i++) {
          if (centerPos + i < boardSize && centerPos + i < boardSize)
            bishopMoves.push({ row: centerPos + i, col: centerPos + i });
          if (centerPos - i >= 0 && centerPos - i >= 0)
            bishopMoves.push({ row: centerPos - i, col: centerPos - i });
          if (centerPos + i < boardSize && centerPos - i >= 0)
            bishopMoves.push({ row: centerPos + i, col: centerPos - i });
          if (centerPos - i >= 0 && centerPos + i < boardSize)
            bishopMoves.push({ row: centerPos - i, col: centerPos + i });
        }
        return bishopMoves;
      case "knight":
        return [
          { row: centerPos - 2, col: centerPos - 1 },
          { row: centerPos - 2, col: centerPos + 1 },
          { row: centerPos - 1, col: centerPos - 2 },
          { row: centerPos - 1, col: centerPos + 2 },
          { row: centerPos + 1, col: centerPos - 2 },
          { row: centerPos + 1, col: centerPos + 2 },
          { row: centerPos + 2, col: centerPos - 1 },
          { row: centerPos + 2, col: centerPos + 1 },
        ];
      case "pawn":
        return [
          { row: centerPos - 1, col: centerPos, special: "move" },
          { row: centerPos - 2, col: centerPos, special: "firstMove" },
          { row: centerPos - 1, col: centerPos - 1, special: "capture" },
          { row: centerPos - 1, col: centerPos + 1, special: "capture" },
        ];
      default:
        return [];
    }
  };

  const markedCells = getMarkedCells();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            boxShadow: theme.shadows[3],
          }}
        >
          {[...Array(boardSize * boardSize)].map((_, index) => {
            const row = Math.floor(index / boardSize);
            const col = index % boardSize;
            const isCenter =
              row === Math.floor(boardSize / 2) &&
              col === Math.floor(boardSize / 2);

            // Prüfe, ob die Zelle markiert werden soll
            const markedCell = markedCells.find(
              (cell) => cell.row === row && cell.col === col
            );
            const isMarked = !!markedCell;

            // Unterschiedliche Markierungen für Bauern-Zugtypen
            let specialStyle = {};
            if (markedCell?.special === "capture") {
              specialStyle = {
                backgroundColor: alpha(theme.palette.error.main, 0.3),
                border: `2px dashed ${theme.palette.error.main}`,
              };
            } else if (markedCell?.special === "firstMove") {
              specialStyle = {
                backgroundColor: alpha(theme.palette.info.main, 0.2),
                border: `2px dashed ${theme.palette.info.main}`,
              };
            }

            const isDark = (row + col) % 2 === 1;

            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: isCenter
                    ? alpha(theme.palette.primary.main, 0.3)
                    : isMarked
                    ? markedCell.special
                      ? specialStyle.backgroundColor
                      : alpha(theme.palette.success.main, 0.2)
                    : isDark
                    ? "#B58863"
                    : "#F0D9B5",
                  width: cellSize,
                  height: cellSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isCenter
                    ? `2px solid ${theme.palette.primary.main}`
                    : isMarked && markedCell.special
                    ? specialStyle.border
                    : isMarked
                    ? `2px dashed ${theme.palette.success.main}`
                    : "none",
                  boxShadow: isCenter
                    ? `0 0 8px ${alpha(theme.palette.primary.main, 0.5)}`
                    : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {isCenter && (
                  <Typography
                    variant="h5"
                    sx={{
                      color: isDark ? "#F0D9B5" : "#B58863",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                      fontWeight: "bold",
                    }}
                  >
                    {type === "king"
                      ? "♔"
                      : type === "queen"
                      ? "♕"
                      : type === "rook"
                      ? "♖"
                      : type === "bishop"
                      ? "♗"
                      : type === "knight"
                      ? "♘"
                      : "♙"}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        {type === "pawn" && (
          <Card
            elevation={0}
            sx={{
              width: "100%",
              mt: 1,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Legende:
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: alpha(theme.palette.success.main, 0.2),
                      border: `2px dashed ${theme.palette.success.main}`,
                      mr: 1,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">Normaler Zug</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: alpha(theme.palette.info.main, 0.2),
                      border: `2px dashed ${theme.palette.info.main}`,
                      mr: 1,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">Erster Zug (2 Felder)</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: alpha(theme.palette.error.main, 0.3),
                      border: `2px dashed ${theme.palette.error.main}`,
                      mr: 1,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">Schlagzug (diagonal)</Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}
      </Box>
    </motion.div>
  );
};

// Hauptkomponente
const ChessTutorial = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  // Schritte für den Stepper
  const steps = [
    {
      label: "Grundlagen",
      icon: <WidgetsIcon />,
      content: (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              pb: 1,
              borderBottom: `2px solid ${alpha(
                theme.palette.primary.main,
                0.2
              )}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <WidgetsIcon sx={{ mr: 1.5 }} /> Das Schachbrett & die Figuren
          </Typography>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={600}
                sx={{ color: theme.palette.secondary.main, mb: 2 }}
              >
                Das Schachbrett
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 2, lineHeight: 1.7 }}
              >
                Schach wird auf einem 8×8-Brett gespielt. Die 64 Felder sind
                abwechselnd hell und dunkel gefärbt. Das Brett wird so
                positioniert, dass jeder Spieler ein weißes Feld in der rechten
                unteren Ecke hat.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 3, lineHeight: 1.7 }}
              >
                Die horizontalen Reihen werden mit Zahlen von 1 bis 8
                bezeichnet, beginnend an der weißen Seite des Bretts. Die
                vertikalen Spalten werden mit Buchstaben von a bis h bezeichnet,
                von links nach rechts aus der Sicht des weißen Spielers.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(8, 1fr)",
                    width: "300px",
                    height: "300px",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: theme.shadows[4],
                  }}
                >
                  {[...Array(64)].map((_, index) => {
                    const row = Math.floor(index / 8);
                    const col = index % 8;
                    const isDark = (row + col) % 2 === 1;

                    // Koordinaten anzeigen
                    const showRowNum = col === 0;
                    const showColLetter = row === 7;

                    return (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: isDark ? "#B58863" : "#F0D9B5",
                          width: "100%",
                          height: "100%",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* Zeige Koordinaten */}
                        {showRowNum && (
                          <Typography
                            sx={{
                              position: "absolute",
                              top: 2,
                              left: 4,
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              color: isDark ? "#ddd" : "#777",
                            }}
                          >
                            {8 - row}
                          </Typography>
                        )}
                        {showColLetter && (
                          <Typography
                            sx={{
                              position: "absolute",
                              bottom: 2,
                              right: 4,
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              color: isDark ? "#ddd" : "#777",
                            }}
                          >
                            {String.fromCharCode(97 + col)}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mb: 2, mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight={600}
                      sx={{
                        color: theme.palette.secondary.main,
                        mb: 2,
                        borderBottom: `2px solid ${alpha(
                          theme.palette.secondary.main,
                          0.2
                        )}`,
                        pb: 1,
                      }}
                    >
                      Die Figuren
                    </Typography>

                    <Typography paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
                      Jeder Spieler beginnt mit 16 Figuren:
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <PieceDisplay
                        type="king"
                        color="w"
                        description="1 König - Wertvollste Figur"
                      />
                      <PieceDisplay
                        type="queen"
                        color="w"
                        description="1 Dame - Stärkste Figur"
                      />
                      <PieceDisplay
                        type="rook"
                        color="w"
                        description="2 Türme"
                      />
                      <PieceDisplay
                        type="bishop"
                        color="w"
                        description="2 Läufer"
                      />
                      <PieceDisplay
                        type="knight"
                        color="w"
                        description="2 Springer"
                      />
                      <PieceDisplay
                        type="pawn"
                        color="w"
                        description="8 Bauern"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight={600}
                      sx={{
                        color: theme.palette.secondary.main,
                        mb: 2,
                        borderBottom: `2px solid ${alpha(
                          theme.palette.secondary.main,
                          0.2
                        )}`,
                        pb: 1,
                      }}
                    >
                      Startaufstellung
                    </Typography>

                    <Typography paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
                      Die Figuren werden wie folgt aufgestellt:
                    </Typography>

                    <Box
                      sx={{
                        pl: 2,
                        pr: 2,
                        py: 2,
                        borderRadius: 2,
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          0.5
                        ),
                        boxShadow: `inset 0 0 5px ${alpha(
                          theme.palette.divider,
                          0.2
                        )}`,
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ pl: 2 }}
                      >
                        <ul style={{ lineHeight: 1.8, paddingLeft: 16 }}>
                          <li>
                            <b>Bauern:</b> Zweite Reihe
                          </li>
                          <li>
                            <b>Türme:</b> Ecken (a1, h1 für Weiß; a8, h8 für
                            Schwarz)
                          </li>
                          <li>
                            <b>Springer:</b> Neben den Türmen
                          </li>
                          <li>
                            <b>Läufer:</b> Neben den Springern
                          </li>
                          <li>
                            <b>Dame:</b> Auf dem eigenen Farbfeld (d1 für Weiß,
                            d8 für Schwarz)
                          </li>
                          <li>
                            <b>König:</b> Neben der Dame (e1 für Weiß, e8 für
                            Schwarz)
                          </li>
                        </ul>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.info.main, 0.2)
                  : alpha(theme.palette.info.main, 0.08),
              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
              display: "flex",
              alignItems: "flex-start",
              mt: 3,
            }}
          >
            <LightbulbIcon
              color="info"
              sx={{
                mr: 2,
                fontSize: 28,
                filter: `drop-shadow(0 1px 2px ${alpha(
                  theme.palette.info.main,
                  0.5
                )})`,
                mt: 0.5,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Einfache Eselsbrücke:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                "Die Dame steht auf ihrer Farbe" - Die weiße Dame steht auf
                weißem Feld (d1), die schwarze Dame auf schwarzem Feld (d8).
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      label: "Figuren und Zugregeln",
      icon: <ExtensionIcon />,
      content: (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              pb: 1,
              borderBottom: `2px solid ${alpha(
                theme.palette.primary.main,
                0.2
              )}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ExtensionIcon sx={{ mr: 1.5 }} /> Bewegungsmuster der Figuren
          </Typography>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                color="primary"
              >
                König
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Der König kann ein Feld in jede Richtung ziehen (horizontal,
                    vertikal oder diagonal). Er ist die wichtigste Figur - wenn
                    er geschlagen wird (Schachmatt), ist das Spiel verloren.
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Der König kann nicht auf ein Feld ziehen, das von einer
                    gegnerischen Figur bedroht wird.
                  </Typography>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.warning.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.warning.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Sonderregel: Rochade
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Ein besonderer Zug, bei dem König und Turm gleichzeitig
                      bewegt werden. Mehr dazu im Abschnitt "Spezielle Züge".
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MovementDiagram type="king" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                color="primary"
              >
                Dame
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Die Dame ist die stärkste Figur. Sie kann beliebig viele
                    freie Felder in jede Richtung ziehen (horizontal, vertikal
                    oder diagonal).
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Sie kombiniert die Zugmöglichkeiten von Turm und Läufer und
                    ist daher besonders mächtig auf dem Spielfeld.
                  </Typography>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.info.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Strategischer Hinweis:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Die Dame sollte nicht zu früh ins Spiel gebracht werden,
                      da sie leicht von gegnerischen Figuren bedroht werden
                      kann.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MovementDiagram type="queen" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                color="primary"
              >
                Turm
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Der Turm kann beliebig viele freie Felder horizontal
                    (Reihen) oder vertikal (Linien) ziehen.
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Türme sind besonders wertvoll in offenen Stellungen und im
                    Endspiel, wo sie große Kontrolle über das Brett ausüben
                    können.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.success.main,
                        0.2
                      )}`,
                    }}
                  >
                    <CheckIcon
                      sx={{ color: theme.palette.success.main, mr: 1 }}
                    />
                    <Typography variant="body2">
                      Ein Turm kontrolliert in einer offenen Position bis zu 14
                      Felder!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MovementDiagram type="rook" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                color="primary"
              >
                Läufer
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Der Läufer kann beliebig viele freie Felder diagonal ziehen.
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Jeder Läufer bleibt immer auf Feldern der gleichen Farbe -
                    ein weißfeldriger Läufer kann niemals auf ein schwarzes Feld
                    ziehen und umgekehrt.
                  </Typography>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.info.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Strategischer Tipp:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Ein Läuferpaar (beide Läufer zusammen) kann sehr stark
                      sein, da sie gemeinsam Felder beider Farben kontrollieren
                      können.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MovementDiagram type="bishop" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                color="primary"
              >
                Springer
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Der Springer bewegt sich in einem "L"-Muster: zwei Felder
                    horizontal oder vertikal und dann ein Feld im rechten
                    Winkel.
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Der Springer ist die einzige Figur, die über andere Figuren
                    "springen" kann und damit besonders wertvoll in
                    geschlossenen Stellungen ist.
                  </Typography>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.warning.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.warning.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Besonderheit:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Der Springer wechselt mit jedem Zug die Feldfarbe - von
                      einem weißen Feld springt er immer auf ein schwarzes und
                      umgekehrt.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MovementDiagram type="knight" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                color="primary"
              >
                Bauer
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Bauern bewegen sich nur vorwärts:
                  </Typography>
                  <Box
                    sx={{
                      pl: 2,
                      pr: 2,
                      py: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      boxShadow: `inset 0 0 5px ${alpha(
                        theme.palette.divider,
                        0.2
                      )}`,
                      mb: 2,
                    }}
                  >
                    <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
                      <li>Ein Feld geradeaus (wenn das Feld frei ist)</li>
                      <li>Beim ersten Zug optional zwei Felder</li>
                      <li>Schlagen diagonal vorwärts</li>
                    </Typography>
                  </Box>

                  <Typography paragraph sx={{ fontWeight: 600 }}>
                    Sonderregeln:
                  </Typography>
                  <Box
                    sx={{
                      pl: 2,
                      pr: 2,
                      py: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      boxShadow: `inset 0 0 5px ${alpha(
                        theme.palette.divider,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography component="ul" variant="body1" sx={{ pl: 2 }}>
                      <li>
                        <b>En Passant</b> (im Vorbeigehen)
                      </li>
                      <li>
                        <b>Umwandlung</b> bei Erreichen der letzten Reihe
                      </li>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MovementDiagram type="pawn" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ),
    },
    {
      label: "Spezielle Züge",
      icon: <EmojiEventsIcon />,
      content: (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              pb: 1,
              borderBottom: `2px solid ${alpha(
                theme.palette.primary.main,
                0.2
              )}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <EmojiEventsIcon sx={{ mr: 1.5 }} /> Besondere Schachregeln
          </Typography>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.secondary.main, mb: 2 }}
              >
                Die Rochade
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Die Rochade ist ein spezieller Zug, bei dem der König und ein
                Turm gleichzeitig bewegt werden. Es ist der einzige Zug, bei dem
                zwei Figuren auf einmal gezogen werden.
              </Typography>

              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      gutterBottom
                    >
                      Kurze Rochade (O-O):
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      König bewegt sich zwei Felder zum Turm auf der Königsseite
                      (h-Linie), und der Turm springt auf die andere Seite des
                      Königs.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      gutterBottom
                    >
                      Lange Rochade (O-O-O):
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      König bewegt sich zwei Felder zum Turm auf der Damenseite
                      (a-Linie), und der Turm springt auf die andere Seite des
                      Königs.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.secondary.dark, 0.1)
                      : alpha(theme.palette.secondary.light, 0.1),
                  border: `1px solid ${alpha(
                    theme.palette.secondary.main,
                    0.3
                  )}`,
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Voraussetzungen für die Rochade:
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography
                    component="ul"
                    variant="body1"
                    sx={{ lineHeight: 1.8 }}
                  >
                    <li>
                      König und beteiligter Turm dürfen noch nicht bewegt worden
                      sein
                    </li>
                    <li>Keine Figuren zwischen König und Turm</li>
                    <li>König darf nicht im Schach stehen</li>
                    <li>König darf nicht über ein bedrohtes Feld ziehen</li>
                    <li>König darf nicht auf ein bedrohtes Feld ziehen</li>
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Chip
                    icon={<EmojiObjectsIcon />}
                    label="Strategischer Zweck: Sicherheit des Königs und Aktivierung des Turms"
                    color="secondary"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>
              </Paper>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.secondary.main, mb: 2 }}
              >
                En Passant (Im Vorbeigehen)
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Wenn ein Bauer von seiner Startposition aus zwei Felder vorrückt
                und dabei neben einem gegnerischen Bauern landet, kann dieser
                gegnerische Bauer ihn "im Vorbeigehen" schlagen, als ob er nur
                ein Feld vorgerückt wäre.
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Dieser spezielle Schlagzug muss unmittelbar im nächsten Zug
                ausgeführt werden, sonst verfällt das Recht auf "En Passant".
              </Typography>

              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.info.main, 0.15)
                      : alpha(theme.palette.info.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <EmojiObjectsIcon
                  color="info"
                  sx={{
                    mr: 2,
                    fontSize: 28,
                    filter: `drop-shadow(0 1px 2px ${alpha(
                      theme.palette.info.main,
                      0.5
                    )})`,
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Wichtig zu wissen:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Diese Regel verhindert, dass ein Bauer mit seinem
                    Doppelschritt einem Schlagzug durch einen gegnerischen
                    Bauern entgehen kann. Sie ist eine der am häufigsten
                    übersehenen Regeln für Anfänger!
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.secondary.main, mb: 2 }}
              >
                Bauernumwandlung
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Wenn ein Bauer die gegnerische Grundreihe (8. Reihe für Weiß, 1.
                Reihe für Schwarz) erreicht, wird er umgewandelt. Der Spieler
                muss den Bauern in eine Dame, einen Turm, einen Läufer oder
                einen Springer der eigenen Farbe umwandeln.
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                In den meisten Fällen wird der Bauer in eine Dame umgewandelt,
                da sie die stärkste Figur ist. Diese Umwandlung kann dazu
                führen, dass ein Spieler mehr als eine Dame hat.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "80%",
                    py: 2,
                    px: 3,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    border: `1px dashed ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                  }}
                >
                  <Tooltip title="Dame">
                    <Typography
                      variant="h3"
                      color={theme.palette.mode === "dark" ? "white" : "black"}
                    >
                      ♕
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Turm">
                    <Typography
                      variant="h3"
                      color={theme.palette.mode === "dark" ? "white" : "black"}
                    >
                      ♖
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Läufer">
                    <Typography
                      variant="h3"
                      color={theme.palette.mode === "dark" ? "white" : "black"}
                    >
                      ♗
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Springer">
                    <Typography
                      variant="h3"
                      color={theme.palette.mode === "dark" ? "white" : "black"}
                    >
                      ♘
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>

              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.info.main, 0.15)
                      : alpha(theme.palette.info.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <EmojiObjectsIcon
                  color="info"
                  sx={{
                    mr: 2,
                    fontSize: 28,
                    filter: `drop-shadow(0 1px 2px ${alpha(
                      theme.palette.info.main,
                      0.5
                    )})`,
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Fortgeschrittener Tipp:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    In seltenen Fällen kann es taktisch vorteilhaft sein, in
                    einen Springer oder eine andere Figur umzuwandeln statt in
                    eine Dame. Dies nennt man "Unterverwandlung" und kann z.B.
                    notwendig sein, um ein sofortiges Patt zu vermeiden.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ),
    },
    {
      label: "Schach, Schachmatt und Patt",
      icon: <SportsKabaddiIcon />,
      content: (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              pb: 1,
              borderBottom: `2px solid ${alpha(
                theme.palette.primary.main,
                0.2
              )}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <SportsKabaddiIcon sx={{ mr: 1.5 }} /> Spielende und besondere
            Situationen
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: theme.palette.error.main, mb: 2 }}
                  >
                    Schach
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Ein König steht im Schach, wenn er von einer gegnerischen
                    Figur angegriffen wird. Ein Spieler, dessen König im Schach
                    steht, muss sofort reagieren und den Schach abwehren.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PHBhdGggZmlsbD0iI2JmYmZiZiIgZD0iTTAgMGg4MDB2ODAwaC04MDB6Ii8+PGcgZmlsbD0iIzkzOTM5MyI+PHBhdGggZD0iTTAgMGg4MDB2MTAwSDBNMCAmI3hBOzIwMGg4MDB2MTAwSDBNMCA0MDBo"
                      alt="Schach Beispiel"
                      style={{
                        width: "80%",
                        borderRadius: 8,
                        boxShadow: theme.shadows[4],
                      }}
                    />
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Es gibt drei Möglichkeiten, ein Schach abzuwehren:
                    </Typography>
                    <Typography
                      component="ol"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.7 }}
                    >
                      <li>Den König auf ein sicheres Feld ziehen</li>
                      <li>Die angreifende Figur schlagen</li>
                      <li>
                        Eine eigene Figur zwischen König und Angreifer stellen
                        (nicht möglich bei Springer-Schach)
                      </li>
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: theme.palette.error.main, mb: 2 }}
                  >
                    Schachmatt
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Schachmatt ist die Situation, wenn ein König im Schach steht
                    und keine Möglichkeit hat, das Schach abzuwehren. Dies
                    beendet das Spiel, und der Spieler, dessen König schachmatt
                    gesetzt wurde, verliert.
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Beim Schachmatt gilt:
                    </Typography>
                    <Typography
                      component="ul"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.7 }}
                    >
                      <li>Der König steht im Schach</li>
                      <li>Der König kann nicht auf ein sicheres Feld ziehen</li>
                      <li>
                        Die angreifende Figur kann nicht geschlagen werden
                      </li>
                      <li>
                        Das Schach kann nicht durch Dazwischenziehen einer Figur
                        abgewehrt werden
                      </li>
                    </Typography>
                  </Paper>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.warning.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.warning.main,
                        0.3
                      )}`,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SportsKabaddiIcon
                      color="warning"
                      sx={{ mr: 1.5, fontSize: 24 }}
                    />
                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      Das Wort "Schachmatt" kommt aus dem Persischen "Shah Mat"
                      und bedeutet "Der König ist tot" oder "Der König ist
                      besiegt".
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  mt: 3,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                  border: `1px solid ${alpha(
                    theme.palette.secondary.main,
                    0.2
                  )}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: theme.palette.secondary.main, mb: 2 }}
                  >
                    Patt
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Patt ist eine Situation, in der ein Spieler am Zug ist, aber
                    keinen legalen Zug machen kann, wobei sein König NICHT im
                    Schach steht. Patt führt zu einem Remis (Unentschieden).
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Typische Patt-Situationen entstehen oft im Endspiel, wenn
                    ein Spieler mit überlegenen Kräften nicht vorsichtig genug
                    spielt und dem Gegner keine legalen Züge mehr lässt.
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      icon={<EmojiObjectsIcon />}
                      label="Patt ist ein wichtiges taktisches Motiv für den verteidigenden Spieler"
                      color="secondary"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  mt: 3,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: theme.palette.text.primary, mb: 2 }}
                  >
                    Weitere Remis-Arten
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.default,
                            0.5
                          ),
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.2
                          )}`,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          gutterBottom
                        >
                          Einvernehmliches Remis:
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                          Die Spieler können jederzeit ein Remis vereinbaren.
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.default,
                            0.5
                          ),
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.2
                          )}`,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          gutterBottom
                        >
                          Dreifache Stellungswiederholung:
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                          Wenn die gleiche Stellung (mit denselben
                          Zugmöglichkeiten) dreimal auftritt, kann Remis
                          beansprucht werden.
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.default,
                            0.5
                          ),
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.2
                          )}`,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          gutterBottom
                        >
                          50-Züge-Regel:
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                          Wenn 50 aufeinanderfolgende Züge ohne Bauernzug oder
                          Schlagzug gemacht wurden, kann Remis beansprucht
                          werden.
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.default,
                            0.5
                          ),
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.2
                          )}`,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          gutterBottom
                        >
                          Ungenügendes Material:
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                          Wenn keine Seite genügend Material hat, um ein
                          Schachmatt zu erzwingen (z.B. König gegen König, oder
                          König und Läufer gegen König).
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Grundlegende Strategien",
      icon: <PsychologyIcon />,
      content: (
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              mb: 3,
              pb: 1,
              borderBottom: `2px solid ${alpha(
                theme.palette.primary.main,
                0.2
              )}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <PsychologyIcon sx={{ mr: 1.5 }} /> Schach-Strategie für Anfänger
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: theme.palette.primary.main, mb: 2 }}
                  >
                    Die Eröffnung
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    In der Eröffnungsphase geht es darum, die Figuren zu
                    entwickeln, Kontrolle über das Zentrum zu erlangen und den
                    König in Sicherheit zu bringen.
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Grundprinzipien der Eröffnung:
                    </Typography>
                    <Typography
                      component="ol"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.8 }}
                    >
                      <li>
                        Kontrolliere das Zentrum (die Felder e4, d4, e5, d5)
                      </li>
                      <li>
                        Entwickle deine Leichtfiguren (Springer und Läufer) früh
                      </li>
                      <li>
                        Rochiere, um deinen König in Sicherheit zu bringen
                      </li>
                      <li>
                        Verbinde deine Türme (bringe sie auf die gleiche Reihe)
                      </li>
                      <li>
                        Bewege die Bauern sparsam, um deine Stellung nicht zu
                        schwächen
                      </li>
                    </Typography>
                  </Paper>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      border: `1px solid ${alpha(
                        theme.palette.info.main,
                        0.2
                      )}`,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Gängige Eröffnungen für Anfänger:
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <Chip
                          label="Italienische Partie"
                          size="small"
                          sx={{
                            mb: 1,
                            fontWeight: 500,
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Chip
                          label="Spanische Partie"
                          size="small"
                          sx={{
                            mb: 1,
                            fontWeight: 500,
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Chip
                          label="Sizilianische Verteidigung"
                          size="small"
                          sx={{
                            mb: 1,
                            fontWeight: 500,
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Chip
                          label="Französische Verteidigung"
                          size="small"
                          sx={{
                            mb: 1,
                            fontWeight: 500,
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Chip
                          label="Damengambit"
                          size="small"
                          sx={{
                            fontWeight: 500,
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
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                  border: `1px solid ${alpha(
                    theme.palette.secondary.main,
                    0.2
                  )}`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: theme.palette.secondary.main, mb: 2 }}
                  >
                    Das Mittelspiel
                  </Typography>

                  <Typography paragraph sx={{ lineHeight: 1.7 }}>
                    Im Mittelspiel geht es um taktische und strategische
                    Elemente, Angriff und Verteidigung. Hier entfaltet sich das
                    eigentliche Schachspiel mit all seinen komplexen
                    Möglichkeiten.
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.5
                          ),
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          gutterBottom
                        >
                          Wichtige Taktiken:
                        </Typography>
                        <Typography
                          component="ul"
                          variant="body2"
                          sx={{ pl: 2, lineHeight: 1.7 }}
                        >
                          <li>
                            <b>Gabel:</b> Eine Figur greift zwei gegnerische
                            Figuren gleichzeitig an
                          </li>
                          <li>
                            <b>Spieß:</b> Eine Figur greift zwei gegnerische
                            Figuren an, die hintereinander stehen
                          </li>
                          <li>
                            <b>Fesselung:</b> Eine Figur kann nicht ziehen, weil
                            sonst eine wertvollere Figur dahinter gefährdet wäre
                          </li>
                          <li>
                            <b>Abzugsschach:</b> Eine Figur zieht weg und gibt
                            Schach durch eine andere Figur
                          </li>
                          <li>
                            <b>Doppelschach:</b> Zwei Figuren geben gleichzeitig
                            Schach
                          </li>
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.5
                          ),
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          gutterBottom
                        >
                          Strategische Elemente:
                        </Typography>
                        <Typography
                          component="ul"
                          variant="body2"
                          sx={{ pl: 2, lineHeight: 1.7 }}
                        >
                          <li>
                            <b>Figurenaktivität:</b> Positioniere deine Figuren
                            auf aktiven Feldern
                          </li>
                          <li>
                            <b>Bauernstruktur:</b> Achte auf schwache und starke
                            Bauern
                          </li>
                          <li>
                            <b>Offene Linien:</b> Nutze offene Linien für deine
                            Türme
                          </li>
                          <li>
                            <b>Kontrolle wichtiger Felder</b> (besonders im
                            Zentrum)
                          </li>
                          <li>
                            <b>Koordination:</b> Koordiniere deine Figuren für
                            Angriff oder Verteidigung
                          </li>
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card
            elevation={0}
            sx={{
              mt: 3,
              mb: 4,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.success.main, 0.08),
              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{ color: theme.palette.success.main, mb: 2 }}
              >
                Das Endspiel
              </Typography>

              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                Im Endspiel sind nur noch wenige Figuren auf dem Brett. Der
                König wird zu einer aktiven Figur, und Bauern werden oft
                entscheidend, da sie zu Damen umgewandelt werden können.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Grundregeln für das Endspiel:
                    </Typography>
                    <Typography
                      component="ul"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.7 }}
                    >
                      <li>Aktiviere deinen König und bringe ihn ins Zentrum</li>
                      <li>Strebe nach Bauernumwandlung</li>
                      <li>
                        Behalte die Opposition (Könige stehen sich gegenüber)
                      </li>
                      <li>
                        Freibauern (Bauern ohne gegnerische Bauern auf der
                        gleichen oder benachbarten Linien) sind sehr wertvoll
                      </li>
                      <li>
                        Lerne grundlegende Mattführungen (z.B. mit Dame, Turm
                        oder zwei Läufern)
                      </li>
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.5
                      ),
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      gutterBottom
                    >
                      Wichtige Endspieltechniken:
                    </Typography>
                    <Typography
                      component="ul"
                      variant="body2"
                      sx={{ pl: 2, lineHeight: 1.7 }}
                    >
                      <li>
                        <b>Quadratregel</b> (für Bauernendspiele)
                      </li>
                      <li>
                        <b>Schaffung von Freibauern</b>
                      </li>
                      <li>
                        <b>Turmendspiele</b> und die 7. Reihe
                      </li>
                      <li>
                        <b>Läufer- und Springerendspiele</b>
                      </li>
                      <li>
                        <b>Umwandlungsrennen</b>
                      </li>
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.success.main, 0.15)
                  : alpha(theme.palette.success.main, 0.08),
              border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <EmojiObjectsIcon
              color="success"
              sx={{
                mr: 2,
                fontSize: 28,
                filter: `drop-shadow(0 1px 2px ${alpha(
                  theme.palette.success.main,
                  0.5
                )})`,
                mt: 0.5,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Tipp für Anfänger:
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Die beste Weise, sich im Schach zu verbessern, ist durch
                regelmäßiges Spielen, Analysieren der eigenen Partien und das
                Lösen von Schachproblemen. Es ist normal, am Anfang Fehler zu
                machen - aus jedem Fehler lernst du etwas Neues!
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
  ];

  // Zum nächsten Schritt gehen
  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // Zum vorherigen Schritt gehen
  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 0, 0));
  };

  // Zum ersten Schritt zurückkehren
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          height: "90vh",
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
      PaperComponent={motion.div}
      PaperProps={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          backgroundImage:
            theme.palette.mode === "dark"
              ? `linear-gradient(to bottom right, ${alpha(
                  theme.palette.background.paper,
                  0.9
                )}, ${alpha(theme.palette.background.default, 0.95)})`
              : `linear-gradient(to bottom right, ${alpha(
                  "#fff",
                  0.97
                )}, ${alpha(theme.palette.background.default, 0.95)})`,
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 40px rgba(0,0,0,0.5)"
              : "0 10px 40px rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.dark,
                  0.2
                )}, transparent)`
              : `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.2
                )}, transparent)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: alpha(theme.palette.primary.main, 0.9),
              mr: 2,
              boxShadow: theme.shadows[4],
            }}
          >
            <MenuBookIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              component="div"
              fontWeight={700}
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                    : `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Schach-Anleitung für Einsteiger
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Lerne die Grundlagen des königlichen Spiels
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          size="large"
          sx={{
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.3),
            "&:hover": {
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box
        sx={{
          display: "flex",
          height: "calc(100% - 144px)", // 80px für Header + 64px für Footer
        }}
      >
        <Box
          sx={{
            width: { xs: 70, sm: 180 },
            bgcolor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.4)
                : alpha(theme.palette.background.paper, 0.6),
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            nonLinear
            sx={{
              height: "100%",
              "& .MuiStepLabel-iconContainer": {
                paddingRight: { xs: 0, sm: 2 },
              },
              "& .MuiStepLabel-label": {
                display: { xs: "none", sm: "block" },
              },
              "& .MuiStepConnector-line": {
                minHeight: 20,
                ml: { xs: 2.65, sm: 2.25 },
                borderLeftWidth: 2,
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
              "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                borderColor: theme.palette.primary.main,
              },
              "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                borderColor: theme.palette.primary.main,
              },
              p: 2,
            }}
          >
            {steps.map((step, index) => (
              <Step
                key={step.label}
                completed={activeStep > index}
                sx={{
                  "& .MuiStepLabel-root": {
                    py: 1.5,
                    px: { xs: 1, sm: 2 },
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                    ...(activeStep === index && {
                      backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    }),
                  },
                }}
              >
                <StepLabel
                  onClick={() => setActiveStep(index)}
                  StepIconComponent={({ active, completed }) => (
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor:
                          active || completed
                            ? theme.palette.primary.main
                            : alpha(theme.palette.text.primary, 0.2),
                        transition: "all 0.2s ease",
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                          color:
                            active || completed
                              ? "#fff"
                              : alpha(theme.palette.text.primary, 0.6),
                        },
                      }}
                    >
                      {step.icon || (
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold", color: "#fff" }}
                        >
                          {index + 1}
                        </Typography>
                      )}
                    </Avatar>
                  )}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight={activeStep === index ? 700 : 500}
                    color={activeStep === index ? "primary" : "text.primary"}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              overflow: "auto",
              flex: 1,
            }}
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ padding: "24px", height: "100%" }}
            >
              {steps[activeStep].content}
            </motion.div>
          </DialogContent>
        </Box>
      </Box>

      <DialogActions
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          backdropFilter: "blur(10px)",
        }}
      >
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBackIcon />}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Zurück
        </Button>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Chip
            label={`Schritt ${activeStep + 1} von ${steps.length}`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleReset}
            variant="outlined"
            color="primary"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Zum Anfang
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: theme.shadows[4],
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              "&:hover": {
                background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              },
            }}
          >
            Weiter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ChessTutorial;
