// src/contexts/GameContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Chess } from "chess.js";
import { useNotification } from "./NotificationContext";
import ComputerPlayer from "../services/ComputerPlayer";

// Create context
const GameContext = createContext();

// App version
const APP_VERSION = "2.0.0";

export const GameProvider = ({ children }) => {
  const { showNotification } = useNotification();

  // Board ref for chess operations
  const boardRef = useRef(null);

  // Computer player ref
  const computerPlayerRef = useRef(null);

  // Chess Game State
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState("w"); // 'w' for white, 'b' for black
  const [gameEndState, setGameEndState] = useState(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // New state to track if game has started (for overlay)
  const [gameStarted, setGameStarted] = useState(false);

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
    computerDifficulty: 5,
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
  useEffect(() => {
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

    // Check if we have a previously started game
    const savedGameJson = localStorage.getItem("savedChessGame");
    if (savedGameJson) {
      // Having a saved game doesn't automatically start it,
      // but we can use this information elsewhere if needed
      console.log("Found saved game");
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chessSettings", JSON.stringify(appSettings));
  }, [appSettings]);

  // Initialize or update the computer player when the game or difficulty changes
  useEffect(() => {
    if (appSettings.gameMode === "computer" && game) {
      computerPlayerRef.current = new ComputerPlayer(
        game,
        appSettings.computerDifficulty
      );
    }
  }, [game, appSettings.gameMode, appSettings.computerDifficulty]);

  // Make a computer move if it's the computer's turn
  useEffect(() => {
    const isComputerMode = appSettings.gameMode === "computer";
    const isComputerTurn = currentPlayer === "b"; // Computer always plays as black

    if (
      isComputerMode &&
      isComputerTurn &&
      gameStarted &&
      !gameEndState &&
      computerPlayerRef.current
    ) {
      // Add a small delay for better UX
      setIsComputerThinking(true);

      const thinkingTime = 500 + Math.random() * 1000; // Random thinking time for more natural feel

      const timerId = setTimeout(() => {
        try {
          // Make the computer move
          const move = computerPlayerRef.current.makeMove();

          if (move) {
            // Update move history
            setMoves((prev) => [...prev, move]);
            setCurrentMoveIndex((prev) => prev + 1);

            // Switch player
            setCurrentPlayer("w");

            // Update game statistics
            updateGameStatsAfterMove(move);

            // Update board visualization if needed - the board should
            // automatically update when the game state changes, but we can
            // explicitly update the position if we have a specific FEN
            if (boardRef.current && boardRef.current.getFEN) {
              const currentFEN = game.fen();
              boardRef.current.loadPosition(currentFEN, moves);
            }

            // Check for game end
            checkGameEnd();
          }
        } catch (error) {
          console.error("Error making computer move:", error);
        } finally {
          setIsComputerThinking(false);
        }
      }, thinkingTime);

      return () => clearTimeout(timerId);
    }
  }, [currentPlayer, gameStarted, gameEndState, appSettings.gameMode]);

  // Helper to update game stats after a move
  const updateGameStatsAfterMove = (move) => {
    setGameStats((prev) => {
      const updatedStats = {
        ...prev,
        moveCount: prev.moveCount + 1,
      };

      // Add captured piece if any
      if (move.captured) {
        const capturedPiece = {
          type: move.captured,
          color: move.color === "w" ? "b" : "w",
        };

        const captureList = capturedPiece.color === "w" ? "white" : "black";
        updatedStats.capturedPieces = {
          ...prev.capturedPieces,
          [captureList]: [...prev.capturedPieces[captureList], capturedPiece],
        };
      }

      // Count checks
      if (move.flags && move.flags.includes("c")) {
        updatedStats.checks = prev.checks + 1;
      }

      return updatedStats;
    });
  };

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

    // Initialize computer player if in computer mode
    if (appSettings.gameMode === "computer") {
      computerPlayerRef.current = new ComputerPlayer(
        game,
        appSettings.computerDifficulty
      );
    }

    // Mark game as started (hide the selection overlay)
    setGameStarted(true);
  }, [appSettings.gameMode, appSettings.computerDifficulty]);

  // Undo move
  const handleUndoMove = useCallback(() => {
    // In computer mode, undo two moves to get back to human's turn
    const movesToUndo = appSettings.gameMode === "computer" ? 2 : 1;

    for (let i = 0; i < movesToUndo; i++) {
      if (boardRef.current) {
        boardRef.current.undoMove();
      }

      // Switch player back
      if (moves.length > 0) {
        setCurrentPlayer("w");

        // Update statistics
        setGameStats((prev) => ({
          ...prev,
          moveCount: Math.max(0, prev.moveCount - movesToUndo),
        }));
      }
    }
  }, [moves.length, appSettings.gameMode]);

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
        gameMode: appSettings.gameMode,
        computerDifficulty: appSettings.computerDifficulty,
      };

      localStorage.setItem("savedChessGame", JSON.stringify(gameState));
      showNotification("Game successfully saved", "success");
    } catch (error) {
      console.error("Error saving:", error);
      showNotification("Error saving game", "error");
    }
  }, [moves, currentPlayer, gameStats, showNotification, appSettings]);

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

          // Restore game mode settings if available
          if (savedGame.gameMode) {
            setAppSettings((prev) => ({
              ...prev,
              gameMode: savedGame.gameMode,
              computerDifficulty:
                savedGame.computerDifficulty || prev.computerDifficulty,
            }));
          }

          // Update board
          if (boardRef.current) {
            boardRef.current.loadPosition(savedGame.fen, savedGame.moves);
          }

          // Reinitialize computer player if needed
          if (savedGame.gameMode === "computer") {
            computerPlayerRef.current = new ComputerPlayer(
              loadedGame,
              savedGame.computerDifficulty || appSettings.computerDifficulty
            );
          }

          // Mark game as started
          setGameStarted(true);

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
  }, [showNotification, appSettings.computerDifficulty]);

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

      // Update computer difficulty if it changed
      if (
        computerPlayerRef.current &&
        newSettings.computerDifficulty &&
        newSettings.computerDifficulty !== appSettings.computerDifficulty
      ) {
        computerPlayerRef.current.setDifficulty(newSettings.computerDifficulty);
      }

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

  // Check game end condition
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
      }

      if (result.isOver) {
        handleGameEnd(result);
      }
    }
  }, [game, handleGameEnd]);

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
    gameStarted,
    isComputerThinking,
    setGameStarted,
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
