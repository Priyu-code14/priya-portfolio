document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       CONFIG – fill these in to send messages through EmailJS.
       Until then the form opens the visitor's email app (mailto).
    ========================================================= */
    const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const CONTACT_EMAIL       = "priyamurugananthamofficial@gmail.com";

    const emailJsReady =
        typeof emailjs !== "undefined" &&
        ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some(v => v.startsWith("YOUR_"));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    /* ---------- Page loader (fail-safe so it can never get stuck) ---------- */
    const pageLoader = document.getElementById("pageLoader");
    const hideLoader = () => pageLoader && pageLoader.classList.add("hide");
    if (document.readyState === "complete") setTimeout(hideLoader, 400);
    else window.addEventListener("load", () => setTimeout(hideLoader, 600));
    setTimeout(hideLoader, 4000);

    /* ---------- Back to top ---------- */
    const backToTop = document.createElement("button");
    backToTop.id = "backToTop";
    backToTop.type = "button";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
    document.body.appendChild(backToTop);

    /* ---------- Scroll state: navbar, back-to-top, active link ---------- */
    const navbar   = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    const sections = [...navLinks].map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);

    function updateOnScroll() {
        const y = window.scrollY;
        navbar.classList.toggle("scrolled", y > 40);
        backToTop.classList.toggle("show", y > 500);

        let current = sections[0];
        sections.forEach(s => { if (s.getBoundingClientRect().top <= 140) current = s; });
        if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
        navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${current.id}`));
    }
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { updateOnScroll(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", updateOnScroll);
    updateOnScroll();

    /* ---------- Close the mobile menu after choosing a link ---------- */
    const navCollapse = document.getElementById("navbarNav");
    navLinks.forEach(link => link.addEventListener("click", () => {
        if (navCollapse.classList.contains("show") && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
    }));

    /* ---------- Typing animation ---------- */
    const typingEl = document.querySelector(".typing");
    if (typingEl) {
        if (typeof Typed !== "undefined" && !reduceMotion) {
            new Typed(".typing", {
                strings: ["Full Stack Developer", "Frontend Developer", "Python Developer", "Django Developer"],
                typeSpeed: 70, backSpeed: 40, backDelay: 1400, loop: true
            });
        } else {
            typingEl.textContent = "Full Stack & Python Developer";
        }
    }

    /* ---------- Light / dark theme ---------- */
    const themeToggle = document.getElementById("themeToggle");
    const THEME_KEY = "portfolio-theme";

    function syncThemeButton() {
        const light = root.getAttribute("data-theme") === "light";
        const icon = themeToggle.querySelector("i");
        icon.classList.toggle("fa-sun", light);
        icon.classList.toggle("fa-moon", !light);
        themeToggle.setAttribute("aria-pressed", String(light));
        themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = light ? "#f5f7fc" : "#070a14";
    }
    syncThemeButton();
    themeToggle.addEventListener("click", () => {
        const light = root.getAttribute("data-theme") !== "light";
        root.setAttribute("data-theme", light ? "light" : "dark");
        try { localStorage.setItem(THEME_KEY, light ? "light" : "dark"); } catch (e) { /* storage blocked */ }
        syncThemeButton();
    });

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduceMotion) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add("in"));
    }

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll("[data-count]");
    function runCounter(el) {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        if (reduceMotion || el.dataset.nocomma) { el.textContent = target + suffix; return; }
        const start = performance.now(), dur = 1200;
        (function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        })(start);
    }
    if ("IntersectionObserver" in window) {
        const co = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); } });
        }, { threshold: 0.6 });
        counters.forEach(c => co.observe(c));
    } else {
        counters.forEach(runCounter);
    }

    /* ---------- Particles (light, and off for reduced motion) ---------- */
    if (!reduceMotion && typeof tsParticles !== "undefined") {
        tsParticles.load({
            id: "tsparticles",
            options: {
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                    number: { value: 38, density: { enable: true, area: 900 } },
                    color: { value: "#00c6ff" },
                    opacity: { value: 0.35 },
                    links: { enable: true, color: "#7c5cff", distance: 150, opacity: 0.18, width: 1 },
                    move: { enable: true, speed: 0.8 },
                    size: { value: { min: 1, max: 2.6 } }
                },
                detectRetina: true
            }
        });
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById("contactForm");
    if (form) {
        const status = document.getElementById("formStatus");
        const submitBtn = form.querySelector("button[type='submit']");
        const btnHTML = submitBtn.innerHTML;

        const setStatus = (msg, type) => { status.textContent = msg; status.className = "form-status " + (type || ""); };
        const setBusy = busy => {
            submitBtn.disabled = busy;
            submitBtn.innerHTML = busy ? "Sending..." : btnHTML;
        };

        if (emailJsReady) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        form.addEventListener("submit", e => {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }

            if (emailJsReady) {
                setBusy(true);
                setStatus("", "");
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                    .then(() => { setStatus("Message sent successfully. Thank you!", "success"); form.reset(); })
                    .catch(err => {
                        console.error("EmailJS error:", err);
                        setStatus("Couldn't send your message. Please email me at " + CONTACT_EMAIL + ".", "error");
                    })
                    .finally(() => setBusy(false));
                return;
            }

            const data = new FormData(form);
            const subject = encodeURIComponent(data.get("subject"));
            const body = encodeURIComponent(`${data.get("message")}\n\n- ${data.get("from_name")} (${data.get("from_email")})`);
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
            setStatus("Opening your email app… if nothing happens, email me at " + CONTACT_EMAIL + ".", "info");
        });
    }

    /* ---------- Footer year ---------- */
    const copyright = document.querySelector(".copyright");
    if (copyright) copyright.textContent = `© ${new Date().getFullYear()} Priya . All rights reserved.`;
});
