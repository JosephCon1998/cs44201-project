/**
 * minimax.js
 *
 * Handles the algorithm implementation
 * for minimax
 *
 */

/**
 * Lookup table for each
 * winning scenario: X wins, O wins, or tie
 */
let winner = {
  X: 1,
  O: -1,
  tie: 0,
};

/**
 * Function that gets called with every turn
 * When each player goes, bestMove() is invoked
 */
function bestMove() {
  let bestScore = -Infinity;
  let move;
  let depth = document.getElementById("depth").value;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // If the spot is allowed
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, depth, false, -Infinity, +Infinity);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

function minimax(board, depth, isMaximizing, alpha, beta) {
  /**
   * If check winner returns tie or the winner,
   * then leave the function and return the winner
   * based off the lookup table 'winner'
   */
  let result = checkWinner();
  if (result !== null) {
    return winner[result];
  }

  /**
   * If it is the maximizing players turn
   */
  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If the spot is allowed
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false, alpha, beta);

          alpha = max(alpha, score);
          if (beta <= alpha) {
            break;
          }

          board[i][j] = "";
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    /**
     * If its the minimizing players turn
     */
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // If the spot is allowed
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true, alpha, beta);

          alpha = min(alpha, score);
          if (beta <= alpha) {
            break;
          }

          board[i][j] = "";
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
