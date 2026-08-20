# CLAUDE.md

## Project purpose

This is Anh Pham's long-lived personal website for work, writing and hobbies. It is not a recruitment landing page and should not become a generic product-manager template.

## Technical model

- The site is static and has no runtime database.
- Source content lives in `src/`.
- `node scripts/build.mjs` generates `dist/`.
- Do not edit `dist/` directly.
- Do not add a dependency unless Anh explicitly approves it and there is a clear maintenance benefit.
- Run `npm run build` after every meaningful change.

## Design rules

- Preserve the warm editorial palette, sharp one-pixel rules, restrained orange accent and dark green feature treatment.
- About is cinematic and photographic; Work, Writing and Hobbies are editorial and content-led.
- Buttons are rectangular, high-contrast and restrained. Text links use a thin underline and directional arrow.
- Avoid generic bento grids, glass effects, neon gradients, oversized pill buttons, floating blobs, stock illustrations and ornamental motion.
- Do not add a third typeface.
- Preserve generous whitespace and readable line lengths.
- Respect `prefers-reduced-motion`.
- Test mobile layouts after structural changes.

## Content rules

- Never invent dates, metrics, customer quotes, project outcomes or job responsibilities.
- Distinguish Anh's contribution from team results.
- Treat current-employer and former-employer information as confidential unless Anh provides or approves it for publication.
- Do not expose internal roadmap details, customer identities, private screenshots or identifiable sales information.
- Do not publish the original resume PDF because it contains a phone number and residential area.
- Writing topics are open-ended. Do not force personal posts into product, career or migration themes.
- Vietnamese content is first-class. Preserve diacritics and do not translate a post unless asked.

## Content creation

- Writing: `src/content/writing/`
- Case studies: `src/content/work/`
- Hobbies: `src/content/hobbies/`
- Standalone pages: `src/content/pages/`
- New content should begin with `published: false` unless Anh explicitly asks to publish it.
- Keep slugs stable after a page is public.
- Use the scaffold commands in `package.json` when useful.

## Before completion

1. Validate JSON and Markdown front matter.
2. Run `npm run build`.
3. Check generated links for the changed section.
4. Summarize exactly which source files changed.
5. Call out any unsupported claim or missing asset instead of filling the gap.
