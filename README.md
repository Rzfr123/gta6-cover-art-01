# Vice Coast Cover Studio

[![make.fun bounty](https://img.shields.io/badge/make.fun-gta6--cover--art--01-ff2e88)](https://make.fun/c/gta6-cover-art-01)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Your photos become GTA-style cover art: a multi-panel cast grid with
role tags, a striped chrome title, a neon script subtitle, a press
quote, a billing block and a gold seal — graded in a Vice City sunset
and exported as a PNG to share.

Built for the [make.fun GTA 6 Cover Art bounty](https://make.fun/c/gta6-cover-art-01) ($250).

## Use it

```sh
node serve.ts
# open http://localhost:8080
```

1. Load your photos (or use the four free sample photos).
2. Type a title, subtitle and tagline.
3. Pick one of 6 layouts, one of 5 grades and a size.
4. Click a panel to crop it: drag the photo, zoom, change its role tag.
5. Export PNG in 1080×1080, 1080×1350 or 1920×1080 — or all three.

## Notes

- Offline static app: no build step, no network request, photos never
  leave your machine. Fonts are Anton and Pacifico (SIL Open Font
  License) under `app/fonts/`. All art and lettering is original —
  no Rockstar Games logo, artwork or font.
- `main.ts` (Node 22, stdlib only) hands the app in for the bounty.
