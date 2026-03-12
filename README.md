# APEX Tackle Static Site

Production-ready static ecommerce showcase site.

## Deploy quickly

### Vercel
1. Import this folder as a new Vercel project.
2. Framework preset: **Other**.
3. Build command: **(leave empty)**.
4. Output directory: **.**

`vercel.json` is already configured with static cache headers.

### Netlify
1. Add a new site from this folder/repo.
2. Build command: **(leave empty)**.
3. Publish directory: **.**

`netlify.toml` is already configured with static cache headers.

### GitHub Pages
1. Push the project to a GitHub repo.
2. In repo settings, enable **Pages** from the root branch.
3. Keep `.nojekyll` in place so Pages serves assets exactly as expected.

## Local preview

Run:

`python -m http.server 5050`

Then open: http://localhost:5050

## Included deployment files

- `vercel.json`
- `netlify.toml`
- `.nojekyll`
- `robots.txt`
- `404.html`
