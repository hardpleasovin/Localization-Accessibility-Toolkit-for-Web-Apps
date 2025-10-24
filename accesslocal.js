// AccessLocal: i18n and a11y Toolkit

const AccessLocal = (function() {
  let currentLang = 'en';
  let translations = {};

  function init(locales, defaultLang = 'en') {
    translations = locales;
    currentLang = defaultLang;
    applyTranslations();
  }

  function setLanguage(lang) {
    if (translations[lang]) {
      currentLang = lang;
      applyTranslations();
    }
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = translations[currentLang][key] || el.textContent;
    });
  }

  function enableA11y() {
    // Auto-add ARIA labels
    document.querySelectorAll('[data-a11y]').forEach(el => {
      const label = el.getAttribute('data-a11y');
      el.setAttribute('aria-label', label);
      el.setAttribute('role', el.tagName === 'BUTTON' ? 'button' : 'region');
    });

    // Keyboard focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.querySelectorAll('[tabindex="0"], button, input, a').forEach(el => {
          el.classList.add('a11y-focus');
        });
      }
    });
  }

  return { init, setLanguage, enableA11y };
})();
