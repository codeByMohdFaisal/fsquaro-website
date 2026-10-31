# FSquaro Product Image Inventory

## Scope and audit location

Approved and audited product-asset root: `public/products/`

This report treats folder names and filenames as source labels only. They are not treated as verified public product names, material details, colour claims, prices, SKUs, or marketplace information.

No image file was renamed, deleted, or overwritten during this audit. The complete product-image directory was moved to this approved root after explicit approval; no asset was altered. The catalogue work remains a standalone design/data prototype and is not a production Next.js implementation.

## Snapshot

| Measure | Result |
| --- | --- |
| Top-level product folders | 14 |
| Product/variant leaf folders with images | 23 |
| Image files | 145 |
| File format | 145 PNG files |
| Image dimensions | 126 square, 12 landscape, 7 portrait |
| Exact duplicate files (SHA-256) | None found |
| Explicit `main-image` filename markers | 23 found — one per product/variant folder |
| Leaf folders with no non-guide candidate image | None found by filename-only heuristic |

### Image dimensions

| Dimensions | Files |
| --- | --- |
| 1254 × 1254 | 126 |
| 1536 × 1024 | 7 |
| 1122 × 1402 | 4 |
| 1312 × 1199 | 3 |
| 1024 × 1536 | 2 |
| 1086 × 1448 | 1 |
| 1261 × 1247 | 1 |
| 1445 × 1088 | 1 |

## Product folders and folder-labelled variants

`Non-guide candidates` is a planning heuristic only: it counts image filenames that do not include words such as `guide`, `infographic`, `dimension`, `measurement`, `details`, `showcase`, `close-up`, `catalog`, `collection`, `triptych`, `row`, or `feature`. It does **not** establish which image is a main image.

| Product folder label | Folder-labelled variant | Images | Non-guide candidates | Main-image status |
| --- | --- | ---: | ---: | --- |
| `255 Earrings and tikka set` | No variant subfolder | 9 | 8 | `main-image.png` present |
| `3 butterfly chain 55` | No variant subfolder | 7 | 5 | `main-image.png` present |
| `Bracelet` | `Black` | 5 | 2 | `main-image.png` present |
| `Bracelet` | `Gold` | 6 | 5 | `main-image.png` present |
| `Bracelet` | `Pink` | 5 | 4 | `main-image.png` present |
| `Bracelet` | `Red` | 6 | 3 | `main-image.png` present |
| `Bracelet` | `Sky Blue` | 6 | 4 | `main-image.png` present |
| `Bracelet` | `white` | 5 | 3 | `main-image.png` present |
| `Butterfly chain 55` | No variant subfolder | 6 | 5 | `main-image.png` present |
| `Earrings with box multicolor` | No variant subfolder | 9 | 4 | `main-image.png` present |
| `Earrings with box silver color` | No variant subfolder | 7 | 1 | `main-image.png` present |
| `Hair accessories box` | `Plastic box 72` | 6 | 5 | `main-image.png` present |
| `Hair accessories box` | `Polythene box 42` | 6 | 5 | `main-image.png` present |
| `Hair clip far 220` | No variant subfolder | 6 | 3 | `main-image.png` present |
| `Hair clip plastic 96` | No variant subfolder | 6 | 5 | `main-image.png` present |
| `Heart chain 35` | No variant subfolder | 4 | 2 | `main-image.png` present |
| `Necklace & Jhumki oxidies silver` | `Black stone` | 6 | 6 | `main-image.png` present |
| `Necklace & Jhumki oxidies silver` | `Multicolor stone` | 6 | 5 | `main-image.png` present |
| `oxidised earrings` | `Golden` | 7 | 5 | `main-image.png` present |
| `oxidised earrings` | `Silver` | 7 | 4 | `main-image.png` present |
| `Oxidised silver color Earrings and Jhumka` | `Circle stone` | 6 | 3 | `main-image.png` present |
| `Oxidised silver color Earrings and Jhumka` | `Floral stone` | 6 | 4 | `main-image.png` present |
| `Square chain 55` | No variant subfolder | 8 | 7 | `main-image.png` present |

The table accounts for all 145 images.

## Photograph inventory by product folder

The file counts below are the available photographs and supporting images in each product folder. File labels are retained exactly as uploaded; they have not been normalized or used as approved catalogue copy.

| Product folder | Folder-labelled variants | Image count |
| --- | --- | ---: |
| `255 Earrings and tikka set` | No child variant folder | 9 |
| `3 butterfly chain 55` | No child variant folder | 7 |
| `Bracelet` | `Black` (5), `Gold` (6), `Pink` (5), `Red` (6), `Sky Blue` (6), `white` (5) | 33 |
| `Butterfly chain 55` | No child variant folder | 6 |
| `Earrings with box multicolor` | No child variant folder | 9 |
| `Earrings with box silver color` | No child variant folder | 7 |
| `Hair accessories box` | `Plastic box 72` (6), `Polythene box 42` (6) | 12 |
| `Hair clip far 220` | No child variant folder | 6 |
| `Hair clip plastic 96` | No child variant folder | 6 |
| `Heart chain 35` | No child variant folder | 4 |
| `Necklace & Jhumki oxidies silver` | `Black stone` (6), `Multicolor stone` (6) | 12 |
| `oxidised earrings` | `Golden` (7), `Silver` (7) | 14 |
| `Oxidised silver color Earrings and Jhumka` | `Circle stone` (6), `Floral stone` (6) | 12 |
| `Square chain 55` | No child variant folder | 8 |

## Main-image assessment

All 23 product/variant folders now contain one file named `main-image.png`. As a result:

- No product or variant folder is missing images entirely.
- No product or variant folder is missing the agreed main-image marker.
- The `main-image.png` file is the selected primary catalogue asset for its folder.
- All 23 folders also have at least one non-guide candidate based on the filename-only heuristic above.

The main-image naming convention has been applied in the approved `public/products/` directory.

## Catalogue preparation status

The reviewed data model contains **14 parent product groups** and **23 folder-labelled main-image selections**. Every record is currently `review` visibility with `needs-review` verification status. The standalone prototypes deliberately display these records for owner review; a production shop must show only records explicitly changed to `published` after public names, attributes, media roles, and marketplace destinations are approved.

The public UI excludes all numeric fragments from the source folders. This report retains source labels only for internal asset traceability.

| Data ID | Review label used in prototype | Category | Folder-labelled selections | Primary-image mapping |
| --- | --- | --- | --- | --- |
| `earrings-tikka-set` | Earrings & Tikka Set | Earrings & Jhumkas | Main selection | `255 Earrings and tikka set/main-image.png` |
| `butterfly-chain-source-a` | Butterfly Chain — Source Group A | Necklaces & Pendants | Main selection | `3 butterfly chain 55/main-image.png` |
| `butterfly-stone-bangles` | Butterfly Stone Bangles | Bangles & Bracelets | Black, Red, Sky Blue, White, Pink, Gold | `Bracelet/<selection>/main-image.png` |
| `butterfly-chain-source-b` | Butterfly Chain — Source Group B | Necklaces & Pendants | Main selection | `Butterfly chain 55/main-image.png` |
| `earrings-multicolor-source-group` | Earrings — Multicolor Source Group | Earrings & Jhumkas | Main selection | `Earrings with box multicolor/main-image.png` |
| `earrings-silver-color-source-group` | Earrings — Silver-color Source Group | Earrings & Jhumkas | Main selection | `Earrings with box silver color/main-image.png` |
| `hair-accessories-box-source-group` | Hair Accessories — Box Source Group | Hair Accessories | Plastic box, Polythene box | `Hair accessories box/<selection>/main-image.png` |
| `hair-clip-source-a` | Hair Clip — Source Group A | Hair Accessories | Main selection | `Hair clip far 220/main-image.png` |
| `hair-clip-source-b` | Hair Clip — Source Group B | Hair Accessories | Main selection | `Hair clip plastic 96/main-image.png` |
| `heart-chain` | Heart Chain | Necklaces & Pendants | Main selection | `Heart chain 35/main-image.png` |
| `oxidised-necklace-jhumki-source-group` | Necklace & Jhumki — Oxidised Silver Source Group | Necklaces & Pendants | Black stone, Multicolor stone | `Necklace & Jhumki oxidies silver/<selection>/main-image.png` |
| `oxidised-earrings` | Oxidised Earrings | Earrings & Jhumkas | Golden, Silver | `oxidised earrings/<selection>/main-image.png` |
| `oxidised-silver-earrings-jhumka-source-group` | Oxidised Silver-color Earrings & Jhumka Source Group | Earrings & Jhumkas | Circle stone, Floral stone | `Oxidised silver color Earrings and Jhumka/<selection>/main-image.png` |
| `square-chain` | Square Chain | Necklaces & Pendants | Main selection | `Square chain 55/main-image.png` |

### Confirmed interactive-variant prototype

`Butterfly Stone Bangles` is the one product name supplied for this prototype. Its six folder-labelled colour selections are implemented as an interactive review control:

- Black
- Red
- Sky Blue
- White
- Pink
- Gold

Choosing a selection updates the selected main image, displayed selected name, thumbnail state, URL `variant` parameter, and local browser preference. This is a prototype interaction only; it does not assert that every selection is an active marketplace variant.

### Media-role boundary

Each selection has a verified `main-image.png` marker. The remaining 122 uploaded images are recorded only as unassigned secondary media counts. They are not automatically shown in product galleries because their roles (detail image, packaging, guide, advertisement, or another use) are not verified.

## Duplicate and organisation review

### Exact duplicates

No two image files share the same SHA-256 hash.

### Same filename in different folders

One filename is repeated with a casing difference. The two files have different hashes, so they are not exact duplicates. Confirm whether they are intended as separate assets or alternate versions:

- `Bracelet/Black/Grace in Every Detail Jewelry ad.png`
- `Bracelet/Red/Grace in Every Detail Jewelry Ad.png`

### Organisation items requiring review

These are review flags, not confirmed errors:

1. Product assets were moved from `public/brand/Product images/` to the approved `public/products/` directory after explicit approval. Brand assets remain under `public/brand/`.
2. `3 butterfly chain 55` and `Butterfly chain 55` have closely related folder labels. Confirm whether they are different products, package/design variations, or one product split across folders.
3. Multiple folder labels include numbers: `255`, `55`, `220`, `96`, `35`, `42`, and `72`. They are confirmed as internal price references. Do not expose them in public product names, product cards, metadata, search results, or marketplace controls.
4. Casing and spelling are inconsistent: `white` vs title-cased colour folders, `oxidised` vs `Oxidised`, `oxidies`, `color` and `multicolor`/`Multicolor`.
5. Folder labels mix product family, presentation/packaging, and possible variant terms (for example, `Earrings with box silver color`, `Hair accessories box`, and `Hair clip far 220`). Confirm the intended catalogue product/variant hierarchy.
6. Several folders contain images whose labels indicate guides, dimensions, details, advertisements, or infographics. Keep these as secondary media unless you approve their use in catalogue listings.

## Recommended naming structure — proposal only

Do not rename existing files until the product model and primary-image selections are approved. A consistent future structure could be:

```text
public/products/
  <product-id>/
    <variant-id>/
      01-main.png
      02-front.png
      03-detail.png
      04-lifestyle.png
      05-size-guide.png
      06-packaging.png
```

Guidelines:

- Use stable internal IDs or slugs for directories; maintain public display names in structured catalogue data later.
- Keep the primary image explicit as `01-main`.
- Use a controlled role vocabulary such as `front`, `back`, `detail`, `lifestyle`, `size-guide`, `packaging`, and `infographic`.
- Keep a variant only when it represents a verified selectable option, for example an approved colour or design value.
- Do not encode prices, marketplace names, or unverified claims in filenames.

## Manual verification required before catalogue development

1. Confirm public product names for all 14 top-level folders.
2. Confirm whether each child folder is a purchasable variant, packaging difference, colour/design variation, or a separate product.
3. Preserve numeric suffixes as private price references only; they must be excluded from all public labels and UI.
4. Mark images that are permitted in product listings versus support-only images such as size guides, infographics, and advertisements.
5. Confirm whether the repeated `Grace in Every Detail` file labels refer to distinct variant artwork.
6. Provide factual descriptions, materials, specifications, category assignments, product IDs, and verified marketplace destinations separately; none has been inferred by this report.

## Current conclusion

The product image library is substantial enough to begin catalogue planning after the manual verification list is resolved. This report does not authorize production implementation, asset restructuring, product claims, price display, or marketplace linking.
