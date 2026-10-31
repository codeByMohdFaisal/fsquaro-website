# Catalogue Data Architecture — Review Stage

## Purpose and scope

This is a local, typed catalogue proposal for the FSquaro design prototypes. It supports product discovery and product/variant review without a database, API, cart, checkout, authentication, stock system, or marketplace integration.

The production Next.js homepage remains unchanged. The prototypes use `design/catalogue-data.js`; the production-ready TypeScript source of truth proposal is `src/data/catalogue.ts`.

## Model

```text
Category
  └── Product (parent product group)
        └── ProductVariant (folder-labelled selection)
              └── mainImage + unassigned secondary-image count
```

- `Category`: the four approved discovery groups: Earrings & Jhumkas, Necklaces & Pendants, Bangles & Bracelets, and Hair Accessories.
- `Product`: has a stable ID/slug, review label, visibility state, verification state, category, search terms, and zero or more verified marketplace links.
- `ProductVariant`: stores a stable ID, folder-labelled selection, optional colour/design/packaging attribute, selected `main-image.png`, and secondary-media count.

## Verification rules

1. All 14 product groups are `visibility: "review"`; none are marked `published`.
2. All names/attributes are `verificationStatus: "needs-review"`, except that `Butterfly Stone Bangles` was supplied for prototype use. It remains review-only until overall catalogue approval.
3. Source directory labels are stored for asset traceability only. Their numeric fragments are internal price references and are never rendered by the prototypes.
4. Product records have an empty `marketplaceLinks` list until the owner provides a verified external URL. The prototype shows informational availability copy instead of an active purchase action.
5. Only `main-image.png` is assigned a display role. Other assets are not promoted to gallery images or product claims until reviewed.

## Data locations

| Location | Responsibility |
| --- | --- |
| `src/data/catalogue.ts` | Strict TypeScript interfaces and review-stage catalogue records. This file is not imported by the current production UI. |
| `design/catalogue-data.js` | Browser-ready mirror used by standalone HTML prototypes. Keep synchronized with the TypeScript model until a production integration is separately approved. |
| `design/shop/` | Parent-product catalogue prototype with category filtering and local search. |
| `design/product-detail/` | Product-detail/variant interaction prototype. |
| `docs/product-inventory.md` | Asset audit, folder-to-data mapping, and verification backlog. |

## Publishing path

Before production implementation, an owner must provide or approve, per product:

1. Public product name and product ID/SKU.
2. Whether every child directory represents a purchasable variant, packaging selection, design choice, or a separate product.
3. Correct category, factual specifications, descriptions, and permitted secondary-media roles.
4. Verified external marketplace destination(s).
5. Publication approval.

At that point, the data can move from `review` to `published` and a separately approved Next.js catalogue implementation can filter to published parent products only.
