let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

const resetScore = () => {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem("score");
  updateScoreElement();
};

function updateScoreElement() {
  const scoreElement = document.querySelector(".js-score");
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "Backspace") {
    const resetQuestion = document.querySelector(".remove-question-js");
    resetQuestion.innerHTML = `Are you sure you want to reset the score? <button class="reset-yes">Yes</button> <button class="reset-no">No</button>`;
    document.querySelector(".reset-yes").addEventListener("click", () => {
      resetScore();
    });
    document.querySelector(".reset-no").addEventListener("click", () => {
      resetQuestion.innerHTML = `You don't want reset score`;
    });
  }
});

const rockButton = document.querySelector(".js-rock-button");
rockButton.addEventListener("click", () => {
  playGame("rock");
});

const paperButton = document.querySelector(".js-paper-button");
paperButton.addEventListener("click", () => {
  playGame("paper");
});

const scissorsButton = document.querySelector(".js-scissors-button");
scissorsButton.addEventListener("click", () => {
  playGame("scissors");
});

const resetButton = document.querySelector(".js-reset-button");
resetButton.addEventListener("click", () => {
  const resetQuestion = document.querySelector(".remove-question-js");

  resetQuestion.innerHTML = `Are you sure you want to reset the score? <button class="reset-yes">Yes</button> <button class="reset-no">No</button>`;
  document.querySelector(".reset-yes").addEventListener("click", () => {
    resetQuestion.innerHTML = "";
    resetScore();
  });
  document.querySelector(".reset-no").addEventListener("click", () => {
    resetQuestion.innerHTML = `You don't want reset score`;
  });
});

let pickComputerMove = () => {
  let randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
};

function playGame(playMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "You win";
    }
  } else if (playMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose";
    }
  } else if (playMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  const resultElement = document.querySelector(".js-result");
  resultElement.innerHTML = `${result}`;

  const movesElement = document.querySelector(".js-moves");
  movesElement.innerHTML = `You <img class="move-icon" src="./image/${playMove}-emoji.png " alt="" />  <img class="move-icon" src="./image/${computerMove}-emoji.png " alt="" /> Computer`;

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
}
