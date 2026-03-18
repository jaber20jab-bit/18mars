/* ═══════════════════════════════════════
   Theme — تبديل الوضع
   Dark/Light Toggle + localStorage
   Must be loaded in <head> to prevent flash
   ═══════════════════════════════════════ */

(function() {
  'use strict';

  var STORAGE_KEY = 'theme-preference';

  function getThemePreference() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Apply theme immediately (before render)
  setTheme(getThemePreference());

  // Setup toggle after DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }

    // Mobile theme toggle
    var mobileToggleBtn = document.getElementById('theme-toggle-mobile');
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    }
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
