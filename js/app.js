/* ═══════════════════════════════════════
   App — التطبيق
   Navbar Scroll + Hamburger + Animations
   + Back to Top + Archive Filtering
   ═══════════════════════════════════════ */

(function() {
  'use strict';

  // ── Navbar Scroll Effect ──
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Hamburger Menu Toggle ──
  function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    var links = mobileMenu.querySelectorAll('.mobile-menu__link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // ── Back to Top Button ──
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll Animations (fadeInUp) ──
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('animate-in');
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.1 });

    for (var i = 0; i < elements.length; i++) {
      observer.observe(elements[i]);
    }
  }

  // ── Archive Filtering ──
  function initArchiveFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.archive-card');
    if (filterBtns.length === 0 || cards.length === 0) return;

    for (var i = 0; i < filterBtns.length; i++) {
      filterBtns[i].addEventListener('click', function() {
        var filter = this.getAttribute('data-filter');

        // Update active button
        for (var j = 0; j < filterBtns.length; j++) {
          filterBtns[j].classList.remove('active');
        }
        this.classList.add('active');

        // Filter cards
        for (var k = 0; k < cards.length; k++) {
          var category = cards[k].getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            cards[k].style.display = '';
          } else {
            cards[k].style.display = 'none';
          }
        }
      });
    }
  }

  // ── Calculate reading time for card excerpts ──
  function initReadingTimes() {
    var cards = document.querySelectorAll('[data-word-count]');
    for (var i = 0; i < cards.length; i++) {
      var wordCount = parseInt(cards[i].getAttribute('data-word-count'), 10);
      var readingTime = Math.ceil(wordCount / 200);
      var el = cards[i].querySelector('.card-reading-time');
      if (el) {
        el.textContent = readingTime + ' دقائق';
      }
    }
  }

  // ── Initialize Everything ──
  document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initHamburger();
    initBackToTop();
    initScrollAnimations();
    initArchiveFilter();
    initReadingTimes();
  });
})();
