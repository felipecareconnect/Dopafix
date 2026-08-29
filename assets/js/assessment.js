/* ============================================
   DopaFix — Assessment Logic & Product Preview
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Assessment
     ------------------------------------------ */
  var questions = [
    { text: 'Starting a task feels like pushing a boulder uphill, even when I genuinely want to do it.', category: 'task-initiation' },
    { text: 'I lose track of time and suddenly realize hours have passed without me noticing.', category: 'time' },
    { text: 'I start tasks but struggle to stay with them until they are finished.', category: 'attention' },
    { text: 'My physical or digital spaces are disorganized in a way that slows me down every day.', category: 'organization' },
    { text: 'I pick up my phone or open a browser tab without thinking, even during important tasks.', category: 'distraction' },
    { text: 'Moving from one activity to another feels uncomfortable, draining, or I avoid it.', category: 'transitions' },
    { text: 'Small frustrations can escalate into big emotional reactions faster than I would like.', category: 'emotional-regulation' },
    { text: 'I wait until the last minute — or until someone is waiting — before I start something.', category: 'task-initiation' },
    { text: 'I underestimate how long things take, even tasks I have done many times before.', category: 'time' },
    { text: 'I feel overwhelmed by the number of things I need to do, even when the list is not that long.', category: 'organization' }
  ];

  var options = [
    { label: 'Rarely', value: 1 },
    { label: 'Sometimes', value: 2 },
    { label: 'Often', value: 3 },
    { label: 'Very often', value: 4 }
  ];

  var current = 0;
  var answers = new Array(questions.length).fill(null);

  var questionText = document.querySelector('.js-question-text');
  var optionsContainer = document.querySelector('.js-options');
  var progressLabel = document.querySelector('.js-progress-label');
  var progressPercent = document.querySelector('.js-progress-percent');
  var progressFill = document.querySelector('.js-progress-fill');
  var backBtn = document.querySelector('.js-back-btn');
  var nextBtn = document.querySelector('.js-next-btn');

  function renderAssessment() {
    if (!questionText || !optionsContainer) return;

    var q = questions[current];
    questionText.textContent = q.text;

    var pct = Math.round(((current + 1) / questions.length) * 100);
    if (progressLabel) progressLabel.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
    if (progressPercent) progressPercent.textContent = pct + '%';
    if (progressFill) progressFill.style.width = pct + '%';

    optionsContainer.innerHTML = '';
    options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'assessment__option';
      btn.type = 'button';
      btn.setAttribute('data-value', opt.value);
      if (answers[current] === opt.value) {
        btn.classList.add('is-selected');
      }

      var letter = document.createElement('span');
      letter.className = 'assessment__option-letter';
      letter.textContent = String.fromCharCode(65 + idx);

      var text = document.createElement('span');
      text.textContent = opt.label;

      btn.appendChild(letter);
      btn.appendChild(text);

      btn.addEventListener('click', function () {
        answers[current] = opt.value;
        renderAssessment();
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.textContent = current === questions.length - 1 ? 'Finish' : 'Next';
        }
      });

      optionsContainer.appendChild(btn);
    });

    if (backBtn) backBtn.disabled = current === 0;
    if (nextBtn) {
      if (answers[current] === null) {
        nextBtn.disabled = true;
        nextBtn.textContent = current === questions.length - 1 ? 'Finish' : 'Next';
      } else {
        nextBtn.disabled = false;
        nextBtn.textContent = current === questions.length - 1 ? 'Finish' : 'Next';
      }
    }
  }

  function finishAssessment() {
    var scores = {};
    questions.forEach(function (q, idx) {
      var cat = q.category;
      if (!scores[cat]) scores[cat] = 0;
      scores[cat] += answers[idx];
    });

    var topCategory = '';
    var topScore = -1;
    for (var cat in scores) {
      if (scores[cat] > topScore) {
        topScore = scores[cat];
        topCategory = cat;
      }
    }

    var result = {
      topCategory: topCategory,
      scores: scores,
      answers: answers,
      date: new Date().toISOString()
    };
    localStorage.setItem('dopafix_assessment_result', JSON.stringify(result));
    window.location.href = '/results/';
  }

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      if (current > 0) {
        current--;
        renderAssessment();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (answers[current] === null) return;
      if (current < questions.length - 1) {
        current++;
        renderAssessment();
      } else {
        finishAssessment();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!questionText) return;
    if (e.key >= '1' && e.key <= '4') {
      var idx = parseInt(e.key, 10) - 1;
      if (options[idx]) {
        answers[current] = options[idx].value;
        renderAssessment();
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.textContent = current === questions.length - 1 ? 'Finish' : 'Next';
        }
      }
    }
    if (e.key === 'Enter' && nextBtn && !nextBtn.disabled) {
      nextBtn.click();
    }
  });

  if (questionText) renderAssessment();

  /* ------------------------------------------
     Product Preview Slider
     ------------------------------------------ */
  var slides = document.querySelectorAll('.preview__slide');
  var prevBtn = document.querySelector('.js-preview-prev');
  var nextSlideBtn = document.querySelector('.js-preview-next');
  var counter = document.querySelector('.js-preview-counter');
  var currentSlide = 0;

  function showSlide(index) {
    if (slides.length === 0) return;

    slides.forEach(function (slide) {
      slide.classList.remove('is-active');
    });

    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    slides[index].classList.add('is-active');
    currentSlide = index;

    if (counter) counter.textContent = (currentSlide + 1) + ' / ' + slides.length;

    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextSlideBtn) nextSlideBtn.disabled = currentSlide === slides.length - 1;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      showSlide(currentSlide - 1);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', function () {
      showSlide(currentSlide + 1);
    });
  }

  document.addEventListener('keydown', function (e) {
    var modal = document.querySelector('.modal.is-open');
    if (!modal) return;

    if (e.key === 'ArrowLeft' && prevBtn) {
      prevBtn.click();
    }
    if (e.key === 'ArrowRight' && nextSlideBtn) {
      nextSlideBtn.click();
    }
  });

  showSlide(0);

})();