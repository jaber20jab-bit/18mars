/* ═══════════════════════════════════════
   Reading Features — ميزات القراءة
   Progress Bar + TOC + Scroll Spy +
   Reading Time + Font Size Control
   ═══════════════════════════════════════ */

(function() {
  'use strict';

  // ── Reading Progress Bar ──
  function initProgressBar() {
    var progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    });
  }

  // ── Estimated Reading Time ──
  function calculateReadingTime() {
    var articleBody = document.querySelector('.article-body');
    if (!articleBody) return;

    var text = articleBody.textContent || articleBody.innerText;
    var wordCount = text.trim().split(/\s+/).length;
    var readingTime = Math.ceil(wordCount / 200); // 200 words/min for Arabic

    var readingTimeElements = document.querySelectorAll('.reading-time-value');
    for (var i = 0; i < readingTimeElements.length; i++) {
      readingTimeElements[i].textContent = readingTime + ' دقائق';
    }
  }

  // ── Auto-Generated TOC ──
  function generateTOC() {
    var articleBody = document.querySelector('.article-body');
    var tocList = document.getElementById('toc-list');
    var tocMobileList = document.getElementById('toc-mobile-list');
    if (!articleBody || (!tocList && !tocMobileList)) return;

    var headings = articleBody.querySelectorAll('h2, h3');
    var tocHTML = '';

    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var id = 'heading-' + i;
      heading.setAttribute('id', id);

      var level = heading.tagName.toLowerCase();
      var cssClass = level === 'h3' ? 'toc__link toc__link--h3' : 'toc__link';

      tocHTML += '<li><a href="#' + id + '" class="' + cssClass + '" data-target="' + id + '">' + heading.textContent + '</a></li>';
    }

    if (tocList) tocList.innerHTML = tocHTML;
    if (tocMobileList) tocMobileList.innerHTML = tocHTML;
  }

  // ── Scroll Spy ──
  function initScrollSpy() {
    var tocLinks = document.querySelectorAll('.toc__link');
    if (tocLinks.length === 0) return;

    var headings = [];
    for (var i = 0; i < tocLinks.length; i++) {
      var targetId = tocLinks[i].getAttribute('data-target');
      var targetEl = document.getElementById(targetId);
      if (targetEl) headings.push({ el: targetEl, link: tocLinks[i] });
    }

    function updateActiveLink() {
      var scrollPos = window.scrollY + 120;
      var activeIndex = -1;

      for (var i = 0; i < headings.length; i++) {
        if (headings[i].el.offsetTop <= scrollPos) {
          activeIndex = i;
        }
      }

      for (var j = 0; j < headings.length; j++) {
        headings[j].link.classList.remove('active');
      }

      if (activeIndex >= 0) {
        headings[activeIndex].link.classList.add('active');
      }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
  }

  // ── Font Size Control ──
  function initFontSizeControl() {
    var STORAGE_KEY = 'font-size-preference';
    var buttons = document.querySelectorAll('.font-size-btn');
    if (buttons.length === 0) return;

    var sizes = {
      'small': '1rem',
      'medium': '1.125rem',
      'large': '1.3rem'
    };

    var saved = localStorage.getItem(STORAGE_KEY) || 'medium';
    applyFontSize(saved);

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function() {
        var size = this.getAttribute('data-size');
        applyFontSize(size);
        localStorage.setItem(STORAGE_KEY, size);
      });
    }

    function applyFontSize(size) {
      document.documentElement.style.setProperty('--article-font-size', sizes[size] || sizes['medium']);
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
        if (buttons[i].getAttribute('data-size') === size) {
          buttons[i].classList.add('active');
        }
      }
    }
  }

  // ── Mobile TOC Toggle ──
  function initMobileTOC() {
    var toggle = document.getElementById('toc-mobile-toggle');
    var content = document.getElementById('toc-mobile-content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      content.classList.toggle('active');
    });
  }

  // ── Initialize all reading features ──
  document.addEventListener('DOMContentLoaded', function() {
    initProgressBar();
    calculateReadingTime();
    generateTOC();
    initScrollSpy();
    initFontSizeControl();
    initMobileTOC();
  });
})();
