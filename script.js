// typing effect
const text = "วันนี้วันอะไรเอ่ย... 🎂";
let index = 0;
function typeText() {
  if (index < text.length) {
    document.getElementById("typing").textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
      spawnBalloons();
    }, 1000);
  }
}
typeText();

// balloons
function spawnBalloons() {
  const colors = ["#ff6b6b", "#ffcc5c", "#88d8b0", "#6ec6ff", "#d291bc"];
  const balloonContainer = document.querySelector(".balloons");
  for (let i = 0; i < 15; i++) {
    const b = document.createElement("div");
    b.style.left = Math.random() * 100 + "%";
    b.style.background = colors[Math.floor(Math.random() * colors.length)];
    b.style.animationDuration = (4 + Math.random() * 4) + "s";
    balloonContainer.appendChild(b);
  }
}

// confetti
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = [];
function createConfetti() {
  const colors = ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd", "#ff9ff3"];
  for (let i = 0; i < 100; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2
    });
  }
}
function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.speed;
    if (p.y > confettiCanvas.height) p.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}
createConfetti();
drawConfetti();

// gift click
document.getElementById("giftBox").addEventListener("click", () => {
  document.getElementById("card").style.display = "block";
  confettiParticles.forEach(p => p.y -= 50); // boost confetti
});
