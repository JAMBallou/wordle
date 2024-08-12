// Create and setup the keyboard
export function setupKeyboard() {
  const correctWord = possibleResponses[
    Math.floor(Math.random() * possibleResponses.length)
  ]; // sets correct word
  console.log(correctWord);

  const keyboardContainer = document.getElementById("keyboard");
  const gameContainer = document.getElementById("game");

  // Create rows
  const firstRow = document.createElement("div");
  firstRow.classList.add("keyboardRow");

  const secondRow = document.createElement("div");
  secondRow.classList.add("keyboardRow");

  const thirdRow = document.createElement("div");
  thirdRow.classList.add("keyboardRow");

  function createKeyboardBtn(key, row) {
    const keyBtn = document.createElement("button");
    keyBtn.textContent = key;
    keyBtn.classList.add("keyboardBtn");
    if (!(/[A-Z]/.test(key))) {
      keyBtn.classList.add("specialBtn")
    }

    // event listener for when the key is clicked
    let filledTiles = [];
    keyBtn.addEventListener("click", () => {
      if (!keyBtn.classList.contains("specialBtn")) { 
        // normal key
        const nextTile = document.querySelector(".empty");

        // Check if there are already five filled tiles in the current row
        filledTiles = document.querySelectorAll(".filled");

        if (filledTiles.length < 5) {
          nextTile.textContent = key;
          nextTile.classList.replace("empty", "filled"); // Add "filled" class for styling
          
          // trigger animation
          pop(nextTile);
        } 
      } else if (keyBtn.classList.contains("specialBtn") && keyBtn.textContent === "↵") {
        // enter key
        const tiles = document.getElementsByClassName("gameTile");
        const filledTiles = [];
        for (const tile of tiles) {
          if (tile.textContent) {
            filledTiles.push(tile);
          }
        }
        
        // check if response is valid
        if (filledTiles.length % 5 == 0) {
          const rowNumber = Math.floor(filledTiles.length / 5);
          const currentRow = filledTiles.filter((tile) => tile.id >= (rowNumber - 1) * 5);
          const rowData = currentRow[0] ? currentRow.map((tile) => tile.textContent).reduce((a, b) => a + b).toLowerCase() : [];
          if (wordList.includes(rowData)) {
            // deside the color of each tile based on the correct word
            const includedLetters = [];
            const correctLetters = [];
            const filledLetters = [];

            for (let i = 0; i < 5; i++) { // cycle through row
              for (let j = 0; j < 5; j++) { // cycle through correct word

                function fillKeyData(className) {
                  const keys = document.querySelectorAll(".keyboardBtn");
                  for (let k = 0; k < keys.length; k++) {
                    if (keys[k].textContent == rowData[i].toUpperCase()) {
                      keys[k].classList.add(className);
                    }
                  }
                }

                currentRow[i].classList.remove("filled");
                if (correctWord[i] == rowData[i]) {
                  currentRow[i].classList.add("correct", "entered");
                  correctLetters.push(rowData[i]);

                  fillKeyData("correct");

                  if ([...new Set(correctLetters)].length == 5) {
                    const emptyTiles = document.querySelectorAll(".empty");
                    console.log(emptyTiles.length)
                    switch (emptyTiles.length) {
                      case 25:
                        showCustomAlert("Genius");
                        break;
                      case 20:
                        showCustomAlert("Magnificent");
                        break;
                      case 15:
                        showCustomAlert("Impressive");
                        break;
                      case 10:
                        showCustomAlert("Splendid");
                        break;
                      case 5:
                        showCustomAlert("Great");
                        break;
                      case 0:
                        showCustomAlert("Phew");
                        break;
                    }

                    setTimeout(() => {
                      const startup = document.getElementById("startup");
                      const gameBoard = document.getElementById("gameBoard");
                      const keyboard = document.getElementById("keyboard");

                      startup.style.display = "flex";
                      gameBoard.innerHTML = "";
                      keyboard.innerHTML = "";
                    }, 3000);
                  }
                } else if (correctWord.includes(rowData[i])) {
                  currentRow[i].classList.add("includes", "entered");
                  includedLetters.push(rowData[i]);

                  fillKeyData("includes");
                } else {
                  currentRow[i].classList.add("entered");
                  filledLetters.push(rowData[i]);

                  fillKeyData("entered");
                }
              }
            }
          } else {
            if (currentRow[0]) {
              showCustomAlert("Not in word list");
              shake(currentRow[0].parentElement);
            } else {
              showCustomAlert("Not enough letters");
              shake(document.querySelector(".empty").parentElement);
            }
          }
        } else {
          const tiles = document.getElementsByClassName("gameTile");
          const filledTiles = [];
          for (const tile of tiles) {
            if (tile.textContent) {
              filledTiles.push(tile);
            }
          }
          const rowNumber = Math.floor(filledTiles.length / 5);

          showCustomAlert("Not enough letters");
          shake(document.querySelector(".empty").parentElement);
        }

      } else { 
        // backspace key
        let nextTile;
        if (document.querySelector(".empty")) {
          nextTile = document.querySelectorAll(".empty").length != 30 
            ? document.getElementById(document.querySelector(".empty").id - 1) : null;
        } else {
          nextTile = document.querySelectorAll(".gameTile")[29];
        }

        if (nextTile) {
          if (!nextTile.classList.contains("entered")) {
            nextTile.textContent = "";
            nextTile.classList.replace("filled", "empty")

            filledTiles = document.querySelectorAll(".filled");
          }
        }
      }
    }); 

    row.appendChild(keyBtn);
  }

  // Pop animation
  function pop(tile) {
    tile.classList.add('pop');
    tile.addEventListener('animationend', () => {
      tile.classList.remove('pop');
    }, { once: true }); // Ensure event listener runs only once
  }

  // Shake animation
  function shake(row) {
    row.classList.add('shake');
    row.addEventListener('animationend', () => {
      row.classList.remove('shake');
    }, { once: true }); // Ensure event listener runs only once
  }

  // Functionality for custom alerts
  window.showCustomAlert = function(message) {
    const customAlert = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    if (customAlert && alertMessage) {
      alertMessage.textContent = message;
      customAlert.classList.add("show");
      customAlert.classList.remove("hidden");
      
      // Hide the alert after 2 seconds
      setTimeout(() => {
        customAlert.classList.remove("show");
        customAlert.classList.add("hidden");
      }, 1500);
    } else {
      console.error("Custom alert elements not found");
    }
  };

  // Add buttons for the first row (QWERTY)
  const firstRowKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  for (const key of firstRowKeys) {
    createKeyboardBtn(key, firstRow);
  }

  // Add buttons for the second row (QWERTY)
  const secondRowKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  for (const key of secondRowKeys) {
    createKeyboardBtn(key, secondRow);
  }

  // Add buttons for the third row (QWERTY)
  const thirdRowKeys = ["↵", "Z", "X", "C", "V", "B", "N", "M", "⌫"];
  for (const key of thirdRowKeys) {
    createKeyboardBtn(key, thirdRow);
  }

  keyboardContainer.appendChild(firstRow);
  keyboardContainer.appendChild(secondRow);
  keyboardContainer.appendChild(thirdRow);

  gameContainer.appendChild(keyboardContainer);
}