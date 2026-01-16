# Layout Logic (Portfolio Pages)

This repo uses a consistent layout system for the C3/C4.1 pages (and future pages).
Follow the rules below to keep the same visual logic.

## Global Layout
- Keep the main content width wide (no A4 look):
  - `main { max-width: 1360px; padding: 64px 4% 96px; }`
- Do not use parallax on KAH (keep the hero image fixed).
- Do not use filler blocks like `<div class="media-fill">`.

## Competences Navigation (Hero)
The C3/C4.1 pages use a framed navigation block with left/right arrows around the competencies text.
Replicate this structure and styling for new pages:

```html
<div class="competences-nav" aria-label="Navigation des compétences">
  <a class="nav-arrow" href="../page_C.1:C.2/page_C.1:C.2.pdf" aria-label="Aller à C1/C2">
    &larr;
  </a>
  <p class="competences-text">
    J'affine une solution technique en m'appuyant sur un maquettage numérique et/ou matériel
    <br>
    &amp;
    <br>
    Je rédige un dossier de conception
  </p>
  <a class="nav-arrow" href="../page_C.4.2.pdf" aria-label="Aller à C4.2">
    &rarr;
  </a>
</div>
```

Rules:
- Use `.competences-nav`, `.competences-text`, and `.nav-arrow`.
- The left arrow links to the local C1/C2 PDF, the right arrow links to the local C4.2 PDF.

## Legend + Image Pattern (Core)
Use the same pattern everywhere a legend is paired with an image:

```html
<div class="legend-flow">
  <span class="eyebrow">Legend short label</span>
  <h2>Legend title</h2>
  <figure class="image-frame float-right">
    <img src="image/..." alt="..." loading="lazy" decoding="async">
    <figcaption>...</figcaption>
  </figure>
  <p>First paragraph of the legend...</p>
  <p>Second paragraph...</p>
</div>
```

Rules:
- Use `.legend-flow` for every legend + image pair.
- Use `.image-frame` with `float-left` or `float-right`.
- Alternate left/right between sections to avoid monotony.
- Images must be at least half of the screen width:
  - Default width: `56%`
  - In action items: `54%`
- Let the text wrap under the image naturally when it becomes longer.
  - Do not force a break in the middle of a sentence.
  - If you need a break, start a new paragraph at a natural point.

## Action Block Layout
The action block uses a grid of cards, each one following the same legend-flow pattern:

```html
<div class="action-grid">
  <article class="action-item">
    <div class="legend-flow">
      <h3>Section title</h3>
      <figure class="image-frame float-left">...</figure>
      <p>Legend text...</p>
    </div>
  </article>
</div>
```

Rules:
- Each action item is a card (`.action-item`) with its own `.legend-flow`.
- Alternate floats between cards to keep visual rhythm.

## Mobile Behavior
On small screens, floats are disabled and images go full width:
- `.legend-flow .image-frame { float: none; width: 100%; }`
- Same rule for action items.

## Donts
- Do not group all images first and legends later.
- Do not keep legends and images in separate sections when they belong together.
- Do not shrink legend images to small thumbnails.

## Image Links (GitHub Pages / Safari)
- Prefer ASCII-only filenames (a-z, 0-9, `-`, `_`) to avoid broken images.
- If you keep accents, use NFC/precomposed characters and URL-encode them:
  - `é` -> `%C3%A9` (not `e%CC%81`)
  - `à` -> `%C3%A0` (not `a%CC%80`)

## Current Reference
The layout is implemented in:
- `Projets/KAH/Concevoir /page_C.3:4.1/page_C.3:4.1.html`
