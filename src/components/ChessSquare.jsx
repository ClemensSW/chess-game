// src/components/ChessSquare.jsx - Verbesserte Version
import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const ChessSquare = ({
  piece,
  row,
  col,
  actualRow,
  actualCol,
  squareNotation,
  onClick,
  onHover,
  isSelected,
  isValidMove,
  isLastMoveFrom,
  isLastMoveTo,
  isInCheck,
  isHovered,
  boardColors,
  pieceStyle = "standard",
  showCoordinates = true,
  orientation = "white",
  animationSpeed = 2,
}) => {
  const isDark = (row + col) % 2 === 1;

  // Basisfarben
  const getLightSquareColor = () =>
    typeof boardColors.light === "function"
      ? boardColors.light(isDark)
      : boardColors.light;

  const getDarkSquareColor = () =>
    typeof boardColors.dark === "function"
      ? boardColors.dark(isDark)
      : boardColors.dark;

  // Basis-Hintergrundfarbe
  const baseColor = isDark ? getDarkSquareColor() : getLightSquareColor();

  // Visuelles Feedback für ausgewählte Felder, gültige Züge und letzten Zug
  let backgroundColor = baseColor;
  let borderColor = "transparent";
  let borderWidth = 0;

  if (isSelected) {
    backgroundColor =
      typeof boardColors.selected === "function"
        ? boardColors.selected(isDark)
        : boardColors.selected;
    borderColor = "rgba(0, 0, 0, 0.4)";
    borderWidth = 2;
  } else if (isValidMove) {
    backgroundColor =
      typeof boardColors.valid === "function"
        ? boardColors.valid(piece)
        : boardColors.valid;
  } else if (isLastMoveFrom || isLastMoveTo) {
    backgroundColor =
      typeof boardColors.lastMove === "function"
        ? boardColors.lastMove(isDark)
        : boardColors.lastMove;
    if (isLastMoveTo) {
      borderColor = "rgba(0, 0, 0, 0.3)";
      borderWidth = 2;
    }
  }

  if (isInCheck) {
    borderColor =
      typeof boardColors.check === "function"
        ? boardColors.check(isDark)
        : boardColors.check;
    borderWidth = 3;
  }

  if (isHovered && !isSelected) {
    backgroundColor = isDark
      ? `${baseColor}E0` // Etwas dunkler
      : `${baseColor}E0`; // Etwas heller
  }

  // Überlagerung für gültige Züge
  const renderMoveIndicator = () => {
    if (!isValidMove) return null;

    return (
      <Box
        component={motion.div}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: (0.2 * (4 - animationSpeed)) / 3 }}
        sx={{
          position: "absolute",
          width: piece ? "85%" : "30%",
          height: piece ? "85%" : "30%",
          borderRadius: "50%",
          backgroundColor: piece
            ? "rgba(255, 0, 0, 0.25)"
            : "rgba(0, 0, 0, 0.15)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    );
  };

  // Anzeige der Koordinaten am Rand des Bretts
  const renderCoordinate = () => {
    if (!showCoordinates) return null;

    // Zeige Koordinaten nur am Rand
    const showRank = col === 0;
    const showFile = row === 7;

    if (showRank || showFile) {
      return (
        <>
          {showRank && (
            <Box
              sx={{
                position: "absolute",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: isDark
                  ? "rgba(240, 217, 181, 0.8)"
                  : "rgba(181, 136, 99, 0.8)",
                top: 2,
                left: 2,
                opacity: 0.9,
                pointerEvents: "none",
                zIndex: 1,
              }}
            >
              {orientation === "white" ? 8 - actualRow : actualRow + 1}
            </Box>
          )}

          {showFile && (
            <Box
              sx={{
                position: "absolute",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: isDark
                  ? "rgba(240, 217, 181, 0.8)"
                  : "rgba(181, 136, 99, 0.8)",
                bottom: 2,
                right: 2,
                opacity: 0.9,
                pointerEvents: "none",
                zIndex: 1,
              }}
            >
              {orientation === "white"
                ? String.fromCharCode(97 + actualCol)
                : String.fromCharCode(97 + (7 - actualCol))}
            </Box>
          )}
        </>
      );
    }
    return null;
  };

  // Rendere die Schachfigur mit dem ausgewählten Stil
  const renderPiece = () => {
    if (!piece) return null;

    // Animationsgeschwindigkeit anpassen
    const getAnimationDuration = () => {
      // animationSpeed ist 1, 2 oder 3 (langsam, mittel, schnell)
      switch (animationSpeed) {
        case 1:
          return 0.5; // Langsam
        case 2:
          return 0.3; // Mittel
        case 3:
          return 0.15; // Schnell
        default:
          return 0.3;
      }
    };

    // Moderne Schachfiguren mit Unicode-Symbolen
    const pieceSymbols = {
      standard: {
        k: { w: "♔", b: "♚" },
        q: { w: "♕", b: "♛" },
        r: { w: "♖", b: "♜" },
        b: { w: "♗", b: "♝" },
        n: { w: "♘", b: "♞" },
        p: { w: "♙", b: "♟" },
      },
      modern: {
        k: { w: "♔", b: "♚" },
        q: { w: "♕", b: "♛" },
        r: { w: "♖", b: "♜" },
        b: { w: "♗", b: "♝" },
        n: { w: "♘", b: "♞" },
        p: { w: "♙", b: "♟" },
      },
      minimalist: {
        k: { w: "K", b: "k" },
        q: { w: "Q", b: "q" },
        r: { w: "R", b: "r" },
        b: { w: "B", b: "b" },
        n: { w: "N", b: "n" },
        p: { w: "P", b: "p" },
      },
    };

    const getSymbol = () => {
      const style = pieceStyle in pieceSymbols ? pieceStyle : "standard";
      return pieceSymbols[style][piece.type][piece.color];
    };

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: getAnimationDuration() }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="span"
          sx={{
            lineHeight: 1,
            fontSize:
              pieceStyle === "minimalist"
                ? { xs: "1.5rem", sm: "1.75rem", md: "2rem" }
                : { xs: "2rem", sm: "2.5rem", md: "2.75rem" },
            color: piece.color === "w" ? "#FFFFFF" : "#000000",
            textShadow:
              piece.color === "w"
                ? "0px 1px 2px rgba(0, 0, 0, 0.4)"
                : "0px 1px 2px rgba(255, 255, 255, 0.1)",
            fontWeight: isSelected ? 700 : 600,
            fontFamily:
              pieceStyle === "minimalist"
                ? "'Courier New', monospace"
                : "sans-serif",
          }}
        >
          {getSymbol()}
        </Typography>
      </motion.div>
    );
  };

  return (
    <Grid item xs={1.5} sx={{ width: "12.5%", height: "12.5%" }}>
      <Box
        onClick={onClick}
        onMouseEnter={() => onHover && onHover(squareNotation)}
        onMouseLeave={() => onHover && onHover(null)}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.2s ease, transform 0.1s ease",
          "&:hover": {
            filter: "brightness(1.1)",
            transform: "scale(1.02)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          border:
            borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
          boxSizing: "border-box",
        }}
      >
        {renderMoveIndicator()}
        {renderCoordinate()}
        {renderPiece()}
      </Box>
    </Grid>
  );
};

export default React.memo(ChessSquare);
