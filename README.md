# Portfolio — static site

This repository is a single-page static portfolio (no npm required). It ships as plain HTML/CSS/JS and is ready for any static host (GitHub Pages, Netlify, S3).

Summary
- Single-page app with: Hero, Projects (data-driven), About, CV download, Contact form (mailto fallback), accessible modal, theme toggle.
- No build step required: `styles/main.css` is included. `styles/main.scss` is provided for convenience if you want to edit using Sass locally.

Included files
- `index.html` — main single-page site
- `styles/main.scss` — SCSS source (optional)
- `styles/main.css` — compiled CSS (used by the site)
- `scripts/projects-data.js` — array of sample projects (edit to add your projects)
- `scripts/main.js` — interactivity: render projects, filters, modal gallery, theme toggle, contact form mailto
- `assets/` — images, `cv/sujan-cv.pdf` (placeholder), `favicon/`

Preview locally
1. Open `index.html` in a browser or run a local static server:

```bash
# from the project root
python3 -m http.server 8000
# open http://localhost:8000
```

Editing projects
- Edit `scripts/projects-data.js`. Each project object supports these fields:
	- id (string)
	- title (string)
	- short (string) — shown on cards
	- long (string) — detailed description in modal
	- images (array of image paths) — modal gallery uses these
	- tech (array) — tech stack
	- tags (array) — used for filter buttons
	- live / repo (URLs)

Design & styles
- Change the accent color in `styles/main.scss` (`$accent`) — `styles/main.css` is precompiled but you can recompile the SCSS locally if you prefer.

Accessibility & SEO
- Skip link included (`.skip-link`) for keyboard users.
- Semantic HTML and ARIA attributes are used for navigation and the modal.
- Add a real Open Graph image by replacing `assets/images/og.svg` and updating the `og:image` meta in `index.html`.

Deployment
- This repo includes a GitHub Actions workflow that will publish the contents of the repository to GitHub Pages automatically when you push to `main`.

Automatic (one-click) deploy via GitHub Actions

1. Create a new repository on GitHub and push this project to the `main` branch.
2. Make sure GitHub Pages is enabled in repository Settings > Pages. (When using the new Pages workflow, GitHub will pick up the uploaded artifact automatically; you may need to set the Pages source to "GitHub Actions" or follow the prompt in the Pages UI.)
3. The included workflow at `.github/workflows/deploy.yml` runs on every push to `main` and uploads the site artifact for deployment.

Manual deploy (alternative)

If you prefer to deploy manually or to a different host (Netlify, Vercel), simply upload the repository contents (or point the host to the repo). For a quick local preview, use the built-in Python HTTP server as shown above.

Maintenance notes
- Replace the placeholder PDF at `assets/cv/sujan-cv.pdf` with your real CV.
- Add better images into `assets/images/` and update `projects-data.js` to point to them.
 
Notes about content updates
- To change the avatar image, replace `assets/images/avatar.svg` with your own image (SVG or PNG). The header keeps its shape when you replace it.
- To change the hero copy and taglines, update `index.html` and `scripts/main.js` (the rotating taglines array in the IIFE near the bottom).
- To add or edit projects, update `scripts/projects-data.js`. Each project supports `images[]`, `tags[]`, `tech[]`, and descriptive fields.

Contributing
- See `CONTRIBUTING.md` for a small guideline on making edits.

Contact
- The contact form triggers a `mailto:` action by default. If you want a real form endpoint later, I can wire up a serverless form handler.
