/**
 * Command palette — Ctrl+K / Cmd+K.
 */

import { setCloudTheme, setColorMode } from './themes.js';
import { toggleTerminal } from './terminal.js';
import { profile } from './data/profile.js';

function navigateTo(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
  history.pushState(null, '', hash);
}

const SECTIONS = [
  ['#home', 'Home', 'terminal'],
  ['#about', 'About & infrastructure diagram', 'account_tree'],
  ['#experience', 'Life timeline', 'history'],
  ['#skills', 'Technical skills', 'memory'],
  ['#projects', 'Projects', 'folder_open'],
  ['#achievements', 'Achievements', 'emoji_events'],
  ['#certifications', 'Certifications', 'verified'],
  ['#guestbook', 'Guestbook', 'forum'],
  ['#contact', 'Contact', 'mail']
];

const PALETTE_ITEMS = [
  ...SECTIONS.map(([hash, title, icon]) => ({
    title: `Go to ${title}`,
    category: 'Navigation',
    icon,
    action: () => navigateTo(hash)
  })),
  {
    title: 'Open the CLI (backtick)',
    category: 'Action',
    icon: 'terminal',
    action: () => toggleTerminal()
  },
  {
    title: 'Download CV (PDF)',
    category: 'Action',
    icon: 'picture_as_pdf',
    action: () => {
      const a = document.createElement('a');
      a.href = 'assets/docs/resume.pdf';
      a.download = 'Sujan_Sapkota_CV.pdf';
      a.click();
    }
  },
  {
    title: 'Email Sujan',
    category: 'Action',
    icon: 'outgoing_mail',
    action: () => { window.location.href = `mailto:${profile.contact.email}`; }
  },
  {
    title: 'Toggle light / dark mode',
    category: 'Theme',
    icon: 'contrast',
    action: () => {
      const current = document.documentElement.getAttribute('data-mode') || 'dark';
      setColorMode(current === 'dark' ? 'light' : 'dark');
    }
  },
  { title: 'Accent: AWS orange', category: 'Theme', icon: 'cloud', action: () => setCloudTheme('aws') },
  { title: 'Accent: Azure blue', category: 'Theme', icon: 'cloud_circle', action: () => setCloudTheme('azure') },
  { title: 'Accent: Google Cloud blue', category: 'Theme', icon: 'cloud_queue', action: () => setCloudTheme('gcp') },
  { title: 'Accent: default green', category: 'Theme', icon: 'palette', action: () => setCloudTheme('default') },
  {
    title: 'GitHub — SujanSapkota0923',
    category: 'External',
    icon: 'code',
    action: () => window.open(profile.contact.github, '_blank', 'noopener')
  },
  {
    title: 'LinkedIn profile',
    category: 'External',
    icon: 'link',
    action: () => window.open(profile.contact.linkedin, '_blank', 'noopener')
  }
];

let activeIndex = 0;
let filteredItems = [...PALETTE_ITEMS];

export function initCommandPalette() {
  const overlay = document.getElementById('command-palette');
  const input = document.getElementById('palette-input');
  const results = document.getElementById('palette-results');
  const trigger = document.getElementById('command-palette-trigger');

  if (!overlay || !input || !results) return;

  function open() {
    overlay.classList.add('active');
    input.value = '';
    filterItems('');
    input.focus();
  }

  function close() {
    overlay.classList.remove('active');
  }

  if (trigger) trigger.addEventListener('click', open);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.classList.contains('active') ? close() : open();
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  input.addEventListener('input', (e) => {
    filterItems(e.target.value.toLowerCase().trim());
  });

  input.addEventListener('keydown', (e) => {
    // With no matches there is nothing to move through — and a modulo by
    // zero here used to leave activeIndex as NaN, killing selection until
    // the query was retyped.
    if (!filteredItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filteredItems.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[activeIndex];
      if (item) {
        close();
        item.action();
      }
    }
  });

  function filterItems(query) {
    filteredItems = query
      ? PALETTE_ITEMS.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        )
      : [...PALETTE_ITEMS];

    activeIndex = 0;
    render();
  }

  function render() {
    results.innerHTML = '';

    if (!filteredItems.length) {
      const li = document.createElement('li');
      li.className = 'palette-empty';
      li.textContent = 'No command matched that query.';
      results.appendChild(li);
      return;
    }

    filteredItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `palette-item ${index === activeIndex ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="palette-item-left">
          <span class="material-symbols-outlined palette-item-icon"></span>
          <span></span>
        </div>
        <span class="palette-category-badge"></span>
      `;
      li.querySelector('.palette-item-icon').textContent = item.icon;
      li.querySelector('.palette-item-left span:last-child').textContent = item.title;
      li.querySelector('.palette-category-badge').textContent = item.category;

      li.addEventListener('click', () => {
        close();
        item.action();
      });

      results.appendChild(li);
    });

    scrollActiveIntoView();
  }

  function updateSelection() {
    results.querySelectorAll('.palette-item').forEach((el, idx) => {
      el.classList.toggle('selected', idx === activeIndex);
    });
    scrollActiveIntoView();
  }

  function scrollActiveIntoView() {
    const selected = results.querySelector('.palette-item.selected');
    if (selected) selected.scrollIntoView({ block: 'nearest' });
  }
}
