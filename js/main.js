// ===== NAVEGACIÓN MÓVIL =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== DESTACAR ENLACE ACTIVO =====
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const linkPage = href.split('/').pop();
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    }
});

// ===== TEMA OSCURO/CLARO =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== CALCULADORA DE PROPIEDADES =====
function updateCalculations() {
    const a = parseFloat(document.getElementById('baseA')?.value) || 0;
    const m = parseFloat(document.getElementById('expM')?.value) || 0;
    const n = parseFloat(document.getElementById('expN')?.value) || 0;

    const productoResult = document.getElementById('productoResult');
    if (productoResult) {
        productoResult.textContent = `${a}${sup(m)} × ${a}${sup(n)} = ${a}${sup(m + n)} = ${Math.pow(a, m + n)}`;
    }

    const cocienteResult = document.getElementById('cocienteResult');
    if (cocienteResult) {
        cocienteResult.textContent = `${a}${sup(m)} ÷ ${a}${sup(n)} = ${a}${sup(m - n)} = ${Math.pow(a, m - n)}`;
    }

    const potenciaResult = document.getElementById('potenciaResult');
    if (potenciaResult) {
        potenciaResult.textContent = `(${a}${sup(m)})${sup(n)} = ${a}${sup(m * n)} = ${Math.pow(a, m * n)}`;
    }
}

function sup(num) {
    const superscripts = {
        '-': '⁻',
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹'
    };
    return String(num).split('').map(char => superscripts[char] || char).join('');
}

['baseA', 'expM', 'expN'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateCalculations);
});

updateCalculations();

// ===== MOSTRAR SOLUCIONES =====
function toggleSolution(button) {
    const solution = button.nextElementSibling;
    const icon = button.querySelector('i');

    if (solution.style.display === 'none' || solution.style.display === '') {
        solution.style.display = 'block';
        button.innerHTML = '<i class="fas fa-eye-slash"></i> ¡Ocultar solución!';
    } else {
        solution.style.display = 'none';
        button.innerHTML = '<i class="fas fa-eye"></i> ¡Ver solución!';
    }
}

// ===== ANIMACIÓN DE APARICIÓN =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

document.querySelectorAll('.prop-card, .problem-card, .caso-card, .app-card, .recurso-card, .intro-card, .contenido-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
});

// ===== CONTADOR DE ESTADÍSTICAS =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * eased;
        element.textContent = Math.floor(current);
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    requestAnimationFrame(update);
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            const targets = [7, 10, 12];
            statNumbers.forEach((el, index) => {
                if (index < targets.length) {
                    animateCounter(el, targets[index], 1500);
                }
            });
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ===== NEWSLETTER =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const button = this.querySelector('button');

        if (input.value.trim() && input.value.includes('@')) {
            const originalText = button.innerHTML;
            button.innerHTML = '✅';
            button.style.background = '#43e97b';

            input.value = '';
            input.placeholder = '⭐ ¡Gracias por suscribirte!';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                input.placeholder = 'Tu email';
            }, 3000);
        } else {
            input.style.border = '3px solid #f5576c';
            input.placeholder = '✏️ Escribe un email válido';

            setTimeout(() => {
                input.style.border = '';
                input.placeholder = 'Tu email';
            }, 3000);
        }
    });
}

// ===== BOTÓN "VOLVER ARRIBA" =====
const backToTop = document.createElement('button');
backToTop.innerHTML = '⬆️';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #f093fb);
    color: white;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    box-shadow: 0 6px 30px rgba(102, 126, 234, 0.4);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    pointer-events: none;
    z-index: 999;
`;

document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'scale(1.15) rotate(10deg)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'scale(1) rotate(0deg)';
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'translateY(0) scale(1)';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'translateY(20px) scale(0.8)';
        backToTop.style.pointerEvents = 'none';
    }
});

// ===== DETECTAR PREFERENCIA DE TEMA =====
if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

// ===== AJUSTAR ALTURA DEL HERO =====
function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
        const viewportHeight = window.innerHeight;
        const heroMinHeight = viewportHeight - navbarHeight;
        hero.style.minHeight = `${Math.max(heroMinHeight, 500)}px`;
    }
}

window.addEventListener('resize', adjustHeroHeight);
adjustHeroHeight();

console.log('⭐ Potenciación Divertida - Sitio web cargado correctamente');
console.log('🎮 ¡Aprende jugando con nosotros!');
console.log('📚 Explora las 7 propiedades, casos especiales y muchos juegos.');
console.log('💡 Cambia el tema con el botón 🌙/☀️');