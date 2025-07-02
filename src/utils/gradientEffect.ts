export function initGradientOverlay() {
    const cleanupFns: (() => void)[] = [];
    
    document.querySelectorAll<HTMLElement>('[data-gradient-target]').forEach((target) => {
        // Find the overlay in the parent element
        const container = target.parentElement;
        if (!container) return;
        
        const overlay = container.querySelector<HTMLElement>('[data-gradient-overlay]');
        if (!overlay) return;

        // Get the mask size from the style or use default 300px
        const maskSize = parseInt(overlay.style.maskSize || '300px', 10);
        const offset = maskSize / 2;

        function onMove(e: MouseEvent) {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left - offset;
            const y = e.clientY - rect.top - offset;
            
            // Update the mask position
            if (overlay) {
                overlay.style.maskPosition = `${x}px ${y}px`;
                overlay.style.webkitMaskPosition = `${x}px ${y}px`;
            }
        }

        function onLeave() {
            if (overlay) {
                overlay.style.maskPosition = '-9999px -9999px';
                overlay.style.webkitMaskPosition = '-9999px -9999px';
            }
        }

        // Add event listeners
        target.addEventListener('mousemove', onMove);
        target.addEventListener('mouseleave', onLeave);

        // Store cleanup function
        cleanupFns.push(() => {
            target.removeEventListener('mousemove', onMove);
            target.removeEventListener('mouseleave', onLeave);
        });
    });

    // Return cleanup function that removes all event listeners
    return () => {
        cleanupFns.forEach(cleanup => cleanup());
    };
}