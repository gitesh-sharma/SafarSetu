# SafarSetu
*Har safar, live aur clear. / Every journey, live and clear.*
India public transport information on one bilingual (Hindi/English) map. **Accuracy first: no fabricated live data.**

## Status: Phase 1 (static MVP, DEMO data only)
Static site (no build step): Leaflet map, bilingual UI, search, data-status badges (LIVE/STALE/ESTIMATED/SCHEDULED/UNAVAILABLE/DEMO), `/data-sources/`, security headers (`_headers`), `providers/registry.json`.
Run locally: `npx serve .` then open http://localhost:3000. Deploy: Cloudflare Pages (output dir `/`, no build command).

## Roadmap
| Phase | Scope | Data status |
|---|---|---|
| 0 | Repo, i18n, provider registry | none |
| 1 | Static MVP, search, map, data-sources page (**done**) | DEMO |
| 2 | Workers API + D1 + caching, `/api/v1/*` read-only | SCHEDULED |
| 3 | First authorized live road feed, STALE logic, `/status/` | LIVE (one source) |
| 4 | Security hardening, monitoring, backups, tests | n/a |
| 5 | More providers; live trains only if authorized | LIVE where authorized |

## Decisions and cautions
- **Live trains:** no known free official API; Phase 1 trains are SCHEDULED/DEMO only. Do not scrape NTES.
- **Free tier:** verify current Cloudflare limits before Phase 2 (KV write quota is small; avoid per-update KV writes; prefer polling over SSE).
- **Map tiles:** OSM public tiles are not for heavy use; plan MapLibre + PMTiles on R2.
- **Borders:** use a compliant official boundary layer for India before public launch.
- **Privacy:** no accounts; vehicle identifiers may be personal data (DPDP Act 2023); define retention before road tracking.
- **Environments:** local (wrangler) + production; staging optional.
- Still to add: `/privacy/`, `/terms/`, `/status/`, `/trains/`, `/stations/` pages as data arrives.

Licence: see LICENSE. Map data © OpenStreetMap contributors; Leaflet (BSD-2).
