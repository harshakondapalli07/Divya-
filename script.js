// ========== CONFIGURATION ==========
// ========== CONFIGURATION ==========
const BIRTHDAY_DAY = 16;
const BIRTHDAY_MONTH = 0; // January

const BIRTH_DATE = new Date(2005, 0, 16, 15, 27, 0); 

 

// ========== DATE CHECK ==========
function isBirthdayToday() {
  const now = new Date();
  return (
    now.getDate() === BIRTHDAY_DAY &&
    now.getMonth() === BIRTHDAY_MONTH
  );
}

function showNonBirthdayMessage() {
  document.querySelector(".container").innerHTML = `
    <h1>Hi Divyaa 💖</h1>
    <p>This page unlocks only on your birthday.</p>
    <p>Please come back on <strong>16 January</strong>.</p>
  `;
}

if (!isBirthdayToday()) {
  showNonBirthdayMessage();
} else {

  // ================= CONFETTI (CANVAS BASED) =================
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const confettiPieces = [];
  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4dabf7", "#c77dff"];

  function createConfetti(count = 200) {
    confettiPieces.length = 0;
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 6 + 4,
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
    });

    requestAnimationFrame(drawConfetti);
  }

  function launchConfetti() {
    createConfetti();
    drawConfetti();

    // Stop confetti after 6 seconds
    setTimeout(() => {
      confettiPieces.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6000);
  }

  // ================= BIRTHDAY CONTENT =================
  const adjectives = [
    "beautiful", "kind", "brilliant", "warm", "strong",
    "thoughtful", "inspiring", "joyful", "graceful", "amazing"
  ];

  const nouns = [
    "moment", "second", "heartbeat", "memory", "smile",
    "wish", "thought", "feeling", "celebration", "blessing"
  ];

  const verbs = [
    "celebrates", "honors", "appreciates", "recognizes",
    "cherishes", "highlights", "welcomes", "embraces"
  ];

  let secondsCounter = 0;

  const wishEl = document.getElementById("wish");
  const timeEl = document.getElementById("time");
  const aliveEl = document.getElementById("alive");
  const remainingEl = document.getElementById("remaining");

  function generateWish() {
    const adj = adjectives[secondsCounter % adjectives.length];
    const noun = nouns[(secondsCounter * 3) % nouns.length];
    const verb = verbs[(secondsCounter * 7) % verbs.length];
    return `This ${adj} ${noun} ${verb} you, Divyaa`;
  }

  function updateWish() {
    wishEl.textContent = generateWish();
    secondsCounter++;
  }

  function updateTime() {
    const now = new Date();
    timeEl.textContent = "Current time: " + now.toLocaleTimeString();

    // 🎉 Trigger confetti exactly at midnight
    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0
    ) {
      launchConfetti();
    }
  }

  function updateAlive() {
    const now = new Date();
    const diff = now - BIRTH_DATE;
    const totalSeconds = Math.floor(diff / 1000);
    aliveEl.textContent =
      "Time you have spent on Earth: " + totalSeconds.toLocaleString() + " seconds";
  }

  function updateRemainingToday() {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const diff = Math.max(0, Math.floor((end - now) / 1000));
    remainingEl.textContent = `Time left in this special day: ${diff}s`;
  }

  // INITIAL CALLS
  updateWish();
  updateTime();
  updateAlive();
  updateRemainingToday();

  setInterval(updateWish, 1000);
  setInterval(updateTime, 1000);
  setInterval(updateAlive, 1000);
  setInterval(updateRemainingToday, 1000);
}
function updateGreeting() {
  const hour = new Date().getHours();
  let text = "Happy Birthday 💖";

  if (hour < 12) text = "Good Morning, Birthday Star ✨";
  else if (hour < 17) text = "A Beautiful Afternoon for You 🌸";
  else if (hour < 21) text = "A Lovely Evening to Celebrate You 🌙";
  else text = "A Peaceful Birthday Night 💫";

  document.getElementById("greeting").textContent = text;
}
updateGreeting();
function updateTimeline() {
  const now = new Date();
  const years = now.getFullYear() - BIRTH_DATE.getFullYear();
  document.getElementById("timeline").textContent =
    `Born at 3:27 PM • ${years} beautiful years completed`;
}
updateTimeline();
function createHeart() {
  const heart = document.createElement("span");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 1200);
const music = document.getElementById("bgMusic");
document.body.addEventListener("click", () => {
  music.play().catch(() => {});
}, { once: true });
function checkBirthMoment() {
  const now = new Date();
  if (now.getHours() === 15 && now.getMinutes() === 27 && now.getSeconds() === 0) {
    document.getElementById("birthMoment").textContent =
      "✨ This is the moment you came into the world ✨";
    launchConfetti();
  }
}
setInterval(checkBirthMoment, 1000);
function checkMidnightEnd() {
  const now = new Date();
  if (now.getHours() === 23 && now.getMinutes() === 59 && now.getSeconds() === 59) {
    document.getElementById("wish").textContent =
      "Thank you for sharing this beautiful day with me 💖";
  }
}
setInterval(checkMidnightEnd, 1000);  

