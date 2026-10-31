# FSquaro Homepage Design v2.0

This directory contains the editable HTML/CSS/JavaScript homepage proposal for review. It is intentionally separate from the production Next.js application: `src/app/page.tsx` has not been modified.

The direction is **Modern & Visually Rich** — an editorial, fashion-oriented experience with stronger image composition, premium spacing, and a clear path from product discovery to future verified marketplace links. The light theme is the default; the dark theme is fully styled.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure, official asset references, and accessible controls |
| `design-tokens.css` | Brand colors, typography, sizing, spacing, shadows, and light/dark theme tokens |
| `styles.css` | Responsive visual system and component styling |
| `script.js` | Theme persistence, search-panel states, Escape handling, mobile navigation, and seven review-stage featured parent products |
| `../catalogue-data.js` | Browser-ready review catalogue shared with the Shop and Product Detail prototypes |

## Asset inspection and mapping

All files in `public/brand/` and `public/products/` were inventoried. The product collection contains original product/editorial images across earrings, necklaces, bangles, bracelets, and hair accessories.

| Area | Original asset used | Rendering treatment |
| --- | --- | --- |
| Light header | `logo-horizontal-1200w.png` | Original horizontal logo; displayed without modification |
| Dark header and footer | `logo-horizontal-white-1200w.png` | Original white horizontal logo; displayed without modification |
| Hero | `public/products/oxidised earrings/Golden/main-image.png` | Approved variant main image with `object-fit: cover` |
| Category cards | Selected `main-image.png` files from earrings, necklace, bracelet, and hair-accessory folders | Original product/editorial images with `object-fit: cover` |
| Featured products | Seven selected `main-image.png` assets from the shared review catalogue | One card per parent product group; no variant is presented as a separate parent card |
| About | `public/products/Butterfly chain 55/main-image.png` | Selected product main image with `object-fit: cover` |
| Social gallery | Selected main images from earrings, necklace, bracelet, and hair-accessory folders | Original product/editorial images with `object-fit: cover` |

The homepage now reads its search index and seven featured parent-product cards from `design/catalogue-data.js`. The product data covers all 14 uploaded parent product groups and 23 selected main-image markers. Except for the owner-supplied prototype label `Butterfly Stone Bangles`, labels remain review-stage source-derived labels and require public-name approval. No prices, ratings, marketplace URLs, or availability claims have been added.

The captured `Screenshot_20260920-231348.png` was not used because it contains unrelated third-party website content rather than an FSquaro product or brand visual.

## Layout dimensions

| Item | Specification |
| --- | --- |
| Desktop reference | 1440px |
| Desktop content max width | 1280px (`--container`) |
| Desktop horizontal padding | 48px (`--gutter`) |
| Tablet horizontal padding | 32px at 1024px and below |
| Mobile horizontal padding | 20px at 768px and below |
| Header height | 80px desktop; 64px mobile |
| Desktop section padding | 96px top and bottom |
| Mobile section padding | 64px top and bottom |
| Grid gap | 24px desktop; 16px category/mobile layouts where compact |
| Hero media | 544px minimum height at desktop; 368px at tablet; 304px at small mobile |
| Category card | Balanced 2 × 2 desktop grid; 400px minimum visual height; four supplied-image category cards |
| Product media | `aspect-ratio: 0.94`; intended for future `object-fit: contain` product cutouts |
| Buttons | 48px minimum height; 14px Inter label; pill radius |

## Typography and color tokens

- **Inter** is loaded for navigation, controls, body copy, and product information. A system sans-serif fallback is used if external font loading is unavailable.
- **Playfair Display** is loaded for the hero and editorial headings, with Georgia as fallback.
- Hero type scales fluidly from 52px to 90px.
- Section headings scale fluidly from 34px to 58px.
- Interface text uses 14–16px; lead copy uses 18px.

Core tokens in `design-tokens.css` are the approved brand palette:

| Token | Value |
| --- | --- |
| `--navy-950` | `#061D35` |
| `--navy-800` | `#082B4F` |
| `--blue-500` | `#007BFF` |
| `--white` | `#FFFFFF` |
| `--soft` | `#F4F7FB` |
| `--border` | `#E2E8F0` |

## Component and responsive behavior

| Component | Desktop — 1440px | Tablet — 768px reference | Mobile — 390px reference |
| --- | --- | --- | --- |
| Header | Horizontal logo, inline Home/Shop/Collections/About/Contact navigation, search, theme control | Navigation becomes a hamburger menu; logo, search, and theme remain visible | 64px header with compact logo and touch-friendly controls |
| Hero | Two-column editorial split | Copy and media stack | Headline, buttons, and 304px media panel stack without excess height |
| Highlights | Intro plus three functional highlights in one row | Intro spans the row; highlights remain in a three-column grid when space permits | One-column highlight list |
| Categories | Balanced 2 × 2 image-based layout cards | Two columns | Two columns when practical, then one column below 480px |
| Products | Seven featured parent-product cards in three columns | Two cards per row | One card per row |
| About and social | Two-column composition | Stacked | Stacked with compact social gallery |
| Footer | Brand column plus three link columns | Brand plus two columns | One column flow |

There is no horizontal scrolling at the specified breakpoints; `overflow-x` is clipped at the page level and grids collapse before their columns become too narrow.

## Prototype interactions

- **Theme:** The circular control switches light/dark themes and stores the selection in `localStorage` when available.
- **Search:** The header search opens an accessible modal-style panel. It searches all review-stage local product groups by review label, approved category, and folder-labelled selection terms, then links to the product-detail prototype. It closes by button, backdrop click, or `Escape`.
- **Mobile navigation:** The menu button reveals and closes the responsive navigation list.
- **Calls to action:** Shop, category, and featured-product actions link only to the local review prototypes. Marketplace, social, and About calls remain unavailable until validated destinations/content are available.

## Known limitations and missing inputs

1. The shared review catalogue is not published data. Approve public product names, factual descriptions/specifications, category assignments, image roles, and configurable verified marketplace URLs before production search is implemented.
2. There is no verified official Instagram/social URL, contact address, or contact method; no external destination was added.
3. Several supplied images are infographics or measurement/product-guide artwork. They were intentionally excluded from customer-facing placements in favor of text-free product/editorial images.
4. No history, award, manufacturing, quality, shipping, review, discount, stock, or price claims are present.
5. This is a design proposal only. It has not been approved and must not be copied to `src/app/page.tsx` until separate approval is given.

## Review locally

Open the prototype directly from the repository root:

```powershell
Start-Process .\design\homepage\index.html
```

Use the header controls to check light/dark themes, mobile navigation, and the empty search state. Direct-file review has no project dependency; if Google Fonts cannot load, the defined system font fallbacks will be used.
