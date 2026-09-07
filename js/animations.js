/**
 * Interactions: card tilt and the infrastructure diagram inspector.
 * Both run after render.js has built the DOM.
 */

import { infrastructure } from './data/profile.js';

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 3D tilt on hover. Skipped entirely when the visitor asked for less motion. */
export function initTiltEffect() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
      const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/** Clicking a diagram node explains what that component is doing in the stack. */
export function initDiagramInspector() {
  const nodes = document.querySelectorAll('.diag-node');
  const titleEl = document.getElementById('inspect-title');
  const descEl = document.getElementById('inspect-desc');
  const metricsEl = document.getElementById('inspect-metrics');

  if (!nodes.length) return;

  const byId = Object.fromEntries(infrastructure.nodes.map((n) => [n.id, n]));

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      const data = byId[node.getAttribute('data-comp')];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (metricsEl) {
        metricsEl.innerHTML = '';
        (data.facts || []).forEach((fact) => {
          const line = document.createElement('span');
          line.textContent = fact;
          metricsEl.appendChild(line);
        });
      }
    });
  });
}
