/* ============================================
   DopaFix — Core Application JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Utility: Debounce
     ------------------------------------------ */
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /* ------------------------------------------
     Mobile Menu
     ------------------------------------------ */
  const menuToggle = document.querySelector('.js-menu-toggle');
  const mobileNav = document.querySelector('.js-mobile-nav');

  function openMobileMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (menuToggle && menuToggle.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  /* Close mobile menu when clicking a link inside it */
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* Close mobile menu on resize to desktop */
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  }, 150));

  /* ------------------------------------------
     Smooth Scroll for Anchor Links
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------
     FAQ Accordion
     ------------------------------------------ */
  const accordionItems = document.querySelectorAll('.js-accordion-item');

  accordionItems.forEach(function (item) {
    const trigger = item.querySelector('.js-accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      /* Optional: close others */
      accordionItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.js-accordion-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------
     Modal System
     ------------------------------------------ */
  const modalBackdrop = document.querySelector('.js-modal-backdrop');
  const modals = document.querySelectorAll('.js-modal');
  const modalTriggers = document.querySelectorAll('.js-modal-trigger');
  const modalClosers = document.querySelectorAll('.js-modal-close');

  function openModal(modalId) {
    const modal = document.querySelector(modalId);
    if (!modal || !modalBackdrop) return;

    modalBackdrop.classList.add('is-open');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    /* Focus first focusable element inside modal */
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();

    /* Trap focus inside modal */
    modal.addEventListener('keydown', trapFocus);
  }

  function closeAllModals() {
    if (modalBackdrop) modalBackdrop.classList.remove('is-open');
    modals.forEach(function (modal) {
      modal.classList.remove('is-open');
    });
    document.body.style.overflow = '';
    modals.forEach(function (modal) {
      modal.removeEventListener('keydown', trapFocus);
    });
  }

  function trapFocus(e) {
    const modal = e.currentTarget;
    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      if (modalId) openModal(modalId);
    });
  });

  modalClosers.forEach(function (closer) {
    closer.addEventListener('click', closeAllModals);
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeAllModals);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMobileMenu();
    }
  });

  /* ------------------------------------------
     Contact Form — Visual Success State
     ------------------------------------------ */
  const contactForm = document.querySelector('.js-contact-form');
  const contactSuccess = document.querySelector('.js-contact-success');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Simple validation */
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (!field) return;
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--color-accent)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      /* Show success state */
      contactForm.style.display = 'none';
      contactSuccess.classList.add('is-visible');

      /* Reset form behind the scenes */
      contactForm.reset();
    });
  }

  /* ------------------------------------------
     Header shadow on scroll
     ------------------------------------------ */
  const siteHeader = document.querySelector('.js-site-header');

  function updateHeaderShadow() {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.style.boxShadow = 'var(--shadow-md)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', debounce(updateHeaderShadow, 50));
  updateHeaderShadow();

  /* ------------------------------------------
     Lazy load images
     ------------------------------------------ */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  /* ------------------------------------------
     Active nav link based on current page
     ------------------------------------------ */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    /* Handle root index */
    if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
      link.classList.add('is-active');
      return;
    }

    /* Handle subpages */
    if (href !== '/' && currentPath.includes(href.replace(/\/$/, ''))) {
      link.classList.add('is-active');
    }
  });

})();