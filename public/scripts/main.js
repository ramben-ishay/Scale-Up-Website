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

window.addEventListener('scroll', updateScrollProgress, { passive: true });
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

// Video control: select source on load, play once and stop at last frame
window.addEventListener('load', () => {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  
  let videoHasEnded = false;

  // Select the right source based on screen size (media attr not well supported)
  const sources = video.querySelectorAll('source');
  const isMobile = window.innerWidth <= 767;
  
  sources.forEach(source => {
    const media = source.getAttribute('media');
    if (media) {
      if ((isMobile && media.includes('max-width')) || (!isMobile && media.includes('min-width'))) {
        video.src = source.src;
      }
    }
  });

  // Handle video end
  video.addEventListener('ended', () => {
    videoHasEnded = true;
    video.pause();
    // Keep at end
    if (video.duration && !isNaN(video.duration)) {
        try { video.currentTime = video.duration; } catch (e) {}
    }
  });

  // Prevent restarting by hijacking play
  const originalPlay = video.play.bind(video);
  video.play = function() {
    if (videoHasEnded) {
      return Promise.resolve();
    }
    return originalPlay();
  };

  // Only block load if video has ended
  const originalLoad = video.load.bind(video);
  video.load = function() {
    if (videoHasEnded) {
      return;
    }
    originalLoad();
  };
  
  // Load and play the video
  video.load();
  video.play().catch(() => {
    // Autoplay might be blocked, ensure muted and retry
    video.muted = true;
    video.play().catch(() => {});
  });
});

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
