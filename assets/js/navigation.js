/**
 * DopaFix — Header Navigation & Mobile Drawer Interactions
 * Architecture: Navigation Component Module
 * Goal: Accessible mobile menu toggle, active link detection, & drawer state management
 */

document.addEventListener('DOMContentLoaded', () => {
  DopaFixNav.init();
});

const DopaFixNav = (() => {
  let toggleBtn = null;
  let mobileDrawer = null;
  let overlay = null;
  let isOpen = false;

  /**
   * Initialize navigation elements and listeners
   */
  const init = () => {
    toggleBtn = document.querySelector('.mobile-nav-toggle');
    mobileDrawer = document.querySelector('.mobile-nav-drawer');

    if (!toggleBtn || !mobileDrawer) return;

    createBackdropOverlay();
    bindEvents();
    highlightActivePage();
  };

  /**
   * Dynamically create accessible backdrop overlay for mobile menu drawer
   */
  const createBackdropOverlay = () => {
    overlay = document.createElement('div');
    overlay.className = 'nav-backdrop-overlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background-color: var(--black-overlay);
      backdrop-filter: blur(2px);
      z-index: calc(var(--z-overlay) - 1);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--transition-normal), visibility var(--transition-normal);
    `;
    document.body.appendChild(overlay);
  };

  /**
   * Bind click, keydown, and resize event listeners
   */
  const bindEvents = () => {
    toggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close mobile drawer when pressing ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });

    // Close menu automatically if viewport is resized past desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    });

    // Close drawer when clicking any link inside it
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  };

  /**
   * Toggle mobile navigation open/close state
   */
  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /**
   * Open drawer with accessible ARIA state updates
   */
  const openMenu = () => {
    isOpen = true;
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('active');
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  /**
   * Close drawer and restore background scrolling
   */
  const closeMenu = () => {
    isOpen = false;
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    document.body.style.overflow = ''; // Restore scrolling
  };

  /**
   * Automatically highlight active navigation link based on window path
   */
  const highlightActivePage = () => {
    const currentPath = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath === '')))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  return {
    init,
    openMenu,
    closeMenu,
  };
})();