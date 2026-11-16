const squares = document.querySelectorAll(".square");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const heading = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const pageBackground = getComputedStyle(document.body).backgroundColor;

let colors = [];
let pickedColor;
let numberOfSquares = 6;

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function generateRandomColors(number) {
  const generatedColors = [];

  while (generatedColors.length < number) {
    const color = randomColor();
    if (!generatedColors.includes(color)) {
      generatedColors.push(color);
    }
  }

  return generatedColors;
}

function pickColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function startNewGame() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  heading.style.backgroundColor = "steelblue";
  resetButton.textContent = "Nuevos colores";

  for (let i = 0; i < squares.length; i++) {
    if (i < numberOfSquares) {
      squares[i].hidden = false;
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].hidden = true;
    }
  }
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function () {
    const clickedColor = this.style.backgroundColor;

    if (clickedColor === pickedColor) {
      messageDisplay.textContent = "¡Correcto!";
      resetButton.textContent = "Jugar de nuevo";
      heading.style.backgroundColor = pickedColor;
      changeColors(pickedColor);
    } else {
      this.style.backgroundColor = pageBackground;
      messageDisplay.textContent = "Intentalo nuevamente";
    }
  });
}

for (let i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener("click", function () {
    modeButtons.forEach((button) => button.classList.remove("selected"));
    this.classList.add("selected");
    numberOfSquares = Number(this.dataset.count);
    startNewGame();
  });
}

resetButton.addEventListener("click", startNewGame);

startNewGame();
