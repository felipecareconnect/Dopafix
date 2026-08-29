/**
 * DopaFix — Global Application Entry & Utilities
 * Architecture: Core Application Layer
 * Goal: Global state initialization, accessibility helpers, and common interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  DopaFixApp.init();
});

const DopaFixApp = (() => {
  /**
   * Global state management object
   */
  const state = {
    initialized: false,
    currentPath: window.location.pathname,
  };

  /**
   * Initialize main application processes
   */
  const init = () => {
    if (state.initialized) return;
    
    initSmoothScrolling();
    initFocusManagement();
    initInteractiveCards();
    
    state.initialized = true;
    console.log('DopaFix Frontend initialized cleanly.');
  };

  /**
   * Smooth internal anchor link navigation for accessible page scrolling
   */
  const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  };

  /**
   * Global accessible focus state visual management
   */
  const initFocusManagement = () => {
    document.body.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
      }
    });
  };

  /**
   * Subtle interactive feedback for option cards and choice components
   */
  const initInteractiveCards = () => {
    const selectableCards = document.querySelectorAll('.option-card');

    selectableCards.forEach((card) => {
      card.addEventListener('click', () => {
        const parent = card.closest('.option-group') || card.parentElement;
        if (parent && !card.classList.contains('multi-select')) {
          parent.querySelectorAll('.option-card').forEach((c) => c.classList.remove('selected'));
        }
        card.classList.toggle('selected');
      });
    });
  };

  return {
    init,
    state,
  };
})();