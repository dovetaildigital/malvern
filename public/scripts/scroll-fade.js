// public/scripts/scroll-fade.js
// Animates elements with [data-fade] on initial load, scroll, and after Astro SPA navigation

// Confirm script is loaded
console.log('[ScrollFade] script loaded');

function initScrollFade() {
  const fadeEls = document.querySelectorAll('[data-fade]');
  console.log('[ScrollFade] init, found', fadeEls.length, 'elements');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      console.log('[ScrollFade] intersection change', entry.target, entry.isIntersecting);
      if (entry.isIntersecting) {
        console.log('[ScrollFade] adding visible to', entry.target);
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    console.log('[ScrollFade] rect for', el, rect);
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      console.log('[ScrollFade] element in view, adding visible', el);
      el.classList.add('visible');
    } else {
      console.log('[ScrollFade] observing element', el);
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
  console.log('[ScrollFade] astro:after-swap triggered');
  requestAnimationFrame(initScrollFade);
});