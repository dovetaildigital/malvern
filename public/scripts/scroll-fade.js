// public/scripts/scroll-fade.js

function initScrollFade() {
  const fadeEls = document.querySelectorAll('[data-fade]');

  if (!fadeEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
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
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

// Initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollFade();
  });
} else {
  initScrollFade();
}

// Handle Astro's view transitions
document.addEventListener('astro:page-load', () => {
  requestAnimationFrame(initScrollFade);
});

// Also listen for after-swap as a fallback
document.addEventListener('astro:after-swap', () => {
  requestAnimationFrame(initScrollFade);
});