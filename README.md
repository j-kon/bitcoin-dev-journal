# Bitcoin Dev Journal

A dark, animated Next.js product demo for the **Bitcoin Dev Journal** concept, built to deploy cleanly to both GitHub Pages and Vercel.

GitHub Pages target:

`https://j-kon.github.io/bitcoin-dev-journal/`

## Stack

- Next.js App Router
- Framer Motion for animation
- Static export via `output: "export"`
- Build-time GitHub data fetching with safe fallback data
- GitHub Pages deployment through GitHub Actions

## What this demo includes

- Dark product-grade UI with motion-driven reveals, counters, and activity transitions
- A GitHub-powered proof-of-work section for tracked repos
- A typed journal-entry layer for learning notes, reviews, reflections, and next steps
- Featured repository cards driven by build-time data
- A dynamic public profile mockup that mixes narrative framing with live GitHub signals
- Static export compatibility for GitHub Pages under `/bitcoin-dev-journal/`
- Clean root-path deployment support for Vercel

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the site at:

```text
http://localhost:3000/
```

## Production build

Build the default export for Vercel or any root-path static host:

```bash
npm run build
```

Build the GitHub Pages version with the repo subpath:

```bash
npm run build:pages
```

The exported static site is generated in `out/`.

## GitHub data setup

The site fetches GitHub data at build time. No token is exposed to the client bundle.

### Supported repositories

- `bitcoindevkit/bdk-dart`
- `bitcoindevkit/bdk-ffi`
- `j-kon/root_wallet`

The tracked repositories are defined in [lib/github-data.ts](/Users/jaydroid/Projects/bitcoin-dev-journal/lib/github-data.ts) so you can add more later with minimal changes.

The human journal layer lives in [data/journal-entries.ts](/Users/jaydroid/Projects/bitcoin-dev-journal/data/journal-entries.ts). That file is where you add reflections, learning notes, review writeups, and next-step context that GitHub activity alone cannot express.

### Optional local environment variables

If you want higher GitHub API rate limits or access to data that benefits from authenticated requests, create a local `.env.local` with:

```bash
GITHUB_TOKEN=your_github_token
GITHUB_LOGIN=j-kon
```

Notes:

- `GITHUB_TOKEN` is optional for local builds
- if no token is present, or GitHub data cannot be fetched, the site falls back to a built-in demo snapshot
- the fallback keeps the static export working so GitHub Pages deployment never depends on a runtime backend

### How build-time fetching works

- the home page runs a server-side build step through [lib/github-data.ts](/Users/jaydroid/Projects/bitcoin-dev-journal/lib/github-data.ts)
- GitHub repo, pull request, issue, and commit data is fetched during `next build`
- the page is statically rendered into `out/`
- on GitHub Pages, users only receive plain static HTML, CSS, and JS
- no GitHub secret is shipped to the browser

## Local URLs

During development, Next runs on:

```text
http://localhost:3000
```

## GitHub Pages deployment

This repo includes a GitHub Actions workflow that deploys the static export to GitHub Pages automatically on every push to `main`.

### One-time GitHub setup

1. Push this project to the `main` branch of `j-kon/bitcoin-dev-journal`.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.

### Deploy flow

After GitHub Pages is configured, every push to `main` will:

1. Install dependencies with `npm ci`
2. Build the site with `npm run build:pages`
3. Fetch GitHub data during the build using the GitHub Actions token
4. Upload the `out/` directory
5. Deploy it to GitHub Pages

Deploy with:

```bash
git add .
git commit -m "Deploy Bitcoin Dev Journal"
git push origin main
```

## Vercel deployment

This project now supports Vercel without the GitHub Pages subpath.

### Quick deploy

```bash
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

### Recommended Vercel environment variables

Set these in the Vercel project if you want authenticated GitHub build-time fetches:

```bash
GITHUB_TOKEN=your_github_token
GITHUB_LOGIN=j-kon
```

### Vercel build behavior

- Vercel uses `npm run build`
- `DEPLOY_TARGET` is not required for Vercel
- the app deploys at the root path, not `/bitcoin-dev-journal/`

## Project notes

- `next.config.mjs` switches behavior based on `DEPLOY_TARGET`
- GitHub Pages uses `DEPLOY_TARGET=github-pages`
- Vercel and local development use the root path by default
- `trailingSlash: true` helps static hosting behave consistently on GitHub Pages
- the GitHub Pages workflow passes `GITHUB_TOKEN` and `GITHUB_LOGIN` into the build step
- if a tracked repo is unavailable or private, the UI still renders with fallback content instead of failing the build
