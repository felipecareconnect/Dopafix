/* ============================================
   DopaFix — Navigation Behaviors
   ============================================ */

(function () {
  'use strict';

  const header = document.querySelector('.js-site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  /* ------------------------------------------
     Hide / Show Header on Scroll Direction
     ------------------------------------------ */
  function updateHeaderOnScroll() {
    if (!header) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    /* Always show at top */
    if (currentScrollY <= 10) {
      header.style.transform = 'translateY(0)';
      header.classList.remove('is-hidden');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    /* Scrolling down and past threshold -> hide */
    if (scrollDelta > 5 && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
      header.classList.add('is-hidden');
    }
    /* Scrolling up -> show */
    else if (scrollDelta < -5) {
      header.style.transform = 'translateY(0)';
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderOnScroll);
      ticking = true;
    }
  });

  /* ------------------------------------------
     Highlight Current Section in Nav
     (for pages with in-page anchor sections)
     ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav__link[href^="#"], .mobile-nav__link[href^="#"]');

  function highlightCurrentSection() {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('is-active');
      }
    });
  }

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function () {
      window.requestAnimationFrame(highlightCurrentSection);
    });
    highlightCurrentSection();
  }

  /* ------------------------------------------
     Scroll-to-Top Button
     ------------------------------------------ */
  const scrollTopBtn = document.querySelector('.js-scroll-top');

  function toggleScrollTopBtn() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('is-visible');
      scrollTopBtn.setAttribute('aria-hidden', 'false');
    } else {
      scrollTopBtn.classList.remove('is-visible');
      scrollTopBtn.setAttribute('aria-hidden', 'true');
    }
  }

  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      window.requestAnimationFrame(toggleScrollTopBtn);
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    toggleScrollTopBtn();
  }

})();