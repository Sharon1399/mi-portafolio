document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const elements = {
        hamburger: document.getElementById('hamburger'),
        navLinks: document.querySelector('.nav-links'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.querySelector('#theme-toggle i'),
        contactForm: document.getElementById('contact-form'),
        formMessage: document.getElementById('form-message'),
        portfolioItems: document.querySelectorAll('.portfolio-item'),
        navbar: document.getElementById('navbar')
    };

    // Estado de la aplicación
    const appState = {
        darkMode: localStorage.getItem('theme') === 'dark'
    };

    // Inicialización
    function init() {
        setupEventListeners();
        applySavedTheme();
        setupAnimations();
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Menú hamburguesa
        elements.hamburger.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer clic en enlaces
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cambiar tema
        elements.themeToggle.addEventListener('click', toggleTheme);

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });

        // Formulario de contacto
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Efectos hover para proyectos
        elements.portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => showOverlay(item));
            item.addEventListener('mouseleave', () => hideOverlay(item));
        });

        // Redirección para el primer proyecto
        const firstProjectBtn = document.querySelectorAll('.portfolio-item .btn-small')[0];
        if (firstProjectBtn) {
            firstProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('https://gestiontfgunafront.5.181.218.251.sslip.io/', '_blank');
            });
        }

        // Redirección para el segundo proyecto  
        const secondProjectBtn = document.querySelectorAll('.portfolio-item .btn-small')[1];
        if (secondProjectBtn) {
            secondProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('assets/img/Super la paloma.pdf', '_blank');
            });
        }

        // Redirección para el tercer proyecto

        const thirdProjectBtn = document.querySelectorAll('.portfolio-item .btn-small')[2];
        if (thirdProjectBtn) {
            thirdProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('assets/img/Puente Levadizo.pdf', '_blank');
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', handleScroll);
    }

    // Funciones de menú
    function toggleMenu() {
        elements.navLinks.classList.toggle('active');
    }

    function closeMenu() {
        elements.navLinks.classList.remove('active');
    }

    // Funciones de tema
    function toggleTheme() {
        appState.darkMode = !appState.darkMode;
        applyTheme();
        saveThemePreference();
    }

    function applyTheme() {
        document.body.classList.toggle('dark-mode', appState.darkMode);

        if (appState.darkMode) {
            elements.themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            elements.themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    function applySavedTheme() {
        if (appState.darkMode) {
            applyTheme();
        }
    }

    function saveThemePreference() {
        localStorage.setItem('theme', appState.darkMode ? 'dark' : 'light');
    }

    // Smooth scroll
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Animaciones
    function setupAnimations() {
        const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .portfolio-item');

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Ejecutar al cargar
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .portfolio-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Formulario de contacto
    function handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            showFormMessage('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showFormMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Simular envío exitoso
        showFormMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
        elements.contactForm.reset();

        setTimeout(() => {
            elements.formMessage.style.display = 'none';
        }, 5000);
    }

    function showFormMessage(message, type) {
        elements.formMessage.textContent = message;
        elements.formMessage.className = type;
        elements.formMessage.style.display = 'block';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Efectos hover para proyectos
    function showOverlay(item) {
        item.querySelector('.portfolio-overlay').style.opacity = '1';
    }

    function hideOverlay(item) {
        item.querySelector('.portfolio-overlay').style.opacity = '0';
    }

    // Efecto de navbar al hacer scroll
    function handleScroll() {
        if (window.scrollY > 100) {
            elements.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            elements.navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

            if (appState.darkMode) {
                elements.navbar.style.background = 'rgba(30, 30, 30, 0.95)';
            }
        } else {
            elements.navbar.style.background = 'var(--white)';
            elements.navbar.style.boxShadow = 'var(--box-shadow)';

            if (appState.darkMode) {
                elements.navbar.style.background = '#1e1e1e';
            }
        }
    }

    // Iniciar la aplicación
    init();
});