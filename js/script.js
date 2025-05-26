// Theme management
document.addEventListener("DOMContentLoaded", () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
});

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});

// Project Sliders
document.addEventListener("DOMContentLoaded", () => {
    const projectSliders = document.querySelectorAll('.project-slider');
    
    projectSliders.forEach(slider => {
        const dots = slider.querySelectorAll('.slider-dot');
        const images = slider.querySelectorAll('img');
        let currentSlide = 0;
        
        function changeSlide(index) {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            
            images.forEach((img, i) => {
                img.style.opacity = i === index ? '1' : '0';
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
        
        // Click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => changeSlide(index));
        });
        
        // Auto-advance slides
        setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 5000);
    });
});

// Smooth Scrolling
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

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section, .project-card, .skill-item, .info-item').forEach(element => {
    observer.observe(element);
});

// Project Card Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => successMessage.remove(), 3000);
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-3';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error sending message. Please try again.';
            contactForm.appendChild(errorMessage);
            
            setTimeout(() => errorMessage.remove(), 3000);
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Skill Items Animation
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Contact Info Items Animation
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Social Links Animation
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Code Window Animation
const codeWindow = document.querySelector('.code-window');
if (codeWindow) {
    const code = codeWindow.querySelector('code');
    const originalCode = code.textContent;
    let currentIndex = 0;
    
    function typeCode() {
        if (currentIndex < originalCode.length) {
            code.textContent = originalCode.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeCode, 50);
        }
    }
    
    // Start typing animation when code window is in view
    const codeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeCode();
            codeObserver.unobserve(codeWindow);
        }
    });
    
    codeObserver.observe(codeWindow);
}

// Mobile Menu Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.nav-link');

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
    }
});

// Smooth scrolling for all links
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

// Make contact info clickable
document.querySelectorAll('.info-link').forEach(link => {
    const type = link.getAttribute('data-type');
    if (type === 'email') {
        link.href = `mailto:${link.textContent}`;
    } else if (type === 'phone') {
        link.href = `tel:${link.textContent}`;
    } else if (type === 'location') {
        link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(link.textContent)}`;
    }
});

// Logo click handler
document.querySelectorAll('.navbar-brand, .footer-logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add popup for project details
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const tags = Array.from(card.querySelectorAll('.badge')).map(badge => badge.textContent);
        const links = card.querySelectorAll('a');
        
        const popup = document.createElement('div');
        popup.className = 'project-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="popup-tags">
                    ${tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                </div>
                <div class="popup-links">
                    ${Array.from(links).map(link => `
                        <a href="${link.href}" target="_blank" class="btn btn-primary">
                            ${link.textContent}
                        </a>
                    `).join('')}
                </div>
                <button class="btn btn-primary popup-close">Close</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Close popup
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.remove();
        });
        
        // Close on outside click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popup.remove();
            }
        });
    });
});

// Add smooth scroll to top button
const scrollToTop = document.createElement('button');
scrollToTop.className = 'scroll-to-top';
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTop.style.opacity = '1';
        scrollToTop.style.visibility = 'visible';
    } else {
        scrollToTop.style.opacity = '0';
        scrollToTop.style.visibility = 'hidden';
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .skill-item, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Social media links
const socialLinks = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'mailto:your.email@example.com',
    phone: 'tel:+1234567890',
    location: 'https://www.google.com/maps/place/Your+Location'
};

// Update social links
document.querySelectorAll('.social-links a').forEach(link => {
    const platform = link.getAttribute('data-platform');
    if (platform && socialLinks[platform]) {
        link.href = socialLinks[platform];
        link.target = '_blank';
    }
});

// Make contact info clickable
document.querySelectorAll('.contact-info p').forEach(info => {
    const type = info.getAttribute('data-type');
    if (type && socialLinks[type]) {
        info.style.cursor = 'pointer';
        info.addEventListener('click', () => {
            window.location.href = socialLinks[type];
        });
    }
}); 