// Navigation System
class Navigation {
    constructor() {
        // Elements
        this.menuToggle = document.querySelector('.menu-toggle');
        this.menuClose = document.querySelector('.menu-close');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.mobileLinks = document.querySelectorAll('.mobile-nav-link');
        this.desktopLinks = document.querySelectorAll('.nav-link');
        
        // State
        this.isOpen = false;
        
        // Bind methods
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        // Initialize
        this.init();
    }
    
    init() {
        if (!this.menuToggle || !this.mobileNav) {
            console.error('Navigation elements not found');
            return;
        }
        
        // Event listeners
        this.menuToggle.addEventListener('click', this.toggle);
        this.menuClose.addEventListener('click', this.close);
        document.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('resize', this.handleResize);
        
        // Link click handlers
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
                this.navigateTo(link.getAttribute('href'));
            });
        });
        
        // Desktop link click handlers
        this.desktopLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    this.navigateTo(link.getAttribute('href'));
                }
            });
        });
    }
    
    toggle(e) {
        if (e) e.preventDefault();
        this.isOpen = !this.isOpen;
        
        // Update ARIA
        this.menuToggle.setAttribute('aria-expanded', this.isOpen);
        
        // Update classes
        this.menuToggle.classList.toggle('active');
        this.mobileNav.classList.toggle('active');
        
        // Update body
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
        
        // Debug
        console.log('Menu toggled:', {
            isOpen: this.isOpen,
            toggleActive: this.menuToggle.classList.contains('active'),
            navActive: this.mobileNav.classList.contains('active')
        });
    }
    
    close() {
        if (this.isOpen) {
            this.toggle();
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }
    
    handleResize() {
        if (window.innerWidth > 768 && this.isOpen) {
            this.close();
        }
    }
    
    navigateTo(href) {
        if (href.startsWith('#')) {
            // Smooth scroll for anchor links
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Regular navigation for other links
            window.location.href = href;
        }
    }
}

// Theme management system
const ThemeManager = {
    // Default theme colors (Dark theme)
    defaultTheme: {
        'primary-color': '#00ff9d',
        'secondary-color': '#00cc7d',
        'accent-color': '#00ff9d',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#121212',
        'link-color': '#00ff9d',
        'hover-color': '#00cc7d',
        'border-color': '#2a2a2a',
        'shadow-color': 'rgba(0, 0, 0, 0.2)',
        'glow-color': 'rgba(0, 255, 157, 0.15)'
    },

    // Apply theme to document
    applyTheme(theme) {
        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    },

    // Get current theme
    getCurrentTheme() {
        const savedTheme = localStorage.getItem('customTheme');
        return savedTheme ? JSON.parse(savedTheme) : this.defaultTheme;
    },

    // Save theme
    saveTheme(theme) {
        localStorage.setItem('customTheme', JSON.stringify(theme));
        this.applyTheme(theme);
    },

    // Restore default theme
    restoreDefaultTheme() {
        localStorage.removeItem('customTheme');
        this.applyTheme(this.defaultTheme);
    },

    // Initialize theme
    init() {
        // Apply theme immediately
        this.applyTheme(this.getCurrentTheme());

        // Create a style element for dynamic theme updates
        const styleElement = document.createElement('style');
        styleElement.id = 'dynamic-theme';
        document.head.appendChild(styleElement);

        // Listen for theme changes from other pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'customTheme') {
                const newTheme = e.newValue ? JSON.parse(e.newValue) : this.defaultTheme;
                this.applyTheme(newTheme);
            }
        });
    }
};

// Initialize theme as early as possible
ThemeManager.init();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    const navigation = new Navigation();
    
    // Ensure theme is applied
    ThemeManager.init();
    
    // Typing effect for brand text
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Explore Section Scroll Functionality
    const exploreGrid = document.querySelector('.explore-grid');
    const leftScroll = document.querySelector('.scroll-indicator.left');
    const rightScroll = document.querySelector('.scroll-indicator.right');

    if (exploreGrid && leftScroll && rightScroll) {
        const scrollAmount = 300; // Amount to scroll on each click

        // Update scroll indicators visibility
        function updateScrollIndicators() {
            const isAtStart = exploreGrid.scrollLeft === 0;
            const isAtEnd = exploreGrid.scrollLeft + exploreGrid.clientWidth >= exploreGrid.scrollWidth;

            leftScroll.style.opacity = isAtStart ? '0.3' : '0.8';
            rightScroll.style.opacity = isAtEnd ? '0.3' : '0.8';
            leftScroll.style.pointerEvents = isAtStart ? 'none' : 'auto';
            rightScroll.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        // Scroll handlers
        leftScroll.addEventListener('click', () => {
            exploreGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        rightScroll.addEventListener('click', () => {
            exploreGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update indicators on scroll
        exploreGrid.addEventListener('scroll', updateScrollIndicators);

        // Initial update
        updateScrollIndicators();

        // Update on window resize
        window.addEventListener('resize', updateScrollIndicators);
    }

    // Smooth scroll to sections
    function smoothScrollToSection() {
        const exploreLink = document.querySelector('.explore-link');
        if (exploreLink) {
            exploreLink.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Handle scroll dots for explore section
    function initScrollDots() {
        const exploreGrid = document.querySelector('.explore-grid');
        const dots = document.querySelectorAll('.scroll-dot');
        
        if (!exploreGrid || !dots.length) return;

        // Get card width and gap for calculations
        const cardWidth = exploreGrid.querySelector('.explore-card').offsetWidth;
        const gap = parseInt(getComputedStyle(exploreGrid).gap);
        const totalCards = exploreGrid.querySelectorAll('.explore-card').length;
        let currentIndex = 0;

        // Function to scroll to a specific index
        function scrollToIndex(index) {
            if (index < 0) index = 0;
            if (index >= totalCards) index = totalCards - 1;
            
            exploreGrid.scrollTo({
                left: index * (cardWidth + gap),
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
        }

        // Update dots based on scroll position
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Handle dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToIndex(index);
            });
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only handle if explore section is in view
            const rect = exploreGrid.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (!isInView) return;

            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    scrollToIndex(currentIndex + 1);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    scrollToIndex(currentIndex - 1);
                    break;
            }
        });

        // Update dots on scroll
        exploreGrid.addEventListener('scroll', () => {
            const scrollPosition = exploreGrid.scrollLeft;
            currentIndex = Math.round(scrollPosition / (cardWidth + gap));
            updateDots();
        });
        
        // Initial update
        updateDots();
    }

    // Initialize when DOM is loaded
    smoothScrollToSection();
    initScrollDots();
}); 
