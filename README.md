# electerm-files

Static website served from Cloudflare R2 bucket "public".

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

Push to `main` branch to auto-deploy via GitHub Actions.

or manually:

```bash
npm run deploy
```

## Environment Variables

Required secrets for GitHub Actions:
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers edit permission
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID

## Features

- Serves static files from R2 bucket "public"
- Auto directory indexing
- MIME type detection
- Smart caching (immutable for hashed files)
- CORS enabled