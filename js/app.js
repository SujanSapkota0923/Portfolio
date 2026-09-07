/**
 * Entry point. Content is rendered from js/data/profile.js first, then the
 * interactive subsystems attach to it.
 */

import { renderAll } from './render.js';
import { initTheme } from './themes.js';
import { initSystemStatus } from './status.js';
import { initTimeline } from './timeline.js';
import { initGuestbook } from './guestbook.js';
import { initCommandPalette } from './command-palette.js';
import { initTerminal, toggleTerminal } from './terminal.js';
import { initTiltEffect, initDiagramInspector } from './animations.js';
import { showToast, copyToClipboard, composeMail } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Content first — everything below queries the DOM it produces.
  renderAll();

  initBootScreen();
  initTheme();
  initSystemStatus();
  initTimeline();
  initGuestbook();
  initCommandPalette();
  initTerminal();
  initTiltEffect();
  initDiagramInspector();
  initNavigation();
  initContactSystem();

  const year = document.getElementById('footer-year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('[data-open-terminal]').forEach((btn) => {
    btn.addEventListener('click', () => toggleTerminal());
  });
});

/* ------------------------------------------------------------ boot screen -- */

function initBootScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  const fill = document.getElementById('loader-progress-fill');
  const pct = document.getElementById('loader-pct');
  const feed = document.getElementById('loader-log-feed');

  // Describes what the page is actually doing, not an imaginary cloud estate.
  const logs = [
    { msg: 'mounting design tokens and fonts', delay: 120 },
    { msg: 'loading profile data transcribed from cv.txt', delay: 380 },
    { msg: 'rendering timeline, skills, projects, diagram', delay: 640 },
    { msg: 'binding command palette (ctrl+k) and cli (`)', delay: 900 },
    { msg: 'ready — no backend, no tracking', delay: 1160 }
  ];

  const total = 1400;
  const start = Date.now();

  const timer = setInterval(() => {
    const value = Math.min(Math.floor(((Date.now() - start) / total) * 100), 100);
    if (fill) fill.style.width = `${value}%`;
    if (pct) pct.textContent = `${value}%`;

    if (value >= 100) {
      clearInterval(timer);
      setTimeout(dismiss, 180);
    }
  }, 30);

  logs.forEach((item) => {
    setTimeout(() => {
      if (!feed || loader.classList.contains('is-dismissed')) return;
      const line = document.createElement('div');
      line.className = 'loader-log-line';
      line.innerHTML = '<span class="tag">[ok]</span>';
      line.append(document.createTextNode(` ${item.msg}`));
      feed.appendChild(line);
    }, item.delay);
  });

  function dismiss() {
    clearInterval(timer);
    loader.classList.add('is-dismissed');
  }

  window.addEventListener('keydown', dismiss, { once: true });
  loader.addEventListener('click', dismiss, { once: true });
}

/* ------------------------------------------------------------ navigation -- */

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const toggle = document.getElementById('mobile-nav-toggle');
  // The desktop command bar and the mobile list are separate elements; only
  // the mobile one opens and closes.
  const list = document.getElementById('mobile-nav');

  if (toggle && list) {
    const setToggleGlyph = (open) => {
      const glyph = toggle.querySelector('.material-symbols-outlined');
      if (glyph) glyph.textContent = open ? 'close' : 'menu';
    };

    toggle.addEventListener('click', () => {
      setToggleGlyph(list.classList.toggle('mobile-active'));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        list.classList.remove('mobile-active');
        setToggleGlyph(false);
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
}

/* --------------------------------------------------------------- contact -- */

function initContactSystem() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Name, reply-to address and message are required.', 'warning');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('That email address does not look right.', 'warning');
        return;
      }

      composeMail({
        subject: subject || `Portfolio enquiry from ${name}`,
        body: `${message}\n\n— ${name}\nReply to: ${email}`
      });

      showToast('Opening your mail client…', 'success');
    });
  }

  document.querySelectorAll('[data-copy-text]').forEach((btn) => {
    btn.addEventListener('click', () => {
      copyToClipboard(
        btn.getAttribute('data-copy-text'),
        btn.getAttribute('data-copy-label') || 'Value'
      );
    });
  });
}
