# Sujan Sapkota — Portfolio

A static portfolio for **Sujan Sapkota**, Computer Engineering graduate and Junior
Cloud & Infrastructure Engineer at Kontract IT Support.

React + Vite + Tailwind, no backend, no tracking. Everything on the page is
transcribed from `cv.txt` — if a claim is not on the CV, it is not on the site.
All content lives in one file, `src/data/portfolio.js`.

The visual design is monochrome and typographic: a paper ground ruled with
vertical hairlines, Space Grotesk for headings, Manrope for prose and IBM Plex
Mono for anything that has to line up in columns. Square one-pixel frames,
uppercase label caps at 0.18em tracking. Two things carry the interaction
language: a custom cursor that names whatever it is over, and cards that lift
on hover and cast a hard offset shadow.

---

## Running it

```bash
npm install       # first time only
npm run dev       # http://localhost:5173
```

Other commands (also available through `make`):

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Vite dev server on :5173                          |
| `npm run build`   | Static build into `dist/` (plus a `404.html`)     |
| `npm run preview` | Serve the built site on :4173                     |
| `npm test`        | Vitest suite                                      |
| `npm run lint`    | ESLint, zero warnings tolerated                   |
| `make serve`      | Build and serve `dist/` in Nginx on :8080         |

---

## Editing the content

`src/data/portfolio.js` is the single source of truth:

- `profile` — name, title, tagline, bio, contact details, `skills`,
  `experience`, `education`, `certifications`, `achievements`.
- `projects` — one entry per case study. `order` sets the sequence on
  `/projects`; `is_featured` puts a project in the Home page grid; the detail
  page renders `problem`, `solution`, `challenges`, `learnings`.

`experience` and `education` render newest first, and `end_date: null` shows as
**Now**. Skills are grouped on the About page by their `category`, so adding a
new category is just a matter of using a new string.

Static files in `public/` are copied to the site root as-is: `resume.pdf`
(linked from the Home page), `favicon.svg`, `CNAME`, `robots.txt`, and
`sitemap.xml` — add any new project slug to the sitemap.

---

## Deployment

`.github/workflows/deploy.yml` lints, tests, builds, and publishes `dist/` to
GitHub Pages on every push to `main`. For it to take over, the repository's
**Settings → Pages → Source** must be set to **GitHub Actions** (this repo
previously served the branch root directly).

The custom domain `portfolio.sujansapkota07.com.np` comes from `public/CNAME`,
which the build copies into `dist/`. The site is a single-page app, so the build
also writes `dist/404.html` — that is what makes a deep link such as
`/projects/nepashray` work on Pages.
