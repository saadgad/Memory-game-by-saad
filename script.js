let images = [
  `<ion-icon class="card-img hidden" name="logo-javascript"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-javascript"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-python"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-python"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-html5"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-html5"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-github"></ion-icon>`,
  `<ion-icon class="card-img hidden" name="logo-github"></ion-icon>`,
];
let tempImages = [];
tempImages = tempImages.concat(images);
let guessedCards = [];
let matchingCards = [];
const button = document.querySelector("button");
const cards = document.querySelectorAll(".card-box");
let guesses = document.getElementsByClassName("guessed");
button.addEventListener("click", function () {
  if (!button.classList.contains("started")) {
    button.classList.add("started");
    startGame();
  }
  if (button.innerText == "Play again") {
    matchingCards = [];
    tempImages = tempImages.concat(images);
    button.classList.add("started");
    let cardBoxList = document.querySelectorAll(".card-box");
    cardBoxList.forEach((cardBox) => {
      addPlayable(cardBox);
    });
    startGame();
  }
});

cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    let cardBox = e.target;
    let cardImg = e.target.childNodes[0];
    if (cardBox.classList.contains("playable") && guessedCards.length < 2) {
      // cardImg.classList.remove("hidden");
      removeHidden(cardImg);
      // cardBox.classList.remove("playable");
      removePlayable(cardBox);
      // cardBox.classList.add("guessed");
      addGuessed(cardBox);

      guessedCards.push(cardBox.innerHTML);
      if (guessedCards.length == 2) {
        guessedCards[0] == guessedCards[1]
          ? matched()
          : setTimeout(() => {
              unmatched();
            }, 500);

        // console.log("they don't match");
      }
      if (
        matchingCards.length ==
        document.querySelector(".cards-grid").childElementCount
      ) {
        document.querySelector("h1").innerText = "👏You won!👏";
        tempImages = [];
        button.innerText = "Play again";
        button.classList.remove("started");
      }
    }
  });
});

function matched() {
  matchingCards = matchingCards.concat(guessedCards);
  removeGuessed(guesses[1]);
  removeGuessed(guesses[0]);
  guessedCards = [];
}

function unmatched() {
  addPlayable(guesses[1]);
  addHidden(guesses[1].childNodes[0]);
  removeGuessed(guesses[1]);
  addPlayable(guesses[0]);
  addHidden(guesses[0].childNodes[0]);
  removeGuessed(guesses[0]);

  guessedCards = [];
}

// function removeGuessed() {
//   for (let i = 0; guesses.length > 0; ) {
//     guesses[i].classList.remove("guessed");
//   }

//   // guesses.forEach((guess) => {
//   //   guess.classList.remove("guessed");
//   // });
// }

function startGame() {
  clearImages();
  assignImages();
  document.querySelector("h1").innerText = "Match the cards!";
}

function clearImages() {
  cards.forEach((card) => {
    card.innerHTML = "";
  });
}

function assignImages() {
  cards.forEach((card) => {
    let randomImage = Math.floor(Math.random() * tempImages.length);
    card.innerHTML = tempImages[randomImage];
    tempImages.splice(randomImage, 1);
  });
}

function removePlayable(ele) {
  ele.classList.remove("playable");
}

function removeGuessed(ele) {
  ele.classList.remove("guessed");
}

function removeHidden(ele) {
  ele.classList.remove("hidden");
}

function addPlayable(ele) {
  ele.classList.add("playable");
}

function addGuessed(ele) {
  ele.classList.add("guessed");
}

function addHidden(ele) {
  ele.classList.add("hidden");
}
