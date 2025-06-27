document.addEventListener('astro:after-swap', () => {
    // Accessibility focus fix
    const main = document.querySelector('main');
    if (main) {
      const heading = main.querySelector('h1, h2, [role="heading"]');
      if (heading && heading instanceof HTMLElement) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      } else {
        main.setAttribute('tabindex', '-1');
        main.focus();
      }
    }
  
    // Analytics tracking (example: Google Analytics v4)
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
      });
    }
  
    // Add Plausible example if using that instead:
    // if (typeof plausible === 'function') {
    //   plausible('pageview');
    // }
  });
  