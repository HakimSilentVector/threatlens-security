// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Canonical production URL. Used for sitemap, canonical links, and
  // absolute URL generation. MUST match the live domain.
  site: 'https://threatlenssec.com',

  // Pure static output — no server runtime = minimal attack surface.
  output: 'static',

  build: {
    // Force ALL CSS into external stylesheet files instead of inlining
    // small ones into <style> tags. This is deliberate and load-bearing:
    // inline <style> blocks would require `style-src 'unsafe-inline'` in
    // the CSP, which tanks the Mozilla Observatory score. External-only
    // CSS lets us run `style-src 'self'` — no unsafe directives anywhere.
    inlineStylesheets: 'never',
  },
});
