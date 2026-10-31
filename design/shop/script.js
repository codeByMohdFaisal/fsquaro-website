const shopRoot = document.documentElement;
const shopStorageKey = "fsquaro-prototype-theme";
const shopThemeToggle = document.querySelector("[data-theme-toggle]");
const shopThemeIcon = document.querySelector("[data-theme-icon]");
const shopMenuToggle = document.querySelector("[data-menu-toggle]");
const shopMobileNav = document.querySelector("#mobile-nav");
const productSearch = document.querySelector("#product-search");
const categoryFilters = document.querySelector("[data-category-filters]");
const productGrid = document.querySelector("[data-product-grid]");
const resultCount = document.querySelector("[data-result-count]");
const clearFilters = document.querySelector("[data-clear-filters]");
const { catalogue, categories, categoryById } = window.FSQUARO_CATALOGUE;

const searchParams = new URLSearchParams(window.location.search);
const requestedCategory = searchParams.get("category");
const initialCategory = categories.some((category) => category.id === requestedCategory) ? requestedCategory : "all";
const state = { query: "", category: initialCategory };

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
}

function applyTheme(theme) {
  shopRoot.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  shopThemeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  shopThemeIcon.innerHTML = theme === "dark"
    ? '<path d="M12 3v2.1M12 18.9V21M3 12h2.1M18.9 12H21M5.65 5.65l1.48 1.48M16.87 16.87l1.48 1.48M18.35 5.65l-1.48 1.48M7.13 16.87l-1.48 1.48"></path><circle cx="12" cy="12" r="3.7"></circle>'
    : '<path d="M20.2 15.4A7.7 7.7 0 0 1 8.6 3.8 8.3 8.3 0 1 0 20.2 15.4Z"></path>';
}

try {
  const storedTheme = localStorage.getItem(shopStorageKey);
  if (storedTheme === "light" || storedTheme === "dark") applyTheme(storedTheme);
} catch { /* Theme preference is optional. */ }

shopThemeToggle.addEventListener("click", () => {
  const theme = shopRoot.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem(shopStorageKey, theme); } catch { /* no persistence available */ }
});

function renderCategoryFilters() {
  const options = [{ id: "all", name: "All categories" }, ...categories];
  categoryFilters.innerHTML = options.map((category) => `
    <button class="filter-button${state.category === category.id ? " is-active" : ""}" type="button" data-category="${category.id}" aria-pressed="${state.category === category.id}">
      ${escapeHtml(category.name)}
    </button>
  `).join("");
}

function searchableText(product) {
  const variantTerms = product.variants.flatMap((variant) => [variant.label, ...Object.values(variant.attributes)]);
  return [product.publicName, product.reviewLabel, categoryById[product.categoryId].name, ...product.searchTerms, ...variantTerms].filter(Boolean).join(" ").toLocaleLowerCase();
}

function filteredProducts() {
  const query = state.query.trim().toLocaleLowerCase();
  return catalogue.filter((product) => {
    const matchesCategory = state.category === "all" || product.categoryId === state.category;
    return matchesCategory && (!query || searchableText(product).includes(query));
  });
}

function productCard(product) {
  const category = categoryById[product.categoryId];
  const title = product.publicName || product.reviewLabel;
  const nameStatus = product.publicName ? "Public name confirmed for review." : "Public product name pending approval.";
  const image = product.variants[0].mainImage;
  return `
    <article class="product-card">
      <a class="product-image" href="../product-detail/index.html?product=${encodeURIComponent(product.slug)}" aria-label="View ${escapeHtml(title)} details">
        <img src="${image}" alt="Selected primary product image for ${escapeHtml(title)}" />
      </a>
      <div class="product-copy">
        <div class="card-meta"><span>${escapeHtml(category.name)}</span><span class="review-badge">Review</span></div>
        <h3>${escapeHtml(title)}</h3>
        <p class="name-status">${nameStatus}</p>
        <a class="detail-link" href="../product-detail/index.html?product=${encodeURIComponent(product.slug)}">View details</a>
      </div>
    </article>
  `;
}

function renderProducts() {
  const products = filteredProducts();
  resultCount.textContent = `${products.length} of ${catalogue.length} product groups`;
  productGrid.innerHTML = products.length
    ? products.map(productCard).join("")
    : '<div class="empty-state"><h3>No matches found</h3><p>Try a broader search, another category, or clear the filters.</p><button class="detail-link" type="button" data-empty-clear>Clear filters</button></div>';
}

function updateCatalogue() {
  renderCategoryFilters();
  renderProducts();
}

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  updateCatalogue();
});

productSearch.addEventListener("input", () => {
  state.query = productSearch.value;
  renderProducts();
});

function resetFilters() {
  state.category = "all";
  state.query = "";
  productSearch.value = "";
  updateCatalogue();
}

clearFilters.addEventListener("click", resetFilters);
productGrid.addEventListener("click", (event) => {
  if (event.target.closest("[data-empty-clear]")) resetFilters();
});

shopMenuToggle.addEventListener("click", () => {
  const open = shopMobileNav.classList.toggle("is-open");
  shopMenuToggle.setAttribute("aria-expanded", String(open));
});

updateCatalogue();
