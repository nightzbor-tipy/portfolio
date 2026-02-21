/**
 * ELISHA KIPKEMBOI - PORTFOLIO LOGIC 2026
 * Optimized for Vercel Performance & Security
 */

// 1. IMMEDIATE THEME CHECK (Prevents White/Dark Flash)
(function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light");
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    // 2. INITIALIZE ICONS
    if (window.lucide) {
        lucide.createIcons();
    }

    // 3. MATRIX RAIN LOGIC
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    let fontSize = 16;
    let columns;
    let drops;

    const initMatrix = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    };

    const drawMatrix = () => {
        // Use variable for trail color to support Light Mode
        const isLight = document.body.classList.contains('light');
        ctx.fillStyle = isLight ? "rgba(248, 250, 252, 0.1)" : "rgba(15, 23, 42, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#22d3ee"; // Accent color
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? "0" : "1";
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    };

    initMatrix();
    drawMatrix();
    window.addEventListener("resize", initMatrix);

    // 4. SCROLL REVEAL (Intersection Observer)
    const sections = document.querySelectorAll(".section");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));

    // 5. THEME TOGGLE
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light");
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }

    // 6. UPTIME COUNTER ANIMATION
    const counters = document.querySelectorAll(".counter");
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(c => countObserver.observe(c));

    function startCounter(el) {
        const target = parseFloat(el.getAttribute("data-target"));
        let current = 0;
        const increment = target / 50; // Speed of count

        const update = () => {
            if (current < target) {
                current += increment;
                el.innerText = current.toFixed(1);
                setTimeout(update, 30);
            } else {
                el.innerText = target;
            }
        };
        update();
    }

    // 7. MODAL LOGIC (Safety Check)
    const modal = document.getElementById("cvModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.getElementById("closeModal");

    if (openBtn && modal) {
        openBtn.onclick = () => modal.style.display = "flex";
        closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
    }
});
