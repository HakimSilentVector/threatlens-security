# Threatlens Security — Portfolio Site

Personal cybersecurity portfolio for **Mahfut Abdi** (`ZeroDayHakim`).
Live at [threatlenssec.com](https://threatlenssec.com).

The site is both a credibility hub (routing recruiters and SOC hiring managers
to repos and writeups) **and a security artifact in its own right** — hardened
HTTP response headers, a strict Content-Security-Policy with no `unsafe-*`
directives, HSTS preload, and a documented rationale for every choice.

## Stack

- **[Astro](https://astro.build)** — static-site generator. Pure static output
  (`output: 'static'`) means no server runtime and minimal attack surface.
- **Cloudflare Pages** — hosting + edge. Reads `public/_headers` to apply the
  security headers at the edge.
- **No WordPress, no CMS, no client-side JS framework** — deliberate, to keep
  the attack surface as small as possible.

## Security posture

| Control | Where | Target |
| --- | --- | --- |
| Content-Security-Policy (`default-src 'none'`, no `unsafe-*`) | `public/_headers` | Blocks XSS injection vectors |
| HSTS (2yr, includeSubDomains, preload) | `public/_headers` | Forces HTTPS |
| `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` | `public/_headers` | Anti-sniffing / clickjacking / referrer leak |
| `Permissions-Policy` (all features denied) | `public/_headers` | No camera/mic/geo/etc. |
| Cross-Origin isolation (COOP/CORP) | `public/_headers` | Cross-origin leak defense |
| SPF / DKIM / DMARC | DNS (not in repo) | Email spoofing defense |

Verification targets: **A+** on [securityheaders.com](https://securityheaders.com)
and [Mozilla HTTP Observatory](https://observatory.mozilla.org), **Lighthouse ≥ 95**
across the board.

> The full rationale lives in the forthcoming **Hardening Notes** writeup.

## Local development

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build into ./dist
npm run preview    # serve the production build locally
```

## Project structure

```
threatlens-security/
├── public/              # copied verbatim to the deploy root
│   ├── _headers         # ← Cloudflare security headers (the hardening core)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── layouts/Base.astro   # HTML shell: meta, nav, footer (no inline JS/CSS)
│   ├── pages/index.astro    # homepage
│   └── styles/global.css    # all styles (external — keeps CSP strict)
├── astro.config.mjs     # inlineStylesheets:'never' so CSP needs no unsafe-inline
├── .gitattributes       # LF line-ending normalization (Windows CRLF fix)
└── .gitignore           # blocks .env / keys — this repo is public
```

## Deploy

Deployed via Cloudflare Pages connected to this GitHub repo. Pushes to `main`
trigger a build (`npm run build`) and publish `./dist`. Secrets (if any) live in
the Cloudflare dashboard — never in this repository.
