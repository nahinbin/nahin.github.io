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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    const navigation = new Navigation();
    
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
}); 
