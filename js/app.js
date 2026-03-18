/**
 * App Interactions
 * التفاعلات العامة للموقع
 */

(function() {
  'use strict';

  // ===== NAVBAR SCROLL EFFECT =====
  const NavbarScroll = {
    navbar: null,
    scrolledClass: 'navbar--scrolled',
    scrollThreshold: 50,

    init() {
      this.navbar = document.querySelector('.navbar');
      if (!this.navbar) return;

      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
      this.handleScroll(); // فحص أولي
    },

    handleScroll() {
      if (!this.navbar) return;

      if (window.scrollY > this.scrollThreshold) {
        this.navbar.classList.add(this.scrolledClass);
      } else {
        this.navbar.classList.remove(this.scrolledClass);
      }
    }
  };

  // ===== MOBILE MENU =====
  const MobileMenu = {
    toggle: null,
    nav: null,

    init() {
      this.toggle = document.querySelector('.navbar__toggle');
      this.nav = document.querySelector('.navbar__nav');

      if (!this.toggle || !this.nav) return;

      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // إغلاق القائمة عند النقر على رابط
      this.nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // إغلاق القائمة عند الضغط على Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.nav.classList.contains('active')) {
          this.closeMenu();
        }
      });
    },

    toggleMenu() {
      this.toggle.classList.toggle('active');
      this.nav.classList.toggle('active');
      
      // تحديث aria-expanded
      const isOpen = this.nav.classList.contains('active');
      this.toggle.setAttribute('aria-expanded', isOpen);
      
      // منع/السماح بـ scroll خلف القائمة
      document.body.style.overflow = isOpen ? 'hidden' : '';
    },

    closeMenu() {
      this.toggle.classList.remove('active');
      this.nav.classList.remove('active');
      this.toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // ===== ACTIVE LINK HIGHLIGHT =====
  const ActiveLink = {
    init() {
      const links = document.querySelectorAll('.navbar__link');
      if (links.length === 0) return;

      const currentPath = window.location.pathname;
      const currentFile = currentPath.split('/').pop() || 'index.html';

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFile || 
            (currentFile === '' && href === 'index.html') ||
            (href !== '/' && currentFile.startsWith(href.replace('/', '')))) {
          link.classList.add('navbar__link--active');
        }
      });
    }
  };

  // ===== ANIMATION ON SCROLL =====
  const ScrollAnimations = {
    elements: null,
    observer: null,

    init() {
      // البحث عن العناصر التي لها класс animate-on-scroll
      this.elements = document.querySelectorAll('[data-animate]');
      
      if (this.elements.length === 0) return;

      // إعداد Intersection Observer
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      this.elements.forEach(el => this.observer.observe(el));
    }
  };

  // ===== DEBOUNCED RESIZE =====
  const ResizeHandler = {
    callbacks: [],
    timeout: null,

    init() {
      window.addEventListener('resize', () => this.handle());
    },

    handle() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.callbacks.forEach(cb => cb());
      }, 250);
    },

    addCallback(cb) {
      this.callbacks.push(cb);
    }
  };

  // ===== SHARE FUNCTIONALITY =====
  const ShareButtons = {
    init() {
      const shareLinks = document.querySelectorAll('[data-share]');
      
      shareLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const platform = link.getAttribute('data-share');
          this.share(platform);
        });
      });
    },

    share(platform) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = '';

      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
          break;
        case 'copy':
          this.copyLink();
          return;
        default:
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    },

    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // إظهار رسالة نجاح
        const btn = document.querySelector('[data-share="copy"]');
        if (btn) {
          const originalContent = btn.innerHTML;
          btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>';
          setTimeout(() => {
            btn.innerHTML = originalContent;
          }, 2000);
        }
      });
    }
  };

  // ===== IMAGE LAZY LOADING =====
  const LazyImages = {
    init() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
              }
              observer.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          observer.observe(img);
        });
      } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
      }
    }
  };

  // ===== CURRENT YEAR =====
  const FooterYear = {
    init() {
      const yearElement = document.querySelector('[data-current-year]');
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
    }
  };

  // ===== PAGE LOAD ANIMATION =====
  const PageLoadAnimation = {
    init() {
      document.body.classList.add('page-loading');
      
      window.addEventListener('load', () => {
        setTimeout(() => {
          document.body.classList.remove('page-loading');
          document.body.classList.add('page-loaded');
        }, 100);
      });
    }
  };

  // ===== INITIALIZE ALL =====
  document.addEventListener('DOMContentLoaded', function() {
    NavbarScroll.init();
    MobileMenu.init();
    SmoothScroll.init();
    ActiveLink.init();
    ScrollAnimations.init();
    ShareButtons.init();
    LazyImages.init();
    FooterYear.init();
    PageLoadAnimation.init();
  });

  // ===== EXPORT =====
  window.AppInteractions = {
    navbar: NavbarScroll,
    mobileMenu: MobileMenu,
    smoothScroll: SmoothScroll,
    activeLink: ActiveLink,
    animations: ScrollAnimations,
    share: ShareButtons,
    lazyImages: LazyImages
  };

})();
