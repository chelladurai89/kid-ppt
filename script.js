const vocabulary = [
  { word: "apple", letter: "A", emoji: "🍎", difficulty: 1, tip: "A makes the /a/ sound." },
  { word: "ball", letter: "B", emoji: "🏀", difficulty: 1, tip: "B bounces like a ball." },
  { word: "cat", letter: "C", emoji: "🐱", difficulty: 1, tip: "C says /k/ like cat." },
  { word: "dog", letter: "D", emoji: "🐶", difficulty: 1, tip: "D is for a friendly dog." },
  { word: "egg", letter: "E", emoji: "🥚", difficulty: 1, tip: "E says /eh/ like egg." },
  { word: "fish", letter: "F", emoji: "🐟", difficulty: 2, tip: "F sounds like /fff/ bubbles." },
  { word: "grape", letter: "G", emoji: "🍇", difficulty: 2, tip: "G says /g/ like grape." },
  { word: "hat", letter: "H", emoji: "🎩", difficulty: 2, tip: "H is a happy hat." },
  { word: "ice", letter: "I", emoji: "🧊", difficulty: 2, tip: "I can say /i/ like ice." },
  { word: "jelly", letter: "J", emoji: "🍮", difficulty: 3, tip: "J wiggles like jelly." },
  { word: "kite", letter: "K", emoji: "🪁", difficulty: 3, tip: "K says /k/ like kite." },
  { word: "lion", letter: "L", emoji: "🦁", difficulty: 3, tip: "L roars like a lion." },
  { word: "moon", letter: "M", emoji: "🌙", difficulty: 3, tip: "M hums /mmm/ like moon." },
  { word: "nest", letter: "N", emoji: "🪹", difficulty: 3, tip: "N is for a cozy nest." },
  { word: "octopus", letter: "O", emoji: "🐙", difficulty: 4, tip: "O says /o/ like octopus." },
  { word: "piano", letter: "P", emoji: "🎹", difficulty: 4, tip: "P pops like piano keys." },
  { word: "queen", letter: "Q", emoji: "👑", difficulty: 4, tip: "Q is a quiet queen." },
  { word: "rainbow", letter: "R", emoji: "🌈", difficulty: 4, tip: "R rumbles like rainbow." }
];

const stage1Element = document.getElementById("stage-1");
const stage2Element = document.getElementById("stage-2");
const stageCompleteElement = document.getElementById("stage-complete");
const promptElement = document.getElementById("prompt");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const matchFeedbackElement = document.getElementById("match-feedback");
const pictureListElement = document.getElementById("picture-list");
const letterListElement = document.getElementById("letter-list");
const lettersMasteredElement = document.getElementById("letters-mastered");
const lettersTotalElement = document.getElementById("letters-total");
const progressFillElement = document.getElementById("progress-fill");
const completionMessageElement = document.getElementById("completion-message");
const restartButton = document.getElementById("restart");

const sortedByDifficulty = [...vocabulary].sort((a, b) => a.difficulty - b.difficulty || a.word.localeCompare(b.word));
const stage1Words = sortedByDifficulty.slice(0, 5);
const stage2Words = sortedByDifficulty.slice(5, 11);
const totalLettersSet = new Set([...stage1Words, ...stage2Words].map((item) => item.letter));
let masteredLetters = new Set();

let stage1Index = 0;
let stage1Queue = shuffle([...stage1Words]);
let stageInProgress = 1;
let selectedPicture = null;
let selectedLetter = null;

lettersTotalElement.textContent = totalLettersSet.size;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateProgress() {
  lettersMasteredElement.textContent = masteredLetters.size;
  const percent = (masteredLetters.size / totalLettersSet.size) * 100;
  progressFillElement.style.width = `${percent}%`;
  progressBarElement.setAttribute("aria-valuenow", masteredLetters.size);
  progressBarElement.setAttribute(
    "aria-valuetext",
    `${masteredLetters.size} of ${totalLettersSet.size} letters mastered`
  );
}

function speakMessage(message) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function renderStage1Question() {
  const current = stage1Queue[stage1Index];
  promptElement.innerHTML = `
    <figure class="prompt__figure">
      <div class="prompt__image" role="img" aria-label="${current.word}">${current.emoji}</div>
    </figure>
    <div class="prompt__image" role="img" aria-label="${current.word}">${current.emoji}</div>
    <div class="prompt__word">Which letter does this word start with?</div>
  `;
  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  const lettersPool = new Set([current.letter]);
  while (lettersPool.size < 4) {
    const randomItem = vocabulary[Math.floor(Math.random() * vocabulary.length)].letter;
    lettersPool.add(randomItem);
  }

  const choices = shuffle([...lettersPool]);
  choices.forEach((letter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = letter;
    button.setAttribute("aria-label", `${letter}`);
    button.addEventListener("click", () => handleStage1Answer(letter, current));
    optionsElement.appendChild(button);
  });
}

function handleStage1Answer(letter, current) {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
  });

  if (letter === current.letter) {
    masteredLetters.add(current.letter);
    updateProgress();
    const message = `${capitalize(current.word)} starts with the letter "${current.letter}". ${current.tip}`;
    feedbackElement.textContent = message;
    feedbackElement.classList.add("feedback--success");
    speakMessage(message);

    setTimeout(() => {
      stage1Index += 1;
      if (stage1Index >= stage1Queue.length) {
        startStage2();
      } else {
        renderStage1Question();
      }
    }, 1600);
  } else {
    const message = "Try again! You can do it.";
    const message = `Nice try! ${capitalize(current.word)} begins with "${current.letter}".`;
    feedbackElement.textContent = message;
    feedbackElement.classList.add("feedback--warning");
    speakMessage(message);

    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.removeAttribute("aria-disabled");
    });
    setTimeout(() => {
      buttons.forEach((btn) => {
        btn.disabled = false;
      });
    }, 800);
  }
}

function startStage2() {
  stageInProgress = 2;
  stage1Element.classList.add("card--hidden");
  stage2Element.classList.remove("card--hidden");
  setupMatchingRound();
}

function setupMatchingRound() {
  pictureListElement.innerHTML = "";
  letterListElement.innerHTML = "";
  matchFeedbackElement.textContent = "";
  matchFeedbackElement.className = "feedback";

  const pictures = shuffle(stage2Words.map((item) => ({ ...item })));
  const letters = shuffle(stage2Words.map((item) => item.letter));

  pictures.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "match-card match-card--picture";
    card.dataset.letter = item.letter;
    card.innerHTML = `
      <span class="match-card__emoji" role="img" aria-label="${item.word}">${item.emoji}</span>
      <span class="match-card__word">${capitalize(item.word)}</span>
    `;
    card.addEventListener("click", () => selectPictureCard(card));
    pictureListElement.appendChild(card);
  });

  letters.forEach((letter) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "match-card";
    card.textContent = letter;
    card.dataset.letter = letter;
    card.addEventListener("click", () => selectLetterCard(card));
    letterListElement.appendChild(card);
  });
}

function selectPictureCard(card) {
  if (card.classList.contains("match-card--matched")) return;

  const previouslySelected = pictureListElement.querySelector(".match-card--selected");
  if (previouslySelected && previouslySelected !== card) {
    previouslySelected.classList.remove("match-card--selected");
  }
  card.classList.toggle("match-card--selected");
  selectedPicture = card.classList.contains("match-card--selected") ? card : null;
  checkMatchAttempt();
}

function selectLetterCard(card) {
  if (card.classList.contains("match-card--matched")) return;

  const previouslySelected = letterListElement.querySelector(".match-card--selected");
  if (previouslySelected && previouslySelected !== card) {
    previouslySelected.classList.remove("match-card--selected");
  }
  card.classList.toggle("match-card--selected");
  selectedLetter = card.classList.contains("match-card--selected") ? card : null;
  checkMatchAttempt();
}

function checkMatchAttempt() {
  if (!selectedPicture || !selectedLetter) return;

  const pictureLetter = selectedPicture.dataset.letter;
  const guessedLetter = selectedLetter.dataset.letter;

  if (pictureLetter === guessedLetter) {
    masteredLetters.add(guessedLetter);
    updateProgress();

    selectedPicture.classList.remove("match-card--selected");
    selectedLetter.classList.remove("match-card--selected");
    selectedPicture.classList.add("match-card--matched");
    selectedLetter.classList.add("match-card--matched");
    selectedPicture.disabled = true;
    selectedLetter.disabled = true;
    selectedPicture.setAttribute("aria-disabled", "true");
    selectedLetter.setAttribute("aria-disabled", "true");

    const word = selectedPicture.querySelector(".match-card__word").textContent;
    const message = `${word} matches the letter "${guessedLetter}". Great work!`;
    matchFeedbackElement.textContent = message;
    matchFeedbackElement.className = "feedback feedback--success";
    speakMessage(message);

    selectedPicture = null;
    selectedLetter = null;

    if (isMatchingComplete()) {
      finishAdventure();
    }
  } else {
    matchFeedbackElement.textContent = "Try again!";
    matchFeedbackElement.className = "feedback feedback--warning";
    speakMessage("Try again.");
    matchFeedbackElement.textContent = `Oops! Try a different letter for that picture.`;
    matchFeedbackElement.className = "feedback feedback--warning";
    speakMessage("Try another letter.");

    setTimeout(() => {
      if (selectedPicture) selectedPicture.classList.remove("match-card--selected");
      if (selectedLetter) selectedLetter.classList.remove("match-card--selected");
      selectedPicture = null;
      selectedLetter = null;
    }, 900);
  }
}

function isMatchingComplete() {
  return (
    pictureListElement.querySelectorAll(".match-card--matched").length === stage2Words.length &&
    letterListElement.querySelectorAll(".match-card--matched").length === stage2Words.length
  );
}

function finishAdventure() {
  stageInProgress = 3;
  stage2Element.classList.add("card--hidden");
  stageCompleteElement.classList.remove("card--hidden");

  const learnedPercent = Math.round((masteredLetters.size / totalLettersSet.size) * 100);
  completionMessageElement.innerHTML = `
    You completed the alphabet adventure! You matched <strong>${masteredLetters.size}</strong> letters out of <strong>${totalLettersSet.size}</strong>.
    That means you know <strong>${learnedPercent}%</strong> of today's letters. Keep shining!
  `;
  speakMessage("Fantastic! You finished the alphabet adventure. Let's celebrate!");
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function resetGame() {
  masteredLetters = new Set();
  stageInProgress = 1;
  stage1Index = 0;
  stage1Queue = shuffle([...stage1Words]);
  selectedPicture = null;
  selectedLetter = null;
  updateProgress();

  stageCompleteElement.classList.add("card--hidden");
  stage2Element.classList.add("card--hidden");
  stage1Element.classList.remove("card--hidden");

  renderStage1Question();
}

restartButton.addEventListener("click", resetGame);

resetGame();
