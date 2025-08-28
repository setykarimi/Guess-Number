// Game vlaues
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI Elements
const form = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  resetBtn = document.querySelector("#reset"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("click", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Reset Form
resetBtn.addEventListener("click", function () {
  guessesLeft = 3;
  winningNum = getWinningNum(min, max);
  message.textContent = "";
  guessInput.style.borderColor = "#D1D1D1";
  guessInput.value = "";
  guessInput.disabled = false;
  resetBtn.classList.add("hidden");
  guessBtn.classList.remove("hidden");
});

// Form Submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a number between ${min} and ${max}`, "red");
  }

  //Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct , you WIN !`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false,`Game over , You lost, The correct number was ${winningNum}!`);
    } else {
      guessInput.style.borderColor = "red";
      setMessage(`${guess}  is not correct , ${guessesLeft} guesses left`,"red");
      guessInput.value = "";
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);
}

//Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Set Winning Num
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
