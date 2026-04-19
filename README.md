# Bitcoin Dev Journal

A polished static Next.js site for the **Bitcoin Dev Journal** concept, built for deployment to GitHub Pages at:

`https://j-kon.github.io/bitcoin-dev-journal/`

## Stack

- Next.js App Router
- Static export via `output: "export"`
- GitHub Pages deployment through GitHub Actions

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
http://localhost:3000/bitcoin-dev-journal/
```

## Production build

Build the static export:

```bash
npm run build
```

The exported static site is generated in `out/`.

## GitHub Pages deployment

This repo includes a GitHub Actions workflow that deploys the static export to GitHub Pages automatically on every push to `main`.

### One-time GitHub setup

1. Push this project to the `main` branch of `j-kon/bitcoin-dev-journal`.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.

### Deploy flow

After GitHub Pages is configured, every push to `main` will:

1. Install dependencies with `npm ci`
2. Build the site with `npm run build`
3. Upload the `out/` directory
4. Deploy it to GitHub Pages

Deploy with:

```bash
git add .
git commit -m "Deploy Bitcoin Dev Journal"
git push origin main
```

## Project notes

- The site is configured for the GitHub Pages subpath `/bitcoin-dev-journal/`
- `next.config.mjs` sets `basePath` and `assetPrefix` so assets and internal links resolve correctly
- `trailingSlash: true` helps static hosting behave consistently on GitHub Pages
