document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    const subscribeBtns = document.querySelectorAll('.btn-subscribe, .platform-link[data-platform="apple"], .platform-link[data-platform="spotify"]');
    const modal = document.querySelector('[data-modal]');
    const modalBackdrop = document.querySelector('[data-modal-backdrop]');
    const modalClose = document.querySelector('[data-modal-close]');

    // Sticky Nav Shadow and Scroll Progress
    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height);
        if (scrollProgress) {
            scrollProgress.style.transform = `scaleX(${scrolled})`;
        }

        if (window.scrollY > 50) {
            navbar.style.top = '10px';
            document.querySelector('.nav-container').style.background = 'rgba(253, 243, 230, 0.95)';
            document.querySelector('.nav-container').style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.top = '20px';
            document.querySelector('.nav-container').style.background = 'rgba(253, 243, 230, 0.8)';
            document.querySelector('.nav-container').style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        }
    });

    // Modal Logic
    const openModal = () => {
        modal.hidden = false;
        modalBackdrop.hidden = false;
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.hidden = true;
        modalBackdrop.hidden = true;
        document.body.style.overflow = 'auto';
    };

    subscribeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Only open modal if it's the subscribe button or a platform link with no href
            if (btn.classList.contains('btn-subscribe') || btn.getAttribute('href') === '#') {
                e.preventDefault();
                openModal();
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    // Add intersection observer for reveal animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial state for animated elements
    const animatedElements = document.querySelectorAll('.episode-card, .host-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});