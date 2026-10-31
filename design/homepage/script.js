const root = document.documentElement;
const body = document.body;
const storageKey = "fsquaro-prototype-theme";
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const searchOpen = document.querySelector("[data-search-open]");
const searchClose = document.querySelector("[data-search-close]");
const searchOverlay = document.querySelector("#search-overlay");
const searchInput = document.querySelector("#catalogue-search");
const searchState = document.querySelector("[data-search-state]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("#mobile-nav");
const featuredProductsHost = document.querySelector("[data-featured-products]");
const { catalogue, categoryById } = window.FSQUARO_CATALOGUE;

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
  })[character]);
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeIcon.innerHTML = theme === "dark"
    ? '<path d="M12 3v2.1M12 18.9V21M3 12h2.1M18.9 12H21M5.65 5.65l1.48 1.48M16.87 16.87l1.48 1.48M18.35 5.65l-1.48 1.48M7.13 16.87l-1.48 1.48"></path><circle cx="12" cy="12" r="3.7"></circle>'
    : '<path d="M20.2 15.4A7.7 7.7 0 0 1 8.6 3.8 8.3 8.3 0 1 0 20.2 15.4Z"></path>';
}

try {
  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === "light" || storedTheme === "dark") applyTheme(storedTheme);
} catch {
  // Theme persistence is optional when browser storage is unavailable.
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem(storageKey, nextTheme);
  } catch {
    // The visual toggle remains available without storage.
  }
});

function closeSearch() {
  searchOverlay.hidden = true;
  body.classList.remove("no-scroll");
  searchOpen.setAttribute("aria-expanded", "false");
  searchOpen.focus();
}

function openSearch() {
  searchOverlay.hidden = false;
  body.classList.add("no-scroll");
  searchOpen.setAttribute("aria-expanded", "true");
  searchInput.focus();
}

searchOpen.addEventListener("click", openSearch);
searchClose.addEventListener("click", closeSearch);

searchOverlay.addEventListener("click", (event) => {
  if (event.target === searchOverlay) closeSearch();
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();
    const matches = catalogue.filter((product) => {
      const variantTerms = product.variants.flatMap((variant) => [variant.label, ...Object.values(variant.attributes)]);
      return [product.publicName, product.reviewLabel, categoryById[product.categoryId].name, ...product.searchTerms, ...variantTerms]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    });
    if (matches.length) {
      const resultItems = matches.map((product) => {
        const name = product.publicName || product.reviewLabel;
        const category = categoryById[product.categoryId].name;
        return `<a class="search-result" href="../product-detail/index.html?product=${encodeURIComponent(product.slug)}"><div><h3>${escapeHtml(name)}</h3><p>${escapeHtml(category)}</p></div><span>View Details</span></a>`;
      }).join("");
      searchState.innerHTML = `<h2>${matches.length} product${matches.length === 1 ? "" : "s"} found</h2><div class="search-result-list">${resultItems}</div>`;
    } else {
      searchState.innerHTML = "<h2>No matching products</h2><p>Try a product name or category such as Earrings, Necklace, Bangles, or Hair Accessories.</p>";
    }
  } else {
    searchState.innerHTML = "<h2>Search ready</h2><p>Start typing to search all local product groups.</p>";
  }
});

function renderFeaturedProducts() {
  const featured = catalogue.filter((product) => product.featured).slice(0, 8);
  featuredProductsHost.innerHTML = featured.map((product) => {
    const name = product.publicName || product.reviewLabel;
    const category = categoryById[product.categoryId].name;
    return `<article class="product-card">
      <a class="product-art" href="../product-detail/index.html?product=${encodeURIComponent(product.slug)}"><img src="${product.variants[0].mainImage}" alt="Selected primary product image for ${escapeHtml(name)}" /></a>
      <div class="product-copy"><p>${escapeHtml(category)}</p><h3>${escapeHtml(name)}</h3><a class="button button-secondary" href="../product-detail/index.html?product=${encodeURIComponent(product.slug)}">View Details</a></div>
    </article>`;
  }).join("");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !searchOverlay.hidden) closeSearch();
});

renderFeaturedProducts();
