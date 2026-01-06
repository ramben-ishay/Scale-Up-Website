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

function updateScrollProgress() {
  // #region agent log
  const now = Date.now();
  const timeSinceLastScroll = now - lastScrollTime;
  scrollEventCount++;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const isMobile = window.innerWidth <= 767;
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:32',message:'Scroll event fired',data:{scrollTop,windowHeight,documentHeight,timeSinceLastScroll,scrollEventCount,isMobile,viewportHeight:window.visualViewport?.height||window.innerHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  lastScrollTime = now;
  // #endregion
  
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  // #region agent log
  const beforeWidth = scrollProgress ? scrollProgress.style.width : 'none';
  // #endregion
  
  if (scrollProgress) {
    scrollProgress.style.width = `${Math.min(scrollPercentage, 100)}%`;
  }
  
  // #region agent log
  const afterWidth = scrollProgress ? scrollProgress.style.width : 'none';
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:41',message:'Scroll progress updated',data:{beforeWidth,afterWidth,scrollPercentage},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
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

// Video Source Selection based on screen size
function updateVideoSource() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  
  // #region agent log
  const isMobile = window.innerWidth <= 767;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const animationSection = document.querySelector('.animation-section');
  const animationSectionHeight = animationSection ? animationSection.offsetHeight : 0;
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:76',message:'updateVideoSource called',data:{isMobile,viewportHeight,windowInnerHeight:window.innerHeight,animationSectionHeight,windowWidth:window.innerWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  const sources = video.querySelectorAll('source');
  
  sources.forEach(source => {
    const media = source.getAttribute('media');
    if (media) {
      if ((isMobile && media.includes('max-width')) || (!isMobile && media.includes('min-width'))) {
        // #region agent log
        const oldSrc = video.src;
        // #endregion
        
        video.src = source.src;
        video.load();
        
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:88',message:'Video source changed',data:{oldSrc,newSrc:source.src,isMobile},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
      }
    }
  });
}

window.addEventListener('resize', updateVideoSource);
window.addEventListener('load', updateVideoSource);

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


