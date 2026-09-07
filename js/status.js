/**
 * Telemetry dock — real browser-side numbers only.
 *
 * Session uptime since page load, the actual navigation load time, live
 * Nepal time, and the active accent theme. Nothing simulated.
 */

const NEPAL_OFFSET_MINUTES = 5 * 60 + 45; // UTC+5:45

export function initSystemStatus() {
  const uptimeEl = document.getElementById('telemetry-uptime');
  const loadEl = document.getElementById('telemetry-load');
  const clockEl = document.getElementById('telemetry-clock');
  const themeEl = document.getElementById('telemetry-theme');

  const sessionStart = Date.now();

  function formatUptime(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  }

  function nepalTime() {
    const now = new Date();
    const npt = new Date(now.getTime() + (NEPAL_OFFSET_MINUTES + now.getTimezoneOffset()) * 60000);
    return `${String(npt.getHours()).padStart(2, '0')}:${String(npt.getMinutes()).padStart(2, '0')}:${String(
      npt.getSeconds()
    ).padStart(2, '0')}`;
  }

  function tick() {
    if (uptimeEl) uptimeEl.textContent = formatUptime(Date.now() - sessionStart);
    if (clockEl) clockEl.textContent = nepalTime();
  }

  tick();
  setInterval(tick, 1000);

  // Real navigation timing. Available once the load event has settled.
  function reportLoad() {
    if (!loadEl) return;
    const [nav] = performance.getEntriesByType('navigation');
    const duration = nav ? nav.duration : 0;
    loadEl.textContent = duration > 0 ? `${Math.round(duration)}ms` : '—';
  }

  if (document.readyState === 'complete') {
    reportLoad();
  } else {
    window.addEventListener('load', () => setTimeout(reportLoad, 0), { once: true });
  }

  // Active theme, kept in sync with the switcher.
  function reportTheme() {
    if (themeEl) {
      themeEl.textContent = document.documentElement.getAttribute('data-theme') || 'default';
    }
  }

  reportTheme();
  window.addEventListener('cloudthemechange', reportTheme);
}
