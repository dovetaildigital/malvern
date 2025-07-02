// In gradient-overlay.js, update the initGradientOverlay function:
function initGradientOverlay() {
    // Look for any hero section with the gradient
    const heroSections = document.querySelectorAll('[data-hero-gradient]');
    
    if (heroSections.length === 0) {
//console.log('No hero sections with gradient found');
      return null;
    }
  
    let cleanupFunctions = [];
  
    heroSections.forEach((heroSection) => {
      // Find all gradient targets and their overlays
      const gradientTargets = heroSection.querySelectorAll('[data-gradient-target]');
      
      gradientTargets.forEach((target) => {
        const overlay = target.querySelector('[data-gradient-overlay]');
        if (!overlay) return;
  
        console.log('Initializing gradient overlay for target');
        const maskSize = 480;
        const radius = maskSize / 2;
  
        const updatePosition = (e) => {
          const rect = target.getBoundingClientRect();
          const x = e.clientX - rect.left - radius;
          const y = e.clientY - rect.top - radius;
          overlay.style.maskPosition = `${x}px ${y}px`;
          overlay.style.webkitMaskPosition = `${x}px ${y}px`;
        };
  
        const resetPosition = () => {
          overlay.style.maskPosition = '-9999px -9999px';
          overlay.style.webkitMaskPosition = '-9999px -9999px';
        };
  
        // Add event listeners
        target.addEventListener('mousemove', updatePosition);
        target.addEventListener('mouseleave', resetPosition);
  
        // Store cleanup function
        cleanupFunctions.push(() => {
          target.removeEventListener('mousemove', updatePosition);
          target.removeEventListener('mouseleave', resetPosition);
        });
      });
    });
  
    // Rest of the function remains the same...
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }
  
  // Initialize with a small delay to ensure DOM is ready
  function initialize() {
    let cleanup = null;
    
    const init = () => {
      if (cleanup) cleanup();
      cleanup = initGradientOverlay();
    };
  
    // Initial setup
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
    // Re-initialize after view transitions
    document.addEventListener('astro:page-load', init);
    document.addEventListener('astro:after-swap', init);
  
    return () => {
      if (cleanup) cleanup();
      document.removeEventListener('astro:page-load', init);
      document.removeEventListener('astro:after-swap', init);
    };
  }
  
  // Start the initialization
  initialize();