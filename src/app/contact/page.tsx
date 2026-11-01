import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck, MessageCircleMore, PackageSearch } from "lucide-react";

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
              <h2 id="contact-status-title">Verified channels are being prepared.</h2>
              <p>
                FSquaro&apos;s official email, phone, and social channels will appear here
                before the public launch. This keeps every customer conversation on a
                confirmed channel from day one.
              </p>
            </div>

            <div className="contact-status-card">
              <span className="contact-status-icon" aria-hidden="true">
                <CircleCheck size={24} strokeWidth={1.6} />
              </span>
              <div>
                <h3>Contact page ready</h3>
                <p>
                  Add the approved email address, phone or WhatsApp number, and social
                  links here before deployment.
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
                When the contact channels are live, these details will help FSquaro
                respond to your query more quickly.
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
