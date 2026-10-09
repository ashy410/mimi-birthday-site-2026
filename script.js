// Mimi's birthday interactions — no libraries needed.
const starfield = document.querySelector(".starfield");
for (let i = 0; i < 95; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.animationDuration = `${2 + Math.random() * 3}s`;
  starfield.appendChild(star);
}

const nav = document.querySelector("#nav");
const menuToggle = document.querySelector("#menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelector("#start-button").addEventListener("click", () => {
  launchConfetti(110);
  document.querySelector("#memories").scrollIntoView({ behavior: "smooth" });
  showToast("Birthday mode: ACTIVATED 🥳");
});

const giftButton = document.querySelector("#gift-button");
const giftResult = document.querySelector("#gift-result");
giftButton.addEventListener("click", () => {
  if (giftButton.classList.contains("opening")) return;
  giftButton.classList.add("opening");
  launchConfetti(85);
  setTimeout(() => {
    giftResult.hidden = false;
    giftResult.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast("Present successfully delivered. No refunds. 🎁");
  }, 550);
});

document.querySelector("#more-surprise").addEventListener("click", () => {
  showToast("The real gift is that you exist, bestie. Cheesy? Yes. True? ALSO YES. 💗");
  launchConfetti(65);
});

const wishes = [
  "Wish sent to the universe. Delivery estimate: whenever the universe gets its act together. 🌠",
  "Your wish is now under extremely professional star management. ✨",
  "Manifesting good days, good laughs, and good snacks for you. 🍰",
  "The stars said: Mimi deserves nice things. We agree. 💗"
];
document.querySelector("#wish-button").addEventListener("click", () => {
  document.querySelector("#wish-response").textContent = wishes[Math.floor(Math.random() * wishes.length)];
  launchConfetti(35);
});

document.querySelector("#open-letter").addEventListener("click", event => {
  const paper = document.querySelector("#letter-paper");
  paper.hidden = !paper.hidden;
  event.currentTarget.textContent = paper.hidden ? "Open your letter 💌" : "Close letter ♡";
  if (!paper.hidden) {
    paper.scrollIntoView({ behavior: "smooth", block: "center" });
    launchConfetti(35);
  }
});

document.querySelector("#celebrate-again").addEventListener("click", () => {
  launchConfetti(160);
  showToast("HAPPY BIRTHDAY MIMI!! ONE MORE TIME!! 🎉💖");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Lightweight canvas confetti.
const canvas = document.querySelector("#confetti-canvas");
const ctx = canvas.getContext("2d");
let pieces = [];
let animationFrame = null;
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(amount = 80) {
  const colors = ["#ff8ed4", "#c5a7ff", "#fff0a8", "#8ee8dc", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    pieces.push({
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: -15 - Math.random() * window.innerHeight * 0.3,
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 4,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 6,
      spin: (Math.random() - 0.5) * 0.18,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 130 + Math.random() * 80
    });
  }
  if (!animationFrame) animateConfetti();
}
function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces = pieces.filter(p => p.life > 0 && p.y < window.innerHeight + 25);
  for (const p of pieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.025;
    p.rotation += p.spin;
    p.life--;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    ctx.restore();
  }
  if (pieces.length) animationFrame = requestAnimationFrame(animateConfetti);
  else {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
