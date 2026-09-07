/**
 * Utilities: toasts, clipboard, mailto composition.
 */

import { profile } from './data/profile.js';

export function showToast(message, type = 'info', duration = 3200) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const glyph =
    type === 'success'
      ? 'check_circle'
      : type === 'warning'
      ? 'warning'
      : 'info';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.textContent = glyph;
  const span = document.createElement('span');
  span.textContent = message;

  toast.append(icon, span);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

export async function copyToClipboard(text, label = 'Value') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast(`${label} copied to clipboard.`, 'success');
  } catch (err) {
    showToast('Could not copy to clipboard.', 'warning');
    console.error('Clipboard copy failed', err);
  }
}

/**
 * Hands a message to the visitor's own mail client, addressed to the real
 * inbox. There is no backend on this site, so this is the honest version of
 * a contact form: nothing is stored, nothing is faked.
 */
export function composeMail({ subject, body }) {
  const url =
    `mailto:${profile.contact.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = url;
}

export function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str == null ? '' : String(str);
  return temp.innerHTML;
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
