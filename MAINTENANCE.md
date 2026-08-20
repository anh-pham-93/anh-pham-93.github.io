# Maintaining the website

The editable source is inside `src/`. Do not hand-edit files in `dist/`; the next build replaces them.

## The main files

| What you want to change | File or folder |
|---|---|
| Name, email, LinkedIn, current role, coffee URL | `src/site.json` |
| Career timeline | `src/data/experience.json` |
| Selected work and case studies | `src/content/work/` |
| Blog posts | `src/content/writing/` |
| Hobbies and hobby detail pages | `src/content/hobbies/` |
| Other standalone pages | `src/content/pages/` |
| About hero photo | `src/assets/about-hero.webp` |
| Visual design | `src/assets/styles.css` |
| Shared interactions | `src/assets/site.js` |
| About parallax motion | `src/assets/about.js` |

## Update personal details

Edit `src/site.json`.

The two fields that need attention first are:

```json
"coffeeUrl": ""
```

Replace the empty value with the full Buy Me a Coffee, Ko-fi or other support URL. When it is empty, the site displays an explanatory dialog instead of leaving a dead link.

After starting at Contact Energy, change:

```json
"statusLabel": "Next",
"status": "Starting late August 2026"
```

to wording such as:

```json
"statusLabel": "Current",
"status": "Since August 2026"
```

## Add a writing post

Run:

```bash
npm run new:writing -- "The title of the post"
```

A new Markdown file appears in `src/content/writing/`.

Edit its front matter:

```text
---
title: The title of the post
slug: the-title-of-the-post
description: One sentence that helps someone decide whether to read it.
date: 2026-09-12
displayDate: 12 September 2026
language: English
order: 1
published: false
---
```

Write below the second `---` line. The renderer supports:

- `##` and `###` headings.
- Paragraphs.
- Bulleted and numbered lists.
- `**bold**` and `*italic*`.
- Links in Markdown format.
- Blockquotes beginning with `>`.

Set `published: true` when ready. The Writing index and article page are generated automatically.

## Add or edit a case study

Run:

```bash
npm run new:case -- "Case study title"
```

The generated file lives in `src/content/work/`. Its front matter controls the Work-page row and the case-study header.

Use this narrative order where it fits:

1. Context.
2. Problem and evidence.
3. Constraints.
4. Options and trade-offs.
5. Decision and execution.
6. Outcome.
7. Reflection.

For Lumin work, keep `published: false` until the text has been reviewed for confidentiality, customer identification, roadmap exposure and metric accuracy.

## Add a new hobby

Run:

```bash
npm run new:hobby -- "Photography"
```

The hobby mosaic reads every published file in `src/content/hobbies/`.

The `size` field controls the layout:

```text
size: feature
size: wide
size: standard
size: small
```

Only one item should normally use `feature`. The `order` field controls placement. New hobbies can be added without changing the grid code.

The `theme` field can be:

```text
theme: featured
theme: paper
```

## Create a standalone page

Run:

```bash
npm run new:page -- "Speaking"
```

This creates `src/content/pages/speaking.md`. Set `published: true` when it is ready, and the build generates `/speaking/`.

Standalone pages do not enter the main navigation automatically. That is deliberate: the five-item navigation should remain stable. To add one permanently, update the `header()` function in `scripts/build.mjs`.

Avoid the reserved slugs `work`, `writing`, `hobbies`, and `contact`. The build stops with an error if a new page conflicts with an existing route.

## Add images to an article or page

Place the image in `src/assets/`, for example `src/assets/book-cover.jpg`, then use:

```markdown
![Book cover](/assets/book-cover.jpg)
```

The build converts the path correctly for both a normal domain and a GitHub Pages project URL.

## Replace the About photograph

Replace `src/assets/about-hero.webp` with another landscape image using the same filename. A wide image works best. The black-and-white treatment is applied in CSS, so the source photo can remain in colour.

After replacement, check both desktop and mobile crops. Adjust `.parallax-media img` and its `object-position` in `src/assets/styles.css` only when necessary.

## Change colors or typography

The core design tokens are at the top of `src/assets/styles.css`:

```css
--paper
--paper-bright
--ink
--muted
--accent
--green
--serif
--sans
```

Change tokens rather than searching and replacing colors throughout the file.

## Preview before publishing

```bash
npm run dev
```

Review at least:

- About on desktop and mobile.
- Work and every case-study link.
- Writing index and a post.
- Hobbies grid after adding an item.
- Keyboard navigation and visible focus states.
- The coffee link.

Then build once:

```bash
npm run build
```

## Edit using only GitHub's website

For a small text change, open the relevant Markdown or JSON file on GitHub, click the pencil icon, edit, and commit to `main`. The site redeploys automatically.

For larger changes, use GitHub Desktop plus a local editor or Claude Code. This gives you a preview before publishing and makes it easy to revert a bad change.

## Useful Claude prompts

### Add an article

```text
Create a new writing post from my draft. Follow MAINTENANCE.md and CLAUDE.md. Preserve my voice, do not invent facts, leave published: false, and run npm run build.
```

### Add a hobby

```text
Add Photography to the hobbies collection. Use a small tile, keep the existing visual system, create a concise detail page, and run npm run build. Do not redesign the other cards.
```

### Update a case study

```text
Update the public API case study using only the facts I provide. Separate my contribution from the team's work, flag unsupported metrics, preserve the existing layout, and run npm run build.
```

### Change design safely

```text
Make this visual change using the existing design tokens and components. Do not introduce a new font, gradient, rounded-card system or dependency. Test desktop and mobile and run npm run build.
```

## Roll back a mistake

Git stores every committed version. In GitHub Desktop, open **History**, select the last good commit and revert the bad commit. Push the revert; GitHub Pages will redeploy the restored site.
