/**
 * Board.js
 *
 * Handles board events and
 * variables
 *
 */

/**
 * Create an empty board
 */
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

/**
 * Width + Height for the board
 */
let w;
let h;

/**
 * Render a 'X' for the AI
 * Render a 'O' for the user, or human
 */
let ai = "X";
let human = "O";
let currentPlayer = human;

/**
 *  Initialize the canvas using the
 *  p5.js library to draw it
 */
function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
}

/**
 * Return the equality value
 * of parameters a,b,c which are
 * 3 positions on the board
 */
function isEqual(a, b, c) {
  return a == b && b == c && a != "";
}

/**
 * Checks for a winner
 * by evaluating every
 * slot for vertical, horizontal
 * and diagonal values of 3 in a row
 */
function checkWinner() {
  let winner = null;

  // Horizontal Check
  for (let i = 0; i < 3; i++) {
    if (isEqual(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical Check
  for (let i = 0; i < 3; i++) {
    if (isEqual(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal Check
  if (isEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (isEqual(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

/**
 * Handle click event for
 * a spot on the board
 */
function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

/**
 * Draw the board
 */
function draw() {
  background(34, 59, 115);
  strokeWeight(4);
  stroke(212, 154, 47);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
