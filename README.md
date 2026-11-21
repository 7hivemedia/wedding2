# Hariom weds Akansha – Wedding Invitation

A soft lavender watercolour, floral single-page wedding invitation built with Vite, React, TypeScript, CSS, and subtle Three.js depth.

## Customizing Content

All text, dates, family details, event schedules, venue notes, Google Maps URL, and WhatsApp blessings link are stored in one file:

```
src/config.js
```

Edit `src/config.js` to update timings or venue details once finalized.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The static production bundle is emitted to `dist/`.

## Deploying

### Netlify
1. Connect your repository in Netlify or drag-and-drop the `dist/` folder after running `npm run build`.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import the project in Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages
1. Set `base` in `vite.config.ts` if deploying to `https://<user>.github.io/<repo>/`.
2. Run `npm run build`.
3. Publish the `dist/` directory via GitHub Actions (`actions/deploy-pages`) or `gh-pages`.
