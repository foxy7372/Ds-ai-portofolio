// ==============================
// DS.AI Portfolio — Script
// ==============================

// --- Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 800);
});

// --- Navbar: Burger Menu ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Close mobile nav on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// --- Navbar: Hide/Show on Scroll & Scrolled class ---
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const currentScrollY = window.scrollY;

    // Add 'scrolled' class after scrolling a bit
    if (currentScrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.classList.add('hide-nav');
    } else {
        navbar.classList.remove('hide-nav');
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (link) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- Typing Effect ---
const typedTextSpan = document.getElementById('typedText');
const words = ['AI Trainer', 'Problem Solver', 'ML Engineer', 'Data Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const displayed = currentWord.substring(0, charIndex);

    typedTextSpan.textContent = displayed;

    let speed = 100;

    if (isDeleting) {
        speed = 50;
        charIndex--;
    } else {
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length + 1) {
        speed = 2000; // Pause at end
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400; // Pause before next word
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// --- Scroll Reveal (IntersectionObserver) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Animated Skill Bars ---
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill');
            fills.forEach((fill, i) => {
                setTimeout(() => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                    fill.classList.add('animated');
                }, i * 150);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// --- Stats Counter Animation ---
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 16);

            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// --- Back to Top Button ---
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Contact Form (Basic Validation) ---
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Success feedback
    const btn = contactForm.querySelector('.submit-btn span');
    btn.textContent = '✓ Message Sent!';
    contactForm.reset();

    setTimeout(() => {
        btn.textContent = 'Send Message';
    }, 3000);
});

// --- Particle Canvas (Lightweight) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function resizeCanvas() {
    const hero = document.getElementById('hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});
