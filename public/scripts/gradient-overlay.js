const overlayTitle = document.getElementById('gradient-overlay-title');
  const overlaySubtitle = document.getElementById('gradient-overlay-subtitle');
  const heading = document.getElementById('hero-heading');
  const strapline = document.getElementById('hero-strapline');

  const maskSize = 480;
  const radius = maskSize / 2;

  document.addEventListener('mousemove', (e) => {
    if (overlayTitle && heading) {
      const rect = heading.getBoundingClientRect();
      const x = e.clientX - rect.left - radius;
      const y = e.clientY - rect.top - radius;
      overlayTitle.style.maskPosition = `${x}px ${y}px`;
      overlayTitle.style.webkitMaskPosition = `${x}px ${y}px`;
    }

    if (overlaySubtitle && strapline) {
      const rect = strapline.getBoundingClientRect();
      const x = e.clientX - rect.left - radius;
      const y = e.clientY - rect.top - radius;
      overlaySubtitle.style.maskPosition = `${x}px ${y}px`;
      overlaySubtitle.style.webkitMaskPosition = `${x}px ${y}px`;
    }
  });

  document.addEventListener('mouseleave', () => {
    if (overlayTitle) {
      overlayTitle.style.maskPosition = `-9999px -9999px`;
      overlayTitle.style.webkitMaskPosition = `-9999px -9999px`;
    }
    if (overlaySubtitle) {
      overlaySubtitle.style.maskPosition = `-9999px -9999px`;
      overlaySubtitle.style.webkitMaskPosition = `-9999px -9999px`;
    }
  });