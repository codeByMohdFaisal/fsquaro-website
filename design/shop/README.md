# FSquaro Shop Prototype

This standalone HTML/CSS/JavaScript prototype renders the 14 local parent product groups from `../catalogue-data.js`. It is separate from the production Next.js application.

## Review behaviour

- One card is rendered per parent product group; folder-labelled variants are not duplicated as cards.
- The search matches review labels, approved category names, and folder-labelled option terms.
- The four category filters are Earrings & Jhumkas, Necklaces & Pendants, Bangles & Bracelets, and Hair Accessories.
- A `category` query parameter from the homepage selects the appropriate filter.
- Cards lead only to the local Product Detail prototype.
- All records remain review-only. No price, stock, purchase action, cart, checkout, or marketplace URL is present.

## Responsive layout

| Reference width | Layout |
| --- | --- |
| 1440px | Sticky filter column and a three-column product grid |
| 768px | Filters move above a two-column grid; mobile navigation is available |
| 390px | Compact controls and a single-column product grid below 480px |

To review it, open `index.html` directly, or begin at `../homepage/index.html` and choose Shop.
