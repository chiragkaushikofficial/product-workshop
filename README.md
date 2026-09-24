# The Product Workshop

A self-contained static portfolio for Chirag Kaushik. No framework, backend, API keys, analytics, cookies, external fonts, package installation, or build step.

## Open locally

Open `index.html` in a modern browser. All styles, scripts, images, and sample data live inside this directory. Nothing needs to be served from the parent directory. Clipboard access depends on browser permissions; the email link is always available.

## Publish later

Repository: [chiragkaushikofficial/product-workshop](https://github.com/chiragkaushikofficial/product-workshop).

Publish **the contents of this `portfolio` directory**, not its parent. The parent contains private source material that is not needed by the website. Uploading the source to GitHub and deploying a live website are separate steps; hosting must be enabled explicitly.

### GitHub Pages

1. Open the repository above. `index.html` belongs at the root, alongside `styles.css`, `script.js`, and `assets`.
2. For later changes, update those files while preserving the directory structure.
3. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select your branch, and choose **/(root)**.
4. Visit the Pages URL shown by GitHub when deployment finishes.

Relative asset paths work both on `username.github.io` and on `username.github.io/repository-name/`. `.nojekyll` tells Pages to serve the static files directly. No Actions workflow is required.

### Other static hosts

Use a plain/static-site configuration. No build command is needed; use `.` as the publish directory if these files are the repository root, or `portfolio` if you intentionally keep that folder in the repository. A static host that accepts folder uploads can serve this folder directly.

Do not select an SPA rewrite or a framework preset: there is no client-side router. Navigation uses native document fragments.

## Project structure

- `index.html`: public biography, case studies, navigation, contact details, and metadata.
- `styles.css`: responsive visual design, keyboard focus styles, reduced-motion support, and print styles.
- `script.js`: accessible tabs, local demos, download generation, mobile menu, and email copying.
- `assets/chirag-kaushik.jpg`: local profile photo.
- `assets/favicon.svg`: local site icon.
- `.nojekyll`: GitHub Pages static-serving marker.

## Content and publication boundaries

- Employer details supplied only as background are intentionally excluded.
- Echo is described as a **pilot**, not a completed public launch.
- Lumo is described as a **concept / proposed architecture**, not a production product.
- Prior SKU and automation stories summarize the supplied experience without exposing client records or claiming unverified metrics.
- Product demos are not screenshots or connections to the real products.
- Source PDFs, internal domain names, original architecture files, private endpoints, credentials, phone number, and resume are not included.
- Before publishing, confirm you have permission to publish the product names, high-level narratives, profile photo, and contact details. Review the wording for your exact personal contribution to collaborative products.
- Add a canonical URL and absolute social-preview image URL only after choosing your public domain. No fake production URL is embedded.

## Demo behavior

### Echo

Six fictional records contain Q1/Q2 revenue, cost, and orders for North, South, and West. Results are computed, not fetched from an AI service.

- Change the question or region, then run it.
- Margin deliberately requires choosing gross profit or gross margin percentage.
- Evidence shows the formula, applied scope, limitations, and contributing records.
- Download creates a local text brief using the committed result, not unsubmitted form selections.
- All-regions revenue: Q1 **$1,100,000**, Q2 **$1,240,000**, growth **12.7%**.
- Q2 all-regions orders: **3,370**.
- Q2 all-regions gross profit: **$430,000**; gross margin: **34.7%**.
- West revenue is unchanged quarter over quarter.

### Lumo

A local state machine illustrates discovery, validation, review, and a reversible development preview.

- The format candidate preserves all six fixture values and validates a permitted format.
- Explicit approval is required before changing the demo state.
- Undo revokes approval; a new approval is required to reapply.
- Removal of `LegacyCode` remains blocked because usage evidence is absent.
- Changing candidates or resetting starts a fresh review flow.
- This is not an authorization implementation, DAX test runner, or enterprise safety guarantee.

Demo state survives tab/project switches within the page but resets on reload. No visitor data is stored or transmitted. Email and LinkedIn links only open when clicked.

## Maintenance and verification

Edit static case-study copy in `index.html`. Edit the sample fixtures and architecture/decision content at the top of `script.js`. Replace the image at the same path to update the portrait.

No test/build packages are required. To check JavaScript syntax with an existing Node installation:

```sh
node --check script.js
```

Before publishing, verify:

- Images, styles, and scripts load from a repository subpath, not just the domain root.
- All six project/perspective combinations work with pointer and keyboard.
- Arrow keys, Home, and End navigate the perspective tabs.
- Echo sample calculations match the values above; filtered results and exports match the selected scope.
- The margin clarification does not return a number until the visitor chooses a definition.
- Lumo cannot apply before validation and approval; blocked candidates remain blocked.
- Mobile navigation opens, closes on selection, and responds to Escape.
- Email copying reports unavailable/denied clipboard access honestly.
- No horizontal page overflow at narrow mobile widths or with enlarged text.
- The core biography, project stories, and contact links remain available without JavaScript.
