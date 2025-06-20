// Certificate Modal and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const certificatesContainer = document.querySelector('.certificates-scroll-container');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    const certificateDots = document.querySelectorAll('.certificate-dots .dot');

    if (certificatesContainer && scrollLeftBtn && scrollRightBtn) {
        // Function to check if we can scroll
        function canScroll() {
            const canScrollLeft = certificatesContainer.scrollLeft > 0;
            const canScrollRight = certificatesContainer.scrollLeft < (certificatesContainer.scrollWidth - certificatesContainer.clientWidth);
            
            scrollLeftBtn.style.opacity = canScrollLeft ? '0.7' : '0.3';
            scrollRightBtn.style.opacity = canScrollRight ? '0.7' : '0.3';
            scrollLeftBtn.style.pointerEvents = canScrollLeft ? 'auto' : 'none';
            scrollRightBtn.style.pointerEvents = canScrollRight ? 'auto' : 'none';
        }

        // Function to scroll
        function scroll(direction) {
            certificatesContainer.scrollBy({
                left: direction * certificatesContainer.offsetWidth,
                behavior: 'smooth'
            });
        }

        // Add click handlers
        scrollLeftBtn.addEventListener('click', () => {
            if (scrollLeftBtn.style.pointerEvents !== 'none') {
                scroll(-1);
            }
        });

        scrollRightBtn.addEventListener('click', () => {
            if (scrollRightBtn.style.pointerEvents !== 'none') {
                scroll(1);
            }
        });

        // Update button states on scroll
        certificatesContainer.addEventListener('scroll', canScroll);

        // Update button states on resize
        window.addEventListener('resize', canScroll);

        // Initial button state
        canScroll();

        // Update dots on scroll
        certificatesContainer.addEventListener('scroll', () => {
            const scrollPosition = certificatesContainer.scrollLeft;
            const cardWidth = certificatesContainer.offsetWidth;
            const activeIndex = Math.round(scrollPosition / cardWidth);
            
            certificateDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    }

    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    const filterMenu = document.querySelector('.filter-menu');
    const filterOptions = filterMenu.querySelectorAll('button');
    const certificatesContent = document.querySelector('.certificates-content');

    // Toggle filter menu
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterMenu.classList.toggle('active');
        const arrow = filterBtn.querySelector('.arrow');
        arrow.style.transform = filterMenu.classList.contains('active') ? 'rotate(180deg)' : '';
    });

    // Close filter menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterMenu.contains(e.target) && !filterBtn.contains(e.target)) {
            filterMenu.classList.remove('active');
            const arrow = filterBtn.querySelector('.arrow');
            arrow.style.transform = '';
        }
    });

    // Handle filter selection
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const filter = option.dataset.filter;
            
            // Update active state of filter buttons
            filterOptions.forEach(btn => btn.classList.remove('active'));
            option.classList.add('active');
            
            // Update filter button text
            filterBtn.querySelector('span:not(.arrow)').textContent = option.textContent;
            
            // Close filter menu and reset arrow
            filterMenu.classList.remove('active');
            const arrow = filterBtn.querySelector('.arrow');
            arrow.style.transform = '';
            
            // Filter certificates
            const cards = document.querySelectorAll('.certificate-card');
            const noCertificatesMessage = document.getElementById('noCertificatesMessage');
            const certificateDots = document.querySelector('.certificate-dots');
            let visibleCards = 0;

            // Hide all cards first
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.display = 'none';
            });

            // Show matching cards
            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                    visibleCards++;
                }
            });

            // Update dots based on visible cards
            certificateDots.innerHTML = ''; // Clear existing dots
            if (visibleCards > 0) {
                for (let i = 0; i < visibleCards; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot' + (i === 0 ? ' active' : '');
                    certificateDots.appendChild(dot);
                }
            }

            // Show/hide no certificates message
            if (visibleCards === 0) {
                noCertificatesMessage.style.display = 'flex';
                setTimeout(() => {
                    noCertificatesMessage.classList.add('active');
                }, 50);
                certificateDots.style.display = 'none'; // Hide dots when no certificates
            } else {
                noCertificatesMessage.classList.remove('active');
                setTimeout(() => {
                    noCertificatesMessage.style.display = 'none';
                }, 300);
                certificateDots.style.display = 'flex'; // Show dots when certificates are visible
            }

            // Update dots on scroll
            certificatesContainer.addEventListener('scroll', () => {
                if (visibleCards > 0) {
                    const scrollPosition = certificatesContainer.scrollLeft;
                    const cardWidth = certificatesContainer.offsetWidth;
                    const activeIndex = Math.round(scrollPosition / cardWidth);
                    
                    const dots = certificateDots.querySelectorAll('.dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === activeIndex);
                    });
                }
            });

            // Scroll to certificates content with smooth animation
            certificatesContent.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Modal functionality
    const modal = document.getElementById('certificateModal');
    const modalClose = modal.querySelector('.modal-close');
    const certificateImage = document.getElementById('modalCertificateImage');

    // Certificate data
    const certificateData = {
        'bachelor-cs': {
            title: 'Foundation in Computing',
            organization: 'Multimedia University',
            date: '2024 - Present',
            description: 'Currently pursuing a Foundation in Computing with focus on software development and programming.',
            image: '../assets/images/certificates/foundation.png',
            previewImage: '../assets/images/certificates/foundation.png',
            credentialLink: 'https://www.mmu.edu.my/verify'
        },
        'gdg-build-ai': {
            title: 'Build with AI',
            organization: 'Google Developer Groups MMU',
            date: '2025',
            description: 'Participated in a hands-on workshop focused on building AI-powered applications using Google\'s latest AI tools and technologies.',
            image: '../assets/images/build-with-ai.jpg',
            previewImage: '../assets/images/build-with-ai.jpg',
            credentialLink: 'https://gdg.community.dev/events/details/google-gdg-mmu-presents-build-with-ai/'
        }
    };

    function openModal(certificateId) {
        const data = certificateData[certificateId];
        if (!data) return;

        // Update modal content
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('#modalOrganization').textContent = data.organization;
        modal.querySelector('#modalDate').textContent = data.date;
        modal.querySelector('#modalDescription').textContent = data.description;
        modal.querySelector('#modalCredentialLink').href = data.credentialLink;
        certificateImage.src = data.previewImage;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.certificate-link');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certificateId = card.dataset.certificateId;
            openModal(certificateId);
        });
    });

    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Image zoom functionality
    certificateImage.addEventListener('click', () => {
        certificateImage.classList.toggle('zoomed');
    });
});
