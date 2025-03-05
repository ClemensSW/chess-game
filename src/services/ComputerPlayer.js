// src/services/ComputerPlayer.js

/**
 * Computer player service with chess AI functionality
 * Implements a minimax algorithm with alpha-beta pruning and adjustable difficulty levels
 */
class ComputerPlayer {
  constructor(game, difficulty = 5) {
    this.game = game;
    this.setDifficulty(difficulty);
  }

  /**
   * Set the difficulty level from 1-10
   * @param {number} level - Difficulty level from 1-10
   */
  setDifficulty(level) {
    // Ensure level is between 1-10
    const normalizedLevel = Math.max(1, Math.min(10, level));

    // Map difficulty level to search depth
    const depthMap = {
      1: { depth: 1, randomFactor: 0.6 },
      2: { depth: 1, randomFactor: 0.4 },
      3: { depth: 2, randomFactor: 0.4 },
      4: { depth: 2, randomFactor: 0.3 },
      5: { depth: 2, randomFactor: 0.2 },
      6: { depth: 3, randomFactor: 0.2 },
      7: { depth: 3, randomFactor: 0.1 },
      8: { depth: 3, randomFactor: 0.05 },
      9: { depth: 4, randomFactor: 0.05 },
      10: { depth: 4, randomFactor: 0 },
    };

    const config = depthMap[normalizedLevel];
    this.searchDepth = config.depth;
    this.randomFactor = config.randomFactor;
  }

  /**
   * Calculate the best move for the current position
   * @returns {Object} The best move object
   */
  calculateBestMove() {
    if (!this.game || this.game.isGameOver()) {
      return null;
    }

    try {
      // Get all possible moves
      const possibleMoves = this.game.moves({ verbose: true });

      if (possibleMoves.length === 0) {
        return null;
      }

      // For very low difficulty or opening, sometimes make a random move
      if (Math.random() < this.randomFactor) {
        return this.getRandomMove(possibleMoves);
      }

      // Calculate the best move using minimax algorithm
      let bestMove = null;
      let bestScore = -Infinity;
      let alpha = -Infinity;
      let beta = Infinity;

      for (const move of possibleMoves) {
        // Make the move
        this.game.move(move);

        // Calculate score for this move
        const score = -this.minimax(this.searchDepth - 1, -beta, -alpha, false);

        // Undo the move
        this.game.undo();

        // Update best move
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }

        // Update alpha for alpha-beta pruning
        alpha = Math.max(alpha, bestScore);
      }

      return bestMove;
    } catch (error) {
      console.error("Error calculating best move:", error);
      return this.getRandomMove(this.game.moves({ verbose: true }));
    }
  }

  /**
   * Minimax algorithm with alpha-beta pruning
   * @param {number} depth - Current search depth
   * @param {number} alpha - Alpha value for pruning
   * @param {number} beta - Beta value for pruning
   * @param {boolean} maximizingPlayer - Whether the current player is maximizing
   * @returns {number} - Evaluation score for the position
   */
  minimax(depth, alpha, beta, maximizingPlayer) {
    // Base case: if depth is 0 or game is over
    if (depth === 0 || this.game.isGameOver()) {
      return this.evaluatePosition();
    }

    const possibleMoves = this.game.moves();

    if (maximizingPlayer) {
      let maxScore = -Infinity;

      for (const move of possibleMoves) {
        this.game.move(move);
        const score = this.minimax(depth - 1, alpha, beta, false);
        this.game.undo();

        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);

        if (beta <= alpha) {
          break; // Beta cutoff
        }
      }

      return maxScore;
    } else {
      let minScore = Infinity;

      for (const move of possibleMoves) {
        this.game.move(move);
        const score = this.minimax(depth - 1, alpha, beta, true);
        this.game.undo();

        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);

        if (beta <= alpha) {
          break; // Alpha cutoff
        }
      }

      return minScore;
    }
  }

  /**
   * Evaluate the current position
   * @returns {number} - Score of the position (positive is good for white, negative for black)
   */
  evaluatePosition() {
    // Basic material counting
    if (this.game.isCheckmate()) {
      // If checkmate, return a high value
      return this.game.turn() === "w" ? -9999 : 9999;
    }

    if (this.game.isDraw()) {
      return 0; // Draw is neutral
    }

    // Material values
    const pieceValues = {
      p: 1, // Pawn
      n: 3, // Knight
      b: 3, // Bishop
      r: 5, // Rook
      q: 9, // Queen
      k: 0, // King (not counted for material advantage)
    };

    // Count material
    const board = this.game.board();
    let score = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
          const value = pieceValues[piece.type];
          if (piece.color === "w") {
            score += value;
          } else {
            score -= value;
          }
        }
      }
    }

    // Position evaluation bonuses
    // Add small bonus for center control
    const moves = this.game.moves();
    if (this.game.turn() === "w") {
      score += moves.length * 0.1; // Mobility bonus
    } else {
      score -= moves.length * 0.1;
    }

    // Check bonus
    if (this.game.isCheck()) {
      if (this.game.turn() === "w") {
        score -= 0.5; // Black has white in check
      } else {
        score += 0.5; // White has black in check
      }
    }

    return score;
  }

  /**
   * Get a random move from the list of possible moves
   * @param {Array} moves - List of possible moves
   * @returns {Object} - A random move
   */
  getRandomMove(moves) {
    if (!moves || moves.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  }

  /**
   * Make the best move for the computer player
   * @returns {Object} - The move that was made
   */
  makeMove() {
    const bestMove = this.calculateBestMove();
    if (bestMove) {
      return this.game.move(bestMove);
    }
    return null;
  }
}

export default ComputerPlayer;
