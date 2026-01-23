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

// Monitor video state during scroll - REMOVED - was causing restarts
// The scroll monitoring was setting currentTime on every scroll event,
// which triggers seek operations that browsers may interpret as restarts

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

// Episode image: colorize when scrolled into view (mobile; viewport-center was too strict)
const episodeImageCenterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const card = entry.target.closest('.episode-card');
    if (!card) return;
    if (entry.isIntersecting) {
      card.classList.add('in-viewport-center');
    } else {
      card.classList.remove('in-viewport-center');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
});

// Observe all sections and episode cards
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const episodeCards = document.querySelectorAll('.episode-card');
  const episodeImageWrappers = document.querySelectorAll('.episode-image-wrapper');
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  episodeCards.forEach(card => {
    observer.observe(card);
  });

  episodeImageWrappers.forEach(wrapper => {
    episodeImageCenterObserver.observe(wrapper);
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
  fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:135',message:'Initializing video',data:{videoSrc:video.src,isMobile:window.innerWidth<=767},timestamp:Date.now(),sessionId:'debug-session',runId:'run8',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
  
  // Select the right source based on screen size (media attr not well supported)
  const sources = video.querySelectorAll('source');
  const isMobile = window.innerWidth <= 767;
  
  sources.forEach(source => {
    const media = source.getAttribute('media');
    if (media) {
      if ((isMobile && media.includes('max-width')) || (!isMobile && media.includes('min-width'))) {
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:149',message:'Setting video source',data:{src:source.src,isMobile},timestamp:Date.now(),sessionId:'debug-session',runId:'run8',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        video.src = source.src;
      }
    }
  });
  
  // Load and play (mobile: play when ready via canplay; muted is required for autoplay)
  video.muted = true;
  video.setAttribute('playsinline', '');
  video.load();
  const tryPlay = () => { video.play().catch(() => {}); };
  video.addEventListener('canplay', tryPlay, { once: true });
  tryPlay();
  
  // Track all video state changes
  let lastCurrentTime = 0;
  let lastPlaybackState = video.paused ? 'paused' : 'playing';

  video.addEventListener('play', () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:180',message:'Video play event',data:{currentTime:video.currentTime,duration:video.duration,videoHasFinished,scrollTop:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    lastPlaybackState = 'playing';
    if (videoHasFinished && video.currentTime < video.duration - 0.5) {
      // Video restarted after finishing - this should NOT happen with our fixes
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:187',message:'VIDEO RESTART DETECTED - this should not happen!',data:{currentTime:video.currentTime,duration:video.duration,scrollTop:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      // Don't try to force it back - just log the issue
      // video.pause();
      // video.currentTime = video.duration;
    }
  });
  
  video.addEventListener('pause', () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:171',message:'Video pause event',data:{currentTime:video.currentTime,duration:video.duration,videoHasFinished},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    lastPlaybackState = 'paused';
  });
  
  video.addEventListener('seeked', () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:177',message:'Video seeked event',data:{currentTime:video.currentTime,duration:video.duration,videoHasFinished},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
  });
  
  video.addEventListener('timeupdate', () => {
    // Detect if video restarted (currentTime went backwards significantly)
    if (lastCurrentTime > 1 && video.currentTime < 0.5 && videoHasFinished) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:205',message:'Video RESTART DETECTED - currentTime reset',data:{lastCurrentTime,currentTime:video.currentTime,duration:video.duration,scrollTop:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run4',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      // Force back to end
      video.pause();
      video.currentTime = video.duration;
    }
    lastCurrentTime = video.currentTime;
  });
  
  // When video ends, pause and keep on last frame
  video.addEventListener('ended', () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:215',message:'Video ended - pausing on last frame',data:{currentTime:video.currentTime,duration:video.duration},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    videoHasFinished = true;
    video.pause();
    // Keep video on last frame by setting currentTime to duration
    if (video.duration) {
      video.currentTime = video.duration;
      lastCurrentTime = video.duration;
    }
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:223',message:'Video finished - set videoHasFinished=true',data:{duration:video.duration},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
  });
  
  // Monitor visibility changes that might cause browser to restart video
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:228',message:'Video visibility changed',data:{isIntersecting:entry.isIntersecting,intersectionRatio:entry.intersectionRatio,currentTime:video.currentTime,videoHasFinished,scrollTop:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      if (videoHasFinished && entry.isIntersecting) {
        // Video came back into view after finishing - ensure it stays at end
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:232',message:'Video back in view - ensuring it stays at end',data:{currentTime:video.currentTime,duration:video.duration},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'G'})}).catch(()=>{});
        // #endregion
        video.pause();
        // Don't set currentTime here - it was causing the restart issue
        // if (video.duration) {
        //   video.currentTime = video.duration;
        // }
      }
    });
  }, { threshold: [0, 0.1, 0.5, 1] });

  visibilityObserver.observe(video);
  
  // Prevent video from restarting - block any load() calls after video has finished
  const originalLoad = video.load.bind(video);
  video.load = function() {
    // #region agent log
    const stackTrace = new Error().stack;
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:170',message:'Video load() called',data:{videoHasFinished,currentTime:video.currentTime,stackTrace:stackTrace?.split('\n').slice(0,5).join('|')},timestamp:Date.now(),sessionId:'debug-session',runId:'run6',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    if (videoHasFinished) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:175',message:'Video load() blocked - video has finished',data:{currentTime:video.currentTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run6',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      return; // Block reload if video has finished
    }
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:180',message:'Video load() allowed',data:{videoHasFinished,currentTime:video.currentTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run6',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    originalLoad();
  };
  
  // Prevent play() from restarting if video has finished
  const originalPlay = video.play.bind(video);
  video.play = function() {
    // #region agent log
    const stackTrace = new Error().stack;
    fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:240',message:'Video play() called',data:{videoHasFinished,currentTime:video.currentTime,scrollTop:window.pageYOffset,stackTrace:stackTrace?.split('\n').slice(0,5).join('|')},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    if (videoHasFinished) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:244',message:'Video play() blocked - video has finished',data:{currentTime:video.currentTime},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return Promise.resolve(); // Block play if video has finished
    }
    return originalPlay();
  };
  
  // Override src setter to prevent source changes after video has finished
  const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'src');
  if (originalSrcSetter && originalSrcSetter.set) {
    const originalSetSrc = originalSrcSetter.set;
    Object.defineProperty(video, 'src', {
      set: function(value) {
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:260',message:'src setter called',data:{newSrc:value,currentSrc:this.src,videoHasFinished,scrollTop:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        if (videoHasFinished) {
          // #region agent log
          fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:265',message:'src setter blocked - video has finished',data:{attemptedSrc:value},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'F'})}).catch(()=>{});
          // #endregion
          return; // Block src changes if video has finished
        }
        originalSetSrc.call(this, value);
      },
      get: originalSrcSetter.get
    });
  }

  // Override currentTime setter to prevent going back to start
  let currentTimeDescriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'currentTime');
  if (currentTimeDescriptor && currentTimeDescriptor.set) {
    const originalSetCurrentTime = currentTimeDescriptor.set;
    Object.defineProperty(video, 'currentTime', {
      set: function(value) {
        // #region agent log
        if (videoHasFinished && value < this.duration - 0.5) {
          fetch('http://127.0.0.1:7245/ingest/131454f0-416f-439f-8cfa-057f899be75b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:278',message:'currentTime setter called - blocking reset',data:{attemptedValue:value,currentValue:this.currentTime,duration:this.duration,scrollTop:window.pageYOffset},timestamp:Date.now(),sessionId:'debug-session',runId:'run5',hypothesisId:'F'})}).catch(()=>{});
          // #endregion
          // Block setting currentTime to start if video has finished
          if (this.duration) {
            originalSetCurrentTime.call(this, this.duration);
            return;
          }
        }
        originalSetCurrentTime.call(this, value);
      },
      get: currentTimeDescriptor.get
    });
  }
  
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


