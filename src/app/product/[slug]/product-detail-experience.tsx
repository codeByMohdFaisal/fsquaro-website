"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Images, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { CatalogueFooter, CatalogueHeader } from "../../catalogue-chrome";
import {
  catalogue,
  categoryById,
  getProductDisplayName,
  type Product,
} from "../../../data/catalogue";

const colorSwatches: Record<string, string> = {
  Black: "#20232a",
  Red: "#c3424c",
  "Sky Blue": "#7fc6ef",
  White: "#fbfbfb",
  Pink: "#f4a0ba",
  Gold: "#bf9346",
  Golden: "#bf9346",
  Silver: "#bbc3ce",
};

function displayName(product: Product, variantLabel: string) {
  const baseName = getProductDisplayName(product);
  return variantLabel === "Main selection"
    ? baseName
    : baseName + " — " + variantLabel;
}

export default function ProductDetailExperience({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ??
    product.variants[0];
  const category = categoryById[product.categoryId];
  const currentName = displayName(product, selectedVariant.label);

  const relatedProducts = useMemo(
    () =>
      catalogue
        .filter(
          (item) =>
            item.categoryId === product.categoryId && item.id !== product.id,
        )
        .slice(0, 3),
    [product.categoryId, product.id],
  );

  const hasColourOptions = product.variants.some(
    (variant) => variant.attributes.color,
  );

  return (
    <>
      <a className="skip-link" href="#product-detail">
        Skip to product details
      </a>
      <CatalogueHeader activePage="product" />

      <main id="product-detail">
        <div className="site-shell product-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/shop">Shop</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span>{getProductDisplayName(product)}</span>
        </div>

        <section className="product-detail-section" aria-labelledby="product-title">
          <div className="site-shell product-detail-layout">
            <div className="product-gallery">
              <div className="product-main-image">
                <Image
                  src={selectedVariant.mainImage}
                  alt={"FSquaro " + currentName}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 54vw"
                />
                <span className="product-main-label">Selected view</span>
              </div>

              {product.variants.length > 1 ? (
                <div className="product-thumbnails" aria-label="Choose a product variation">
                  {product.variants.map((variant) => (
                    <button
                      className={
                        "product-thumbnail" +
                        (variant.id === selectedVariant.id ? " is-active" : "")
                      }
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      aria-label={"Show " + variant.label}
                      aria-pressed={variant.id === selectedVariant.id}
                      key={variant.id}
                    >
                      <Image
                        src={variant.mainImage}
                        alt=""
                        fill
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}

              <p className="gallery-review-note">
                <Images size={16} aria-hidden="true" />
                {selectedVariant.secondaryImageCount} additional uploaded image
                {selectedVariant.secondaryImageCount === 1 ? "" : "s"} are waiting
                for product-gallery review.
              </p>
            </div>

            <div className="product-details">
              <p className="eyebrow">{category.name}</p>
              <h1 id="product-title">{currentName}</h1>
              <p className="product-details-intro">
                This product group is part of the current FSquaro collection. The
                image and available options below come directly from the local
                catalogue.
              </p>

              <dl className="product-facts">
                <div>
                  <dt>Category</dt>
                  <dd>{category.name}</dd>
                </div>
                <div>
                  <dt>Available options</dt>
                  <dd>{product.variants.length}</dd>
                </div>
                <div>
                  <dt>Selected option</dt>
                  <dd>{selectedVariant.label}</dd>
                </div>
              </dl>

              {product.variants.length > 1 ? (
                <section className="variant-picker" aria-labelledby="variant-picker-title">
                  <div className="variant-picker-heading">
                    <div>
                      <p className="eyebrow">
                        {hasColourOptions ? "Choose a colour" : "Choose an option"}
                      </p>
                      <h2 id="variant-picker-title">Available variations</h2>
                    </div>
                    <span>{selectedVariant.label}</span>
                  </div>
                  <div className="variant-options">
                    {product.variants.map((variant) => {
                      const swatch = variant.attributes.color
                        ? colorSwatches[variant.attributes.color] ?? "#9eb2c6"
                        : null;
                      return (
                        <button
                          className={
                            "variant-option" +
                            (variant.id === selectedVariant.id ? " is-active" : "")
                          }
                          type="button"
                          onClick={() => setSelectedVariantId(variant.id)}
                          aria-pressed={variant.id === selectedVariant.id}
                          key={variant.id}
                        >
                          {swatch ? (
                            <span
                              className="variant-swatch"
                              style={{ "--swatch": swatch } as CSSProperties}
                              aria-hidden="true"
                            />
                          ) : null}
                          {variant.label}
                          {variant.id === selectedVariant.id ? (
                            <Check size={15} aria-hidden="true" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              <section className="marketplace-status" aria-label="Marketplace availability">
                <ShieldCheck size={20} strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <h2>Marketplace link pending verification</h2>
                  <p>
                    A purchase button will appear only after a verified marketplace
                    destination is provided for this product group.
                  </p>
                </div>
              </section>

              <Link className="back-to-shop" href="/shop">
                <ArrowLeft size={17} aria-hidden="true" />
                Browse all product groups
              </Link>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="related-section" aria-labelledby="related-title">
            <div className="site-shell">
              <div className="related-heading">
                <div>
                  <p className="eyebrow">Continue exploring</p>
                  <h2 id="related-title">More from {category.name}</h2>
                </div>
                <Link className="inline-link" href="/shop">
                  All product groups <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <div className="related-grid">
                {relatedProducts.map((relatedProduct) => (
                  <article className="related-card" key={relatedProduct.id}>
                    <Link
                      className="related-image"
                      href={"/product/" + relatedProduct.slug}
                      aria-label={"View " + getProductDisplayName(relatedProduct)}
                    >
                      <Image
                        src={relatedProduct.variants[0].mainImage}
                        alt={"FSquaro " + category.name + " selection"}
                        fill
                        sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
                      />
                    </Link>
                    <div>
                      <p>{category.name}</p>
                      <h3>
                        <Link href={"/product/" + relatedProduct.slug}>
                          {getProductDisplayName(relatedProduct)}
                        </Link>
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <CatalogueFooter />
    </>
  );
}
