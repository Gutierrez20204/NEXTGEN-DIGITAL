document.addEventListener('DOMContentLoaded', function() {
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    
    // Ocultar preloader después de que la página cargue
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // ---- LÓGICA CLAVE PARA FORZAR RECARGA Y RESETEO DEL FORMULARIO ----
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        window.location.replace(newUrl);
        return;
    }

    // Asegurarse de que la página siempre cargue en la parte superior
    window.scrollTo(0, 0);

    // ===== SMOOTH SCROLLING MEJORADO =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Cerrar la navbar de Bootstrap en móviles después de hacer clic
            const navbarToggler = document.querySelector('.custom-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function() {
        // Mostrar/ocultar botón scroll to top
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
            scrollToTopBtn.style.opacity = "1";
        } else {
            scrollToTopBtn.style.opacity = "0";
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") {
            scrollToTopBtn.style.display = "none";
                }
            }, 300);
        }

        // Animación de la navbar al hacer scroll
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // ===== ANIMACIONES DE SCROLL =====
        animateOnScroll();
    };

    // Scroll to top functionality
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ANIMACIONES DE SCROLL OPTIMIZADAS =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100; // Reducido de 150 a 100 para activar antes
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Ejecutar animaciones inmediatamente al cargar
    document.addEventListener('DOMContentLoaded', function() {
        // Asegurar que los elementos del hero estén visibles inmediatamente
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
        heroElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.visibility = 'visible';
        });
        
        // Ejecutar animaciones de scroll inmediatamente
        animateOnScroll();
        
        // Luego ejecutar en scroll
        window.addEventListener('scroll', animateOnScroll);
    });

    // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos con animaciones
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // ===== EFECTOS HOVER MEJORADOS =====
    document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== NAVIGATION ACTIVE STATE =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-item-custom');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ===== FORM VALIDATION MEJORADA =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Mostrar loading state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (en producción esto sería manejado por el backend)
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    form.reset();
                }, 2000);
            }, 1500);
        });
    });

    // ===== LAZY LOADING PARA IMÁGENES =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== TYPING EFFECT =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar typing effect al título principal si existe
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // ===== WHATSAPP BUTTON PULSE EFFECT =====
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // ===== SCROLL PROGRESS BAR =====
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Crear barra de progreso si no existe
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(45deg, #007bff, #00d4ff);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ===== NAVBAR TOGGLER ANIMATION =====
    const customToggler = document.querySelector('.custom-toggler');
    if (customToggler) {
        customToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // ===== LOGO HOVER EFFECT =====
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('mouseenter', function() {
            const logoImg = this.querySelector('.logo-img');
            const logoGlow = this.querySelector('.logo-glow');
            
            if (logoImg) logoImg.style.filter = 'drop-shadow(0 0 20px rgba(0, 123, 255, 0.6))';
            if (logoGlow) logoGlow.style.opacity = '1';
        });
        
        logoContainer.addEventListener('mouseleave', function() {
            const logoImg = this.querySelector('.logo-img');
            const logoGlow = this.querySelector('.logo-glow');
            
            if (logoImg) logoImg.style.filter = 'drop-shadow(0 0 10px rgba(0, 123, 255, 0.3))';
            if (logoGlow) logoGlow.style.opacity = '0.5';
        });
    }

    // ===== DESHABILITAR INSPECCIÓN (MEDIDA DISUASORIA) =====
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    document.addEventListener('keydown', event => {
        if (event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) ||
            (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))) {
            event.preventDefault();
        }
        if ((event.ctrlKey && event.key.toUpperCase() === 'U') || 
            (event.metaKey && event.key.toUpperCase() === 'U')) {
            event.preventDefault();
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Aplicar throttle a funciones de scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    window.addEventListener('scroll', throttle(animateOnScroll, 100));

    // ===== INITIALIZATION =====
    // Ejecutar animaciones iniciales
    setTimeout(() => {
        animateOnScroll();
        updateActiveNavLink();
    }, 500);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio filtering...');
    
    // Portfolio filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn-gallery');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found portfolio cards:', portfolioCards.length);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Filter button clicked:', this.getAttribute('data-filter'));
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            console.log('Filtering by:', filter);

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                console.log('Card category:', category);
                
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                } else if (category && category.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                }
            });

            // Contar tarjetas visibles y ajustar el layout
            const visibleCards = Array.from(portfolioCards).filter(card => 
                card.style.display !== 'none'
            );
            console.log('Tarjetas visibles:', visibleCards.length);
            
            // Ajustar el layout según el número de tarjetas visibles
            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (portfolioGrid) {
                // Remover clases anteriores
                portfolioGrid.classList.remove('two-cards');
                
                if (visibleCards.length === 2) {
                    // Para 2 tarjetas, forzar que ocupen las primeras 2 columnas
                    portfolioGrid.classList.add('two-cards');
                    // Asegurar que las tarjetas visibles estén en las primeras posiciones
                    visibleCards.forEach((card, index) => {
                        if (index === 0) {
                            card.style.gridColumn = '1';
                        } else if (index === 1) {
                            card.style.gridColumn = '2';
                        }
                    });
                } else {
                    // Para 1 o 3 tarjetas, resetear las posiciones
                    portfolioCards.forEach(card => {
                        card.style.gridColumn = '';
                    });
                }
            }
        });
    });

    // Portfolio modal functionality
    const viewButtons = document.querySelectorAll('.portfolio-view-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');
    const modalLink = document.getElementById('projectModalLink');

    // Inicializar el modal de Bootstrap
    let projectModal;
    if (modal) {
        projectModal = new bootstrap.Modal(modal);
    }

    const projectData = {
        1: {
            title: 'Sistema de Gestión de Inventario',
            description: 'Sistema completo de gestión empresarial que incluye control de inventario, cálculo de costos, y dashboard de métricas en tiempo real.',
            features: ['Control de stock en tiempo real', 'Cálculo automático de costos', 'Reportes detallados', 'Interfaz intuitiva'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            image: 'images/portfolio-1.png',
            link: '#'
        },
        2: {
            title: 'Dashboard Area SST',
            description: 'Sistema de gestión de seguridad laboral con dashboard interactivo para monitorear métricas de seguridad y salud en el trabajo.',
            features: ['Métricas de seguridad', 'Alertas automáticas', 'Reportes de incidentes', 'Gráficos interactivos'],
            technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
            image: 'images/portfolio-2.png',
            link: '#'
        },
        3: {
            title: 'Menú Digital Interactivo',
            description: 'Menú digital moderno para restaurantes con interfaz táctil, categorización de productos y sistema de pedidos integrado.',
            features: ['Interfaz táctil', 'Categorización de productos', 'Sistema de pedidos', 'Diseño responsive'],
            technologies: ['Vue.js', 'CSS3', 'JavaScript', 'PWA'],
            image: 'images/portfolio-3.png',
            link: '#'
        }
    };

    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project && projectModal) {
                modalBody.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${project.image}" alt="${project.title}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-6">
                            <h4>${project.title}</h4>
                            <p class="text-muted">${project.description}</p>
                            
                            <h6 class="mt-3">Características:</h6>
                            <ul class="list-unstyled">
                                ${project.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                            </ul>
                            
                            <h6 class="mt-3">Tecnologías:</h6>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="badge bg-primary me-2">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                modalLink.href = project.link;
                
                // Mostrar el modal
                projectModal.show();
            }
        });
    });

    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.style.visibility = 'visible';
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
        heroSubtitle.style.visibility = 'visible';
    }

    if (heroButtons) {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
        heroButtons.style.visibility = 'visible';
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== SERVICE WORKER (OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(registrationError => {
                console.log('SW registro falló:', registrationError);
            });
    });
}