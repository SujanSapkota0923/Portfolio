/**
 * Guestbook — a note that opens the visitor's own mail client.
 *
 * The previous version seeded three testimonials from people who do not
 * exist and stored new ones in localStorage, where nobody but that one
 * browser would ever see them. Both are gone.
 */

import { showToast, composeMail } from './utils.js';

export function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('gb-name').value.trim();
    const role = document.getElementById('gb-role').value.trim();
    const message = document.getElementById('gb-message').value.trim();

    if (!name || !message) {
      showToast('A name and a note, please.', 'warning');
      return;
    }

    const signature = role ? `${name} — ${role}` : name;

    composeMail({
      subject: `Portfolio note from ${name}`,
      body: `${message}\n\n— ${signature}`
    });

    showToast('Opening your mail client…', 'success');
  });
}
