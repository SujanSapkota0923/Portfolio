/**
 * Renderers — every section is built from js/data/profile.js.
 * Adding a life event or a project is a data edit, never a markup edit.
 *
 * The markup here is in the same visual language as the static shell in
 * index.html: square one-pixel frames, uppercase label caps, the accent
 * reserved for meta labels, and `->` as the only bullet.
 */

import {
  profile,
  heroObject,
  heroMarkers,
  timeline,
  skills,
  projects,
  certifications,
  achievements,
  infrastructure,
  philosophy
} from './data/profile.js';

/**
 * Escapes for both text and attribute positions — quotes included, which
 * innerHTML round-tripping does not do.
 */
const esc = (s) =>
  (s == null ? '' : String(s))
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const mount = (id) => document.getElementById(id);

/** Material Symbols glyph. The font is loaded once in index.html. */
const icon = (name, cls = '') =>
  `<span class="material-symbols-outlined${cls ? ` ${cls}` : ''}">${esc(name)}</span>`;

/* ---------------------------------------------------------------- hero --- */

/**
 * Pretty-prints the hero object straight to highlighted HTML — keys in the
 * accent, string values in body text — escaping each token as it is emitted
 * rather than running regexes back over escaped markup.
 *
 * Emits one record per logical line carrying its nesting depth, so the CSS
 * can indent the line and hang its wrap without any leading spaces in the
 * text. Arrays stay on one line on purpose: fully expanded, `stack` and
 * `focus` turn an eleven-line object into a twenty-eight-line one and the
 * hero loses its balance against the column beside it.
 */
const jsonScalar = (v) =>
  typeof v === 'string'
    ? `<span class="j-str">&quot;${esc(v)}&quot;</span>`
    : esc(String(v));

function jsonLines(value, depth, key, suffix, out) {
  const label = key ? `<span class="j-key">&quot;${esc(key)}&quot;</span>: ` : '';

  if (Array.isArray(value)) {
    out.push({ depth, html: `${label}[${value.map(jsonScalar).join(', ')}]${suffix}` });
  } else if (value && typeof value === 'object') {
    out.push({ depth, html: `${label}{` });
    const entries = Object.entries(value);
    entries.forEach(([k, v], i) =>
      jsonLines(v, depth + 1, k, i < entries.length - 1 ? ',' : '', out)
    );
    out.push({ depth, html: `}${suffix}` });
  } else {
    out.push({ depth, html: `${label}${jsonScalar(value)}${suffix}` });
  }

  return out;
}

function renderHeroObject() {
  const el = mount('hero-object');
  if (!el) return;

  const lines = jsonLines(heroObject, 0, '', '', [])
    .map(({ depth, html }) => `<div class="j-line" style="--depth:${depth}">${html}</div>`)
    .join('');

  el.innerHTML = `<pre><code>${lines}</code></pre>`;
}

function renderHeroMarkers() {
  const el = mount('hero-markers');
  if (!el) return;

  el.innerHTML = heroMarkers
    .map(
      (m) => `
      <div class="marker">
        <div class="marker-label">${esc(m.label)}</div>
        <div class="marker-value">${esc(m.value)}</div>
        <div class="marker-note">${esc(m.note)}</div>
      </div>`
    )
    .join('');
}

/* ------------------------------------------------------------ timeline --- */

function renderTimeline() {
  const el = mount('experience-timeline');
  if (!el) return;

  // Newest first: a log you scroll from the top.
  const entries = [...timeline].reverse();

  el.innerHTML = entries
    .map((item) => {
      const bullets = item.bullets.length
        ? `<ul class="timeline-bullets">${item.bullets
            .map((b) => `<li>${esc(b)}</li>`)
            .join('')}</ul>`
        : '';

      const tags = item.tags.length
        ? `<div class="timeline-tech-badges">${item.tags
            .map((t) => `<span class="badge">${esc(t)}</span>`)
            .join('')}</div>`
        : '';

      const link = item.link
        ? `<a class="timeline-cert-link" href="${esc(item.link)}" target="_blank" rel="noopener">
             ${icon('verified_user')} ${esc(item.linkLabel || 'Certificate')}
           </a>`
        : '';

      const expandable = item.bullets.length
        ? `<div class="timeline-item-details">
             ${bullets}
             ${link}
           </div>
           <button class="timeline-expand-toggle" type="button">
             ${icon('expand_more')}
             <span>View details</span>
           </button>`
        : link
        ? `<div class="timeline-inline-link">${link}</div>`
        : '';

      const where = item.where
        ? `<span class="timeline-where">· ${esc(item.where)}</span>`
        : '';

      // The blinking block cursor sits on the one entry that is still open.
      const caret = item.current ? '<span class="caret" aria-hidden="true"></span>' : '';

      return `
        <article class="timeline-card kind-${esc(item.kind)} level-${esc(item.level)}${
        item.current ? ' is-current' : ''
      }" data-kind="${esc(item.kind)}">
          <div class="timeline-stamp">
            <span class="stamp-bracket">[</span>${esc(item.stamp)}<span class="stamp-bracket">]</span>
          </div>
          <div class="timeline-level">${esc(item.level)}</div>
          <div class="timeline-body">
            <div class="timeline-item-role">${esc(item.role)}</div>
            <div class="timeline-item-company">
              ${esc(item.org)}${where}
            </div>
            <div class="timeline-item-period">
              ${esc(item.period)}${
                item.undated
                  ? ' <span class="timeline-undated" title="cv.txt records the duration, not the dates">duration only</span>'
                  : ''
              }
            </div>
            <p class="timeline-item-desc">${esc(item.summary)}${caret}</p>
            ${tags}
            ${expandable}
          </div>
        </article>`;
    })
    .join('');
}

/* -------------------------------------------------------------- skills --- */

function renderSkills() {
  const el = mount('skills-grid');
  if (!el) return;

  el.innerHTML = skills
    .map(
      (group) => `
      <div class="skill-category-card">
        <div class="skill-category-header">
          ${icon(group.icon, 'skill-category-icon')}
          <h3 class="skill-category-title">${esc(group.group)}</h3>
        </div>
        <div class="skill-tags">
          ${group.items.map((i) => `<span class="badge">${esc(i)}</span>`).join('')}
        </div>
      </div>`
    )
    .join('');
}

/* ------------------------------------------------------------ projects --- */

/**
 * The original design put a rendered image at the top of each project card.
 * There is no screenshot of any of these that would be honest, so the same
 * framed box holds a monospace schematic of the flow the project's own CV
 * bullets describe. `[[...]]` in the data marks an accent-coloured segment —
 * a delimiter that cannot collide with the `-->` arrows in the drawings.
 */
function renderSchematic(lines) {
  const body = lines
    .map((line) =>
      esc(line).replace(
        /\[\[(.+?)\]\]/g,
        (_, inner) => `<span class="s-accent">${inner}</span>`
      )
    )
    .join('\n');

  return `<pre class="project-schematic" aria-hidden="true">${body}</pre>`;
}

function renderProjects() {
  const el = mount('projects-grid');
  if (!el) return;

  el.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card tilt-card">
        ${p.schematic ? renderSchematic(p.schematic) : ''}
        <div class="project-top-row">
          <span class="project-index">${esc(p.index)}</span>
          <h3 class="project-title">${esc(p.name)}</h3>
        </div>
        <div class="project-subtitle">${esc(p.subtitle)}</div>
        <p class="project-desc">${esc(p.summary)}</p>
        <div class="project-specs">
          <span class="project-specs-label">Implementation notes:</span>
          <ul>
            ${p.notes.map((n) => `<li>${esc(n)}</li>`).join('')}
          </ul>
        </div>
        <div class="project-tech-tags">
          ${p.stack.map((s) => `<span class="badge">${esc(s)}</span>`).join('')}
        </div>
        <div class="project-footer-actions">
          ${
            p.repo
              ? `<a class="project-icon-link" href="${esc(p.repo)}" target="_blank" rel="noopener">
                   ${icon('open_in_new')} View source
                 </a>`
              : `<span class="project-icon-link is-disabled" title="Not published as a public repository">
                   ${icon('lock')} Local project
                 </span>`
          }
        </div>
      </article>`
    )
    .join('');
}

/* -------------------------------------------------------- achievements --- */

function renderAchievements() {
  const el = mount('achievements-grid');
  if (!el) return;

  el.innerHTML = achievements
    .map(
      (a) => `
      <article class="achievement-card">
        <div class="achievement-head">
          ${icon(a.icon)}
          <span class="achievement-period">${esc(a.period)}</span>
        </div>
        <h3 class="achievement-title">${esc(a.title)}</h3>
        <p class="achievement-detail">${esc(a.detail)}</p>
        ${
          a.link
            ? `<a class="achievement-link" href="${esc(a.link)}" target="_blank" rel="noopener">
                 ${icon('open_in_new')} Verify
               </a>`
            : ''
        }
      </article>`
    )
    .join('');
}

/* ------------------------------------------------------ certifications --- */

function renderCertifications() {
  const el = mount('cert-grid');
  if (!el) return;

  el.innerHTML = certifications
    .map(
      (c) => `
      <article class="cert-card">
        <div class="cert-mark">${icon('verified')}</div>
        <div class="cert-info">
          <h3 class="cert-name">${esc(c.name)}</h3>
          <div class="cert-meta">
            <span class="cert-issuer">${esc(c.issuer)}</span>
            <span class="cert-year">${esc(c.year)}</span>
          </div>
        </div>
        ${
          c.link
            ? `<a class="cert-verify" href="${esc(c.link)}" target="_blank" rel="noopener">
                 ${icon('open_in_new')} Verify
               </a>`
            : ''
        }
      </article>`
    )
    .join('');
}

/* ---------------------------------------------------------- philosophy --- */

function renderPhilosophy() {
  const el = mount('philosophy-list');
  if (!el) return;

  el.innerHTML = philosophy
    .map(
      (p, i) => `
      <article class="philosophy-item">
        <div class="philosophy-index">${String(i + 1).padStart(2, '0')}</div>
        <div>
          <h3 class="philosophy-heading">${esc(p.heading)}</h3>
          <p class="philosophy-body">${esc(p.body)}</p>
        </div>
      </article>`
    )
    .join('');
}

/* -------------------------------------------------------------- infra ---- */

const LAYERS = [
  { id: 'delivery', label: 'delivery' },
  { id: 'network', label: 'network edge' },
  { id: 'compute', label: 'compute' },
  { id: 'data', label: 'data' },
  { id: 'observe', label: 'observability & security' }
];

function renderInfrastructure() {
  const el = mount('diagram-layers');
  const intro = mount('diagram-intro');
  if (intro) intro.textContent = infrastructure.intro;
  if (!el) return;

  el.innerHTML = LAYERS.map((layer, idx) => {
    const nodes = infrastructure.nodes.filter((n) => n.layer === layer.id);
    if (!nodes.length) return '';

    const connector =
      idx < LAYERS.length - 1
        ? `<div class="diag-connector" aria-hidden="true">${'│&nbsp;&nbsp;&nbsp;'.repeat(
            Math.min(nodes.length, 4)
          )}</div>`
        : '';

    return `
      <div class="diag-layer">
        <div class="diag-layer-label">${esc(layer.label)}</div>
        <div class="diag-layer-nodes">
          ${nodes
            .map(
              (n) => `
            <button class="diag-node" type="button" data-comp="${esc(n.id)}">
              <span class="diag-node-label">${esc(n.label)}</span>
            </button>`
            )
            .join('')}
        </div>
      </div>
      ${connector}`;
  }).join('');
}

/* ------------------------------------------------------------ contact ---- */

function renderContact() {
  const c = profile.contact;

  const channels = [
    { label: 'email', value: c.email, href: `mailto:${c.email}`, icon: 'mail', copy: c.email },
    { label: 'phone', value: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}`, icon: 'call', copy: c.phone },
    { label: 'github', value: c.githubHandle, href: c.github, icon: 'code', copy: c.github },
    { label: 'linkedin', value: c.linkedinHandle, href: c.linkedin, icon: 'link', copy: c.linkedin },
    { label: 'location', value: `${profile.location} (${profile.timezone})`, href: null, icon: 'location_on', copy: null }
  ];

  const el = mount('contact-channels');
  if (el) {
    el.innerHTML = channels
      .map(
        (ch) => `
        <div class="contact-channel-item">
          <div class="contact-channel-left">
            ${icon(ch.icon, 'contact-channel-icon')}
            <div class="contact-channel-info">
              <span class="contact-channel-lbl">${esc(ch.label)}</span>
              ${
                ch.href
                  ? `<a class="contact-channel-val" href="${esc(ch.href)}"${
                      ch.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''
                    }>${esc(ch.value)}</a>`
                  : `<span class="contact-channel-val">${esc(ch.value)}</span>`
              }
            </div>
          </div>
          ${
            ch.copy
              ? `<button class="icon-btn" type="button" data-copy-text="${esc(ch.copy)}" data-copy-label="${esc(
                  ch.label
                )}" title="Copy ${esc(ch.label)}">
                   ${icon('content_copy')}
                 </button>`
              : ''
          }
        </div>`
      )
      .join('');
  }

  // Anything that just needs the real value dropped in.
  document.querySelectorAll('[data-profile]').forEach((node) => {
    const key = node.getAttribute('data-profile');
    const map = {
      name: profile.name,
      title: profile.title,
      role: profile.role,
      employer: profile.employer,
      focus: profile.focus,
      location: profile.location,
      summary: profile.summary,
      email: c.email,
      phone: c.phone,
      github: c.github,
      linkedin: c.linkedin,
      portfolio: c.portfolio
    };
    if (map[key] == null) return;
    if (node.tagName === 'A') {
      node.setAttribute('href', map[key]);
      if (!node.textContent.trim()) node.textContent = map[key];
    } else {
      node.textContent = map[key];
    }
  });
}

/* --------------------------------------------------------------- init ---- */

/**
 * Each section is rendered independently. Without the guard, one renderer
 * throwing takes every section after it down with it and the page comes up
 * half-empty with nothing but a console message to explain why.
 */
export function renderAll() {
  const sections = [
    ['hero object', renderHeroObject],
    ['hero markers', renderHeroMarkers],
    ['timeline', renderTimeline],
    ['skills', renderSkills],
    ['projects', renderProjects],
    ['achievements', renderAchievements],
    ['certifications', renderCertifications],
    ['philosophy', renderPhilosophy],
    ['infrastructure', renderInfrastructure],
    ['contact', renderContact]
  ];

  for (const [name, render] of sections) {
    try {
      render();
    } catch (err) {
      console.error(`Could not render the ${name} section.`, err);
    }
  }
}
