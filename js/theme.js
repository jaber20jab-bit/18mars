/**
 * Theme Manager
 * إدارة الوضع الداكن والفاتح مع localStorage
 */

(function() {
  'use strict';

  // اسم الـ key في localStorage
  const STORAGE_KEY = 'theme-preference';
  const FONT_SIZE_KEY = 'font-size-preference';

  // الحصول على تفضيل المستخدم
  function getThemePreference() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }
    
    // فحص تفضيل النظام
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  // الحصول على تفضيل حجم الخط
  function getFontSizePreference() {
    return localStorage.getItem(FONT_SIZE_KEY) || 'medium';
  }

  // تطبيق الثيم
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    
    // تحديث حالة الزر
    updateThemeButton(theme);
  }

  // تطبيق حجم الخط
  function applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    localStorage.setItem(FONT_SIZE_KEY, size);
    
    // تحديث حالة أزرار الخط
    updateFontSizeButtons(size);
  }

  // تحديث زر الثيم
  function updateThemeButton(theme) {
    const buttons = document.querySelectorAll('[data-theme-toggle]');
    buttons.forEach(btn => {
      const icon = btn.querySelector('.icon') || btn;
      if (theme === 'dark') {
        btn.setAttribute('aria-label', 'تبديل للوضع الفاتح');
        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      } else {
        btn.setAttribute('aria-label', 'تبديل للوضع الداكن');
        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }
    });
  }

  // تحديث أزرار حجم الخط
  function updateFontSizeButtons(size) {
    const buttons = document.querySelectorAll('[data-font-size-btn]');
    buttons.forEach(btn => {
      const btnSize = btn.getAttribute('data-font-size-btn');
      if (btnSize === size) {
        btn.classList.add('reading-tools__btn--active');
      } else {
        btn.classList.remove('reading-tools__btn--active');
      }
    });
  }

  // تبديل الثيم
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // تبديل حجم الخط
  function cycleFontSize() {
    const sizes = ['small', 'medium', 'large'];
    const currentSize = document.documentElement.getAttribute('data-font-size') || 'medium';
    const currentIndex = sizes.indexOf(currentSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    applyFontSize(sizes[nextIndex]);
  }

  // ضبط حجم الخط المحدد
  function setFontSize(size) {
    if (['small', 'medium', 'large'].includes(size)) {
      applyFontSize(size);
    }
  }

  // تهيئة الثيم
  function initTheme() {
    const theme = getThemePreference();
    applyTheme(theme);
  }

  // تهيئة حجم الخط
  function initFontSize() {
    const size = getFontSizePreference();
    applyFontSize(size);
  }

  // الاستماع لتغيير تفضيل النظام
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // إضافة مستمعي الأحداث للأزرار
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initFontSize();

    // زر تبديل الثيم
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // أزرار حجم الخط
    document.querySelectorAll('[data-font-size-btn]').forEach(btn => {
      btn.addEventListener('click', function() {
        const size = this.getAttribute('data-font-size-btn');
        setFontSize(size);
      });
    });
  });

  // تصدير الدوال للاستخدام العام
  window.ThemeManager = {
    toggle: toggleTheme,
    setTheme: applyTheme,
    getTheme: getThemePreference,
    setFontSize: setFontSize,
    getFontSize: getFontSizePreference
  };

})();
