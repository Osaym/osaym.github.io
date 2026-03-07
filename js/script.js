// Remove preload class after full load to restore scrolling
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});

// ===== Theme Toggle =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle?.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector('i');
    if (!icon) {
        return;
    }

    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== Mobile Navigation =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const navItems = document.querySelectorAll('.nav-link');
const navSectionIds = [...navItems].map(a => a.getAttribute('href').slice(1));
const trackedSections = navSectionIds.map(id => document.getElementById(id)).filter(Boolean);

// Use IntersectionObserver for reliable active detection with scroll-snap
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, {
    rootMargin: '-50% 0px -50% 0px'  // trigger when section crosses center of viewport
});

trackedSections.forEach(section => navObserver.observe(section));

// ===== Typing Animation =====
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Technology Professional',
    'Web Developer',
    'IT Infrastructure Specialist',
    'Technical Support Expert',
    'Systems Administrator'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
    initEmojiRain();
});

// ===== Animated Stars Background =====
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
}

// Add twinkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

createStars();

// ===== Emoji Rain (About Section) =====
// Drops use the rain container's own height (inset:0 on the section) as
// reference so the keyframe 0%→100% maps to top-edge → bottom-edge.
// A *negative* animation-delay pre-seeds each drop at a random point in
// its cycle so the rain is already falling when you first see the section.

const EMOJI_POOL = ['💻', '🔧', '🛠️', '☁️', '📡', '🔒', '⚡', '🛰️', '🖥️', '🚀'];

function seedDrop(drop) {
    const duration = 10 + Math.random() * 4;          // 10-14 s per fall
    const delay    = Math.random() * duration;         // spread across full cycle
    const size     = 14 + Math.random() * 10;          // 14-24 px
    const opacity  = 0.3 + Math.random() * 0.35;       // 0.30-0.65
    const x        = Math.random() * 100;              // 0-100 % of container

    drop.textContent = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
    drop.style.cssText =
        `position:absolute;top:0;left:${x}%;` +
        `font-size:${size}px;line-height:1;opacity:${opacity};` +
        `pointer-events:none;will-change:transform,opacity;` +
        `animation:emojiFall ${duration}s linear ${delay}s infinite backwards;`;
}

function initEmojiRain() {
    const container = document.querySelector('.about-emoji-rain');
    if (!container || container.children.length > 0) return;

    const count = window.matchMedia('(max-width: 768px)').matches ? 24 : 40;

    for (let i = 0; i < count; i++) {
        const drop = document.createElement('span');
        drop.className = 'emoji-drop';
        seedDrop(drop);
        container.appendChild(drop);
    }
}

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ===== Scroll Animations (AOS alternative) =====
const animateElements = document.querySelectorAll('[data-aos]');

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply straight to element styles so it transitions in
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            
            // Clean up the transition property after animation completes
            // so it doesn't fight hovering/VanillaTilt later
            const delay = parseInt(entry.target.getAttribute('data-aos-delay') || '0');
            setTimeout(() => {
                entry.target.style.transition = '';
                entry.target.style.transform = '';
            }, 600 + delay); // matches transition duration + delay
            
            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.985)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Handle data-aos-delay if specified
    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
        el.style.transitionDelay = `${delay}ms`;
    }
    
    animateObserver.observe(el);
});

// ===== Clickable News Cards =====
const clickableNewsCards = document.querySelectorAll('.clickable-news-card');

clickableNewsCards.forEach(card => {
    const destinationUrl = card.getAttribute('data-url');

    if (!destinationUrl) {
        return;
    }

    card.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            return;
        }

        window.open(destinationUrl, '_blank', 'noopener,noreferrer');
    });

    card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        event.preventDefault();
        window.open(destinationUrl, '_blank', 'noopener,noreferrer');
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const MIN_FORM_FILL_TIME_MS = 3500;
const FORM_SUBMIT_COOLDOWN_MS = 45000;
const STORAGE_LAST_SUBMIT_KEY = 'contactLastSubmitAt';

let toastContainer = null;

function getToastContainer() {
    if (toastContainer) {
        return toastContainer;
    }

    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    return toastContainer;
}

function showToast(message, type = 'success') {
    const container = getToastContainer();
    const toast = document.createElement('div');
    const iconClass = type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check';

    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
        <i class="fas ${iconClass} toast__icon" aria-hidden="true"></i>
        <p class="toast__message">${message}</p>
    `;

    container.appendChild(toast);

    window.setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(6px) scale(0.98)';
        toast.style.transition = 'opacity 180ms ease, transform 180ms ease';

        window.setTimeout(() => {
            toast.remove();
        }, 200);
    }, 4200);
}

function getLastSubmitAt() {
    try {
        return Number(localStorage.getItem(STORAGE_LAST_SUBMIT_KEY) || '0');
    } catch {
        return 0;
    }
}

function setLastSubmitAt(timestamp) {
    try {
        localStorage.setItem(STORAGE_LAST_SUBMIT_KEY, String(timestamp));
    } catch {
        // Ignore storage failures (private mode, disabled storage, etc.)
    }
}

if (contactForm) {
    contactForm.dataset.loadedAt = String(Date.now());
}

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);

    // Bot trap: honeypot should stay empty
    const honeypotValue = String(formData.get('company') || '').trim();
    if (honeypotValue) {
        return;
    }

    // Bot trap: very fast submissions are likely automated
    const loadedAt = Number(contactForm.dataset.loadedAt || Date.now());
    if (Date.now() - loadedAt < MIN_FORM_FILL_TIME_MS) {
        showToast('Please wait a few seconds before submitting.', 'error');
        return;
    }

    // Lightweight rate limit to reduce repeat bot spam
    const lastSubmitAt = getLastSubmitAt();
    if (lastSubmitAt && Date.now() - lastSubmitAt < FORM_SUBMIT_COOLDOWN_MS) {
        showToast('Please wait a bit before sending another message.', 'error');
        return;
    }

    // Spam signal: too many links in a single message
    const subjectText = String(formData.get('subject') || '');
    const messageText = String(formData.get('message') || '');
    const linkCount = (subjectText + ' ' + messageText).match(/https?:\/\/|www\./gi)?.length || 0;
    if (linkCount > 2) {
        showToast('Please reduce the number of links and try again.', 'error');
        return;
    }

    formData.delete('company');
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    try {
        // Send to Google Sheets
        await fetch('https://script.google.com/macros/s/AKfycbzonW_5JsZNNpdTRXbBPSAepnBANAvukEdqR20KXwLWodOYPn-siu-794Mrp7737W7h/exec', {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // With no-cors mode, we can't read the response, but if no error was thrown, it worked
        showToast('Thanks for your message. I will get back to you soon.', 'success');
        setLastSubmitAt(Date.now());
        
        // Reset form
        contactForm.reset();
        contactForm.dataset.loadedAt = String(Date.now());
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('Something went wrong. Please email osaym@osaym.com directly.', 'error');
    } finally {
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Parallax Effect for Hero Section =====
const parallaxElements = document.querySelectorAll('.floating-card');
let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((el, index) => {
        const speed = 0.1 + (index * 0.05);
        const offset = Math.min(scrolled * speed, 120);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    parallaxTicking = false;
}

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
});

// ===== Auto Update Footer Year =====
const currentYearElement = document.getElementById('currentYear');

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ===== Konami Code Easter Egg =====
const konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
];

let konamiPosition = 0;
let konamiActivated = false;

function activateKonamiMode() {
    if (konamiActivated) {
        showToast('Konami mode is already active 😎', 'success');
        return;
    }

    konamiActivated = true;
    document.body.classList.add('konami-mode');
    showToast('Konami code accepted. Retro mode unlocked!', 'success');
}

window.addEventListener('keydown', (event) => {
    if (isTypingTarget(document.activeElement)) {
        return;
    }

    const normalizedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const requiredKey = konamiSequence[konamiPosition];

    if (normalizedKey === requiredKey) {
        konamiPosition += 1;
        if (konamiPosition === konamiSequence.length) {
            activateKonamiMode();
            konamiPosition = 0;
        }
        return;
    }

    konamiPosition = normalizedKey === konamiSequence[0] ? 1 : 0;
});

// ===== Logo Multi-Click Easter Egg =====
const logoLink = document.querySelector('.logo');
const logoSecret = document.getElementById('logoSecret');
let logoClickCount = 0;
let logoClickTimer = null;

function showLogoSecret() {
    if (!logoSecret) {
        return;
    }

    logoSecret.classList.add('is-visible');
    logoSecret.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => {
        logoSecret.classList.remove('is-visible');
        logoSecret.setAttribute('aria-hidden', 'true');
    }, 5000);
}

logoLink?.addEventListener('click', () => {
    logoClickCount += 1;

    if (logoClickTimer) {
        window.clearTimeout(logoClickTimer);
    }

    logoClickTimer = window.setTimeout(() => {
        logoClickCount = 0;
    }, 1800);

    if (logoClickCount >= 7) {
        logoClickCount = 0;
        showLogoSecret();
    }
});

// ===== Fake Terminal Easter Egg =====
const fakeTerminal = document.getElementById('fakeTerminal');
const fakeTerminalOutput = document.getElementById('fakeTerminalOutput');
const fakeTerminalForm = document.getElementById('fakeTerminalForm');
const fakeTerminalInput = document.getElementById('fakeTerminalInput');

function appendTerminalLine(text, className = '') {
    if (!fakeTerminalOutput) {
        return;
    }

    const line = document.createElement('p');
    line.textContent = text;
    if (className) {
        line.className = className;
    }

    fakeTerminalOutput.appendChild(line);
    fakeTerminalOutput.scrollTop = fakeTerminalOutput.scrollHeight;
}

function isTypingTarget(element) {
    if (!element) {
        return false;
    }

    return (
        element.tagName === 'INPUT'
        || element.tagName === 'TEXTAREA'
        || element.isContentEditable
    );
}

function openFakeTerminal() {
    if (!fakeTerminal) {
        return;
    }

    fakeTerminal.classList.add('is-open');
    fakeTerminal.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => fakeTerminalInput?.focus(), 60);
}

function closeFakeTerminal() {
    if (!fakeTerminal) {
        return;
    }

    fakeTerminal.classList.remove('is-open');
    fakeTerminal.setAttribute('aria-hidden', 'true');
}

window.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;

    if ((event.key === '`' || event.key === '~') && !isTypingTarget(activeElement)) {
        event.preventDefault();
        if (fakeTerminal?.classList.contains('is-open')) {
            closeFakeTerminal();
        } else {
            openFakeTerminal();
        }
    }

    if (event.key === 'Escape' && fakeTerminal?.classList.contains('is-open')) {
        closeFakeTerminal();
    }
});

document.querySelectorAll('[data-terminal-close]').forEach((element) => {
    element.addEventListener('click', closeFakeTerminal);
});

const terminalCommands = {
    help: () => [
        'Available: help, about, clear, date, contact'
    ],
    about: () => [
        'Osaym Omar | Technology Professional + Web Developer',
        'Hidden terminals make websites 12% cooler.'
    ],
    date: () => [
        new Date().toString()
    ],
    contact: () => [
        'Email: osaym@osaym.com',
        'LinkedIn: linkedin.com/in/osaym'
    ],
    clear: () => {
        if (fakeTerminalOutput) {
            fakeTerminalOutput.innerHTML = '';
        }
        return [];
    }
};

fakeTerminalForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const rawCommand = fakeTerminalInput?.value || '';
    const command = rawCommand.trim().toLowerCase();

    appendTerminalLine(`$ ${rawCommand}`, 'terminal-command');

    if (!command) {
        appendTerminalLine('Type a command, then press Enter.', 'terminal-muted');
        if (fakeTerminalInput) {
            fakeTerminalInput.value = '';
        }
        return;
    }

    const handler = terminalCommands[command];
    if (!handler) {
        appendTerminalLine(`Command not found: ${command}`, 'terminal-error');
        appendTerminalLine('Try: help', 'terminal-muted');
        if (fakeTerminalInput) {
            fakeTerminalInput.value = '';
        }
        return;
    }

    const responseLines = handler();
    responseLines.forEach((line) => appendTerminalLine(line));

    if (fakeTerminalInput) {
        fakeTerminalInput.value = '';
    }
});

// ===== Console Easter Egg =====
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cLooking to connect? Reach out at osaym@osaym.com', 'font-size: 14px; color: #06b6d4;');

// ===== Paper Airplane Canvas Animation =====
(function initPlaneCanvas() {
    const canvas = document.querySelector('.plane-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const pathDefs = [
        [{x:-.05,y:.35},{x:.15,y:.1},{x:.25,y:.7},{x:.4,y:.3},{x:.5,y:.05},{x:.45,y:.55},{x:.6,y:.4},{x:.75,y:.15},{x:.7,y:.65},{x:.85,y:.45},{x:.95,y:.2},{x:1.05,y:.5}],
        [{x:-.05,y:.7},{x:.1,y:.9},{x:.2,y:.3},{x:.35,y:.6},{x:.45,y:.85},{x:.55,y:.25},{x:.65,y:.55},{x:.75,y:.8},{x:.85,y:.2},{x:.95,y:.6},{x:1.05,y:.4}],
        [{x:-.05,y:.2},{x:.1,y:.05},{x:.25,y:.5},{x:.35,y:.15},{x:.5,y:.4},{x:.6,y:.1},{x:.7,y:.55},{x:.8,y:.25},{x:.9,y:.6},{x:1.05,y:.15}],
        [{x:-.05,y:.5},{x:.08,y:.25},{x:.18,y:.75},{x:.3,y:.2},{x:.42,y:.7},{x:.54,y:.15},{x:.64,y:.65},{x:.76,y:.3},{x:.88,y:.8},{x:1.05,y:.35}],
        [{x:-.05,y:.8},{x:.12,y:.55},{x:.24,y:.85},{x:.36,y:.45},{x:.48,y:.75},{x:.6,y:.35},{x:.72,y:.7},{x:.84,y:.4},{x:.96,y:.75},{x:1.05,y:.5}],
        [{x:-.05,y:.15},{x:.1,y:.4},{x:.2,y:.1},{x:.35,y:.65},{x:.45,y:.2},{x:.55,y:.7},{x:.65,y:.3},{x:.8,y:.8},{x:.9,y:.35},{x:1.05,y:.7}],
    ];

    // Catmull-Rom evaluate at any fractional t along the control points
    function evalCatmullRom(cp, t) {
        const n = cp.length - 1;
        const seg = Math.min(Math.floor(t * n), n - 1);
        const lt = (t * n) - seg;
        const p0 = cp[Math.max(seg - 1, 0)];
        const p1 = cp[seg];
        const p2 = cp[Math.min(seg + 1, cp.length - 1)];
        const p3 = cp[Math.min(seg + 2, cp.length - 1)];
        const t2 = lt * lt, t3 = t2 * lt;
        return {
            x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*lt + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
            y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*lt + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
        };
    }

    // Build absolute control points from ratio defs
    function buildCP(def) {
        return def.map(p => ({ x: p.x * W, y: p.y * H }));
    }

    const PLANE_COUNT = 6;
    const TRAIL_STEPS = 120;
    const planes = [];
    for (let i = 0; i < PLANE_COUNT; i++) {
        planes.push({
            pathDef: pathDefs[i],
            cp: buildCP(pathDefs[i]),
            progress: Math.random(),
            speed: 0.018 + Math.random() * 0.014, // units per second
            trailLen: TRAIL_STEPS,
            opacity: 0.22 + Math.random() * 0.12,
            size: 28 + Math.random() * 10,
        });
    }

    window.addEventListener('resize', () => {
        planes.forEach(p => { p.cp = buildCP(p.pathDef); });
    });

    function getPrimaryColor() {
        return getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#6366f1';
    }

    let lastTime = 0;
    function drawFrame(now) {
        const dt = lastTime ? (now - lastTime) / 1000 : 0.016;
        lastTime = now;
        ctx.clearRect(0, 0, W, H);
        const color = getPrimaryColor();

        planes.forEach(plane => {
            plane.progress += plane.speed * dt;
            if (plane.progress > 1) plane.progress -= 1;

            const cp = plane.cp;
            const t = plane.progress;

            // Current position – evaluated analytically (perfectly smooth)
            const head = evalCatmullRom(cp, t);

            // Draw dashed contrail
            ctx.save();
            ctx.setLineDash([6, 5]);
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color;
            ctx.globalAlpha = plane.opacity * 0.4;

            ctx.beginPath();
            const trailSpan = 0.08; // how far back the trail extends (in t units)
            for (let j = plane.trailLen; j >= 0; j--) {
                let tt = t - (j / plane.trailLen) * trailSpan;
                if (tt < 0) tt += 1;
                const pt = evalCatmullRom(cp, tt);
                if (j === plane.trailLen) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            }
            ctx.stroke();
            ctx.restore();

            // Calculate direction for rotation
            const ahead = evalCatmullRom(cp, (t + 0.002) % 1);
            const angle = Math.atan2(ahead.y - head.y, ahead.x - head.x);
            const s = plane.size;

            // Draw paper airplane
            ctx.save();
            ctx.globalAlpha = plane.opacity;
            ctx.translate(head.x, head.y);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(s * 0.5, 0);
            ctx.lineTo(-s * 0.4, -s * 0.3);
            ctx.lineTo(-s * 0.15, 0);
            ctx.lineTo(-s * 0.4, s * 0.3);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            // Fold line
            ctx.beginPath();
            ctx.moveTo(s * 0.5, 0);
            ctx.lineTo(-s * 0.15, 0);
            ctx.strokeStyle = color;
            ctx.globalAlpha = plane.opacity * 0.6;
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            ctx.stroke();

            ctx.restore();
        });

        requestAnimationFrame(drawFrame);
    }
    requestAnimationFrame(drawFrame);
})();
// ===== 3D Tilt Effect =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('.project-card, .news-card, .about-card, .contact-info, .contact-form');
        
        VanillaTilt.init(tiltElements, {
            max: 4,             // Max tilt rotation (degrees)
            speed: 400,         // Speed of the enter/exit transition
            glare: true,        // Enables the glassy reflection
            "max-glare": 0.12,  // Max opacity of the glare
            scale: 1.02,        // Slightly scales up when hovered
            gyroscope: false    // Disable so mobile users don't have it shifting wildly
        });
    }
});

// ===== Ambient Floating Effect =====
// This seamlessly takes over when Vanilla Tilt is not active
let tiltTime = 0;
function ambientTilt() {
    tiltTime += 0.015;
    const cards = document.querySelectorAll('.project-card, .news-card, .about-card, .contact-info, .contact-form');
    
    cards.forEach((card, i) => {
        // Only apply ambient movement if the user is NOT actively hovering
        // We also check if the entrance animation has fully loaded (opacity 1)
        if (!card.matches(':hover') && card.style.opacity === '1') {
            // Offset each card's math slightly using its index (i) so they don't all move identically
            const rx = Math.sin(tiltTime + i * 0.5) * 1.5; 
            const ry = Math.cos(tiltTime + i * 0.5) * 1.5;
            const ty = Math.sin(tiltTime * 1.5 + i) * 3;
            
            // Replicate the perspective lock from VanillaTilt 
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${ty}px)`;
        }
    });
    requestAnimationFrame(ambientTilt);
}

// Start ambient floating after 2 seconds to allow normal scroll-in animations to finish
setTimeout(() => requestAnimationFrame(ambientTilt), 2000);
