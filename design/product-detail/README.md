# FSquaro Product Detail Prototype

This standalone page demonstrates parent-product and variant behaviour using `../catalogue-data.js`. It is not a production Next.js route.

## Variant review behaviour

`?product=butterfly-stone-bangles` opens the supplied prototype product. Its Black, Red, Sky Blue, White, Pink, and Gold controls update:

- the selected primary image;
- active thumbnail and selector state;
- displayed selected name;
- `product` and `variant` URL parameters with `history.replaceState`; and
- the browser-local variant preference when `localStorage` is available.

Other folder-labelled selections use the same prototype mechanism where they exist. Only `main-image.png` is shown as media; other assets remain unassigned until their roles are approved.

No verified marketplace URL has been provided, so the page contains an informational availability state instead of an active purchase control.

## Responsive layout

| Reference width | Layout |
| --- | --- |
| 1440px | Image gallery and product-information columns |
| 768px | Stacked gallery and details; related products remain in a grid |
| 390px | Thumbnails move below the main image and related cards become one column |

Example direct-file URL:

```text
index.html?product=butterfly-stone-bangles&variant=gold
```
