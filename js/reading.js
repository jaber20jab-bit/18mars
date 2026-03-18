/**
 * Reading Features
 * ميزات القراءة المتقدمة: شريط التقدم، جدول المحتويات، وقت القراءة
 */

(function() {
  'use strict';

  // متوسط سرعة القراءة (200 كلمة في الدقيقة للعربية)
  const WORDS_PER_MINUTE = 200;

  // ===== READING PROGRESS BAR =====
  const ReadingProgress = {
    element: null,
    bar: null,

    init() {
      // إنشاء عنصر شريط التقدم
      this.element = document.createElement('div');
      this.element.className = 'reading-progress';
      this.element.innerHTML = '<div class="reading-progress__bar"></div>';
      
      // إضافته بعد الـ navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.parentNode.insertBefore(this.element, navbar.nextSibling);
        this.bar = this.element.querySelector('.reading-progress__bar');
        this.bindEvents();
      }
    },

    bindEvents() {
      window.addEventListener('scroll', () => this.update(), { passive: true });
      window.addEventListener('resize', () => this.update(), { passive: true });
    },

    update() {
      if (!this.bar) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      
      if (documentHeight <= 0) {
        this.bar.style.width = '100%';
        return;
      }

      const progress = (scrollTop / documentHeight) * 100;
      this.bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  };

  // ===== READING TIME CALCULATOR =====
  const ReadingTime = {
    calculate(text) {
      // إزالة HTML tags
      const cleanText = text.replace(/<[^>]*>/g, '');
      const wordCount = cleanText.trim().split(/\s+/).length;
      const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
      return minutes;
    },

    display(element, minutes) {
      if (element) {
        element.textContent = `${minutes} دقيقة للقراءة`;
        element.setAttribute('datetime', `PT${minutes}M`);
      }
    },

    init() {
      const timeElement = document.querySelector('[data-reading-time]');
      const contentElement = document.querySelector('.article-content');
      
      if (timeElement && contentElement) {
        const text = contentElement.innerHTML;
        const minutes = this.calculate(text);
        this.display(timeElement, minutes);
      }
    }
  };

  // ===== TABLE OF CONTENTS =====
  const TableOfContents = {
    container: null,
    headings: null,

    init() {
      const content = document.querySelector('.article-content');
      if (!content) return;

      // البحث عن عناوين H2 و H3
      this.headings = content.querySelectorAll('h2, h3');
      
      if (this.headings.length === 0) return;

      // إضافة IDs للعناوين إذا لم تكن موجودة
      this.headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
      });

      // إنشاء الـ TOC
      this.createTOC();
    },

    createTOC() {
      // البحث عن حاوية الـ TOC
      const tocContainer = document.querySelector('.toc');
      const tocMobileContainer = document.querySelector('.toc-mobile .toc__list');
      
      if (!tocContainer && !tocMobileContainer) return;

      const list = document.createElement('ul');
      list.className = 'toc__list';

      this.headings.forEach((heading, index) => {
        const id = heading.id;
        const text = heading.textContent;
        const level = heading.tagName.toLowerCase();

        const item = document.createElement('li');
        item.className = 'toc__item';

        const link = document.createElement('a');
        link.href = `#${id}`;
        link.className = 'toc__link';
        if (level === 'h3') {
          link.classList.add('toc__link--h3');
        }
        link.textContent = text;
        link.setAttribute('data-target', id);

        // إضافة smooth scroll
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(id);
          if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });

        item.appendChild(link);
        list.appendChild(item);
      });

      // إضافة الـ TOC للحاويات
      if (tocContainer) {
        const tocList = tocContainer.querySelector('.toc__list');
        if (tocList) {
          tocList.innerHTML = '';
          tocList.appendChild(list.cloneNode(true));
        }
      }

      if (tocMobileContainer) {
        tocMobileContainer.innerHTML = '';
        tocMobileContainer.appendChild(list);

        // تفعيل زر التوسيع
        const toggle = document.querySelector('.toc-mobile__toggle');
        const content = document.querySelector('.toc-mobile__content');
        
        if (toggle && content) {
          toggle.addEventListener('click', () => {
            content.classList.toggle('active');
            const isActive = content.classList.contains('active');
            toggle.setAttribute('aria-expanded', isActive);
          });
        }
      }

      // تفعيل Scroll Spy
      this.initScrollSpy();
    },

    initScrollSpy() {
      if (!this.headings) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.setActive(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -80% 0px',
          threshold: 0
        }
      );

      this.headings.forEach(heading => {
        observer.observe(heading);
      });
    },

    setActive(id) {
      // إزالة الـ active من جميع الروابط
      document.querySelectorAll('.toc__link').forEach(link => {
        link.classList.remove('toc__link--active');
      });

      // إضافة الـ active للرابط الحالي
      const activeLink = document.querySelector(`.toc__link[data-target="${id}"]`);
      if (activeLink) {
        activeLink.classList.add('toc__link--active');
      }
    }
  };

  // ===== BACK TO TOP BUTTON =====
  const BackToTop = {
    button: null,
    threshold: 300,

    init() {
      this.button = document.createElement('button');
      this.button.className = 'back-to-top';
      this.button.setAttribute('aria-label', 'العودة لأعلى');
      this.button.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24">
          <polyline points="18,15 12,9 6,15"/>
        </svg>
      `;
      
      document.body.appendChild(this.button);
      
      this.button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('scroll', () => this.toggle(), { passive: true });
    },

    toggle() {
      if (window.scrollY > this.threshold) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }
  };

  // ===== INITIALIZATION =====
  document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع الميزات
    if (document.querySelector('.article-content')) {
      ReadingProgress.init();
      ReadingTime.init();
      TableOfContents.init();
      BackToTop.init();
    }
  });

  // تصدير للاختبار
  window.ReadingFeatures = {
    progress: ReadingProgress,
    time: ReadingTime,
    toc: TableOfContents,
    backToTop: BackToTop
  };

})();
