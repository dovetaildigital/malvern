// public/scripts/dropdown-menu.js
function initDropdowns() {
  const menuItems = document.querySelectorAll('#main-menu > li[data-has-submenu="true"]');
  
  menuItems.forEach((item) => {
    const submenu = item.querySelector('ul');
    if (!submenu) return;

    const show = () => {
      submenu.classList.remove('invisible', 'opacity-0', 'scale-95');
      submenu.classList.add('visible', 'opacity-100', 'scale-100');
    };

    const hide = () => {
      submenu.classList.remove('visible', 'opacity-100', 'scale-100');
      submenu.classList.add('invisible', 'opacity-0', 'scale-95');
    };

    // Remove any existing listeners to prevent duplicates
    item.removeEventListener('mouseenter', show);
    item.removeEventListener('mouseleave', hide);
    item.removeEventListener('focusin', show);
    item.removeEventListener('focusout', hide);

    // Add new listeners
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);
    item.addEventListener('focusin', show);
    item.addEventListener('focusout', hide);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDropdowns);

// Re-initialize after view transitions
document.addEventListener('astro:page-load', initDropdowns);