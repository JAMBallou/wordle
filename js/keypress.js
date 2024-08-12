// Simulate clicking a virtual key button
function simulateKeyPress(key) {
  const keyBtn = Array.from(document.querySelectorAll(".keyboardBtn"))
    .find(btn => btn.textContent === key);

  if (keyBtn) {
    keyBtn.click();
  }
}

// Add event listener for keydown events
document.addEventListener("keydown", (evt) => {
  // Handle alphanumeric keys
  if (/[a-zA-Z]/.test(evt.key)) {
    if (evt.key === "Enter") {
      simulateKeyPress("↵");
    } else if (evt.key === "Backspace") {
      simulateKeyPress("⌫");
    } else {
      simulateKeyPress(evt.key.toUpperCase());
    }
  }
});