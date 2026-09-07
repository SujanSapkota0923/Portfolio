/**
 * Timeline zoom and per-entry expansion.
 * Runs after render.js has built the log lines.
 */

import { showToast } from './utils.js';

export function initTimeline() {
  const container = document.getElementById('experience-timeline');
  const zoomIn = document.getElementById('timeline-zoom-in');
  const zoomOut = document.getElementById('timeline-zoom-out');
  const zoomReset = document.getElementById('timeline-zoom-reset');
  const label = document.getElementById('timeline-zoom-level');

  if (!container) return;

  let level = 'normal'; // compact | normal | detailed

  function setLevel(next, notify = true) {
    level = next;
    container.classList.remove('zoom-compact', 'zoom-detailed');

    if (next === 'compact') {
      container.classList.add('zoom-compact');
      if (label) label.textContent = 'Zoom: Compact';
      if (notify) showToast('Timeline: compact', 'info');
    } else if (next === 'detailed') {
      container.classList.add('zoom-detailed');
      if (label) label.textContent = 'Zoom: Expanded';
      if (notify) showToast('Timeline: everything expanded', 'info');
    } else {
      if (label) label.textContent = 'Zoom: Standard';
      if (notify) showToast('Timeline: standard', 'info');
    }
  }

  if (zoomIn) {
    zoomIn.addEventListener('click', () => {
      if (level === 'compact') setLevel('normal');
      else if (level === 'normal') setLevel('detailed');
    });
  }

  if (zoomOut) {
    zoomOut.addEventListener('click', () => {
      if (level === 'detailed') setLevel('normal');
      else if (level === 'normal') setLevel('compact');
    });
  }

  if (zoomReset) zoomReset.addEventListener('click', () => setLevel('normal'));

  // Click anywhere on an entry to expand it — except on a link or a badge.
  container.querySelectorAll('.timeline-card').forEach((card) => {
    const details = card.querySelector('.timeline-item-details');
    if (!details) return;

    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.badge')) return;

      const nowExpanded = details.classList.toggle('expanded');
      const toggle = card.querySelector('.timeline-expand-toggle');
      if (!toggle) return;

      // The label is the span that is not the icon glyph.
      const toggleLabel = toggle.querySelector('span:not(.material-symbols-outlined)');
      const toggleIcon = toggle.querySelector('.material-symbols-outlined');

      if (toggleLabel) toggleLabel.textContent = nowExpanded ? 'Hide details' : 'View details';
      if (toggleIcon) toggleIcon.textContent = nowExpanded ? 'expand_less' : 'expand_more';
    });
  });
}
