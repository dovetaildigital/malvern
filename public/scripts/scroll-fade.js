// public/scripts/scroll-fade.js
console.log('[ScrollFade] Script loaded');

function initScrollFade() {
  console.log('[ScrollFade] Initializing...');
  const fadeEls = document.querySelectorAll('[data-fade]');
  console.log(`[ScrollFade] Found ${fadeEls.length} elements`);

  if (!fadeEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('[ScrollFade] Element in view:', entry.target);
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    if (el.classList.contains('visible')) return;
    
    const rect = el.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      console.log('[ScrollFade] Element already in view:', el);
      el.classList.add('visible');
    } else {
      console.log('[ScrollFade] Observing element:', el);
      observer.observe(el);
    }
  });
}

// Initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[ScrollFade] DOM loaded, initializing');
    initScrollFade();
  });
} else {
  console.log('[ScrollFade] DOM already loaded, initializing');
  initScrollFade();
}

// Handle Astro's view transitions
document.addEventListener('astro:page-load', () => {
  console.log('[ScrollFade] Astro page-load event');
  requestAnimationFrame(initScrollFade);
});

// Also listen for after-swap as a fallback
document.addEventListener('astro:after-swap', () => {
  console.log('[ScrollFade] Astro after-swap event');
  requestAnimationFrame(initScrollFade);
});