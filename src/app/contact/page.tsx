import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircleMore, PackageSearch } from "lucide-react";

import { CatalogueFooter, CatalogueHeader } from "../catalogue-chrome";

export const metadata: Metadata = {
  title: "Contact FSquaro | More for Everyday Life",
  description:
    "Find contact updates and product-query guidance for the growing FSquaro catalogue.",
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#contact-content">
        Skip to content
      </a>
      <CatalogueHeader activePage="contact" />

      <main id="contact-content">
        <section className="contact-hero">
          <div className="site-shell contact-hero-copy">
            <p className="eyebrow">Contact FSquaro</p>
            <h1>Let&apos;s start a conversation.</h1>
            <p>
              This is the dedicated place for customer, product, and business contact
              information as FSquaro prepares for launch.
            </p>
          </div>
        </section>

        <section className="contact-section" aria-labelledby="contact-status-title">
          <div className="site-shell contact-layout">
            <div className="contact-intro">
              <p className="eyebrow">Contact details</p>
              <h2 id="contact-status-title">Email FSquaro directly.</h2>
              <p>
                Use the official email below for customer, product, and business
                enquiries. Phone and social channels can be added here once they are
                ready to share.
              </p>
            </div>

            <div className="contact-status-card">
              <span className="contact-status-icon" aria-hidden="true">
                <Mail size={24} strokeWidth={1.6} />
              </span>
              <div>
                <h3>Official email</h3>
                <a className="contact-email" href="mailto:fsquaro.business@gmail.com">
                  fsquaro.business@gmail.com
                </a>
                <p>
                  Please include the product name and variation when your question is
                  about an item in the catalogue.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-help" aria-labelledby="help-title">
          <div className="site-shell">
            <div className="info-section-heading">
              <p className="eyebrow">How we can help</p>
              <h2 id="help-title">Clear details make it easier to help.</h2>
              <p>
                When you email FSquaro, these details will help us respond to your
                query more quickly.
              </p>
            </div>

            <div className="contact-help-grid">
              <article className="contact-help-card">
                <span className="principle-icon" aria-hidden="true">
                  <PackageSearch size={23} strokeWidth={1.6} />
                </span>
                <h3>Product questions</h3>
                <p>
                  Include the product name and the variation you are asking about so
                  the right details can be checked.
                </p>
              </article>
              <article className="contact-help-card">
                <span className="principle-icon" aria-hidden="true">
                  <MessageCircleMore size={23} strokeWidth={1.6} />
                </span>
                <h3>Business enquiries</h3>
                <p>
                  Partnership, catalogue, and other business conversations will have a
                  dedicated verified contact channel.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="info-cta" aria-labelledby="contact-cta-title">
          <div className="site-shell info-cta-inner">
            <div>
              <p className="eyebrow">Explore first</p>
              <h2 id="contact-cta-title">Looking for a product?</h2>
            </div>
            <Link className="button button-secondary" href="/shop">
              Browse the catalogue <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <CatalogueFooter />
    </>
  );
}
