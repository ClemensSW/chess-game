// src/components/ChessBoard.jsx - Aktualisierte Version mit professioneller Bauernumwandlung
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Grid, Paper, Box, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Chess } from "chess.js";
import ChessSquare from "./ChessSquare";
import PawnPromotionDialog from "./PawnPromotionDialog";

// Sound-Effekte
import moveSound from "../assets/sounds/move.mp3";
import captureSound from "../assets/sounds/capture.mp3";
import checkSound from "../assets/sounds/check.mp3";
import castleSound from "../assets/sounds/castle.mp3";
import promoteSound from "../assets/sounds/promote.mp3";
import gameEndSound from "../assets/sounds/game-end.mp3";
import illegalSound from "../assets/sounds/illegal.mp3";

const ChessBoard = ({ onMoveChange, boardRef, onGameEnd, settings = {} }) => {
  const theme = useTheme();

  // States
  const [game, setGame] = useState(new Chess());
  const [boardPosition, setBoardPosition] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [checkSquare, setCheckSquare] = useState(null);
  const [promotionSquare, setPromotionSquare] = useState(null);
  const [pendingPromotion, setPendingPromotion] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [boardSize, setBoardSize] = useState(2); // 1, 2, 3 (klein, mittel, groß)

  // Refs für Sound-Effekte
  const moveAudioRef = useRef(new Audio(moveSound));
  const captureAudioRef = useRef(new Audio(captureSound));
  const checkAudioRef = useRef(new Audio(checkSound));
  const castleAudioRef = useRef(new Audio(castleSound));
  const promoteAudioRef = useRef(new Audio(promoteSound));
  const gameEndAudioRef = useRef(new Audio(gameEndSound));
  const illegalAudioRef = useRef(new Audio(illegalSound));

  // Extrahiere relevante Einstellungen
  const {
    boardTheme = "classic",
    pieceStyle = "standard",
    animationSpeed = 2,
    soundEffects = true,
    moveSound: enableMoveSound = true,
    captureSound: enableCaptureSound = true,
    checkSound: enableCheckSound = true,
    gameEndSound: enableGameEndSound = true,
    showCoordinates = true,
    highContrast = false,
    colorBlindMode = false,
  } = settings;

  // Brett-Größe aus den Einstellungen übernehmen
  useEffect(() => {
    if (settings.boardSize) {
      setBoardSize(settings.boardSize);
    }
  }, [settings.boardSize]);

  // Initialisiere das Schachbrett beim ersten Laden
  useEffect(() => {
    updateBoardPosition();

    // Exportiere Funktionen über boardRef
    if (boardRef) {
      boardRef.current = {
        newGame,
        undoMove,
        flipBoard,
        getGame: () => game,
        getMoveHistory: () => moveHistory,
        getFEN: () => game.fen(),
        loadPosition,
        goToMove,
      };
    }
  }, []);

  // Aktualisiere das Brettlayout, wenn sich das Spiel ändert
  useEffect(() => {
    updateBoardPosition();

    // Prüfe auf Schach
    const kingInCheck = findKingInCheck();
    setCheckSquare(kingInCheck);

    // Prüfe auf Spielende
    checkGameEnd();
  }, [game]);

  // Funktion zum Finden des Königs im Schach
  const findKingInCheck = () => {
    if (game.isCheck()) {
      // Finde das Feld des Königs, der im Schach steht
      const board = game.board();
      const currentColor = game.turn();

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = board[row][col];
          if (piece && piece.type === "k" && piece.color === currentColor) {
            return String.fromCharCode(97 + col) + (8 - row);
          }
        }
      }
    }
    return null;
  };

  // Aktualisiere das Brettlayout
  const updateBoardPosition = () => {
    try {
      const board = game.board();
      setBoardPosition(board);
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Brettposition:", error);
    }
  };

  // Sound abspielen
  const playSound = (soundType) => {
    if (!soundEffects) return;

    try {
      switch (soundType) {
        case "move":
          if (enableMoveSound)
            moveAudioRef.current
              .play()
              .catch((e) => console.error("Error playing sound:", e));
          break;
        case "capture":
          if (enableCaptureSound)
            captureAudioRef.current
              .play()
              .catch((e) => console.error("Error playing sound:", e));
          break;
        case "check":
          if (enableCheckSound)
            checkAudioRef.current
              .play()
              .catch((e) => console.error("Error playing sound:", e));
          break;
        case "castle":
          if (enableMoveSound)
            castleAudioRef.current
              .play()
              .catch((e) => console.error("Error playing sound:", e));
          break;
        case "promote":
          if (enableMoveSound)
            promoteAudioRef.current
              .play()
              .catch((e) => console.error("Error playing sound:", e));
          break;
        case "gameEnd":
          if (enableGameEndSound)
            gameEndAudioRef.current
              .play()
              .catch((e) => console.error("Error playing sound:", e));
          break;
        case "illegal":
          illegalAudioRef.current
            .play()
            .catch((e) => console.error("Error playing sound:", e));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Fehler beim Abspielen des Sounds:", error);
    }
  };

  // Berechnet alle gültigen Züge für ein ausgewähltes Feld
  const calculateValidMoves = useCallback(
    (square) => {
      if (!square) {
        setValidMoves([]);
        return;
      }

      try {
        const moves = game.moves({
          square: square,
          verbose: true,
        });

        setValidMoves(moves.map((move) => move.to));
      } catch (error) {
        console.error("Fehler beim Berechnen gültiger Züge:", error);
        setValidMoves([]);
      }
    },
    [game]
  );

  // Zug ausführen
  const makeMove = useCallback(
    (from, to, promotion = null) => {
      try {
        // Prüfe, ob es sich um einen Bauern handelt, der umgewandelt werden muss
        const piece = game.get(from);
        const toRank = to.charAt(1);
        const needsPromotion =
          piece &&
          piece.type === "p" &&
          ((piece.color === "w" && toRank === "8") ||
            (piece.color === "b" && toRank === "1"));

        // Wenn Umwandlung benötigt wird, aber noch nicht gewählt wurde
        if (needsPromotion && !promotion) {
          setSelectedSquare(from);
          setPromotionSquare(to);
          setPendingPromotion({
            from: from,
            to: to,
            color: piece.color,
          });
          return false; // Zug noch nicht ausgeführt
        }

        // Speichere Zustand vor dem Zug
        const isInCheck = game.isCheck();
        const prevBoard = JSON.stringify(game.board());

        // Führe den Zug aus
        const moveResult = game.move({
          from: from,
          to: to,
          promotion: promotion,
        });

        if (!moveResult) {
          playSound("illegal");
          return false;
        }

        // Analysiere den Zug
        const isCastle = moveResult.san.startsWith("O-O");
        const isCapture = moveResult.captured || moveResult.san.includes("x");
        const putsInCheck = game.isCheck();
        const isPromotion = moveResult.promotion;

        // Spiele Sound ab
        if (isPromotion) {
          playSound("promote");
        } else if (isCastle) {
          playSound("castle");
        } else if (isCapture) {
          playSound("capture");
        } else {
          playSound("move");
        }

        if (putsInCheck) {
          playSound("check");
        }

        // Speichere letzten Zug und aktualisiere Geschichte
        setLastMove({ from, to });
        setMoveHistory((prev) => [...prev, moveResult]);

        // Prüfe auf geschlagene Figur für Statistik
        const capturedPiece = moveResult.captured
          ? {
              type: moveResult.captured,
              color: moveResult.color === "w" ? "b" : "w",
            }
          : null;

        // Benachrichtige übergeordnete Komponenten über den Zug
        if (onMoveChange) {
          onMoveChange(
            [...moveHistory, moveResult],
            capturedPiece,
            putsInCheck
          );
        }

        // Setze Auswahlzustand zurück
        setSelectedSquare(null);
        setValidMoves([]);
        setPromotionSquare(null);
        setPendingPromotion(null);

        // Aktualisiere die Spielstellung
        const newGame = new Chess(game.fen());
        setGame(newGame);

        return true;
      } catch (error) {
        console.error("Fehler beim Ausführen des Zuges:", error);
        playSound("illegal");
        return false;
      }
    },
    [game, moveHistory, onMoveChange]
  );

  // Klick-Handler für Felder
  const handleSquareClick = useCallback(
    (square) => {
      // Wenn ein Umwandlungsdialog aktiv ist, ignoriere andere Klicks
      if (promotionSquare) return;

      if (selectedSquare) {
        // Versuche, den Zug auszuführen
        const moveSuccessful = makeMove(selectedSquare, square);

        if (!moveSuccessful) {
          // Wenn der Zug nicht gültig ist, prüfe, ob der Spieler eine andere Figur auswählen will
          const piece = game.get(square);
          if (piece && piece.color === game.turn()) {
            setSelectedSquare(square);
            calculateValidMoves(square);
          }
        }
      } else {
        // Wähle eine Figur aus
        const piece = game.get(square);
        if (piece && piece.color === game.turn()) {
          setSelectedSquare(square);
          calculateValidMoves(square);
        }
      }
    },
    [selectedSquare, game, calculateValidMoves, makeMove, promotionSquare]
  );

  // Hover-Handler für Felder
  const handleSquareHover = useCallback((square) => {
    setHoveredSquare(square);
  }, []);

  // Handler für Promotion-Auswahl
  const handlePromotionSelect = useCallback(
    (pieceType) => {
      if (!pendingPromotion) return;

      const { from, to } = pendingPromotion;
      makeMove(from, to, pieceType);
    },
    [pendingPromotion, makeMove]
  );

  // Prüft, ob das Spiel vorbei ist
  const checkGameEnd = useCallback(() => {
    if (game.isGameOver()) {
      let result = {
        isOver: true,
        title: "",
        message: "",
      };

      if (game.isCheckmate()) {
        const winner = game.turn() === "w" ? "Schwarz" : "Weiß";
        const winnerColor = game.turn() === "w" ? "b" : "w";

        result.title = "Schachmatt!";
        result.message = `${winner} gewinnt durch Schachmatt.`;
        result.winner = winnerColor;
        result.reason = "checkmate";

        playSound("gameEnd");
      } else if (game.isDraw()) {
        result.title = "Remis!";

        if (game.isStalemate()) {
          result.message = "Patt: Der Spieler am Zug hat keine gültigen Züge.";
          result.reason = "stalemate";
        } else if (game.isThreefoldRepetition()) {
          result.message = "Dreifache Stellungswiederholung.";
          result.reason = "repetition";
        } else if (game.isInsufficientMaterial()) {
          result.message = "Ungenügendes Material für einen Sieg.";
          result.reason = "insufficient";
        } else if (game.isDraw()) {
          result.message = "50-Züge-Regel oder vereinbartes Remis.";
          result.reason = "fifty-move";
        }

        playSound("gameEnd");
      }

      if (result.isOver && onGameEnd) {
        onGameEnd(result);
      }
    }
  }, [game, onGameEnd]);

  // Neues Spiel starten
  const newGame = useCallback(() => {
    const freshGame = new Chess();
    setGame(freshGame);
    setSelectedSquare(null);
    setMoveHistory([]);
    setValidMoves([]);
    setLastMove(null);
    setCheckSquare(null);
    setPromotionSquare(null);
    setPendingPromotion(null);
    updateBoardPosition();
  }, []);

  // Zug rückgängig machen
  const undoMove = useCallback(() => {
    try {
      const move = game.undo();
      if (move) {
        const updatedGame = new Chess(game.fen());
        setGame(updatedGame);
        setMoveHistory((prev) => prev.slice(0, -1));
        setSelectedSquare(null);
        setValidMoves([]);
        setLastMove(null);
        setCheckSquare(null);
        setPromotionSquare(null);
        setPendingPromotion(null);
        updateBoardPosition();

        if (onMoveChange) {
          onMoveChange(moveHistory.slice(0, -1));
        }

        playSound("move");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Fehler beim Rückgängigmachen des Zuges:", error);
      return false;
    }
  }, [game, moveHistory, onMoveChange]);

  // Brettorientierung ändern
  const flipBoard = useCallback(() => {
    setBoardOrientation((prev) => (prev === "white" ? "black" : "white"));
  }, []);

  // Position aus FEN laden
  const loadPosition = useCallback((fen, moves = []) => {
    try {
      const loadedGame = new Chess();
      const success = loadedGame.load(fen);

      if (success) {
        setGame(loadedGame);
        setMoveHistory(moves || []);
        setSelectedSquare(null);
        setValidMoves([]);
        setLastMove(null);
        setCheckSquare(findKingInCheck());
        setPromotionSquare(null);
        setPendingPromotion(null);
        updateBoardPosition();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Fehler beim Laden der Position:", error);
      return false;
    }
  }, []);

  // Zu bestimmtem Zug springen
  const goToMove = useCallback(
    (moveIndex) => {
      try {
        if (moveIndex < 0 || moveIndex >= moveHistory.length) return false;

        // Neues Spiel erstellen und alle Züge bis zum gewünschten Zug nachspielen
        const newGame = new Chess();

        for (let i = 0; i <= moveIndex; i++) {
          const move = moveHistory[i];
          newGame.move(move);
        }

        setGame(newGame);
        setSelectedSquare(null);
        setValidMoves([]);
        setCheckSquare(findKingInCheck());
        updateBoardPosition();

        return true;
      } catch (error) {
        console.error("Fehler beim Springen zu Zug:", error);
        return false;
      }
    },
    [moveHistory]
  );

  // Berechne Board-Size basierend auf Einstellungen und Viewport
  const getBoardSize = () => {
    const baseSizes = {
      xs: ["82vw", "90vw", "94vw"],
      sm: ["70vw", "80vw", "85vw"],
      md: ["480px", "560px", "640px"],
      lg: ["520px", "600px", "680px"],
    };

    // boardSize ist 1, 2 oder 3 (klein, mittel, groß)
    const sizeIndex = Math.min(Math.max(boardSize - 1, 0), 2);

    return {
      xs: baseSizes.xs[sizeIndex],
      sm: baseSizes.sm[sizeIndex],
      md: baseSizes.md[sizeIndex],
      lg: baseSizes.lg[sizeIndex],
      maxWidth: baseSizes.lg[sizeIndex],
      maxHeight: baseSizes.lg[sizeIndex],
    };
  };

  // Farben für das Brett basierend auf den Themeeinstellungen
  const getBoardColors = () => {
    if (colorBlindMode) {
      return {
        light: "#FFFFFF",
        dark: "#0072B2", // Deuteranopia-freundliches Blau
        selected: "#E69F00", // Deuteranopia-freundliches Orange
        valid: "#009E73", // Deuteranopia-freundliches Grün
        lastMove: "#CC79A7", // Deuteranopia-freundliches Pink
        check: "#D55E00", // Deuteranopia-freundliches Rot
      };
    }

    if (highContrast) {
      return {
        light: "#FFFFFF",
        dark: "#000000",
        selected: "#FFD700",
        valid: "#00FF00",
        lastMove: "#FF69B4",
        check: "#FF0000",
      };
    }

    // Standardthemes
    const themeColors = {
      classic: {
        light: "#F0D9B5",
        dark: "#B58863",
        selected: "#BBCB2B",
        valid: (piece) => (piece ? "#F7C557" : "#D5E39A"),
        lastMove: (isDark) => (isDark ? "#B39C56" : "#E6D9A2"),
        check: "#FF6B6B",
      },
      modern: {
        light: "#EEEED2",
        dark: "#769656",
        selected: "#BBCB2B",
        valid: (piece) => (piece ? "#F7C557" : "#D5E39A"),
        lastMove: (isDark) => (isDark ? "#6F8F57" : "#DCECC5"),
        check: "#FF6B6B",
      },
      wood: {
        light: "#E8C99B",
        dark: "#A77E58",
        selected: "#BBCB2B",
        valid: (piece) => (piece ? "#F7C557" : "#D5E39A"),
        lastMove: (isDark) => (isDark ? "#946E4A" : "#D6B989"),
        check: "#FF6B6B",
      },
      tournament: {
        light: "#E6E6E6",
        dark: "#008000",
        selected: "#BBCB2B",
        valid: (piece) => (piece ? "#F7C557" : "#D5E39A"),
        lastMove: (isDark) => (isDark ? "#006F00" : "#D6FFD6"),
        check: "#FF6B6B",
      },
    };

    return themeColors[boardTheme] || themeColors.classic;
  };

  // Berechne Position für den Promotion-Dialog
  const getPromotionDialogPosition = () => {
    if (!pendingPromotion) return null;

    const { to, color } = pendingPromotion;
    const toRank = parseInt(to.charAt(1));
    const toFile = to.charCodeAt(0) - 97; // a-h zu 0-7

    // Bestimme, ob der Dialog oben oder unten erscheinen soll
    // Für weiße Bauern (die nach oben gehen) erscheint er oben
    // Für schwarze Bauern (die nach unten gehen) erscheint er unten
    const onTop = color === "w";

    // Passe die Position an die Brettorientierung an
    const col = boardOrientation === "white" ? toFile : 7 - toFile;

    // Wir benötigen keine spezifische Zeilenposition, da der Dialog
    // entweder ganz oben oder ganz unten am Brett erscheint
    return {
      row: 0, // Wird in PawnPromotionDialog nicht verwendet
      col,
      onTop,
    };
  };

  // Rendere das Brett
  const renderBoard = () => {
    const boardColors = getBoardColors();
    let boardArray = [...Array(8)].map(() => Array(8).fill(null));

    // Fülle das Brett mit den Figuren
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardPosition[row] ? boardPosition[row][col] : null;
        if (piece) {
          boardArray[row][col] = piece;
        }
      }
    }

    // Drehe das Brett, falls notwendig
    if (boardOrientation === "black") {
      boardArray = boardArray.reverse().map((row) => row.reverse());
    }

    return (
      <Grid container spacing={0} sx={{ width: "100%", height: "100%" }}>
        {boardArray.map((row, rowIndex) =>
          row.map((square, colIndex) => {
            // Berechne die tatsächlichen Koordinaten basierend auf der Orientierung
            const actualRow =
              boardOrientation === "white" ? rowIndex : 7 - rowIndex;
            const actualCol =
              boardOrientation === "white" ? colIndex : 7 - colIndex;
            const squareNotation =
              String.fromCharCode(97 + actualCol) + (8 - actualRow);

            // Bestimme, ob dieses Feld Teil des letzten Zuges ist
            const isLastMoveFrom = lastMove && lastMove.from === squareNotation;
            const isLastMoveTo = lastMove && lastMove.to === squareNotation;

            // Bestimme, ob dieses Feld im Schach steht
            const isInCheck = checkSquare === squareNotation;

            return (
              <ChessSquare
                key={`${rowIndex}-${colIndex}`}
                piece={square}
                row={rowIndex}
                col={colIndex}
                actualRow={actualRow}
                actualCol={actualCol}
                squareNotation={squareNotation}
                onClick={() => handleSquareClick(squareNotation)}
                onHover={() => handleSquareHover(squareNotation)}
                isSelected={selectedSquare === squareNotation}
                isValidMove={validMoves.includes(squareNotation)}
                isLastMoveFrom={isLastMoveFrom}
                isLastMoveTo={isLastMoveTo}
                isInCheck={isInCheck}
                isHovered={hoveredSquare === squareNotation}
                boardColors={boardColors}
                pieceStyle={pieceStyle}
                showCoordinates={showCoordinates}
                orientation={boardOrientation}
                animationSpeed={animationSpeed}
              />
            );
          })
        )}
      </Grid>
    );
  };

  // Berechne Boardgröße
  const sizingProps = getBoardSize();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={6}
        sx={{
          width: {
            xs: sizingProps.xs,
            sm: sizingProps.sm,
            md: sizingProps.md,
            lg: sizingProps.lg,
          },
          height: {
            xs: sizingProps.xs,
            sm: sizingProps.sm,
            md: sizingProps.md,
            lg: sizingProps.lg,
          },
          maxWidth: sizingProps.maxWidth,
          maxHeight: sizingProps.maxHeight,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 2, md: 4 },
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Schachbrett */}
        {renderBoard()}

        {/* Bauernumwandlungsdialog */}
        <AnimatePresence>
          {pendingPromotion && (
            <PawnPromotionDialog
              open={!!pendingPromotion}
              position={getPromotionDialogPosition()}
              color={pendingPromotion?.color}
              onSelect={handlePromotionSelect}
              orientation={boardOrientation}
              pieceStyle={pieceStyle}
            />
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

export default React.memo(ChessBoard);
