# Deploying this site to GitHub Pages

The site is fully static and lives in this `site/` folder. Every path is
relative, so it works served from a domain root **or** a `/repo-name/` subpath.
A `.nojekyll` file is included so GitHub Pages serves the files as-is.

## Option A — publish the `site/` folder from `main`

1. Push this repository to a GitHub repo you own.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**,
   **Branch: `main`**, **Folder: `/docs`** — but Pages only allows `/` or
   `/docs`, so either rename `site/` to `docs/`, or use Option B.

## Option B — publish site files at the root of a `gh-pages` branch (recommended)

From the repo root, with a remote named `origin` already added:

```bash
# create an orphan branch whose root IS the site
git subtree split --prefix site -b gh-pages
git push origin gh-pages
```

Then **Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages` → `/ (root)`**.

Your site will be live at `https://<owner>.github.io/<repo>/` within a minute.

## Files

- `index.html` — the site
- `styles.css` — main stylesheet
- `script.js` — subscribe-form + smooth-scroll behavior
- `mobile.html` / `mobile.css` — iPhone-frame design-review showcase
- `assets/tgen-logo.jpg` — logo
- `.nojekyll` — tells Pages to skip Jekyll processing
