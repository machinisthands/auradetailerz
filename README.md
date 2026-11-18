# Aura Detailerz

Website for **Aura Detailerz** — car & bike detailing studio at Pukayilathoppu, Korani, Thiruvananthapuram.

Live: https://machinisthands.github.io/auradetailerz/

## Structure (HTML5 Boilerplate layout)

```
.
├── index.html          # Main page
├── 404.html            # Custom "page not found" (served automatically by GitHub Pages)
├── css/style.css       # All styles
├── js/app.js           # All behaviour (menu, booking form → WhatsApp, reels, lightbox)
├── img/                # Photos (WebP + 400px variants) and logo
├── video/              # Hero montage and reels (H.264 MP4)
├── fonts/              # Self-hosted fonts (SIL OFL, see fonts/LICENSE.txt)
├── favicon.ico, icon.svg, icon.png, icon-512.png
├── site.webmanifest
├── robots.txt, sitemap.xml
└── .editorconfig, .gitattributes, .gitignore
```

## Notes

- No build step: plain HTML/CSS/JS, deploys directly on GitHub Pages.
- A strict Content-Security-Policy is set in `index.html`; keep CSS in `css/` and JS in `js/` (inline `<style>`, `<script>` or `style=""` will be blocked).
- Structured data (LocalBusiness + FAQ) is in the JSON-LD block in `index.html` — keep the FAQ text there in sync with the FAQ section.
- Update `sitemap.xml` `<lastmod>` when the content changes.
- On a GitHub *project* page (`/auradetailerz/`) search engines only read `robots.txt` from the domain root, so submit `sitemap.xml` in Google Search Console. Both files take full effect if the site moves to its own domain.
