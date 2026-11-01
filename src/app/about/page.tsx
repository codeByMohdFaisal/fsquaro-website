import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Layers3, Sparkles } from "lucide-react";

import { CatalogueFooter, CatalogueHeader } from "../catalogue-chrome";

export const metadata: Metadata = {
  title: "About FSquaro | More for Everyday Life",
  description:
    "Learn about FSquaro and its growing collection of products for everyday needs, interests, and moments.",
};

const principles = [
  {
    icon: Compass,
    title: "Growing with intention",
    description:
      "FSquaro is building a considered catalogue around the things people use, enjoy, and return to.",
  },
  {
    icon: Layers3,
    title: "Easy to explore",
    description:
      "Clear categories, product details, and available variations make the collection easier to browse.",
  },
  {
    icon: Sparkles,
    title: "More to discover",
    description:
      "The range will continue to grow into new categories as products and their details are ready to share.",
  },
];

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#about-content">
        Skip to content
      </a>
      <CatalogueHeader activePage="about" />

      <main id="about-content">
        <section className="info-hero">
          <div className="site-shell info-hero-grid">
            <div className="info-hero-copy">
              <p className="eyebrow">About FSquaro</p>
              <h1>A growing collection for everyday life.</h1>
              <p>
                FSquaro is creating a place to discover products for everyday needs,
                interests, and occasions. The collection starts with what is available
                now and grows as new categories are ready to explore.
              </p>
              <Link className="button button-primary" href="/shop">
                Explore the collection <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="info-hero-image">
              <Image
                src="/products/Butterfly%20chain%2055/main-image.png"
                alt="FSquaro butterfly chain from the current collection"
                fill
                priority
                sizes="(max-width: 840px) 100vw, 48vw"
              />
              <span>FSquaro</span>
            </div>
          </div>
        </section>

        <section className="info-section" id="principles" aria-labelledby="principles-title">
          <div className="site-shell">
            <div className="info-section-heading">
              <p className="eyebrow">What guides the collection</p>
              <h2 id="principles-title">A simple, evolving way to shop.</h2>
              <p>
                Every part of FSquaro is designed to become clearer and more useful as
                the catalogue expands.
              </p>
            </div>

            <div className="principle-grid">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article className="principle-card" key={principle.title}>
                    <span className="principle-icon" aria-hidden="true">
                      <Icon size={23} strokeWidth={1.6} />
                    </span>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="info-story" aria-labelledby="story-title">
          <div className="site-shell info-story-grid">
            <div>
              <p className="eyebrow">The current chapter</p>
              <h2 id="story-title">Start with today. Build for what comes next.</h2>
            </div>
            <div>
              <p>
                The current FSquaro catalogue is a starting point. Over time, it can
                include more product types, including food, once product information,
                images, variants, and customer details are ready.
              </p>
              <Link className="inline-link" href="/shop">
                View current products <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="info-cta" aria-labelledby="about-cta-title">
          <div className="site-shell info-cta-inner">
            <div>
              <p className="eyebrow">Let&apos;s connect</p>
              <h2 id="about-cta-title">Questions about FSquaro?</h2>
            </div>
            <Link className="button button-secondary" href="/contact">
              Go to contact page <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <CatalogueFooter />
    </>
  );
}
