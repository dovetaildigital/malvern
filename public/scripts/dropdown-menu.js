document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('#main-menu > li[data-has-submenu]');
  
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
  
      item.addEventListener('mouseenter', show);
      item.addEventListener('mouseleave', hide);
      item.addEventListener('focusin', show);
      item.addEventListener('focusout', hide);
    });
  });