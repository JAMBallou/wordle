import { setupGameBoard } from "./gameboard.js";
import { setupKeyboard } from "./keyboard.js";

document.querySelector(".startBtn").onclick = start;

function start() {
  const startup = document.getElementById("startup");
  const game = document.getElementById("game");

  startup.style.display = "none";
  game.style.display = "block";
  
  setupGameBoard();
  setupKeyboard();
}