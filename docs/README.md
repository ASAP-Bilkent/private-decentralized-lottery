# Private Decentralized Lottery - Documentation Site

This is the GitHub Pages documentation site for the Private Decentralized Lottery project.

## Development

```bash
# Install dependencies
npm i

# Run development server
npm run dev

# Build for production
npm run build

# Export static files for GitHub Pages
npm run export
```

The static files will be generated in the `out` directory after running `npm run build`.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The site is automatically deployed to GitHub Pages using GitHub Actions whenever you push changes to the `main` branch that affect the `docs/` directory.

**Setup Steps:**

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push your changes:**
   - The workflow (`.github/workflows/deploy-docs.yml`) will automatically:
     - Build the Next.js site
     - Deploy it to GitHub Pages
   - Your site will be available at: `https://[username].github.io/private-decentralized-lottery/`

3. **Manual trigger (optional):**
   - You can also manually trigger the deployment by going to **Actions** → **Deploy Docs to GitHub Pages** → **Run workflow**

### Manual Deployment

If you prefer to deploy manually:

1. Build the static site:
   ```bash
   npm run build
   ```

2. The `out` directory contains the static files ready for GitHub Pages.

3. Push the `out` directory contents to the `gh-pages` branch or configure GitHub Pages to serve from a specific branch.

## Configuration

- The site is configured for static export in `next.config.mjs`
- The `basePath` is set to `/private-decentralized-lottery` for GitHub Pages subdirectory deployment
- If deploying to a user/organization page (e.g., `username.github.io`), change `basePath` to `''` in `next.config.mjs` and update the workflow
- The `.nojekyll` file is automatically created during build to ensure GitHub Pages doesn't process the files with Jekyll

