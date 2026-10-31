"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Gem,
  ImageIcon,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  catalogue,
  categoryById,
  type CategoryId,
  type Product,
} from "../data/catalogue";

const categoryCards: ReadonlyArray<{
  id: CategoryId;
  image: string;
  description: string;
}> = [
  {
    id: "earrings-jhumkas",
    image: "/products/oxidised%20earrings/Golden/main-image.png",
    description: "From everyday pairs to statement jhumkas.",
  },
  {
    id: "necklaces-pendants",
    image: "/products/Butterfly%20chain%2055/main-image.png",
    description: "Layers and details for a finishing touch.",
  },
  {
    id: "bangles-bracelets",
    image: "/products/Bracelet/Gold/main-image.png",
    description: "Colourful accents made to stack and style.",
  },
  {
    id: "hair-accessories",
    image: "/products/Hair%20accessories%20box/Plastic%20box%2072/main-image.png",
    description: "Small details with plenty of personality.",
  },
];

const featuredProducts = catalogue.filter((product) => product.featured).slice(0, 7);

function productName(product: Product) {
  return product.publicName ?? categoryById[product.categoryId].name;
}

function productSearchTerms(product: Product) {
  const variantTerms = product.variants.flatMap((variant) => [
    variant.label,
    ...Object.values(variant.attributes),
  ]);

  return [
    product.publicName,
    product.reviewLabel,
    categoryById[product.categoryId].name,
    ...product.searchTerms,
    ...variantTerms,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
}

export default function HomeExperience() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchMatches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return [];

    return catalogue.filter((product) =>
      productSearchTerms(product).includes(normalizedQuery),
    );
  }, [query]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isSearchOpen);
    if (isSearchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 0);
    }

    return () => document.body.classList.remove("modal-open");
  }, [isSearchOpen]);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeWithEscape);
    return () => document.removeEventListener("keydown", closeWithEscape);
  }, []);

  function closeSearch() {
    setIsSearchOpen(false);
    searchButtonRef.current?.focus();
  }

  function closeMobileNavigation() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#home" aria-label="FSquaro home">
            <Image
              className="brand-logo brand-logo-light"
              src="/brand/logo-horizontal-1200w.png"
              alt="FSquaro"
              width={210}
              height={70}
              priority
            />
            <Image
              className="brand-logo brand-logo-dark"
              src="/brand/logo-horizontal-white-1200w.png"
              alt="FSquaro"
              width={210}
              height={70}
              priority
            />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="#collections">Collections</a>
            <a href="#featured">Featured</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              onClick={() => setIsSearchOpen(true)}
              ref={searchButtonRef}
              aria-label="Search the catalogue"
              aria-expanded={isSearchOpen}
              aria-controls="catalogue-search-dialog"
            >
              <Search size={19} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {theme === "dark" ? (
                <Sun size={18} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Moon size={18} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
            <button
              className="icon-button menu-toggle"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X size={21} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <nav
          className={"site-shell mobile-nav" + (isMenuOpen ? " is-open" : "")}
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <a href="#home" onClick={closeMobileNavigation}>
            Home
          </a>
          <a href="#collections" onClick={closeMobileNavigation}>
            Collections
          </a>
          <a href="#featured" onClick={closeMobileNavigation}>
            Featured
          </a>
          <a href="#about" onClick={closeMobileNavigation}>
            About
          </a>
          <a href="#contact" onClick={closeMobileNavigation}>
            Contact
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">FSquaro jewellery &amp; accessories</p>
              <h1 id="hero-title">Jewellery for Every Story</h1>
              <p className="hero-description">
                Discover fashion jewellery and accessories made to complement your
                everyday style and special moments.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#collections">
                  Explore collections <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href="#featured">
                  View featured pieces
                </a>
              </div>
              <div className="hero-note">
                <Sparkles size={16} aria-hidden="true" />
                <span>Thoughtful details for every mood and moment.</span>
              </div>
            </div>

            <div className="hero-media">
              <Image
                src="/products/oxidised%20earrings/Golden/main-image.png"
                alt="FSquaro golden oxidised earrings"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 50vw"
              />
              <span className="hero-media-tag">FSquaro</span>
              <span className="hero-media-orbit hero-media-orbit-one" aria-hidden="true" />
              <span className="hero-media-orbit hero-media-orbit-two" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="discovery" aria-labelledby="discovery-title">
          <div className="site-shell discovery-grid">
            <div className="discovery-intro">
              <p className="eyebrow" id="discovery-title">
                Discover FSquaro
              </p>
              <p>
                A visual catalogue designed to make finding your next style easy.
              </p>
            </div>
            <article className="discovery-card">
              <span className="discovery-icon" aria-hidden="true">
                <Gem size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h2>Explore collections</h2>
                <p>Browse jewellery and accessories by category.</p>
              </div>
            </article>
            <article className="discovery-card">
              <span className="discovery-icon" aria-hidden="true">
                <ImageIcon size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h2>Discover the details</h2>
                <p>See original product photography up close.</p>
              </div>
            </article>
            <article className="discovery-card">
              <span className="discovery-icon" aria-hidden="true">
                <Sparkles size={22} strokeWidth={1.5} />
              </span>
              <div>
                <h2>Find your style</h2>
                <p>Search the collection by product or category.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="collections" aria-labelledby="collections-title">
          <div className="site-shell">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Browse by style</p>
                <h2 id="collections-title">Shop by Category</h2>
                <p className="section-intro">
                  Explore the collection through original FSquaro product imagery.
                </p>
              </div>
              <a className="inline-link" href="#featured">
                See featured pieces <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="category-grid">
              {categoryCards.map((category) => {
                const categoryName = categoryById[category.id].name;
                return (
                  <a
                    className="category-card"
                    href="#featured"
                    key={category.id}
                    aria-label={"View " + categoryName}
                  >
                    <span className="category-image">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 25vw"
                      />
                    </span>
                    <span className="category-content">
                      <span className="category-title">{categoryName}</span>
                      <span className="category-description">{category.description}</span>
                      <span className="category-link">
                        Explore collection <ChevronRight size={16} aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="featured" aria-labelledby="featured-title">
          <div className="site-shell">
            <div className="section-heading-row section-heading-stack">
              <div>
                <p className="eyebrow">A considered edit</p>
                <h2 id="featured-title">Featured Pieces</h2>
                <p className="section-intro">
                  A first look at selected FSquaro collections. More product details
                  and verified purchase links can be added after catalogue review.
                </p>
              </div>
            </div>

            <div className="product-grid">
              {featuredProducts.map((product) => {
                const categoryName = categoryById[product.categoryId].name;
                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-image">
                      <Image
                        src={product.variants[0].mainImage}
                        alt={"FSquaro " + categoryName + " selection"}
                        fill
                        sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                      />
                    </div>
                    <div className="product-copy">
                      <p>{categoryName}</p>
                      <h3>{productName(product)}</h3>
                      <a className="product-link" href="#collections">
                        Explore collection <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="site-shell about-grid">
            <div className="about-image">
              <Image
                src="/products/Butterfly%20chain%2055/main-image.png"
                alt="FSquaro butterfly chain"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
              />
              <span className="about-image-label">FSquaro</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">About FSquaro</p>
              <h2 id="about-title">Small details, personal style.</h2>
              <p>
                FSquaro brings together fashion jewellery and accessories in a
                growing collection of pieces for different occasions and ways of
                styling.
              </p>
              <a className="button button-primary" href="#collections">
                Discover the collection <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="style-strip" aria-label="FSquaro visual highlights">
          <div className="site-shell style-grid">
            <div className="style-copy">
              <p className="eyebrow">Style inspiration</p>
              <h2>Pieces made to be mixed, matched, and made your own.</h2>
            </div>
            <div className="style-gallery">
              {categoryCards.slice(0, 3).map((category, index) => (
                <div className="style-image" key={category.id}>
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 620px) 50vw, 20vw"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="site-shell footer-grid">
          <div className="footer-brand">
            <Image
              src="/brand/logo-horizontal-white-1200w.png"
              alt="FSquaro"
              width={190}
              height={64}
            />
            <p>Fashion jewellery and accessories for everyday style and special moments.</p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="#collections">Collections</a>
            <a href="#featured">Featured pieces</a>
            <a href="#about">About FSquaro</a>
          </div>
          <div className="footer-column">
            <h2>Categories</h2>
            {categoryCards.slice(0, 3).map((category) => (
              <a href="#collections" key={category.id}>
                {categoryById[category.id].name}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <h2>Keep in touch</h2>
            <p>Contact details and verified social links will be added here.</p>
          </div>
        </div>
        <div className="site-shell footer-bottom">
          <span>© FSquaro</span>
          <span>Catalogue details are being refined.</span>
        </div>
      </footer>

      {isSearchOpen ? (
        <div
          className="search-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            className="search-dialog"
            id="catalogue-search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <div className="search-dialog-heading">
              <div>
                <p className="eyebrow">FSquaro catalogue</p>
                <h2 id="search-title">Find your style</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <X size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <label className="search-field" htmlFor="catalogue-query">
              <Search size={20} aria-hidden="true" />
              <span className="visually-hidden">Search the catalogue</span>
              <input
                id="catalogue-query"
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try earrings, necklace, bangles..."
                autoComplete="off"
              />
            </label>
            <div className="search-results" aria-live="polite">
              {query.trim().length === 0 ? (
                <p>Search by a category or product style to explore the current collection.</p>
              ) : searchMatches.length === 0 ? (
                <p>No matching pieces yet. Try a category such as earrings or hair accessories.</p>
              ) : (
                <>
                  <p className="search-results-count">
                    {searchMatches.length} matching{" "}
                    {searchMatches.length === 1 ? "collection" : "collections"}
                  </p>
                  <div className="search-results-list">
                    {searchMatches.map((product) => (
                      <a
                        href="#featured"
                        className="search-result"
                        onClick={closeSearch}
                        key={product.id}
                      >
                        <span>
                          <strong>{productName(product)}</strong>
                          <small>{categoryById[product.categoryId].name}</small>
                        </span>
                        <ArrowRight size={17} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
