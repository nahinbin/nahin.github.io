// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-links');
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Clone navigation links
        const links = nav.cloneNode(true);
        mobileNav.appendChild(links);
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Add to navbar
        const navbar = document.querySelector('.navbar .container');
        navbar.appendChild(hamburger);
        document.body.appendChild(mobileNav);
        
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    };

    // Create mobile navigation if screen is small
    if (window.innerWidth <= 768) {
        createMobileNav();
    }

    // Smooth scroll for anchor links
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

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-in').forEach(el => {
        observer.observe(el);
    });

    // Form validation and handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                // Add custom validation handling here
            }
        });
    });

    // Add CSS for mobile navigation and animations
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: var(--bg-secondary);
            padding: var(--spacing-xl);
            transition: right var(--transition-normal);
            z-index: 1001;
            box-shadow: var(--shadow-lg);
        }

        .mobile-nav.active {
            right: 0;
        }

        .mobile-nav .nav-links {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }

        .hamburger {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: var(--spacing-xs);
            z-index: 1002;
        }

        .hamburger span {
            display: block;
            width: 25px;
            height: 2px;
            background: var(--text-primary);
            margin: 5px 0;
            transition: var(--transition-normal);
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }

        @media (max-width: 768px) {
            .hamburger {
                display: block;
            }

            body.nav-open {
                overflow: hidden;
            }
        }

        .fade-in {
            opacity: 0;
            transition: opacity var(--transition-normal);
        }

        .fade-in.animate {
            opacity: 1;
        }

        .slide-up {
            opacity: 0;
            transform: translateY(10px);
            transition: all var(--transition-normal);
        }

        .slide-up.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .slide-in {
            opacity: 0;
            transform: translateX(-10px);
            transition: all var(--transition-normal);
        }

        .slide-in.animate {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}); 