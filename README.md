# Anh Pham personal website

A maintainable, multi-page version of the approved portfolio design.

The site is deliberately simple:

- Static HTML, CSS, JavaScript and images.
- Content lives in Markdown and JSON files.
- No CMS, database, subscription or third-party build dependency.
- GitHub Actions builds and deploys the site to GitHub Pages whenever `main` changes.
- The generated website is written to `dist/`.

## Quick start

You need Node.js 22 or newer. Node 24 is specified in `.nvmrc`.

```bash
npm run dev
```

Open `http://localhost:4173`.

The development server rebuilds after changes in `src/`. If file watching is unavailable on your system, stop and restart the command.

## Build once

```bash
npm run build
```

Open `dist/index.html` through a local web server, or run `npm run dev`.

## Common content commands

```bash
npm run new:writing -- "My article title"
npm run new:case -- "My case study title"
npm run new:hobby -- "Photography"
npm run new:page -- "Speaking"
```

New files begin with `published: false`. Change that to `published: true` when the page is ready.

## Documentation

- `DEPLOYMENT.md` - publish through a personal GitHub account and optionally connect a custom domain.
- `MAINTENANCE.md` - edit personal details, work, writing, hobbies, images and styles.
- `CLAUDE.md` - project rules for Claude Code or another AI coding assistant.

## Important launch checks

1. Add a real support URL to `coffeeUrl` in `src/site.json`, or remove the coffee link.
2. Update the Contact Energy status after the first day in the role.
3. Review every Lumin case study for confidential information and measurement accuracy.
4. Do not upload the original resume PDF publicly; it includes a phone number and residential area.


## Live site

The production site is deployed from this repository at `https://anh-pham-93.github.io/`. The previous design is preserved on `backup/site-before-redesign-2026-08-20`.
