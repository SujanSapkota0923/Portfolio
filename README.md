# Sujan Sapkota — Portfolio Console

A static portfolio for **Sujan Sapkota**, Computer Engineering graduate and Cloud &
Infrastructure Engineer at Kontract IT Support.

Console/terminal visual language, no build step, no backend, no tracking.
Everything on the page is transcribed from `cv.txt` — if a claim is not on the CV,
it is not on the site.

The visual design is the one from `../portfoli.html`: JetBrains Mono throughout,
square one-pixel frames, uppercase label caps at 0.1em tracking, a single accent
hue, HTTP-verb navigation, and section headings written as shell commands.

---

## Running it

There is no bundler and no dependency install. The site uses ES modules, so it
needs to be served over HTTP rather than opened as a `file://` URL:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Any static host works for deployment (GitHub Pages, Netlify, Cloudflare Pages,
S3 + CloudFront). Push the directory as-is.

Two things load from a CDN: Tailwind (utility classes for the page shell) and
the two Google fonts. Everything else is in this directory.

---

## Editing content

**All content lives in one file: [`js/data/profile.js`](js/data/profile.js).**

`index.html` holds only the page shell and the mount points; `js/render.js` builds
every section from that data. Adding a job, a project, or a life event is a data
edit — you should not need to touch markup.

| Export | Feeds |
|---|---|
| `profile` | name, role, summary, contact details |
| `heroObject` | the `engineer` object printed in the hero |
| `heroMarkers` | the three-cell strip under the hero |
| `timeline` | the merged education / work / achievement log |
| `skills` | the ten skill groups |
| `projects` | project cards, including each card's `schematic` |
| `certifications` | certification list |
| `achievements` | achievements section |
| `infrastructure` | diagram nodes and the inspector copy |
| `philosophy` | the About section prose |

`icon` fields hold [Material Symbols](https://fonts.google.com/icons) ligature
names (`dns`, `security`, `emoji_events`), not markup.

Each project carries a `schematic`: an array of monospace lines drawn from that
project's own CV bullets, rendered in the framed box where the original design
put a screenshot. Wrap a fragment in `[[double brackets]]` to paint it in the
accent colour. There is no honest screenshot of any of these projects, so the
drawing stands in for one.

Timeline entries marked `undated: true` are real but carry only a duration on the
CV. They render with the duration in place of a date rather than with a guessed
one — add `period`/`stamp` dates and drop the flag once the real months are known.

### After editing the CV

`assets/docs/resume.txt` is served to the terminal's `cat resume.txt`, and
`assets/docs/resume.pdf` is the download. Regenerate the PDF with:

```bash
python3 tools/build_resume_pdf.py
```

That script holds the resume content and writes the PDF directly using the
base-14 fonts (no LaTeX required, ~6KB output, two A4 pages). Keep it, `resume.txt`,
`cv.txt`, and `js/data/profile.js` in step when facts change.

---

## Features

| Feature | Keys / entry point |
|---|---|
| Command palette | `Ctrl+K` / `Cmd+K`, or the search button |
| CLI overlay | backtick `` ` ``, the terminal button, or the palette |
| Accent themes | header dropdown, palette, or `theme aws\|azure\|gcp\|default` in the CLI |
| Light / dark mode | header toggle; follows `prefers-color-scheme` on first visit |
| Life timeline | three zoom levels; click an entry to expand its detail |
| Infrastructure diagram | click any node to read what it does and why |
| Telemetry dock | real session uptime, page load time, Nepal time, active accent |
| 3D card tilt | hover the hero card and project cards |
| Boot screen | any key or click skips it |

CLI commands: `help`, `whoami`, `cat resume.txt`, `ls`, `cd <section>`, `stack`,
`skills`, `projects`, `contact`, `status`, `theme`, `ping`, `date`, `history`,
`echo`, `clear`, `exit`. Tab completes; ↑/↓ walks history.

`status` and `ping` report real measurements (navigation timing, and four
cache-busted same-origin requests) rather than invented figures.

---

## Contact forms

There is no server, so both the guestbook and the contact form compose a
`mailto:` to the real address with the fields pre-filled and hand it to the
visitor's mail client. Nothing is stored, nothing is transmitted anywhere else,
and no submission is simulated.

---

## Structure

```
index.html                page shell and mount points, styled with Tailwind
css/
  tokens.css              every colour, once, as custom properties + base layer
  themes.css              light mode + 4 accent themes, token redefinition only
  components.css          the data-driven components and their state styling
  console.css             boot screen, CLI overlay, command palette, toasts
  animations.css          the three keyframes the design actually uses
  responsive.css          console-chrome breakpoints, reduced motion, print
js/
  app.js                  bootstrap: render, then attach subsystems
  render.js               builds every section from the data layer
  data/profile.js         all content
  themes.js               data-theme / data-mode, persisted
  timeline.js             zoom levels and entry expansion
  terminal.js             CLI command parser
  command-palette.js      Ctrl+K
  guestbook.js            mailto compose
  status.js               telemetry dock
  animations.js           tilt + diagram inspector
  utils.js                toasts, clipboard, mailto helper
assets/
  docs/resume.txt         plain-text CV (served to the terminal)
  docs/resume.pdf         generated by tools/build_resume_pdf.py
  icons/favicon.svg
tools/
  build_resume_pdf.py     PDF generator
cv.txt                    LaTeX CV — the upstream source for all content
```

### Where styling lives

The page shell in `index.html` is styled with Tailwind utility classes, as the
original design was. `css/components.css` covers the pieces `js/render.js` builds
from data and the pieces that carry state — `.active`, `.expanded`, the timeline
zoom levels — which a utility class in markup cannot express. Nothing dynamic
depends on Tailwind generating a class for markup it never saw.

## Theming

No rule anywhere hardcodes a colour. `tailwind.config` in `index.html` maps its
whole palette onto the custom properties declared in `css/tokens.css`, so a
utility like `border-outline` emits `border-color: var(--outline)`.

`css/themes.css` is therefore nothing but token redefinitions:

- `data-theme="default|aws|azure|gcp"` swaps the single accent hue. The greys
  never move, so each theme is recognisably the same site. Each accent carries a
  darker variant for light mode, where the bright console green would not hold
  contrast on a pale ground.
- `data-mode="dark|light"` swaps the surface and text palette.

Both persist to `localStorage`, and a small inline script in `<head>` applies the
stored choice before the first paint so the page never flashes the wrong mode.
Tailwind runs in `darkMode: "class"`, and `js/themes.js` keeps the `dark` class on
`<html>` in step with `data-mode` — but colour comes from the tokens, not the
variant.

## Accessibility notes

- `prefers-reduced-motion: reduce` suppresses transitions, the beacon pulse, the
  caret blink, and the card tilt (in CSS and in the tilt handler itself).
- Diagram nodes are real `<button>` elements, so the diagram is keyboard-operable.
- Focus is visible throughout via `:focus-visible`.
- The Material Symbols stylesheet is requested with `display=block`. With `swap`
  the browser paints the ligature *name* — "terminal", "cloud" — as literal text
  wherever a glyph belongs, until the font arrives.
- Printing the page drops the chrome and expands the timeline, so it produces the
  CV rather than a screenshot of a terminal.

---

**Sujan Sapkota** · Chitwan, Nepal ·
[sujansapkota0923@gmail.com](mailto:sujansapkota0923@gmail.com) ·
[GitHub](https://github.com/SujanSapkota0923) ·
[LinkedIn](https://www.linkedin.com/in/sujan-sapkota-a254a6215/)
