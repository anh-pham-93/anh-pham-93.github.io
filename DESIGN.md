# Design system

Direction: **editorial serif**. Literary, calm, quietly confident. The serif carries the
translator identity; the restraint carries the product identity. Derived 2026-08-19 from a
teardown of nicolasbackal.com (structure, accent discipline) and jennyatkins.me (restraint),
deliberately avoiding what makes AI-generated sites look generic.

## Hard rules

These are not suggestions. Any new page or component follows all of them.

1. **One accent colour.** Mustard `#FFC700`, used only for link underlines, hover washes, and
   small graphic marks. Never for text colour, never for backgrounds of whole sections.
2. **One display font, one boring body font.** Fraunces for headings and wordmark. Inter for
   everything else. No third font except the mono for labels.
3. **Vietnamese first-class.** Any font added later must ship the Vietnamese subset. Test string:
   `Tiếng Việt: ế ộ ữ ơ đ Nguyễn`. If the stacked diacritics look wrong, the font is out.
4. **Single column.** No sidebars. Reading width capped at `--measure` (42rem). The shell
   (`--shell`, 66rem) only frames the header, footer, and hero.
5. **Nav stays at 4 items.** Work, Writing, Hobbies, About. New content types go inside existing
   sections, not into the nav.
6. **First-person H1 on the home page.** The site opens with "Hi, I'm Anh.", not a job title.
7. **Per-section CTAs.** Every home-page section closes its own loop with one arrow link. One ask
   per screen.
8. **Numbers do the bragging.** Concrete figures (10x, 200,000 agreements, 9 books, 20 projects)
   instead of adjectives. No skill bars, no percentage rings, no stock photos.
9. **Whitespace is the design.** Generous `--space` between sections. When a page looks empty,
   that is correct.
10. **Hairlines, not boxes.** Lists are rows separated by 1px `--hairline` lines. No cards with
    shadows, no rounded containers.
11. **Line art: pure black stroke on white.** stroke `#111111`, width 2.5 in a 200-unit viewBox
    (scale proportionally), round linecaps, no fills, no colour. Portrait and spot drawings all
    match this spec. All art sits in swappable slots.
12. **Light theme only** (v1). Dark mode is a later, deliberate project.

## Tokens

Defined in `src/styles/global.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#ffffff` | page ground |
| `--ink` | `#111111` | text, line art |
| `--ink-soft` | `#575757` | secondary text (ledes, notes) |
| `--hairline` | `#e5e5e5` | row separators, footer border |
| `--accent` | `#ffc700` | link underlines, active nav |
| `--accent-wash` | `#fff3c4` | link hover background |
| `--font-serif` | Fraunces Variable | headings, wordmark, CTAs |
| `--font-sans` | Inter Variable | body |
| `--font-mono` | system mono | uppercase labels, dates |
| `--measure` | 42rem | max reading width |
| `--shell` | 66rem | outer frame |

Type scale: base 17px, ledes 1.25rem, h3 1.25rem, h2 1.75rem, h1 3rem (2.25rem under 720px).

## Voice in the interface

Section headings are written like sentences with a point of view ("Product problems, worked
through", "Books I'd hand you", "Slow kilometres"), never generic labels ("My portfolio",
"Blog"). Mono labels above them stay flat and factual (WORK, READING, 2022 TO NOW).

## Review checklist (run before showing any new page)

- All 12 hard rules hold
- Vietnamese diacritics render correctly in any new text
- Mobile (375px): headline leads, nothing overflows horizontally
- Copy passes the writing guardrails in CLAUDE.md
- Facts are sourced; anything unconfirmed is marked [Placeholder]
