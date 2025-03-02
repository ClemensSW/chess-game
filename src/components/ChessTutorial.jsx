// src/components/ChessTutorial.jsx
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
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
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Paper
        elevation={2}
        sx={{
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha("#fff", 0.05)
              : alpha("#000", 0.03),
          mr: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: "2.5rem",
            color: color === "w" ? "#FFFFFF" : "#000000",
            textShadow:
              color === "w"
                ? "0px 1px 2px rgba(0,0,0,0.4)"
                : "0px 1px 2px rgba(255,255,255,0.1)",
          }}
        >
          {pieceSymbols[type][color]}
        </Typography>
      </Paper>

      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

// Bewegungsmuster-Diagramm
const MovementDiagram = ({ type }) => {
  const theme = useTheme();
  const cellSize = 30;
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
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: 1,
          overflow: "hidden",
          mb: 1,
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
              border: `1px dashed ${theme.palette.error.main}`,
            };
          } else if (markedCell?.special === "firstMove") {
            specialStyle = {
              backgroundColor: alpha(theme.palette.info.main, 0.2),
              border: `1px dashed ${theme.palette.info.main}`,
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
                  ? `1px dashed ${theme.palette.success.main}`
                  : "none",
              }}
            >
              {isCenter && (
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.2rem",
                    color: isDark ? "#F0D9B5" : "#B58863",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: alpha(theme.palette.success.main, 0.2),
                border: `1px dashed ${theme.palette.success.main}`,
                mr: 1,
              }}
            />
            <Typography variant="caption">Normaler Zug</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: alpha(theme.palette.info.main, 0.2),
                border: `1px dashed ${theme.palette.info.main}`,
                mr: 1,
              }}
            />
            <Typography variant="caption">
              Erster Zug (2 Felder möglich)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: alpha(theme.palette.error.main, 0.3),
                border: `1px dashed ${theme.palette.error.main}`,
                mr: 1,
              }}
            />
            <Typography variant="caption">Schlagzug (nur diagonal)</Typography>
          </Box>
        </Box>
      )}
    </Box>
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
      content: (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Das Schachbrett
          </Typography>

          <Typography paragraph>
            Schach wird auf einem 8×8-Brett gespielt. Die 64 Felder sind
            abwechselnd hell und dunkel gefärbt. Das Brett wird so positioniert,
            dass jeder Spieler ein weißes Feld in der rechten unteren Ecke hat.
          </Typography>

          <Typography paragraph>
            Die horizontalen Reihen (Reihen) werden mit Zahlen von 1 bis 8
            bezeichnet, beginnend an der weißen Seite des Bretts. Die vertikalen
            Spalten (Linien) werden mit Buchstaben von a bis h bezeichnet, von
            links nach rechts aus der Sicht des weißen Spielers.
          </Typography>

          <Box sx={{ mb: 2, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: theme.palette.primary.main }}
                >
                  Die Figuren
                </Typography>

                <Typography paragraph>
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
                  <PieceDisplay type="rook" color="w" description="2 Türme" />
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
                  <PieceDisplay type="pawn" color="w" description="8 Bauern" />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: theme.palette.primary.main }}
                >
                  Startaufstellung
                </Typography>

                <Typography paragraph>
                  Die Figuren werden wie folgt aufgestellt:
                </Typography>

                <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                  <li>Bauern: Zweite Reihe</li>
                  <li>Türme: Ecken (a1, h1 für Weiß; a8, h8 für Schwarz)</li>
                  <li>Springer: Neben den Türmen</li>
                  <li>Läufer: Neben den Springern</li>
                  <li>
                    Dame: Auf dem eigenen Farbfeld (d1 für Weiß, d8 für Schwarz)
                  </li>
                  <li>König: Neben der Dame (e1 für Weiß, e8 für Schwarz)</li>
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              bgcolor: alpha(theme.palette.info.main, 0.1),
              p: 2,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LightbulbIcon color="info" sx={{ mr: 1.5 }} />
            <Typography>
              <strong>Einfache Eselsbrücke:</strong> "Die Dame steht auf ihrer
              Farbe" - Die weiße Dame steht auf weißem Feld (d1), die schwarze
              Dame auf schwarzem Feld (d8).
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      label: "Figuren und Zugregeln",
      content: (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary.main, mb: 2 }}
          >
            Bewegungsmuster der Figuren
          </Typography>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              König
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography paragraph>
                  Der König kann ein Feld in jede Richtung ziehen (horizontal,
                  vertikal oder diagonal). Er ist die wichtigste Figur - wenn er
                  geschlagen wird (Schachmatt), ist das Spiel verloren.
                </Typography>

                <Typography paragraph>
                  Der König kann nicht auf ein Feld ziehen, das von einer
                  gegnerischen Figur bedroht wird.
                </Typography>

                <Typography variant="body2">
                  <strong>Sonderregel: Rochade</strong> - Ein besonderer Zug,
                  bei dem König und Turm gleichzeitig bewegt werden.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MovementDiagram type="king" />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Dame
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography paragraph>
                  Die Dame ist die stärkste Figur. Sie kann beliebig viele freie
                  Felder in jede Richtung ziehen (horizontal, vertikal oder
                  diagonal).
                </Typography>

                <Typography paragraph>
                  Sie kombiniert die Zugmöglichkeiten von Turm und Läufer.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MovementDiagram type="queen" />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Turm
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography paragraph>
                  Der Turm kann beliebig viele freie Felder horizontal (Reihen)
                  oder vertikal (Linien) ziehen.
                </Typography>

                <Typography paragraph>
                  Türme sind besonders wertvoll in offenen Stellungen und im
                  Endspiel.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MovementDiagram type="rook" />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Läufer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography paragraph>
                  Der Läufer kann beliebig viele freie Felder diagonal ziehen.
                </Typography>

                <Typography paragraph>
                  Jeder Läufer bleibt immer auf Feldern der gleichen Farbe.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MovementDiagram type="bishop" />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Springer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography paragraph>
                  Der Springer bewegt sich in einem "L"-Muster: zwei Felder
                  horizontal oder vertikal und dann ein Feld im rechten Winkel.
                </Typography>

                <Typography paragraph>
                  Der Springer ist die einzige Figur, die über andere Figuren
                  "springen" kann.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MovementDiagram type="knight" />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Bauer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography paragraph>
                  Bauern bewegen sich nur vorwärts:
                </Typography>
                <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
                  <li>Ein Feld geradeaus (wenn das Feld frei ist)</li>
                  <li>Beim ersten Zug optional zwei Felder</li>
                  <li>Schlagen diagonal vorwärts</li>
                </Typography>

                <Typography paragraph sx={{ mt: 1 }}>
                  <strong>Sonderregeln:</strong>
                </Typography>
                <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
                  <li>En Passant (im Vorbeigehen)</li>
                  <li>Umwandlung bei Erreichen der letzten Reihe</li>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MovementDiagram type="pawn" />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ),
    },
    {
      label: "Spezielle Züge",
      content: (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Besondere Schachregeln
          </Typography>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              Die Rochade
            </Typography>

            <Typography paragraph>
              Die Rochade ist ein spezieller Zug, bei dem der König und ein Turm
              gleichzeitig bewegt werden. Es ist der einzige Zug, bei dem zwei
              Figuren auf einmal gezogen werden.
            </Typography>

            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Kurze Rochade (O-O):</strong> König bewegt sich zwei
                Felder zum Turm auf der Königsseite (h-Linie), und der Turm
                springt auf die andere Seite des Königs.
              </Typography>

              <Typography variant="body2" gutterBottom>
                <strong>Lange Rochade (O-O-O):</strong> König bewegt sich zwei
                Felder zum Turm auf der Damenseite (a-Linie), und der Turm
                springt auf die andere Seite des Königs.
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Voraussetzungen für die Rochade:</strong>
            </Typography>
            <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
              <li>
                König und beteiligter Turm dürfen noch nicht bewegt worden sein
              </li>
              <li>Keine Figuren zwischen König und Turm</li>
              <li>König darf nicht im Schach stehen</li>
              <li>
                König darf nicht über ein Feld ziehen, das vom Gegner bedroht
                wird
              </li>
              <li>
                König darf nicht auf ein Feld ziehen, das vom Gegner bedroht
                wird
              </li>
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              En Passant (Im Vorbeigehen)
            </Typography>

            <Typography paragraph>
              Wenn ein Bauer von seiner Startposition aus zwei Felder vorrückt
              und dabei neben einem gegnerischen Bauern landet, kann dieser
              gegnerische Bauer ihn "im Vorbeigehen" schlagen, als ob er nur ein
              Feld vorgerückt wäre.
            </Typography>

            <Typography paragraph>
              Dieser spezielle Schlagzug muss unmittelbar im nächsten Zug
              ausgeführt werden, sonst verfällt das Recht.
            </Typography>

            <Box
              sx={{
                bgcolor: alpha(theme.palette.info.main, 0.1),
                p: 2,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmojiObjectsIcon color="info" sx={{ mr: 1.5 }} />
              <Typography variant="body2">
                Diese Regel verhindert, dass ein Bauer mit seinem Doppelschritt
                einem Schlagzug durch einen gegnerischen Bauern entgehen kann.
                Sie ist eine der am häufigsten übersehenen Regeln für Anfänger!
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              Bauernumwandlung
            </Typography>

            <Typography paragraph>
              Wenn ein Bauer die gegnerische Grundreihe (8. Reihe für Weiß, 1.
              Reihe für Schwarz) erreicht, wird er umgewandelt. Der Spieler muss
              den Bauern in eine Dame, einen Turm, einen Läufer oder einen
              Springer der eigenen Farbe umwandeln.
            </Typography>

            <Typography paragraph>
              In den meisten Fällen wird der Bauer in eine Dame umgewandelt, da
              sie die stärkste Figur ist. Diese Umwandlung kann dazu führen,
              dass ein Spieler mehr als eine Dame hat.
            </Typography>

            <Box
              sx={{
                bgcolor: alpha(theme.palette.info.main, 0.1),
                p: 2,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmojiObjectsIcon color="info" sx={{ mr: 1.5 }} />
              <Typography variant="body2">
                In seltenen Fällen kann es taktisch vorteilhaft sein, in einen
                Springer oder eine andere Figur umzuwandeln statt in eine Dame.
                Dies nennt man "Unterverwandlung".
              </Typography>
            </Box>
          </Paper>
        </Box>
      ),
    },
    {
      label: "Schach, Schachmatt und Patt",
      content: (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Spielende und besondere Situationen
          </Typography>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.error.main }}
            >
              Schach
            </Typography>

            <Typography paragraph>
              Ein König steht im Schach, wenn er von einer gegnerischen Figur
              angegriffen wird. Ein Spieler, dessen König im Schach steht, muss
              sofort reagieren und den Schach abwehren.
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>
                Es gibt drei Möglichkeiten, ein Schach abzuwehren:
              </strong>
            </Typography>
            <Typography component="ol" variant="body2" sx={{ pl: 2 }}>
              <li>Den König auf ein sicheres Feld ziehen</li>
              <li>Die angreifende Figur schlagen</li>
              <li>
                Eine eigene Figur zwischen König und Angreifer stellen (nicht
                möglich bei Springer-Schach)
              </li>
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.error.main }}
            >
              Schachmatt
            </Typography>

            <Typography paragraph>
              Schachmatt ist die Situation, wenn ein König im Schach steht und
              keine Möglichkeit hat, das Schach abzuwehren. Dies beendet das
              Spiel, und der Spieler, dessen König schachmatt gesetzt wurde,
              verliert.
            </Typography>

            <Typography paragraph>Beim Schachmatt gilt:</Typography>
            <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
              <li>Der König steht im Schach</li>
              <li>Der König kann nicht auf ein sicheres Feld ziehen</li>
              <li>Die angreifende Figur kann nicht geschlagen werden</li>
              <li>
                Das Schach kann nicht durch Dazwischenziehen einer Figur
                abgewehrt werden
              </li>
            </Typography>

            <Box
              sx={{
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                p: 2,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                display: "flex",
                alignItems: "center",
                mt: 2,
              }}
            >
              <SportsKabaddiIcon color="warning" sx={{ mr: 1.5 }} />
              <Typography variant="body2">
                Das Wort "Schachmatt" kommt aus dem Persischen "Shah Mat" und
                bedeutet "Der König ist tot" oder "Der König ist besiegt".
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              Patt
            </Typography>

            <Typography paragraph>
              Patt ist eine Situation, in der ein Spieler am Zug ist, aber
              keinen legalen Zug machen kann, wobei sein König NICHT im Schach
              steht. Patt führt zu einem Remis (Unentschieden).
            </Typography>

            <Typography>
              Typische Patt-Situationen entstehen oft im Endspiel, wenn ein
              Spieler mit überlegenen Kräften nicht vorsichtig genug spielt und
              dem Gegner keine legalen Züge mehr lässt.
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Weitere Remis-Arten
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Einvernehmliches Remis:</strong> Die Spieler können
              jederzeit ein Remis vereinbaren.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Dreifache Stellungswiederholung:</strong> Wenn die gleiche
              Stellung (mit denselben Zugmöglichkeiten) dreimal auftritt, kann
              ein Spieler Remis beanspruchen.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>50-Züge-Regel:</strong> Wenn 50 aufeinanderfolgende Züge
              von beiden Spielern gemacht wurden, ohne dass ein Bauer gezogen
              oder eine Figur geschlagen wurde, kann Remis beansprucht werden.
            </Typography>

            <Typography variant="body2">
              <strong>Ungenügendes Material:</strong> Wenn keine Seite genügend
              Material hat, um den gegnerischen König schachmatt zu setzen (z.B.
              König gegen König, oder König und Läufer gegen König).
            </Typography>
          </Paper>
        </Box>
      ),
    },
    {
      label: "Grundlegende Strategien",
      content: (
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Schach-Strategie für Anfänger
          </Typography>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              Die Eröffnung
            </Typography>

            <Typography paragraph>
              In der Eröffnungsphase geht es darum, die Figuren zu entwickeln,
              Kontrolle über das Zentrum zu erlangen und den König in Sicherheit
              zu bringen.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Grundprinzipien der Eröffnung:</strong>
            </Typography>

            <Typography component="ol" variant="body2" sx={{ pl: 2, mb: 2 }}>
              <li>Kontrolliere das Zentrum (die Felder e4, d4, e5, d5)</li>
              <li>Entwickle deine Leichtfiguren (Springer und Läufer) früh</li>
              <li>Rochiere, um deinen König in Sicherheit zu bringen</li>
              <li>Verbinde deine Türme (bringe sie auf die gleiche Reihe)</li>
              <li>
                Bewege die Bauern sparsam, um deine Stellung nicht zu schwächen
              </li>
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Gängige Eröffnungen für Anfänger:</strong>
            </Typography>

            <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
              <li>Italienische Partie (1.e4 e5 2.Nf3 Nc6 3.Bc4)</li>
              <li>Spanische Partie / Ruy Lopez (1.e4 e5 2.Nf3 Nc6 3.Bb5)</li>
              <li>Sizilianische Verteidigung (1.e4 c5)</li>
              <li>Französische Verteidigung (1.e4 e6)</li>
              <li>Damengambit (1.d4 d5 2.c4)</li>
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              Das Mittelspiel
            </Typography>

            <Typography paragraph>
              Im Mittelspiel geht es um taktische und strategische Elemente,
              Angriff und Verteidigung.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Wichtige Taktiken:</strong>
            </Typography>

            <Typography component="ul" variant="body2" sx={{ pl: 2, mb: 2 }}>
              <li>
                Gabel: Eine Figur greift zwei gegnerische Figuren gleichzeitig
                an
              </li>
              <li>
                Spieß: Eine Figur greift zwei gegnerische Figuren an, die
                hintereinander stehen
              </li>
              <li>
                Fesselung: Eine Figur kann nicht ziehen, weil sonst eine
                wertvollere Figur dahinter gefährdet wäre
              </li>
              <li>
                Abzugsschach: Eine Figur zieht weg und gibt Schach durch eine
                andere Figur
              </li>
              <li>Doppelschach: Zwei Figuren geben gleichzeitig Schach</li>
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Strategische Elemente:</strong>
            </Typography>

            <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
              <li>
                Figurenaktivität: Positioniere deine Figuren auf aktiven Feldern
              </li>
              <li>Bauernstruktur: Achte auf schwache und starke Bauern</li>
              <li>Offene Linien: Nutze offene Linien für deine Türme</li>
              <li>Kontrolliere wichtige Felder (besonders im Zentrum)</li>
              <li>Koordiniere deine Figuren für Angriff oder Verteidigung</li>
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              Das Endspiel
            </Typography>

            <Typography paragraph>
              Im Endspiel sind nur noch wenige Figuren auf dem Brett. Der König
              wird zu einer aktiven Figur, und Bauern werden oft entscheidend.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Grundregeln für das Endspiel:</strong>
            </Typography>

            <Typography component="ul" variant="body2" sx={{ pl: 2, mb: 2 }}>
              <li>Aktiviere deinen König und bringe ihn ins Zentrum</li>
              <li>Strebe nach Bauernumwandlung</li>
              <li>Behalte die Opposition (Könige stehen sich gegenüber)</li>
              <li>
                Freibauern (Bauern ohne gegnerische Bauern auf der gleichen oder
                benachbarten Linien) sind sehr wertvoll
              </li>
              <li>
                Lerne grundlegende Mattführungen (z.B. mit Dame, Turm oder zwei
                Läufern)
              </li>
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Wichtige Endspieltechniken:</strong>
            </Typography>

            <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
              <li>Quadratregel (für Bauernendspiele)</li>
              <li>Schaffung von Freibauern</li>
              <li>Turmendspiele und die 7. Reihe</li>
              <li>Läufer- und Springerendspiele</li>
              <li>Umwandlungsrennen</li>
            </Typography>
          </Paper>

          <Box
            sx={{
              bgcolor: alpha(theme.palette.success.main, 0.1),
              p: 2,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <EmojiObjectsIcon color="success" sx={{ mr: 1.5 }} />
            <Typography>
              <strong>Tipp für Anfänger:</strong> Die beste Weise, sich im
              Schach zu verbessern, ist durch regelmäßiges Spielen, Analysieren
              der eigenen Partien und das Lösen von Schachproblemen. Es ist
              normal, am Anfang Fehler zu machen - aus jedem Fehler lernst du
              etwas Neues!
            </Typography>
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
    setActiveStep((prev) => Math.max(prev - 1, 0));
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
      sx={{ "& .MuiDialog-paper": { height: "90vh" } }}
      PaperComponent={motion.div}
      PaperProps={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          backgroundImage:
            theme.palette.mode === "dark"
              ? `linear-gradient(180deg, ${alpha("#1E1E1E", 0.9)} 0%, ${alpha(
                  "#1E1E1E",
                  0.95
                )} 100%), 
               url('https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2042')`
              : `linear-gradient(180deg, ${alpha("#FFFFFF", 0.9)} 0%, ${alpha(
                  "#FFFFFF",
                  0.95
                )} 100%), 
               url('https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2042')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SchoolIcon
            sx={{ color: theme.palette.primary.main, mr: 1.5, fontSize: 28 }}
          />
          <Typography variant="h5" component="span" fontWeight={600}>
            Schach-Anleitung
          </Typography>
        </Box>

        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: "flex", height: "100%" }}>
        <Box
          sx={{
            width: 240,
            borderRight: `1px solid ${theme.palette.divider}`,
            p: 2,
            display: { xs: "none", md: "block" },
          }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  onClick={() => setActiveStep(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography fontWeight={activeStep === index ? 600 : 400}>
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
            p: 3,
            overflowY: "auto",
            height: "calc(100% - 16px)",
          }}
        >
          {steps[activeStep].content}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBackIcon />}
        >
          Zurück
        </Button>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Schritt {activeStep + 1} von {steps.length}
          </Typography>
        </Box>

        {activeStep === steps.length - 1 ? (
          <Button onClick={handleReset} variant="outlined" color="primary">
            Zum Anfang
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Weiter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ChessTutorial;
