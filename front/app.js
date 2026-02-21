    document.addEventListener("DOMContentLoaded", () => {
        if (window.lucide) {
            lucide.createIcons();
        }
    });
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(15,23,42,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#22d3ee";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(draw, 50);

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(r => observer.observe(r));

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const update = () => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const count = parseFloat(counter.innerText);
    const increment = target / 100;

    if (count < target) {
      counter.innerText = (count + increment).toFixed(1);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

const modal = document.getElementById("cvModal");
document.getElementById("openModal").onclick = () => modal.style.display = "flex";
document.getElementById("closeModal").onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
