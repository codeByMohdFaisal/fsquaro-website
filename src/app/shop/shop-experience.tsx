"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { CatalogueFooter, CatalogueHeader } from "../catalogue-chrome";
import {
  catalogue,
  categories,
  categoryById,
  getProductDisplayName,
  type CategoryId,
  type Product,
} from "../../data/catalogue";

type ActiveCategory = CategoryId | "all";

function searchableText(product: Product) {
  const variantTerms = product.variants.flatMap((variant) => [
    variant.label,
    ...Object.values(variant.attributes),
  ]);

  return [
    getProductDisplayName(product),
    product.reviewLabel,
    categoryById[product.categoryId].name,
    ...product.searchTerms,
    ...variantTerms,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
}

export default function ShopExperience() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return catalogue.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.categoryId === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText(product).includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  function clearFilters() {
    setQuery("");
    setActiveCategory("all");
  }

  return (
    <>
      <a className="skip-link" href="#catalogue">
        Skip to catalogue
      </a>
      <CatalogueHeader activePage="shop" />

      <main>
        <section className="catalogue-hero">
          <div className="site-shell">
            <p className="eyebrow">FSquaro catalogue</p>
            <h1>Explore what FSquaro has to offer.</h1>
            <p>
              Browse the current selection, filter by category, and open each
              product group to see its available variations. New categories,
              including food, can join the catalogue as they are added.
            </p>
          </div>
        </section>

        <section className="catalogue-section" id="catalogue" aria-labelledby="catalogue-title">
          <div className="site-shell">
            <div className="catalogue-heading">
              <div>
                <p className="eyebrow">Explore the collection</p>
                <h2 id="catalogue-title">All product groups</h2>
              </div>
              <p className="catalogue-count" aria-live="polite">
                {filteredProducts.length} of {catalogue.length} product groups
              </p>
            </div>

            <div className="catalogue-layout">
              <aside className="catalogue-filters" aria-label="Product filters">
                <div className="filter-heading">
                  <SlidersHorizontal size={17} aria-hidden="true" />
                  <span>Filter the catalogue</span>
                </div>
                <label className="catalogue-search" htmlFor="catalogue-search">
                  <Search size={18} aria-hidden="true" />
                  <span className="visually-hidden">Search product groups</span>
                  <input
                    id="catalogue-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search style, colour, or category"
                    autoComplete="off"
                  />
                </label>

                <fieldset className="filter-options">
                  <legend>Category</legend>
                  <button
                    className={
                      "filter-option" + (activeCategory === "all" ? " is-active" : "")
                    }
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    aria-pressed={activeCategory === "all"}
                  >
                    All categories
                  </button>
                  {categories.map((category) => (
                    <button
                      className={
                        "filter-option" +
                        (activeCategory === category.id ? " is-active" : "")
                      }
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      aria-pressed={activeCategory === category.id}
                      key={category.id}
                    >
                      {category.name}
                    </button>
                  ))}
                </fieldset>

                <button className="clear-filters" type="button" onClick={clearFilters}>
                  <X size={15} aria-hidden="true" />
                  Clear filters
                </button>
              </aside>

              <div className="catalogue-results">
                {filteredProducts.length > 0 ? (
                  <div className="catalogue-product-grid">
                    {filteredProducts.map((product) => {
                      const category = categoryById[product.categoryId];
                      const variantCount = product.variants.length;
                      return (
                        <article className="catalogue-product-card" key={product.id}>
                          <Link
                            className="catalogue-product-image"
                            href={"/product/" + product.slug}
                            aria-label={"View " + getProductDisplayName(product) + " details"}
                          >
                            <Image
                              src={product.variants[0].mainImage}
                              alt={"FSquaro " + category.name + " selection"}
                              fill
                              sizes="(max-width: 620px) 100vw, (max-width: 1060px) 50vw, 33vw"
                            />
                          </Link>
                          <div className="catalogue-product-copy">
                            <p>{category.name}</p>
                            <h3>{getProductDisplayName(product)}</h3>
                            <span className="variant-summary">
                              {variantCount === 1
                                ? "Selected main image"
                                : variantCount + " available variations"}
                            </span>
                            <Link
                              className="product-link"
                              href={"/product/" + product.slug}
                            >
                              View details <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="catalogue-empty">
                    <h3>No matching pieces found.</h3>
                    <p>Try another search term, choose a different category, or clear the filters.</p>
                    <button className="button button-secondary" type="button" onClick={clearFilters}>
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <CatalogueFooter />
    </>
  );
}
