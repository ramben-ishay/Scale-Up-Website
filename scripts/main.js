// Loading Animation
window.addEventListener('load', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  setTimeout(() => {
    loadingOverlay.classList.add('hidden');
  }, 500);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    mobileMenuToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      mobileMenuToggle.classList.remove('active');
    }
  });
}

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
const navCapsule = document.getElementById('navCapsule');

function updateScrollProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = `${Math.min(scrollPercentage, 100)}%`;
  }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and episode cards
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const episodeCards = document.querySelectorAll('.episode-card');
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  episodeCards.forEach(card => {
    observer.observe(card);
  });
});

// Video Source Selection based on screen size
function updateVideoSource() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  
  const sources = video.querySelectorAll('source');
  const isMobile = window.innerWidth <= 767;
  
  sources.forEach(source => {
    const media = source.getAttribute('media');
    if (media) {
      if ((isMobile && media.includes('max-width')) || (!isMobile && media.includes('min-width'))) {
        video.src = source.src;
        video.load();
      }
    }
  });
}

window.addEventListener('resize', updateVideoSource);
window.addEventListener('load', updateVideoSource);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

