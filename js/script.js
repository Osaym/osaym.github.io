// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
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
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

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
            entry.target.classList.add('aos-animate');
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
    animateObserver.observe(el);
});

// Add animate class style
const animateStyle = document.createElement('style');
animateStyle.textContent = `
    .aos-animate {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
`;
document.head.appendChild(animateStyle);

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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
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

// ===== Console Easter Egg =====
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cLooking to connect? Reach out at osaym@osaym.com', 'font-size: 14px; color: #06b6d4;');