// Certificate Modal and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dot navigation functionality
    const certificatesContainer = document.querySelector('.certificates-scroll-container');
    const certificateDots = document.querySelectorAll('.certificate-dots .dot');
    
    // Update dots on scroll
    certificatesContainer.addEventListener('scroll', () => {
        const scrollPosition = certificatesContainer.scrollLeft;
        const cardWidth = certificatesContainer.offsetWidth;
        const activeIndex = Math.round(scrollPosition / cardWidth);
        
        certificateDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });

    // Click dot to scroll
    certificateDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = certificatesContainer.offsetWidth;
            certificatesContainer.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });
    });

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
            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
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
            image: 'assets/images/certificates/foundation.png',
            previewImage: 'assets/images/certificates/foundation.png',
            credentialLink: 'https://www.mmu.edu.my/verify'
        },
        'gdg-build-ai': {
            title: 'Build with AI',
            organization: 'Google Developer Groups MMU',
            date: '2025',
            description: 'Participated in a hands-on workshop focused on building AI-powered applications using Google\'s latest AI tools and technologies.',
            image: 'assets/images/build-with-ai.jpg',
            previewImage: 'assets/images/build-with-ai.jpg',
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
