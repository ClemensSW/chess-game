// src/contexts/GameContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { Chess } from "chess.js";
import { useNotification } from "./NotificationContext";

// Create context
const GameContext = createContext();

// App version
const APP_VERSION = "2.0.0";

export const GameProvider = ({ children }) => {
  const { showNotification } = useNotification();

  // Board ref for chess operations
  const boardRef = useRef(null);

  // Chess Game State
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState("w"); // 'w' for white, 'b' for black
  const [gameEndState, setGameEndState] = useState(null);

  // Game statistics
  const [gameStats, setGameStats] = useState({
    startTime: Date.now(),
    moveCount: 0,
    capturedPieces: {
      white: [],
      black: [],
    },
    checks: 0,
  });

  // App settings
  const [appSettings, setAppSettings] = useState({
    // Default settings
    gameMode: "human",
    computerDifficulty: 3,
    timeControl: "10min",
    timeIncrement: 5,
    boardTheme: "modern",
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

  // Load settings from localStorage
  useState(() => {
    const savedSettings = localStorage.getItem("chessSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setAppSettings((prev) => ({
          ...prev,
          ...parsedSettings,
        }));
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  });

  // Save settings to localStorage when they change
  useState(() => {
    localStorage.setItem("chessSettings", JSON.stringify(appSettings));
  }, [appSettings]);

  // Callback for move changes from the chess board
  const handleMoveChange = useCallback(
    (moveHistory, capturedPiece, isCheck) => {
      // Format moves
      const formattedMoves = moveHistory.map((move) =>
        typeof move === "string" ? move : move.san || move.toString()
      );

      setMoves(formattedMoves);
      setCurrentMoveIndex(formattedMoves.length - 1);

      // Switch player
      setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));

      // Update game statistics
      setGameStats((prev) => {
        const updatedStats = {
          ...prev,
          moveCount: prev.moveCount + 1,
        };

        // Add captured piece if any
        if (capturedPiece) {
          const captureList = capturedPiece.color === "w" ? "white" : "black";
          updatedStats.capturedPieces = {
            ...prev.capturedPieces,
            [captureList]: [...prev.capturedPieces[captureList], capturedPiece],
          };
        }

        // Count checks
        if (isCheck) {
          updatedStats.checks = prev.checks + 1;
        }

        return updatedStats;
      });
    },
    []
  );

  // Start a new game
  const handleNewGame = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.newGame();
    } else {
      setGame(new Chess());
      setMoves([]);
      setCurrentMoveIndex(-1);
      setCurrentPlayer("w");
    }

    // Reset game statistics
    setGameStats({
      startTime: Date.now(),
      moveCount: 0,
      capturedPieces: {
        white: [],
        black: [],
      },
      checks: 0,
    });

    // Reset game end state
    setGameEndState(null);
  }, []);

  // Undo move
  const handleUndoMove = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.undoMove();
    }

    // Switch player back
    if (moves.length > 0) {
      setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));

      // Update statistics
      setGameStats((prev) => ({
        ...prev,
        moveCount: Math.max(0, prev.moveCount - 1),
      }));
    }
  }, [moves.length]);

  // Flip board
  const handleFlipBoard = useCallback(() => {
    if (boardRef.current) {
      boardRef.current.flipBoard();
    }
  }, []);

  // Save game
  const handleSaveGame = useCallback(() => {
    try {
      if (!boardRef.current) {
        showNotification("Error saving game", "error");
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
      showNotification("Game successfully saved", "success");
    } catch (error) {
      console.error("Error saving:", error);
      showNotification("Error saving game", "error");
    }
  }, [moves, currentPlayer, gameStats, showNotification]);

  // Load game
  const handleLoadGame = useCallback(() => {
    try {
      const savedGameJson = localStorage.getItem("savedChessGame");
      if (!savedGameJson) {
        showNotification("No saved game found", "info");
        return;
      }

      const savedGame = JSON.parse(savedGameJson);
      if (savedGame && savedGame.fen) {
        const loadedGame = new Chess();
        try {
          const success = loadedGame.load(savedGame.fen);
          if (!success) {
            throw new Error("Invalid FEN notation");
          }

          // Restore game state
          setGame(loadedGame);
          setMoves(savedGame.moves || []);
          setCurrentPlayer(savedGame.currentPlayer || loadedGame.turn());
          setCurrentMoveIndex(
            savedGame.moves ? savedGame.moves.length - 1 : -1
          );

          // Restore statistics
          if (savedGame.gameStats) {
            setGameStats({
              ...savedGame.gameStats,
              startTime:
                Date.now() - (savedGame.gameStats.gameDuration * 1000 || 0),
            });
          }

          // Update board
          if (boardRef.current) {
            boardRef.current.loadPosition(savedGame.fen, savedGame.moves);
          }

          showNotification("Game successfully loaded", "success");
        } catch (error) {
          console.error("Error loading game:", error);
          showNotification("Error loading game", "error");
        }
      }
    } catch (error) {
      console.error("Error loading game:", error);
      showNotification("Error loading game", "error");
    }
  }, [showNotification]);

  // Apply settings
  const handleApplySettings = useCallback(
    (newSettings) => {
      setAppSettings((prev) => ({
        ...prev,
        ...newSettings,
      }));

      // Save settings
      localStorage.setItem(
        "chessSettings",
        JSON.stringify({
          ...appSettings,
          ...newSettings,
        })
      );

      showNotification("Settings applied", "success");
    },
    [appSettings, showNotification]
  );

  // Handle time up
  const handleTimeUp = useCallback((player) => {
    // Game end by time out
    setGameEndState({
      isOver: true,
      title: "Time up!",
      message: `${player === "w" ? "White" : "Black"} ran out of time.`,
      winner: player === "w" ? "b" : "w",
      reason: "time",
    });

    // Finalize statistics
    setGameStats((prev) => ({
      ...prev,
      gameDuration: Math.floor((Date.now() - prev.startTime) / 1000),
    }));
  }, []);

  // Select move from history
  const handleMoveSelect = useCallback((index) => {
    setCurrentMoveIndex(index);

    // In an extended version, set the board to this move's state
    if (boardRef.current) {
      boardRef.current.goToMove(index);
    }
  }, []);

  // Handle game end
  const handleGameEnd = useCallback((endState) => {
    // Finalize statistics
    setGameStats((prev) => ({
      ...prev,
      gameDuration: Math.floor((Date.now() - prev.startTime) / 1000),
    }));

    setGameEndState(endState);
  }, []);

  // Close game end dialog
  const handleCloseGameEnd = useCallback(() => {
    setGameEndState(null);
  }, []);

  // Share game
  const handleShareGame = useCallback(() => {
    try {
      // Get FEN notation
      const fen = boardRef.current?.getFEN() || game.fen();

      // Create share text
      const shareText = `Check out my chess game! FEN: ${fen}`;

      // Copy to clipboard
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          showNotification("Game state copied to clipboard", "success");
        })
        .catch((err) => {
          console.error("Error copying:", err);
          showNotification("Error copying game state", "error");
        });
    } catch (error) {
      console.error("Error sharing game:", error);
      showNotification("Error sharing game", "error");
    }
  }, [game, showNotification]);

  // Calculate timer duration
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

  // Context value
  const value = {
    game,
    moves,
    currentMoveIndex,
    currentPlayer,
    gameEndState,
    gameStats,
    appSettings,
    boardRef,
    handleMoveChange,
    handleNewGame,
    handleUndoMove,
    handleFlipBoard,
    handleSaveGame,
    handleLoadGame,
    handleApplySettings,
    handleTimeUp,
    handleMoveSelect,
    handleGameEnd,
    handleCloseGameEnd,
    handleShareGame,
    getTimerDuration,
    setAppSettings,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
