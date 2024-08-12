// Setup the game board
export function setupGameBoard() {
  const wordleContainer = document.getElementById("wordle");
  const gameBoard = document.getElementById("gameBoard");
  const gameContainer = document.getElementById("game");

  for (let i = 0; i < 6; i++) {
    const gameRow = document.createElement("div");
    gameRow.classList.add("gameRow");
    for (let j = 0; j < 5; j++) {
      const gameTile = document.createElement("div");
      gameTile.classList.add("gameTile", "empty");
      gameTile.id = (i * 5 + j);
      gameRow.appendChild(gameTile);
    }
    gameBoard.appendChild(gameRow);
  }

  wordleContainer.appendChild(gameBoard);
  gameContainer.appendChild(wordleContainer);
}