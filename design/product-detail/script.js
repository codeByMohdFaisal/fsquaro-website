const detailRoot = document.documentElement;
const detailStorageKey = "fsquaro-prototype-theme";
const detailThemeToggle = document.querySelector("[data-theme-toggle]");
const detailThemeIcon = document.querySelector("[data-theme-icon]");
const detailMenuToggle = document.querySelector("[data-menu-toggle]");
const detailMobileNav = document.querySelector("#mobile-nav");
const detailHost = document.querySelector("[data-product-detail]");
const relatedHost = document.querySelector("[data-related-products]");
const breadcrumbCurrent = document.querySelector("[data-breadcrumb-current]");
const { catalogue, categoryById } = window.FSQUARO_CATALOGUE;

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
}

function applyTheme(theme) {
  detailRoot.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  detailThemeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  detailThemeIcon.innerHTML = theme === "dark"
    ? '<path d="M12 3v2.1M12 18.9V21M3 12h2.1M18.9 12H21M5.65 5.65l1.48 1.48M16.87 16.87l1.48 1.48M18.35 5.65l-1.48 1.48M7.13 16.87l-1.48 1.48"></path><circle cx="12" cy="12" r="3.7"></circle>'
    : '<path d="M20.2 15.4A7.7 7.7 0 0 1 8.6 3.8 8.3 8.3 0 1 0 20.2 15.4Z"></path>';
}

try {
  const storedTheme = localStorage.getItem(detailStorageKey);
  if (storedTheme === "light" || storedTheme === "dark") applyTheme(storedTheme);
} catch { /* Theme preference is optional. */ }

detailThemeToggle.addEventListener("click", () => {
  const theme = detailRoot.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem(detailStorageKey, theme); } catch { /* no persistence available */ }
});

detailMenuToggle.addEventListener("click", () => {
  const open = detailMobileNav.classList.toggle("is-open");
  detailMenuToggle.setAttribute("aria-expanded", String(open));
});

const params = new URLSearchParams(window.location.search);
const product = catalogue.find((item) => item.slug === params.get("product")) || catalogue.find((item) => item.slug === "butterfly-stone-bangles") || catalogue[0];
const requestedVariant = params.get("variant");
const variantStorageKey = `fsquaro-prototype-variant:${product.slug}`;
let selectedVariantId = product.variants.some((variant) => variant.id === requestedVariant) ? requestedVariant : product.variants[0].id;

if (!requestedVariant) {
  try {
    const storedVariant = localStorage.getItem(variantStorageKey);
    if (product.variants.some((variant) => variant.id === storedVariant)) selectedVariantId = storedVariant;
  } catch { /* Variant selection still works without storage. */ }
}

function selectedVariant() {
  return product.variants.find((variant) => variant.id === selectedVariantId) || product.variants[0];
}

function displayName(variant) {
  const base = product.publicName || product.reviewLabel;
  return product.variants.length > 1 && variant.label !== "Main selection" ? `${base} — ${variant.label}` : base;
}

function colorForVariant(label) {
  const colors = { Black: "#14191f", Red: "#c73c45", "Sky Blue": "#82c7ef", White: "#ffffff", Pink: "#f49cb7", Gold: "#bd9145", Golden: "#bd9145", Silver: "#b8c0cc" };
  return colors[label] || "#9fb3c8";
}

function renderVariantOption(variant) {
  const isActive = variant.id === selectedVariantId;
  const isColor = Boolean(variant.attributes.color);
  const swatch = isColor ? `<span class="color-swatch" style="--swatch: ${colorForVariant(variant.label)}" aria-hidden="true"></span>` : "";
  return `<button class="variant-button${isActive ? " is-active" : ""}" type="button" data-variant-id="${escapeHtml(variant.id)}" aria-pressed="${isActive}">${swatch}${escapeHtml(variant.label)}</button>`;
}

function renderDetail() {
  const variant = selectedVariant();
  const category = categoryById[product.categoryId];
  const title = displayName(variant);
  const hasConfirmedName = Boolean(product.publicName);
  const selectorTitle = product.variants.some((item) => item.attributes.color) ? "Select colour" : "Select available option";
  const gallery = product.variants.map((item) => `
    <button class="thumbnail${item.id === selectedVariantId ? " is-active" : ""}" type="button" data-gallery-variant="${escapeHtml(item.id)}" aria-label="Select ${escapeHtml(item.label)} primary image">
      <img src="${item.mainImage}" alt="${escapeHtml(item.label)} primary image" />
    </button>
  `).join("");

  detailHost.innerHTML = `
    <div class="product-layout">
      <div class="gallery" aria-label="Product image gallery">
        <div class="thumbnail-list">${gallery}</div>
        <div class="main-image"><img src="${variant.mainImage}" alt="Selected primary image for ${escapeHtml(title)}" /><span class="image-label">Selected primary</span></div>
        <p class="gallery-note">${variant.secondaryImageCount} additional uploaded image${variant.secondaryImageCount === 1 ? "" : "s"} are awaiting role review and are not presented as product-gallery media.</p>
      </div>
      <div class="product-info">
        <p class="eyebrow">${escapeHtml(category.name)} · catalogue review</p>
        <h1 id="product-title">${escapeHtml(title)}</h1>
        <p class="review-status"><strong>${hasConfirmedName ? "Name supplied for prototype." : "Public product name pending approval."}</strong> This page uses selected main-image markers only.</p>
        <div class="detail-divider"></div>
        ${product.variants.length > 1 ? `
          <section class="variant-group" aria-labelledby="variant-title">
            <h2 id="variant-title">${selectorTitle}</h2>
            <p class="variant-helper">Choose a folder-labelled option to update the selected image and review state.</p>
            <div class="variant-options">${product.variants.map(renderVariantOption).join("")}</div>
            <p class="variant-selected">Selected: <strong>${escapeHtml(variant.label)}</strong></p>
          </section>
          <div class="detail-divider"></div>
        ` : ""}
        <section class="availability" aria-label="Marketplace availability">
          <h2>Marketplace availability</h2>
          <p>No verified marketplace link has been supplied for this product group. A purchase action will appear only after a destination is verified.</p>
        </section>
        <p class="prototype-note">Design prototype only. No price, stock, checkout, cart, or unverified product specification is shown.</p>
      </div>
    </div>
  `;
  document.title = `FSquaro | ${title} review`;
  breadcrumbCurrent.textContent = product.publicName || product.reviewLabel;
}

function renderRelated() {
  const related = catalogue.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 3);
  relatedHost.innerHTML = related.length ? related.map((item) => {
    const title = item.publicName || item.reviewLabel;
    return `<article class="related-card"><a class="related-image" href="index.html?product=${encodeURIComponent(item.slug)}"><img src="${item.variants[0].mainImage}" alt="Selected primary image for ${escapeHtml(title)}" /></a><div class="related-copy"><p>${escapeHtml(categoryById[item.categoryId].name)}</p><h3><a href="index.html?product=${encodeURIComponent(item.slug)}">${escapeHtml(title)}</a></h3></div></article>`;
  }).join("") : "";
}

function updateSelection(variantId) {
  if (!product.variants.some((variant) => variant.id === variantId)) return;
  selectedVariantId = variantId;
  const url = new URL(window.location.href);
  url.searchParams.set("product", product.slug);
  url.searchParams.set("variant", selectedVariantId);
  window.history.replaceState({}, "", url);
  try { localStorage.setItem(variantStorageKey, selectedVariantId); } catch { /* no persistence available */ }
  renderDetail();
}

detailHost.addEventListener("click", (event) => {
  const control = event.target.closest("[data-variant-id], [data-gallery-variant]");
  if (!control) return;
  updateSelection(control.dataset.variantId || control.dataset.galleryVariant);
});

renderDetail();
renderRelated();
