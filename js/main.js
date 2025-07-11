// Certificate Modal and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hello Text Animation
    const helloText = document.getElementById('hello-text');
    const helloWords = document.querySelectorAll('.hello-word');
    let currentIndex = 0;
    
    console.log('Looking for hello text element...');
    console.log('Hello text element:', helloText);
    console.log('Found', helloWords.length, 'hello words');
    
    if (helloWords.length > 0 && helloText) {
        // Make sure the first word is visible
        helloWords[0].classList.add('active');
        console.log('First word should be visible now');
        
        function animateHelloText() {
            // Remove active class from current word
            helloWords[currentIndex].classList.remove('active');
            helloWords[currentIndex].classList.add('fade-out');
            
            // Move to next word
            currentIndex = (currentIndex + 1) % helloWords.length;
            
            // Add active class to new word
            helloWords[currentIndex].classList.remove('fade-out');
            helloWords[currentIndex].classList.add('active');
        }
        
        // Start animation after 2 seconds and repeat every 0.5 seconds
        setTimeout(() => {
            console.log('Starting animation');
            setInterval(animateHelloText, 500);
        }, 2000);
    } else {
        console.log('No hello words found or hello text element missing!');
    }
    // Installation Guide Navigation
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    const stepCounter = document.getElementById('stepCounter');
    const installationSteps = document.getElementById('installationSteps');
    const steps = document.querySelectorAll('.step');
    
    if (prevBtn && nextBtn && installationSteps) {
        let currentStep = 1;
        const totalSteps = steps.length;
        
        function updateStep(stepNumber) {
            // Update active step
            steps.forEach((step, index) => {
                step.classList.toggle('active', index + 1 === stepNumber);
            });
            
            // Update navigation buttons
            prevBtn.disabled = stepNumber === 1;
            nextBtn.disabled = stepNumber === totalSteps;
            
            // Update step counter
            stepCounter.textContent = `Step ${stepNumber} of ${totalSteps}`;
            
            // Update transform for smooth scrolling
            const translateX = -(stepNumber - 1) * 100;
            installationSteps.style.transform = `translateX(${translateX}%)`;
        }
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep(currentStep);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStep(currentStep);
            }
        });
        
        // Initialize
        updateStep(1);
    }

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
            images: [
                {
                    src: 'assets/images/build-with-ai.jpg',
                    alt: 'Foundation Certificate Front'
                },
                {
                    src: 'assets/images/logo.png',
                    alt: 'Foundation Certificate Back'
                },
                {
                    src: 'assets/images/icon.png',
                    alt: 'Foundation Certificate Details'
                }
            ],
            credentialLink: 'https://www.mmu.edu.my/verify'
        },
        'gdg-build-ai': {
            title: 'Build with AI',
            organization: 'Google Developer Groups MMU',
            date: '2025',
            description: 'Participated in a hands-on workshop focused on building AI-powered applications using Google\'s latest AI tools and technologies.',
            images: [
                {
                    src: 'assets/images/build-with-ai.jpg',
                    alt: 'Build with AI Certificate'
                },
                {
                    src: 'assets/images/listo.png',
                    alt: 'Build with AI Workshop Details'
                },
                {
                    src: 'assets/images/personal-website.png',
                    alt: 'Build with AI Project Showcase'
                }
            ],
            credentialLink: 'https://gdg.community.dev/events/details/google-gdg-mmu-presents-build-with-ai/'
        }
    };

    // Gallery functionality
    let currentImageIndex = 0;
    let currentImages = [];

    function createImageGallery(images) {
        const gallery = document.querySelector('.image-gallery');
        const indicators = document.querySelector('.image-indicators');
        
        // Clear existing content
        gallery.innerHTML = '';
        indicators.innerHTML = '';
        
        if (!images || images.length === 0) {
            // Fallback to single image if no images provided
            const fallbackImg = document.createElement('img');
            fallbackImg.src = 'assets/images/build-with-ai.jpg';
            fallbackImg.alt = 'Certificate Preview';
            fallbackImg.className = 'modal-image active';
            gallery.appendChild(fallbackImg);
            return;
        }
        
        // Create image elements
        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = `modal-image ${index === 0 ? 'active' : ''}`;
            gallery.appendChild(img);
            
            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `image-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => showImage(index));
            indicators.appendChild(indicator);
        });
        
        currentImages = images;
        currentImageIndex = 0;
        updateGalleryNavigation();
    }

    function showImage(index) {
        const images = document.querySelectorAll('.image-gallery .modal-image');
        const indicators = document.querySelectorAll('.image-indicator');
        
        if (index < 0 || index >= images.length) return;
        
        // Update active image
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        // Update active indicator
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentImageIndex = index;
        updateGalleryNavigation();
    }

    function nextImage() {
        const images = document.querySelectorAll('.image-gallery .modal-image');
        const nextIndex = (currentImageIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function prevImage() {
        const images = document.querySelectorAll('.image-gallery .modal-image');
        const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        showImage(prevIndex);
    }

    function updateGalleryNavigation() {
        const images = document.querySelectorAll('.image-gallery .modal-image');
        const prevBtn = document.querySelector('.gallery-nav-btn.prev-btn');
        const nextBtn = document.querySelector('.gallery-nav-btn.next-btn');
        
        if (images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            document.querySelector('.image-indicators').style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            document.querySelector('.image-indicators').style.display = 'flex';
        }
    }

    function openModal(certificateId) {
        const data = certificateData[certificateId];
        if (!data) return;

        // Update modal content
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('#modalOrganization').textContent = data.organization;
        modal.querySelector('#modalDate').textContent = data.date;
        modal.querySelector('#modalDescription').textContent = data.description;
        modal.querySelector('#modalCredentialLink').href = data.credentialLink;
        
        // Create image gallery
        createImageGallery(data.images);

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

    // Gallery navigation event listeners
    const galleryPrevBtn = document.querySelector('.gallery-nav-btn.prev-btn');
    const galleryNextBtn = document.querySelector('.gallery-nav-btn.next-btn');
    
    if (galleryPrevBtn && galleryNextBtn) {
        galleryPrevBtn.addEventListener('click', prevImage);
        galleryNextBtn.addEventListener('click', nextImage);
    }

    // Keyboard navigation for gallery
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    // Image zoom functionality for gallery images
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-image') && e.target.classList.contains('active')) {
            e.target.classList.toggle('zoomed');
        }
    });
});


  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent normal form submission

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch("https://formspree.io/f/xqabyqdp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        status.innerHTML = "<p style='color: white;'>sent</p>";
        form.reset();
        setTimeout(() => {
          status.classList.add('fade-out');
          setTimeout(() => {
            status.innerHTML = '';
            status.classList.remove('fade-out');
          }, 700);
        }, 2500);
      } else {
        status.innerHTML = "<p style='color: red;'>failed</p>";
        setTimeout(() => {
          status.classList.add('fade-out');
          setTimeout(() => {
            status.innerHTML = '';
            status.classList.remove('fade-out');
          }, 700);
        }, 2500);
      }
    } catch (error) {
      status.innerHTML = "<p style='color: red;'>failed</p>";
      setTimeout(() => {
        status.classList.add('fade-out');
        setTimeout(() => {
          status.innerHTML = '';
          status.classList.remove('fade-out');
        }, 700);
      }, 2500);
    }
  });

