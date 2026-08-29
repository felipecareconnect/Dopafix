/* ============================================
   DopaFix — Shop Search & Category Filters
   ============================================ */

(function () {
  'use strict';

  var searchInput = document.querySelector('.js-shop-search');
  var filterChips = document.querySelectorAll('.js-filter-chips .filter-chip');
  var productCards = document.querySelectorAll('.js-shop-grid .product-card');
  var emptyState = document.querySelector('.js-shop-empty');

  var currentFilter = 'all';
  var currentQuery = '';

  function updateVisibility() {
    var visibleCount = 0;

    productCards.forEach(function (card) {
      var categories = (card.getAttribute('data-category') || '').split(' ');
      var title = card.querySelector('.product-card__title');
      var titleText = title ? title.textContent.toLowerCase() : '';
      var desc = card.querySelector('.product-card__desc');
      var descText = desc ? desc.textContent.toLowerCase() : '';

      var matchesCategory = currentFilter === 'all' || categories.indexOf(currentFilter) !== -1;
      var matchesSearch = currentQuery === '' || titleText.indexOf(currentQuery) !== -1 || descText.indexOf(currentQuery) !== -1;

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? '' : 'none';
    }
  }

  /* Search */
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentQuery = this.value.trim().toLowerCase();
      updateVisibility();
    });
  }

  /* Filter chips */
  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      filterChips.forEach(function (c) {
        c.classList.remove('is-active');
      });
      this.classList.add('is-active');

      currentFilter = filter;
      updateVisibility();
    });
  });

})();