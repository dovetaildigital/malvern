// public/scripts/scroll-fade.js
// Animates elements with [data-fade] on initial load, scroll, and after Astro SPA navigation

// Confirm script is loaded
console.log('[ScrollFade] script loaded');

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
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

// Run on initial load or immediately if already ready
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initScrollFade)
  : initScrollFade();

// Re-run after Astro client-side navigation
window.addEventListener('astro:after-swap', () => {
  requestAnimationFrame(initScrollFade);
});