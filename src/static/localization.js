(function (document) {
  const SUPPORTED_PAGES = ['landing', 'login', 'register'];
  const DEFAULT_PAGE = 'landing';
  const SUPPORTED_LOCALES = ['fi', 'en'];
  const DEFAULT_LOCALE = 'fi';

  const parsePath = path => {
    const dirs = path
      .replace(/\/+/g, '/')
      .replace(/^\/|\/$/g, '')
      .split('/');

    let locale = DEFAULT_LOCALE;
    if (dirs.length && SUPPORTED_LOCALES.includes(dirs[0])) {
      locale = dirs.shift();
    }

    let page = dirs.join('/');
    if (!SUPPORTED_PAGES.includes(page)) {
      page = DEFAULT_PAGE;
    }

    return { locale, page };
  };

  const { page, locale } = parsePath(window.location.pathname);
  // console.log(`Page: ${page}, locale: ${locale}`)

  const updateLinks = newLocale => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;

    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
      const href = link.getAttribute('href');

      // Skip external links
      if (!href || href.startsWith('http')) return;

      link.setAttribute('href', `/${newLocale}/${parsePath(href).page}`);
    });
  };

  let translations = {};

  const enButton = document.getElementById('en-button');
  const fiButton = document.getElementById('fi-button');

  const fetchTranslations = async newLocale => {
    const response = await fetch(`/static/locales/${newLocale}/${page}.json`);
    if (!response.ok) {
      console.error(`Could not fetch translations for locale ${newLocale}`);
    }
    return await response.json();
  };

  const translatePage = () => {
    document.querySelectorAll('[localization-key]').forEach(element => {
      let key = element.getAttribute('localization-key');
      let translation = translations[key];
      element.innerText = translation;
    });

    // For elements that need HTML content (e.g. links within text)
    document.querySelectorAll('[localization-key-html]').forEach(element => {
      let key = element.getAttribute('localization-key-html');
      let translation = translations[key];
      element.innerHTML = translation;
    });

    // For elements that need aria-label attribute
    document
      .querySelectorAll('[localization-key-aria-label]')
      .forEach(element => {
        let key = element.getAttribute('localization-key-aria-label');
        let translation = translations[key];
        element.setAttribute('aria-label', translation);
      });
  };

  const styleButton = (button, color, fontWeight, pointerEvents) => {
    if (button) {
      button.style.color = color;
      button.style.fontWeight = fontWeight;
      button.style.pointerEvents = pointerEvents;
    }
  };

  const showClass = className =>
    document
      .querySelectorAll(`.${className}`)
      .forEach(element => (element.style.display = 'unset'));

  const hideClass = className =>
    document
      .querySelectorAll(`.${className}`)
      .forEach(element => (element.style.display = 'none'));

  const enableLanguageButton = button =>
    styleButton(button, '#37119d', '700', 'auto');

  const disableLanguageButton = button =>
    styleButton(button, '#1c325d', '500', 'none');

  const setLocale = async newLocale => {
    translations = await fetchTranslations(newLocale);
    translatePage();

    // Set document language.
    document.documentElement.setAttribute('lang', newLocale);

    // Set alt texts and language buttons.
    if (newLocale === 'en') {
      disableLanguageButton(enButton);
      enableLanguageButton(fiButton);
    } else {
      disableLanguageButton(fiButton);
      enableLanguageButton(enButton);
    }

    updateLinks(newLocale);

    // Update path
    history.pushState({}, '', `/${newLocale}/${page}`);
  };

  document.addEventListener('DOMContentLoaded', async () => {
    setLocale(locale);
  });

  if (enButton) {
    enButton.onclick = event => {
      event.preventDefault();
      setLocale('en');
    };
  }

  if (fiButton) {
    fiButton.onclick = event => {
      event.preventDefault();
      setLocale('fi');
    };
  }
})(document);
