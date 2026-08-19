# anh-site: Claude Code instructions

Anh Pham's personal website. Astro static site, published to GitHub Pages on every push to
`main`. Live at https://anh-pham-93.github.io (custom domain planned).

This site is a long-term personal project. Anh maintains it through Claude Code sessions in this
folder. Treat this file plus DESIGN.md as the manual; follow them instead of improvising.

## Ground rules

- **Read DESIGN.md before touching any page or style.** Its 12 hard rules are non-negotiable.
- **Never invent facts.** Book titles, dates, publishers, role details, and numbers come from Anh
  or from files she points at. Anything unconfirmed renders as `[Placeholder]`.
- **This is a personal site, not a Lumin artifact.** No Lumin-confidential numbers, no customer
  names, nothing Anh would not want her employer reading. Case study figures are anonymised or
  stated as ranges unless Anh explicitly approves them.
- Git identity for this repo is Anh's personal email (already configured locally). Never commit
  with the work email.

## Writing guardrails

Apply to all site copy, posts, and case studies:

- No em dashes or en dashes, ever. Use periods, commas, colons, or rephrase.
- British / New Zealand spelling (organise, colour, behaviour). Dates as YYYY-MM-DD in metadata,
  natural phrasing in prose.
- Banned: "it's not just X, it's Y", "from X to Y", "whether you're X or Y", colon-reveal
  sentences, trailing -ing analysis clauses ("highlighting...", "underscoring..."), importance
  puffery, and these words: delve, foster, leverage, utilize, facilitate, empower, streamline,
  robust, tapestry, realm, beacon, multifaceted, meticulous, intricate, paramount, elevate,
  embark, supercharge, harness, ever-evolving, game-changer, cutting-edge, revolutionary,
  next-generation, transformative.
- Concrete beats abstract: names, numbers, dates, mechanisms. "Nine books" not "many books".
- Keep Anh's voice: "I think", "honestly", short sentences, spoken rhythm. When editing her
  drafts, make the minimum effective edit.
- One ask per screen. Name the pain first. Don't make the reader think.

## Structure

- `src/pages/` — one folder or file per section (index, work, writing, hobbies, about)
- `src/layouts/Base.astro` — header, nav, footer, contact links
- `src/styles/global.css` — all design tokens (see DESIGN.md)
- `src/content/` — Markdown content collections (arrives in Phase 3: posts, books, reviews,
  case studies)
- `src/pages/font-test.astro` — temporary; delete at Phase 5 along with the unused font packages
  (`@fontsource-variable/newsreader`, `@fontsource/be-vietnam-pro`)

## Publish recipe

1. Make the change. Run the local preview (`npm run dev`, port 4321) and review against
   DESIGN.md's checklist, desktop and 375px mobile.
2. Commit with a plain, human message. Push to `main`.
3. GitHub Actions builds and deploys in about 2 minutes. Load the live URL and confirm.

## Project status (update as phases complete)

- Phase 1 (pipeline): DONE 2026-08-19
- Phase 2 (design system + skeletons): DONE 2026-08-19, pending Anh's sign-off
- Phase 3 (real content: About, Work timeline, Hobbies, portrait): next. Needs from Anh: full
  book list (7 titles missing), hobby inventory, two photos, About story interview
- Phase 4 (case studies + first posts): after Phase 3
- Phase 5 (launch: domain, remove noindex, OG images, favicon, Ko-fi link, analytics decision,
  delete font-test): last. The `noindex` meta in Base.astro comes OUT only at launch.
- Still placeholder in Base.astro: LinkedIn URL, Ko-fi link.
