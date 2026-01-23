# Layout Logic (Portfolio Pages)

This repo uses a consistent layout system for the C3/C4.1 pages (and future pages).
Follow the rules below to keep the same visual logic.

## Global Layout
- Keep the main content width wide (no A4 look):
  - `main { max-width: 1360px; padding: 64px 4% 96px; }`
- Do not use parallax on KAH (keep the hero image fixed).
- Do not use filler blocks like `<div class="media-fill">`.
- Do not prefix subtitles with page codes like `C.1 / C.2 —`.

## Competences Navigation (Hero)
This applies to the "Compétence CONCEVOIR" pages.
The C3/C4.1 pages use a framed navigation block with left/right arrows around the competencies text.
Replicate this structure and styling for new pages:

```html
<div class="competences-nav" aria-label="Navigation des compétences">
  <a class="nav-arrow" href="../page_C.1:C.2/page_C.1:C.2.pdf" aria-label="Aller à C1/C2">
    &larr;
  </a>
  <ul class="competences-text">
    <li>J'affine une solution technique en m'appuyant sur un maquettage numérique et/ou matériel</li>
    <li>Je rédige un dossier de conception</li>
  </ul>
  <a class="nav-arrow" href="../page_C.4.2.pdf" aria-label="Aller à C4.2">
    &rarr;
  </a>
</div>
```

Rules:
- Use `.competences-nav`, `.competences-text`, and `.nav-arrow`.
- The left arrow links to the local C1/C2 PDF, the right arrow links to the local C4.2 PDF.
- Visual detail: `.competences-nav` is narrower and left-aligned (`width: 85%`, `max-width: 860px`, `margin: 0 auto 18px 0`).
- The competence text is a `<ul>` with the bullet list that matches the page’s competencies (no `&`), left-aligned with padding (`padding-left: 20px`).
- Add a small vertical gap between bullets: `.competences-text li + li { margin-top: 6px; }`.
- For C1/C2 pages, keep the same `<ul>` structure but use the C1/C2 statements:
  - "J'identifie les fonctions demandées à la lecture du cahier des charges (architecture fonctionnelle - sans solution technique)"
  - "Je propose une solution technique pour répondre à une fonction"

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
- You may rebalance the text flow around each image (light transition tweaks OK), but do not condense or remove content.

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

## Documents Links (Robot Sumo)
- Robot Sumo CDC: https://drive.google.com/file/d/1XhT6rMI2dUtggBxUtkloPJIP-XvWB410/view?usp=sharing
- Robot Sumo DDC: https://drive.google.com/file/d/1Ht59t_-his_qYIPGue37_Yxh4enFE83N/view?usp=sharing
- Robot Sumo DDV: https://drive.google.com/file/d/1TVGU2KhjIrB6y-A300iYKvnYUZOYLzVY/view?usp=sharing
- Robot Sumo DDF: https://drive.google.com/file/d/1ypHlm1YXgo70FTtg3Atai_xOdhEiENQn/view?usp=sharing

## Documents Links (KAH)
- KAH CDC: https://drive.google.com/file/d/1EQAq4K1X4Kdx4ly75DrBtf8j-55S-MaQ/view?usp=sharing
- KAH DDC: https://drive.google.com/file/d/1-OY0xHtRsZP_bhj0naxqV0ZXmn8UryHA/view?usp=sharing
- KAH DDF: https://drive.google.com/file/d/1InSPdnMXHat8NwjYSLZwToff8vtDQvu1/view?usp=sharing
- KAH DDV: https://drive.google.com/file/d/1GrrllYJ2eAThRubG7Mxs_faBgB_vcUxu/view?usp=sharing
- KAH Rapport SAE: https://drive.google.com/file/d/1jgv-VyILdzVyaOZriIrshre-1jDqz2r_/view?usp=sharing

## Documents Links (Antenne HB9CV)
- Antenne HB9CV CDC: https://drive.google.com/file/d/1A259rmQ04lvbxshtdKF31VHtdtonBwD9/view?usp=sharing
- Antenne HB9CV DDC: https://drive.google.com/file/d/1ud53mE_ODI4jwzHIZtEYz851UBHdyh20/view?usp=sharing
- Antenne HB9CV DDF: https://drive.google.com/file/d/1J-omCwFzXVEB1JFCzrX8_e2PiyHe0YtN/view?usp=sharing
- Antenne HB9CV DDV: https://drive.google.com/file/d/1lgyWNToOKkY4Yvt6VIEu9IRdVgYDqD81/view?usp=sharing
- Antenne HB9CV Rapport SAE: https://drive.google.com/file/d/1-AddneWWg2XKkzxwceeQVFbNgrUY3wCf/view?usp=sharing

## Documents Links (Stage BUT GEII)
- Stage BUT GEII Rapport: https://drive.google.com/file/d/1jkNfST7_6v9dAMs87kIJfZfsCFZGfctS/view?usp=sharing

## Hyperlink Rules (Concevoir / Vérifier)
- For each project, the "Concevoir" and "Vérifier" collections must include the appropriate hyperlink in every image caption.
- Exception: the first (hero) project image does not include a link.
