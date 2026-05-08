/**
 * Lightweight i18n module.
 *
 * HTML markup convention:
 *   data-i18n="key"             → sets element innerHTML
 *   data-i18n-placeholder="key" → sets input/textarea placeholder attribute
 *
 * App-wide default — change DEFAULT_LANG to switch the startup language.
 */

export const DEFAULT_LANG = 'uk';

export const LANGUAGES = [
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', label: 'English',    flag: '🇬🇧' },
];

// Cache and current lang live on window — survive custom-element re-renders,
// reset on page refresh (no localStorage).
if (!window.__i18nCache) window.__i18nCache = {};
if (!window.__i18nLang)  window.__i18nLang  = DEFAULT_LANG;

/** Fetch a locale JSON once; subsequent calls return from cache. */
async function loadLocale(lang) {
  if (window.__i18nCache[lang]) return window.__i18nCache[lang];
  const res = await fetch(`./i18n/${lang}.json`);
  if (!res.ok) throw new Error(`i18n: failed to load locale "${lang}"`);
  const data = await res.json();
  window.__i18nCache[lang] = data;
  return data;
}

/** Translate a key; falls back to the key string if not found. */
export function t(key) {
  const dict = window.__i18nCache[window.__i18nLang] || {};
  console.log(
    key,
    Object.prototype.hasOwnProperty.call(dict, key)
  )
  return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
}

/** Current active language code. */
export function getLang() {
  return window.__i18nLang;
}

/**
 * Walk a DOM subtree and apply translations to every element that carries
 * a data-i18n or data-i18n-placeholder attribute.
 *
 * @param {Element|Document} root  — defaults to document
 */
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = t(key);
    // Use innerHTML because translations can contain html tags.
    el.innerHTML = value;
  });

  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

/**
 * Switch language, load its JSON (cached), fire 'langchange' on document
 * so every component can re-apply translations.
 */
export async function setLang(lang) {
  await loadLocale(lang);
  window.__i18nLang = lang;
  document.documentElement.lang = lang;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/**
 * Register a callback for language changes.
 * Returns an unsubscribe function.
 */
export function onLangChange(callback) {
  const handler = (e) => callback(e.detail.lang);
  document.addEventListener('langchange', handler);
  return () => document.removeEventListener('langchange', handler);
}

/** Load the default locale so t() works synchronously on first render. */
export async function initI18n() {
  await loadLocale(window.__i18nLang);
}
