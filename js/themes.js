/**
 * Theme manager.
 *
 * Two axes, both persisted:
 *   data-theme → the accent hue (default | aws | azure | gcp)
 *   data-mode  → light or dark surfaces
 *
 * Both are pure token swaps in css/themes.css, so nothing here touches
 * component styling. The Tailwind config runs in `darkMode: "class"`, so
 * the `dark` class on <html> is kept in step with data-mode for any
 * `dark:` variant in the markup — but colour itself comes from the tokens,
 * not from the variant.
 */

import { showToast } from './utils.js';

const STORAGE_THEME_KEY = 'sujan_portfolio_theme';
const STORAGE_MODE_KEY = 'sujan_portfolio_mode';

const THEME_LABELS = {
  default: 'default green',
  aws: 'AWS orange',
  azure: 'Azure blue',
  gcp: 'Google Cloud blue'
};

export function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || 'default';
  const savedMode =
    localStorage.getItem(STORAGE_MODE_KEY) ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark');

  setCloudTheme(savedTheme, false);
  setColorMode(savedMode, false);

  const dropdown = document.getElementById('cloud-theme-select');
  if (dropdown) {
    dropdown.value = savedTheme;
    dropdown.addEventListener('change', (e) => setCloudTheme(e.target.value, true));
  }

  const modeBtn = document.getElementById('mode-toggle-btn');
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-mode') || 'dark';
      setColorMode(current === 'dark' ? 'light' : 'dark', true);
    });
  }
}

export function setCloudTheme(themeName, notify = true) {
  const theme = Object.keys(THEME_LABELS).includes(themeName) ? themeName : 'default';

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_THEME_KEY, theme);

  const dropdown = document.getElementById('cloud-theme-select');
  if (dropdown && dropdown.value !== theme) dropdown.value = theme;

  window.dispatchEvent(new CustomEvent('cloudthemechange', { detail: { theme } }));

  if (notify) showToast(`Accent: ${THEME_LABELS[theme]}`, 'info');
}

export function setColorMode(mode, notify = true) {
  const next = mode === 'light' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-mode', next);
  // Keeps native controls (select, scrollbars) in step with the page.
  document.documentElement.style.colorScheme = next;
  localStorage.setItem(STORAGE_MODE_KEY, next);

  // Keep Tailwind's class-based dark variant in step with the token axis.
  document.documentElement.classList.toggle('dark', next === 'dark');

  const modeBtn = document.getElementById('mode-toggle-btn');
  if (modeBtn) {
    const glyph = modeBtn.querySelector('.material-symbols-outlined');
    // Show the mode you would switch *to*.
    if (glyph) glyph.textContent = next === 'light' ? 'dark_mode' : 'light_mode';
    modeBtn.setAttribute('title', `Switch to ${next === 'light' ? 'dark' : 'light'} mode`);
  }

  if (notify) showToast(`${next === 'light' ? 'Light' : 'Dark'} mode`, 'info');
}
