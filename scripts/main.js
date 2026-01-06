// Loading Animation
window.addEventListener('load', () => {
  // #region agent log
  const isMobile = window.innerWidth <= 767;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const animationSection = document.querySelector('.animation-section');
  const animationSectionHeight = animationSection ? animationSection.offsetHeight : 0;
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:2',message:'Page loaded',data:{isMobile,viewportHeight,windowInnerHeight:window.innerHeight,animationSectionHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
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

// #region agent log
let lastScrollTime = 0;
let scrollEventCount = 0;
// #endregion

// Throttle scroll handler for better performance
let scrollTimeout = null;
function updateScrollProgress() {
  // #region agent log
  const now = Date.now();
  const timeSinceLastScroll = now - lastScrollTime;
  scrollEventCount++;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const isMobile = window.innerWidth <= 767;
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:32',message:'Scroll event fired',data:{scrollTop,windowHeight,documentHeight,timeSinceLastScroll,scrollEventCount,isMobile,viewportHeight:window.visualViewport?.height||window.innerHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
  lastScrollTime = now;
  // #endregion
  
  // Clear existing timeout
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout);
  }
  
  // Use requestAnimationFrame for smooth updates
  scrollTimeout = requestAnimationFrame(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    // #region agent log
    const beforeWidth = scrollProgress ? scrollProgress.style.width : 'none';
    // #endregion
    
    if (scrollProgress) {
      scrollProgress.style.width = `${Math.min(scrollPercentage, 100)}%`;
    }
    
    // #region agent log
    const afterWidth = scrollProgress ? scrollProgress.style.width : 'none';
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:50',message:'Scroll progress updated',data:{beforeWidth,afterWidth,scrollPercentage},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  });
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
    // #region agent log
    const isMobile = window.innerWidth <= 767;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:52',message:'IntersectionObserver callback',data:{isIntersecting:entry.isIntersecting,elementTag:entry.target.tagName,elementClass:entry.target.className,scrollTop,isMobile,viewportHeight:window.visualViewport?.height||window.innerHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (entry.isIntersecting) {
      // #region agent log
      const beforeVisible = entry.target.classList.contains('visible');
      // #endregion
      
      entry.target.classList.add('visible');
      
      // #region agent log
      const afterVisible = entry.target.classList.contains('visible');
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:56',message:'Visible class added',data:{beforeVisible,afterVisible,elementTag:entry.target.tagName,elementClass:entry.target.className,scrollTop},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
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

// Video Source Selection and Control
let lastKnownWidth = window.innerWidth;
let videoHasFinished = false;
let videoInitialized = false;

function initializeVideo() {
  const video = document.getElementById('heroVideo');
  if (!video || videoInitialized) return;
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:135',message:'Initializing video',data:{videoSrc:video.src,isMobile:window.innerWidth<=767},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  // Set initial source based on screen size
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
  
  // When video ends, pause and keep on last frame
  video.addEventListener('ended', () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:152',message:'Video ended - pausing on last frame',data:{currentTime:video.currentTime,duration:video.duration},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    videoHasFinished = true;
    video.pause();
    // Keep video on last frame by setting currentTime to duration
    if (video.duration) {
      video.currentTime = video.duration;
    }
  });
  
  // Prevent video from restarting - block any load() calls after video has finished
  const originalLoad = video.load.bind(video);
  video.load = function() {
    if (videoHasFinished) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:163',message:'Video load() blocked - video has finished',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return; // Block reload if video has finished
    }
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:168',message:'Video load() allowed',data:{videoHasFinished},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    originalLoad();
  };
  
  // Prevent play() from restarting if video has finished
  const originalPlay = video.play.bind(video);
  video.play = function() {
    if (videoHasFinished) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:176',message:'Video play() blocked - video has finished',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return Promise.resolve(); // Block play if video has finished
    }
    return originalPlay();
  };
  
  videoInitialized = true;
}

// Initialize video on load
window.addEventListener('load', initializeVideo);
document.addEventListener('DOMContentLoaded', initializeVideo);

// #region agent log
let lastViewportHeight = window.visualViewport?.height || window.innerHeight;
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const currentViewportHeight = window.visualViewport.height;
    const heightDelta = currentViewportHeight - lastViewportHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const animationSection = document.querySelector('.animation-section');
    const animationSectionHeight = animationSection ? animationSection.offsetHeight : 0;
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:102',message:'Visual viewport resize',data:{currentViewportHeight,lastViewportHeight,heightDelta,scrollTop,animationSectionHeight,windowInnerHeight:window.innerHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    lastViewportHeight = currentViewportHeight;
  });
}
// #endregion

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


