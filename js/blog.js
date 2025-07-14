// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('.action-count');
            const currentCount = parseInt(countSpan.textContent);
            const isLiked = this.getAttribute('data-liked') === 'true';
            
            if (isLiked) {
                // Unlike
                icon.className = 'far fa-heart';
                countSpan.textContent = currentCount - 1;
                this.setAttribute('data-liked', 'false');
                this.classList.remove('liked');
            } else {
                // Like
                icon.className = 'fas fa-heart';
                countSpan.textContent = currentCount + 1;
                this.setAttribute('data-liked', 'true');
                this.classList.add('liked');
            }
        });
    });
    
    // Comment button functionality
    const commentButtons = document.querySelectorAll('.comment-btn');
    
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // No notification or alert
        });
    });
    
    // Share button functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const post = this.closest('.blog-post');
            const postText = post.querySelector('.post-text').textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Nahin\'s Blog Post',
                    text: postText.substring(0, 100) + '...',
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const textToShare = postText.substring(0, 100) + '...';
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToShare);
                }
            }
        });
    });
    
    // Bookmark button functionality
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isBookmarked = icon.className.includes('fas');
            
            if (isBookmarked) {
                icon.className = 'far fa-bookmark';
            } else {
                icon.className = 'fas fa-bookmark';
            }
        });
    });
    
    // Post menu button functionality
    const menuButtons = document.querySelectorAll('.post-menu-btn');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // No notification or alert
        });
    });
    
    // Tag click functionality
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // No notification or alert
        });
    });
    
    // About Me tag click functionality
    const aboutTags = document.querySelectorAll('.about-tag');
    
    aboutTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // No notification or alert
        });
    });
    
    // Load more button functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const btn = this;
            const icon = btn.querySelector('i');
            
            // Show loading state
            btn.classList.add('loading');
            btn.textContent = 'Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                // Add a new post (this would normally fetch from an API)
                addNewPost();
                
                // Reset button
                btn.classList.remove('loading');
                btn.innerHTML = '<i class="fas fa-spinner"></i>Load More Posts';
            }, 1500);
        });
    }
    
    // Add new post function
    function addNewPost() {
        const feed = document.querySelector('.blog-feed');
        const newPost = document.createElement('article');
        newPost.className = 'blog-post';
        newPost.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <img src="assets/images/me.jpeg" alt="Nahin" class="author-avatar">
                    <div class="author-info">
                        <h3 class="author-name">Nahin Bin Monir</h3>
                        <span class="post-date">Just now</span>
                    </div>
                </div>
                <button class="post-menu-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            
            <div class="post-content">
                <p class="post-text">Just discovered a new JavaScript framework! 🎉 The learning never stops in web development. Every day brings new challenges and opportunities to grow as a developer.</p>
                <div class="post-tags">
                    <span class="tag">#JavaScript</span>
                    <span class="tag">#WebDev</span>
                    <span class="tag">#Learning</span>
                </div>
            </div>
            
            <div class="post-actions">
                <button class="action-btn like-btn" data-liked="false">
                    <i class="far fa-heart"></i>
                    <span class="action-count">0</span>
                </button>
                <button class="action-btn comment-btn">
                    <i class="far fa-comment"></i>
                    <span class="action-count">0</span>
                </button>
                <button class="action-btn share-btn">
                    <i class="far fa-share-square"></i>
                </button>
                <button class="action-btn bookmark-btn">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
        `;
        
        // Insert at the beginning of the feed
        feed.insertBefore(newPost, feed.firstChild);
        
        // Re-attach event listeners to new post
        attachEventListeners(newPost);
        
        // Add fade-in animation
        newPost.style.opacity = '0';
        newPost.style.transform = 'translateY(20px)';
        setTimeout(() => {
            newPost.style.transition = 'all 0.5s ease';
            newPost.style.opacity = '1';
            newPost.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Attach event listeners to a specific post
    function attachEventListeners(post) {
        const likeBtn = post.querySelector('.like-btn');
        const commentBtn = post.querySelector('.comment-btn');
        const shareBtn = post.querySelector('.share-btn');
        const bookmarkBtn = post.querySelector('.bookmark-btn');
        const menuBtn = post.querySelector('.post-menu-btn');
        const tags = post.querySelectorAll('.tag');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const countSpan = this.querySelector('.action-count');
                const currentCount = parseInt(countSpan.textContent);
                const isLiked = this.getAttribute('data-liked') === 'true';
                
                if (isLiked) {
                    icon.className = 'far fa-heart';
                    countSpan.textContent = currentCount - 1;
                    this.setAttribute('data-liked', 'false');
                    this.classList.remove('liked');
                } else {
                    icon.className = 'fas fa-heart';
                    countSpan.textContent = currentCount + 1;
                    this.setAttribute('data-liked', 'true');
                    this.classList.add('liked');
                }
            });
        }
        
        if (commentBtn) {
            commentBtn.addEventListener('click', function() {
                // No notification or alert
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                const postText = post.querySelector('.post-text').textContent;
                if (navigator.share) {
                    navigator.share({
                        title: 'Nahin\'s Blog Post',
                        text: postText.substring(0, 100) + '...',
                        url: window.location.href
                    });
                } else {
                    const textToShare = postText.substring(0, 100) + '...';
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(textToShare);
                    }
                }
            });
        }
        
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const isBookmarked = icon.className.includes('fas');
                
                if (isBookmarked) {
                    icon.className = 'far fa-bookmark';
                } else {
                    icon.className = 'fas fa-bookmark';
                }
            });
        }
        
        if (menuBtn) {
            menuBtn.addEventListener('click', function() {
                // No notification or alert
            });
        }
        
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                // No notification or alert
            });
        });
    }
    
    // Add smooth scroll behavior
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
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all blog posts
    document.querySelectorAll('.blog-post').forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'all 0.6s ease';
        observer.observe(post);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const activeElements = document.querySelectorAll('.active, .open');
            activeElements.forEach(element => {
                element.classList.remove('active', 'open');
            });
        }
    });
    
    // Add touch gestures for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for refreshing
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for loading more
                console.log('Swipe down detected');
            }
        }
    }
}); 