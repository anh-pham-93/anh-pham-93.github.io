# CLAUDE.md

## Project purpose

This is Anh Pham's long-lived personal website for work, writing, hobbies and other interests that may develop over time.

It is a personal place on the internet, not a recruitment landing page, a product-manager template or a software product. It should feel like Anh's website even as its content changes over the years.

The site should be able to grow beyond Anh's current career, location or interests without requiring a redesign of its identity.

## Ownership and maintenance philosophy

Anh is the owner and editor of this website, but is not a software developer.

He should be able to maintain the site primarily through natural-language instructions to an AI coding agent. Routine tasks should not require him to understand the codebase, framework, build system or file structure.

Routine tasks include:

- publishing or editing writing;
- adding or updating case studies;
- updating work history;
- adding hobbies or other personal content;
- replacing images;
- changing copy;
- making small visual adjustments.

Keep the implementation simple enough that these operations remain safe and predictable.

Prefer boring, durable technology over sophisticated architecture. This is a personal website, not a software product. Optimize for low maintenance, longevity, reversibility and easy recovery rather than architectural purity.

Do not introduce a CMS, database, authentication system, framework migration, major build-system change or other infrastructure unless there is a clear long-term benefit and Anh explicitly approves it.

Do not add a dependency unless Anh explicitly approves it and there is a clear maintenance benefit.

Avoid abstractions that make simple content or design changes harder to understand or maintain.

## Technical model

- The site is static and has no runtime database.
- Source content lives in `src/`.
- `node scripts/build.mjs` generates `dist/`.
- Do not edit `dist/` directly.
- Treat source files and Git history as the source of truth.
- Run `npm run build` after every meaningful change.
- Prefer existing site patterns and utilities before creating new ones.
- Do not refactor unrelated code while making a requested change.

Technical complexity should be justified by a user-facing or maintenance benefit, not by developer preference.

## Design direction

The site should feel editorial, warm, personal and slightly literary rather than like a SaaS website or conventional portfolio.

The homepage acts more like the cover or index of a personal publication than a marketing landing page.

Preserve the established visual language:

- warm editorial palette;
- restrained orange accent;
- dark green feature treatment;
- sharp one-pixel rules;
- generous whitespace;
- strong typography;
- readable line lengths;
- meaningful photography and imagery.

Typography, spacing, rules and imagery should do most of the visual work.

Do not solve hierarchy by adding a card, container, background, badge or decorative element when typography, spacing or a rule can solve it.

Controls should feel typographic and editorial rather than app-like. Keep buttons and links restrained and purposeful.

Avoid:

- generic bento grids;
- glass effects;
- neon gradients;
- oversized pill buttons;
- floating blobs;
- stock illustrations;
- excessive rounded cards;
- ornamental animation;
- generic portfolio or SaaS patterns.

Do not add a third typeface without explicit approval.

Photography should feel personal, atmospheric, documentary or meaningful. Do not add imagery simply to fill space.

About can be more cinematic and photographic. Work, Writing and Hobbies should remain primarily editorial and content-led.

Case studies should read as thoughtful stories or essays supported by evidence, not formulaic portfolio presentations. Do not automatically turn them into grids of KPIs, process diagrams, "My Role" cards or Problem -> Process -> Solution -> Impact templates.

Reuse visual patterns where consistency helps, but do not force every type of content into the same component structure.

Motion should be subtle and functional. The site should still feel complete without animation.

Respect `prefers-reduced-motion`.

Test mobile layouts after structural or meaningful visual changes.

## Content and voice

Anh's voice takes precedence over polished generic prose.

When helping edit his writing, preserve his personality, opinions, humour, rhythm and unusual phrasing unless they genuinely hurt comprehension.

Do not turn personal writing into corporate language, generic product-management language or AI-polished thought leadership.

Do not manufacture lessons, frameworks, inspirational conclusions or "key takeaways" from every personal story.

Writing topics are open-ended. Do not force personal posts into product, career, migration or other existing themes.

Vietnamese content is first-class. Preserve Vietnamese diacritics and do not translate content unless asked.

For case studies and professional writing:

- never invent dates, metrics, customer quotes, project outcomes or job responsibilities;
- distinguish Anh's individual contribution from team results;
- prefer specific evidence over inflated claims;
- call out uncertainty rather than filling gaps with plausible information.

Treat current-employer and former-employer information as confidential unless Anh provides or approves it for publication.

Do not expose:

- internal roadmap details;
- confidential customer identities;
- private screenshots;
- identifiable sales information;
- credentials, API keys or secrets;
- personal contact information that Anh has not explicitly chosen to publish.

Do not publish the original resume PDF because it contains a phone number and residential area.

## Site structure

The site's main sections currently include Work, Writing, Hobbies and standalone personal pages.

These categories are not permanent constraints on Anh's future interests.

Do not create a new top-level navigation item merely because several pieces of content share a topic. Prefer allowing content to grow naturally within the existing information architecture first.

If a new body of content appears to justify a new section, navigation model or content type, explain the proposed structure and why it would improve the site before implementing it.

Avoid reorganizing existing public URLs unnecessarily.

Keep slugs stable after a page is public.

## Content creation

Source locations:

- Writing: `src/content/writing/`
- Case studies: `src/content/work/`
- Hobbies: `src/content/hobbies/`
- Standalone pages: `src/content/pages/`

Use scaffold commands in `package.json` when useful.

Anh should not need to know these paths to publish content. When he asks to create or publish something, determine the appropriate location and implementation from the request.

New content should begin with `published: false` unless Anh explicitly asks to publish it.

Drafting and publishing are separate actions.

Helping Anh write, edit or prepare a piece does not imply permission to publish it.

Only make content publicly visible when Anh clearly asks to publish, ship or otherwise make it live.

When adding public content, use the site's existing metadata conventions and provide sensible SEO metadata where supported, including title, description and social-sharing metadata. Do not invent claims or summaries that misrepresent the content.

## Images and assets

Use imagery intentionally.

When adding images:

- preserve sufficient quality for modern displays;
- avoid unnecessarily large files;
- use appropriate web formats and existing optimization patterns;
- provide meaningful alt text when the image conveys information;
- use empty alt text for genuinely decorative imagery;
- avoid embedding important information only inside an image.

Do not replace, crop or substantially alter a meaningful personal image without Anh's approval unless he explicitly requested the change.

Do not introduce stock imagery when a personal, documentary or typographic solution would work better.

## Change safety

Match the workflow to the size of the change.

### Routine content changes

Examples: typo fixes, copy edits, new writing, new case studies, work-history updates and image replacements.

These can normally be implemented directly when Anh clearly requests them.

After implementation:

1. validate the affected content;
2. run the build;
3. check relevant generated pages and links;
4. summarize what changed.

### Visual changes

Examples: typography, spacing, homepage composition, image treatment or component styling.

Implement the requested change without unnecessarily redesigning adjacent areas.

Check the result on both desktop and mobile when the change can affect responsive layout.

For significant visual changes, give Anh an opportunity to evaluate the result before treating the direction as established.

### Structural or technical changes

Examples:

- new top-level sections;
- navigation restructuring;
- new content models;
- dependencies;
- frameworks;
- build-system changes;
- CMS or external infrastructure;
- large refactors.

Explain the proposed approach, benefits, trade-offs and maintenance implications before implementing it.

Get Anh's approval before proceeding.

## Git and change management

Keep changes easy to understand and reverse.

- Do not combine unrelated work in the same commit or pull request.
- Use clear commit messages describing the user-facing change.
- Do not rewrite Git history or force-push unless explicitly requested and the consequences are understood.
- Do not delete content or assets merely because they appear unused without checking whether they are intentionally retained.
- Prefer reversible changes.
- Preserve public URLs whenever practical.

When working through a branch/PR workflow, keep each branch focused on one coherent change.

Anh should not need to understand Git internals to safely make ordinary website updates. Explain any manual Git action he needs to take in plain language and one step at a time.

## Accessibility and resilience

Maintain semantic HTML and keyboard accessibility.

Do not rely on colour alone to communicate meaning.

Maintain readable contrast, sensible text sizing and usable touch targets.

Respect user motion preferences.

The core content should remain readable and navigable even if optional JavaScript or animation fails.

Avoid making important content dependent on a third-party service unless there is a compelling reason.

## Working with Anh

Implement what Anh asks for, but do not interpret a discussion, question or idea as approval to change the site.

If Anh is exploring an idea, discuss or prototype the idea first rather than silently treating it as a final direction.

Do not make unrelated "improvements" while completing another task.

If a request has an obvious implementation that fits existing patterns, handle the technical details without requiring Anh to make unnecessary engineering decisions.

Ask for a decision when the choice materially affects:

- the site's identity;
- public content;
- privacy;
- information architecture;
- long-term maintenance;
- cost;
- external services;
- irreversible or difficult-to-reverse changes.

When technical alternatives exist, explain them in terms of what Anh will experience and have to maintain rather than assuming knowledge of implementation details.

## Definition of done

Before considering a site change complete:

1. Validate relevant JSON, Markdown and front matter.
2. Run `npm run build` successfully.
3. Check generated links for the changed section.
4. Check the affected page or pages for obvious rendering problems.
5. Check mobile behaviour after structural or meaningful visual changes.
6. Confirm that no confidential or unintended information has been exposed.
7. Confirm that drafts have not accidentally become public.
8. Avoid unrelated changes.
9. Summarize exactly which source files changed and what changed in them.
10. Call out any unsupported claim, missing asset, unresolved issue or verification that could not be performed instead of filling the gap or pretending it was checked.

For substantial changes, leave the repository in a state that is easy to review, understand and revert.
