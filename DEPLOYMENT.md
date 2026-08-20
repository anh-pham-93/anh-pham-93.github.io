# Deployment to a personal GitHub account

## Recommended setup

This site is deployed from the personal GitHub Pages repository:

```text
anh-pham-93/anh-pham-93.github.io
```

Its live address is:

```text
https://anh-pham-93.github.io/
```

The build script recognises this as a user site and publishes every route from the domain root. The pre-redesign version is preserved on the backup branch `backup/site-before-redesign-2026-08-20`.

## Work locally with GitHub Desktop

1. Open GitHub Desktop.
2. Choose **File -> Clone repository**.
3. Select `anh-pham-93/anh-pham-93.github.io`.
4. Choose a local folder and clone it.
5. Edit content in `src/`, preview with `npm run dev`, then commit and push from GitHub Desktop.
6. Every push to `main` triggers the included GitHub Pages deployment workflow.

## Work locally with Terminal

```bash
git clone https://github.com/anh-pham-93/anh-pham-93.github.io.git
cd anh-pham-93.github.io
npm run dev
```

After editing, build and publish with:

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push
```

## Every future update

After editing content:

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push
```

The GitHub Action redeploys the site automatically. GitHub rebuilds from `src/` on every push. Keeping `dist/` in the repository is optional; the workflow always regenerates it before deployment.

## Custom domain

A domain is optional. The GitHub URL works without one.

For a custom domain:

1. Buy or use a domain you own.
2. In the repository, go to **Settings -> Pages** and add the custom domain before changing DNS.
3. In **Settings -> Secrets and variables -> Actions -> Variables**, create a repository variable named `SITE_URL` with the full URL, for example:

```text
https://anhpham.me
```

4. Configure the DNS records required by GitHub at your domain registrar.
5. Push any small change or manually run the deployment workflow again.
6. Enable **Enforce HTTPS** when GitHub makes the option available.

Do not copy DNS IP addresses from old blog posts. Use the values shown in current GitHub Pages documentation or in the repository settings.

## Deployment troubleshooting

### The page is unstyled

Confirm the latest GitHub Action completed successfully. Do not open a generated HTML file directly from Finder; use the GitHub Pages URL or `npm run dev`.

### Links include the wrong repository path

For a default GitHub Pages address, no configuration is needed. For a custom domain, ensure the `SITE_URL` repository variable is set and run the workflow again.

### The action does not run

Check that:

- The default branch is named `main`.
- GitHub Pages uses **GitHub Actions** as its source.
- Actions are enabled for the repository.
- `.github/workflows/deploy.yml` exists on `main`.

### A build fails after editing content

Open the failed action, expand the `Build site` step and read the first error. The most common issue is malformed front matter in a Markdown file, such as a missing colon or closing `---` line.
