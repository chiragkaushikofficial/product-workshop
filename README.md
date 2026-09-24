# From Possibility to Product

A self-contained portfolio for Chirag Kaushik. The portfolio is an experience of his approach to product development, not a simulation of his products.

No framework, backend, API keys, analytics, cookies, external fonts, dependencies, or build step.

## Open locally

Open `index.html` in a modern browser. All assets are inside this directory.

The five-chapter journey covers understanding, design, engineering, validation, and delivery. On desktop, an accompanying system diagram progressively assembles as the visitor scrolls. On smaller screens, the complete diagram provides an overview, followed by readable chapters with sticky chapter navigation. Native links allow visitors to skip to any chapter or go straight to the work.

Case studies are supporting evidence, with expandable notebooks. Journey evidence links also open the relevant notebook. All chapters, notebooks, navigation, and contact information work without JavaScript; scripting enhances the diagram, mobile menu, evidence links, and email copying. Reduced-motion preferences disable smooth scrolling and transitions.

There are no product demo forms, synthetic business results, simulated approval flows, or generated downloads. No visitor data is stored or transmitted.

## Publishing

- Repository: [chiragkaushikofficial/product-workshop](https://github.com/chiragkaushikofficial/product-workshop).
- Production: [chirag-kaushik.vercel.app](https://chirag-kaushik.vercel.app).
- Vercel project: `chirag-kaushik`, in the AI Developers team.
- The connected `main` branch deploys to Vercel when updated.

Review changes locally and get the owner's approval before publishing. Local edits do not change the live site until they are committed to the connected repository and deployed.

Publish only the contents of this `portfolio` directory, not its parent: the parent contains private source documents that the website does not need. Keep `index.html`, `styles.css`, `script.js`, and `assets` at the repository root. No build command or SPA rewrite is needed.

For GitHub Pages, enable deployment from the intended branch and its root directory. Relative asset URLs work at both domain-root and repository-subpath locations; `.nojekyll` enables direct static serving.

The optional ZIP in the parent directory is a portable copy of this directory. Regenerate it whenever publishing a new version so it stays synchronized with the source.

## Structure and maintenance

- `index.html`: all public copy, chapter anchors, system illustration, case studies, biography, and metadata.
- `styles.css`: editorial styling, progressive system illustration, responsive layouts, accessibility, and print styling.
- `script.js`: scroll-linked illustration, current chapter state, evidence links, mobile menu, legacy links, and email copying.
- `assets/chirag-kaushik.jpg`: profile photo.
- `assets/favicon.svg`: site icon.

Edit chapter wording and diagram captions in HTML (`data-phase` and `data-caption` on each chapter). Keep the chapter links in the same order as the chapters. Diagram `data-layer` values run from 0 through 4.

Older `#echo` and `#lumo` links resolve to the appropriate case study when JavaScript is enabled. `#workshop` remains the journey section, and existing story/contact anchors are preserved.

## Content boundaries

- Employer details supplied only as background remain excluded.
- Echo is a **pilot**, not a completed public launch.
- Lumo is a **concept / proposed architecture**, not a production implementation.
- SKU and automation stories summarize prior experience without client records or unverified impact figures.
- The journey describes an approach; it does not claim every project has reached every stage.
- Product names, contribution descriptions, portrait, and contact details should be approved by the owner before publication.
- No source PDFs, original architecture documents, internal endpoints, credentials, phone number, or resume are included.

## Verification

With an existing Node installation:

```sh
node --check script.js
```

Before publication, verify:

- Each desktop chapter highlights the correct navigation link, caption, and cumulative diagram layers when scrolling in either direction.
- All five chapter links work with pointer and keyboard, including direct fragment loads.
- Mobile chapters are readable below the sticky navigation; switching between compact and desktop layouts updates the diagram.
- All four notebooks open and close; chapter evidence links open the intended one.
- The menu closes on navigation, Escape, and transition to desktop width.
- Clipboard success and unavailable/denied states are reported honestly; the mail link remains usable.
- Core content is available with JavaScript disabled.
- Reduced-motion mode removes animation and smooth scrolling.
- No horizontal overflow at 320, 390, 640, 768, 1024, and 1440 pixels, or when text is enlarged.
- Images, CSS, and JavaScript load from both root and repository-subpath hosting.
- No product simulation controls or business fixtures remain.
