# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Node Version Requirement

The system default Node (v17) is too old. Node 20 is required (Next.js 14 needs >=18.17.0).

```bash
# Run dev server
export PATH="/usr/local/opt/node@20/bin:$PATH" && npm run dev

# Or use the helper script
./dev.sh

# Build
export PATH="/usr/local/opt/node@20/bin:$PATH" && npm run build

# Lint
export PATH="/usr/local/opt/node@20/bin:$PATH" && npm run lint
```

## Environment Variables

Create `.env.local` with:
```
RESEND_API_KEY=...
TO_EMAIL=naman26g@gmail.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
WEDDING_UPLOAD_CODE=...   # passcode guests use to unlock photo uploads
```

## Architecture

This is a single-page wedding website (Next.js 14 App Router) with one additional route for a shared guest photo gallery.

**Pages:**
- `/` — Main page (`app/page.tsx`) assembles all section components in order: Hero → Countdown → Schedule → Venue → Gallery → RSVP → Footer
- `/shared-gallery` — Standalone page for guests to view and upload photos (`app/shared-gallery/page.tsx` + `components/SharedGallery.tsx` + `components/PhotoUpload.tsx`)

**API Routes:**
- `POST /api/rsvp` — Sends RSVP confirmation email via Resend
- `GET /api/gallery` — Fetches curated photos from Cloudinary (`asset_folder:wedding-gallery`)
- `GET /api/shared-gallery` — Fetches guest-uploaded photos from Cloudinary (`asset_folder:wedding-shared`), revalidates every 60s
- `POST /api/verify-code` — Validates the `WEDDING_UPLOAD_CODE` before allowing uploads

**Cloudinary folders:**
- `wedding-gallery` — Curated photos managed by the couple, shown on the main page
- `wedding-shared` — Guest-uploaded photos, shown on `/shared-gallery`

## Design System

Colors (Tailwind custom tokens): `ivory` (#FDF6F0), `blush` (#E8B4B8), `gold` (#C9A84C), `charcoal` (#3D3D3D)

Fonts (Tailwind custom tokens): `font-script` (Great Vibes), `font-serif` (Playfair Display), `font-sans` (Lato)

Reusable CSS classes in `app/globals.css`: `.section-title`, `.section-subtitle`, `.ornament-divider`

## Config Notes

- Config file is `next.config.mjs` (not `.ts`) — Next.js 14 does not support `next.config.ts`
- Remote image domains whitelisted: `images.unsplash.com`, `res.cloudinary.com`
