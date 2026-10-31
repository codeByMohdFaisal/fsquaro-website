"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

type ActivePage = "shop" | "product";

export function CatalogueHeader({ activePage }: { activePage: ActivePage }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function closeMobileNavigation() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link className="brand" href="/" aria-label="FSquaro home">
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
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link className={activePage === "shop" ? "is-active" : ""} href="/shop">
            Shop
          </Link>
          <Link href="/#collections">Collections</Link>
          <Link href="/#about">About</Link>
        </nav>

        <div className="header-actions">
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
            aria-controls="catalogue-mobile-navigation"
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
        id="catalogue-mobile-navigation"
        aria-label="Mobile navigation"
      >
        <Link href="/" onClick={closeMobileNavigation}>
          Home
        </Link>
        <Link href="/shop" onClick={closeMobileNavigation}>
          Shop
        </Link>
        <Link href="/#collections" onClick={closeMobileNavigation}>
          Collections
        </Link>
        <Link href="/#about" onClick={closeMobileNavigation}>
          About
        </Link>
      </nav>
    </header>
  );
}

export function CatalogueFooter() {
  return (
    <footer className="site-footer">
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
          <Link href="/shop">Shop all pieces</Link>
          <Link href="/#collections">Collections</Link>
          <Link href="/#about">About FSquaro</Link>
        </div>
        <div className="footer-column">
          <h2>Product details</h2>
          <p>Variants and imagery are shown from the local catalogue.</p>
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
  );
}
