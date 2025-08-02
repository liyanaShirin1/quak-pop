const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const bubbleWrap = document.getElementById("bubble-wrap");

const popSound = document.getElementById("pop-sound");
const quakSound = document.getElementById("quak-sound");
const startSound = document.getElementById("start-sound");

let duckIndex;

function launchConfetti() {
  const container = document.getElementById("confetti-container");
  const emojis = ['🎉', '✨', '🎊', '🪩', '🌟'];

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Random styles
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.fontSize = (Math.random() * 16 + 20) + "px";
    confetti.style.animationDuration = (Math.random() * 2 + 5) + "s"; // 5–7s

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 8000);
  }
}

function createBubbles() {
  bubbleWrap.innerHTML = '';
  const totalBubbles = 100;
  duckIndex = Math.floor(Math.random() * totalBubbles);

  for (let i = 0; i < totalBubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.dataset.index = i;

    bubble.addEventListener("click", () => {
  if (bubble.classList.contains("popped")) return;

  bubble.classList.add("popped");

  // 👇 Replace this:
  // popSound.currentTime = 0;
  // popSound.play();

  // ✅ With this:
  const popClone = popSound.cloneNode();
  popClone.volume = 1;
  popClone.play();

 if (i == duckIndex) {
  const duckImg = document.createElement("img");
  duckImg.src = "assets/images/duck.png";
  duckImg.alt = "Found Duck!";
  duckImg.classList.add("bubble-duck");
  bubble.appendChild(duckImg);

  setTimeout(() => {
    quakSound.play();
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    launchConfetti();
  }, 1000); // Give time for user to see the duck
}

});


    bubbleWrap.appendChild(bubble); // ✅ Make sure this is outside the if block
  }
}

// ✅ Start button
startBtn.addEventListener("click", () => {
  startSound.pause();       // Stop any old playback
  startSound.currentTime = 0;
  startSound.volume = 1;
  startSound.play().catch(() => {
    console.warn("Start sound blocked.");
  });

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  createBubbles();
});


// ✅ Restart button
restartBtn.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  createBubbles();
});

window.addEventListener("load", () => {
  startSound.load(); // force load to memory
});

