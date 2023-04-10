const squares = document.querySelectorAll(".square");
const status = document.querySelector(".status");
const playerTurn = document.querySelector(".player-turn");
const replayBtn = document.querySelector(".btn-replay");

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let currentPlayer = "X";
let isGameActive = true;

function handleClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (!isGameActive || board[row][col]) {
    return;
  }

  board[row][col] = currentPlayer;
  event.target.innerText = currentPlayer;

  const isWinner = checkWinner();
  const isBoardFull = checkBoardFull();

  if (isWinner) {
    status.innerText = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (isBoardFull) {
    status.innerText = "It's a tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  // check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === currentPlayer &&
      board[row][1] === currentPlayer &&
      board[row][2] === currentPlayer
    ) {
      return true;
    }
  }

  // check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === currentPlayer &&
      board[1][col] === currentPlayer &&
      board[2][col] === currentPlayer
    ) {
      return true;
    }
  }

  // check diagonals
  if (
    board[0][0] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][2] === currentPlayer
  ) {
    return true;
  }

  if (
    board[0][2] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    return true;
  }

  return false;
}

function checkBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (!board[row][col]) {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  currentPlayer = "X";
  isGameActive = true;
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      board[rowIndex][colIndex] = "";
      const square = document.querySelector(
        `[data-row="${rowIndex}"][data-col="${colIndex}"]`
      );
      square.innerText = "";
    });
  });
  status.innerText = "";
  playerTurn.innerText = "Player X's turn";
}

squares.forEach(square => {
  square.addEventListener("click", handleClick);
});

replayBtn.addEventListener("click", resetGame);
