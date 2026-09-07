/**
 * CLI overlay — opened with the backtick key, the toolbar button, or the
 * command palette.
 *
 * Every command reports something true: `whoami` and `status` read from the
 * profile data and the browser, and `ping` measures a real same-origin
 * round trip rather than printing invented packet times.
 */

import { setCloudTheme } from './themes.js';
import { profile, skills, projects, timeline, infrastructure } from './data/profile.js';

const SECTIONS = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'achievements',
  'certifications',
  'guestbook',
  'contact'
];

let terminalHistory = [];
let historyIndex = -1;
let resumeTextCache = '';
const sessionStart = Date.now();

export function toggleTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  const input = document.getElementById('term-input');
  if (!overlay) return;

  overlay.classList.toggle('active');
  if (overlay.classList.contains('active') && input) {
    setTimeout(() => input.focus(), 80);
  }
}

export function initTerminal() {
  const overlay = document.getElementById('terminal-overlay');
  const input = document.getElementById('term-input');
  const output = document.getElementById('terminal-output');
  const closeBtn = document.getElementById('term-close-btn');
  const maxBtn = document.getElementById('term-max-btn');
  const win = overlay ? overlay.querySelector('.terminal-window') : null;
  const trigger = document.getElementById('terminal-trigger-btn');

  if (!overlay || !input || !output) return;

  if (trigger) trigger.addEventListener('click', toggleTerminal);
  if (closeBtn) closeBtn.addEventListener('click', toggleTerminal);

  if (maxBtn && win) {
    maxBtn.addEventListener('click', () => {
      const maximized = win.style.maxWidth === '95vw';
      win.style.maxWidth = maximized ? '820px' : '95vw';
      win.style.height = maximized ? '540px' : '90vh';
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleTerminal();
  });

  document.addEventListener('keydown', (e) => {
    // e.target is normally an element, but not on every path — guard it
    // rather than assume a tagName is there.
    const tag = (e.target && e.target.tagName ? e.target.tagName : '').toLowerCase();
    const isEditing = (tag === 'input' && e.target.id !== 'term-input') || tag === 'textarea';

    if ((e.key === '`' || e.key === '~') && !e.ctrlKey && !e.metaKey && !isEditing) {
      e.preventDefault();
      toggleTerminal();
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) toggleTerminal();
  });

  fetch('assets/docs/resume.txt')
    .then((r) => r.text())
    .then((text) => { resumeTextCache = text; })
    .catch(() => {
      resumeTextCache =
        'resume.txt could not be loaded. Reach me at ' + profile.contact.email;
    });

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const commandStr = input.value.trim();
      input.value = '';

      if (commandStr) {
        terminalHistory.push(commandStr);
        historyIndex = terminalHistory.length;
      }

      print(`guest@sujan-infra:~$ ${commandStr}`);
      await processCommand(commandStr);
      scrollToBottom();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = terminalHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < terminalHistory.length - 1) {
        historyIndex++;
        input.value = terminalHistory[historyIndex] || '';
      } else {
        historyIndex = terminalHistory.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      completeCommand(input);
    }
  });

  function print(text, className = '') {
    const line = document.createElement('div');
    if (className) line.className = className;
    line.textContent = text;
    output.appendChild(line);
  }

  function printHTML(html) {
    const block = document.createElement('div');
    block.innerHTML = html;
    output.appendChild(block);
  }

  function scrollToBottom() {
    const screen = overlay.querySelector('.terminal-screen');
    if (screen) screen.scrollTop = screen.scrollHeight;
  }

  function navigate(section) {
    toggleTerminal();
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${section}`);
    }
  }

  async function processCommand(raw) {
    if (!raw) return;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        printHTML(`
<div class="term-head">COMMANDS</div>
  <span class="term-key">whoami</span>          who I am, in six lines
  <span class="term-key">cat resume.txt</span>  print the plain-text CV
  <span class="term-key">ls</span>              list the sections of this site
  <span class="term-key">cd &lt;section&gt;</span>     jump to a section (e.g. 'cd projects')
  <span class="term-key">stack</span>           the infrastructure I run at work
  <span class="term-key">skills</span>          skill groups from my CV
  <span class="term-key">projects</span>        personal projects and repo links
  <span class="term-key">contact</span>         how to reach me
  <span class="term-key">status</span>          this browser session, honestly
  <span class="term-key">theme &lt;name&gt;</span>     accent: aws | azure | gcp | default
  <span class="term-key">ping</span>            measure a real round trip to this host
  <span class="term-key">date</span>            local time, UTC, and Nepal time
  <span class="term-key">history</span>         commands you have run
  <span class="term-key">echo &lt;text&gt;</span>      print arguments
  <span class="term-key">clear</span>           clear the buffer
  <span class="term-key">exit</span>            close the terminal
        `);
        break;

      case 'whoami':
        printHTML(`
<span class="term-accent" style="font-weight:700">${profile.name}</span>
Role:      ${profile.role} @ ${profile.employer} (Feb 2026 — present)
Education: BE Computer Engineering, Kathmandu Engineering College (TU), 2021—2025
Location:  ${profile.location} (${profile.timezone})
Focus:     Hybrid Linux/Windows + AWS, Terraform, Docker/Kubernetes, network security
Before:    Network &amp; Systems Trainee @ Kontract · DevOps &amp; SecOps Fellow @ Leapfrog · IT Intern @ Nepal Telecom
Type <span class="term-key">'cat resume.txt'</span> for the full CV or <span class="term-key">'stack'</span> for the infrastructure.
        `);
        break;

      case 'cat':
        if (args[0] === 'resume.txt' || args[0] === 'resume' || args[0] === 'cv.txt') {
          print(resumeTextCache || 'loading resume…');
        } else {
          print(`cat: ${args[0] || 'missing operand'}: no such file. Try 'cat resume.txt'.`);
        }
        break;

      case 'ls':
        printHTML(
          SECTIONS.map((s) => `drwxr-xr-x  ${s}/`).join('\n') + '\n-rw-r--r--  resume.txt'
        );
        break;

      case 'cd': {
        const target = (args[0] || '').replace(/[#/]/g, '');
        if (SECTIONS.includes(target)) {
          print(`→ #${target}`);
          navigate(target);
        } else {
          print(`cd: ${args[0] || ''}: no such section. Try: ${SECTIONS.join(', ')}`);
        }
        break;
      }

      case 'stack': {
        const layers = ['delivery', 'network', 'compute', 'data', 'observe'];
        printHTML(
          `<div class="term-head">STACK — Kontract IT Support</div>` +
            layers
              .map((layer) => {
                const nodes = infrastructure.nodes
                  .filter((n) => n.layer === layer)
                  .map((n) => n.label)
                  .join(', ');
                return `  ${layer.padEnd(10)} ${nodes}`;
              })
              .join('\n')
        );
        break;
      }

      case 'skills':
        printHTML(
          `<div class="term-head">SKILLS</div>` +
            skills
              .map((g) => `  <span class="term-key">${g.group}</span>\n    ${g.items.join(', ')}`)
              .join('\n')
        );
        break;

      case 'projects':
        printHTML(
          `<div class="term-head">PROJECTS</div>` +
            projects
              .map(
                (p) =>
                  `  ${p.index}  <span class="term-key">${p.name}</span> — ${p.subtitle}\n      ${
                    p.repo || 'not published as a public repository'
                  }`
              )
              .join('\n')
        );
        break;

      case 'contact':
        printHTML(`
<div class="term-head">CONTACT</div>
  email     ${profile.contact.email}
  phone     ${profile.contact.phone}
  github    ${profile.contact.github}
  linkedin  ${profile.contact.linkedin}
  location  ${profile.location} (${profile.timezone})
        `);
        break;

      case 'status': {
        // Real numbers about this page, in this browser. Nothing else.
        const uptime = Math.floor((Date.now() - sessionStart) / 1000);
        const [nav] = performance.getEntriesByType('navigation');
        const entries = timeline.length;
        printHTML(`
<div class="term-head">SESSION STATUS</div>
  Session uptime   ${Math.floor(uptime / 60)}m ${uptime % 60}s
  Page load        ${nav ? `${Math.round(nav.duration)}ms` : 'unavailable'}
  Accent theme     ${document.documentElement.getAttribute('data-theme')}
  Colour mode      ${document.documentElement.getAttribute('data-mode')}
  Viewport         ${window.innerWidth}×${window.innerHeight}
  Timeline entries ${entries} (rendered from js/data/profile.js)
  Backend          none — this is a static site
        `);
        break;
      }

      case 'theme': {
        const chosen = (args[0] || '').toLowerCase();
        if (['aws', 'azure', 'gcp', 'default'].includes(chosen)) {
          setCloudTheme(chosen);
          print(`accent → ${chosen}`);
        } else {
          print('usage: theme <aws | azure | gcp | default>');
        }
        break;
      }

      case 'ping': {
        // A genuine measurement: four same-origin requests, cache-busted.
        const target = location.host || 'localhost';
        print(`PING ${target} — 4 same-origin requests`);
        let totalMs = 0;
        let received = 0;

        for (let i = 1; i <= 4; i++) {
          const t0 = performance.now();
          try {
            await fetch(`assets/icons/favicon.svg?ping=${Date.now()}-${i}`, { cache: 'no-store' });
            const ms = performance.now() - t0;
            totalMs += ms;
            received++;
            print(`  seq=${i} time=${ms.toFixed(2)} ms`);
          } catch {
            print(`  seq=${i} request failed`);
          }
        }

        print(`--- ${target} statistics ---`);
        print(
          `4 sent, ${received} received, ${(((4 - received) / 4) * 100).toFixed(1)}% loss` +
            (received ? `, avg ${(totalMs / received).toFixed(2)} ms` : '')
        );
        break;
      }

      case 'date': {
        const now = new Date();
        const npt = new Date(now.getTime() + (345 + now.getTimezoneOffset()) * 60000);
        printHTML(`
  local  ${now.toString()}
  utc    ${now.toUTCString()}
  nepal  ${npt.toLocaleString('en-GB')} (UTC+5:45)
        `);
        break;
      }

      case 'echo':
        print(args.join(' '));
        break;

      case 'history':
        terminalHistory.forEach((h, i) => print(`${String(i + 1).padStart(3)}  ${h}`));
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      case 'exit':
      case 'quit':
        toggleTerminal();
        break;

      default:
        print(`${cmd}: command not found. Type 'help'.`);
        break;
    }
  }

  function completeCommand(inputEl) {
    const value = inputEl.value.trim();
    if (!value) return;

    const candidates = [
      'help', 'whoami', 'cat resume.txt', 'ls', 'stack', 'skills', 'projects',
      'contact', 'status', 'ping', 'date', 'history', 'clear', 'exit',
      ...SECTIONS.map((s) => `cd ${s}`),
      'theme aws', 'theme azure', 'theme gcp', 'theme default'
    ];

    const match = candidates.find((c) => c.startsWith(value));
    if (match) inputEl.value = match;
  }
}
