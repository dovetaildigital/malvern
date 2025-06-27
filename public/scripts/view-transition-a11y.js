document.addEventListener('astro:after-swap', () => {
    const main = document.querySelector('main');
    if (main) {
      const heading = main.querySelector('h1, h2, [role="heading"]');
      if (heading && heading instanceof HTMLElement) heading.focus();
      else main.setAttribute('tabindex', '-1'), main.focus();
    }
  });
  