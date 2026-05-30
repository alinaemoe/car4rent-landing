"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { useState, useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_ITEMS = [
  { key: "nav_catalog", href: "/catalog" },
  { key: "nav_how_it_works", href: "#how-it-works" },
  { key: "nav_reviews", href: "#reviews" },
  { key: "nav_faq", href: "#faq" },
  { key: "nav_contacts", href: "#contacts" },
];

const SECTION_IDS = ["how-it-works", "reviews", "faq", "contacts"];

export function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 100);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <header
        className="header"
        style={{
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="header__inner">
          <a href="/" className="header__logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="var(--accent)"/>
              <path d="M16 6L22 14H18L16 11L14 14H10L16 6Z" fill="var(--bg-main)"/>
              <rect x="10" y="14" width="12" height="10" rx="2" fill="var(--bg-main)" opacity="0.9"/>
              <circle cx="12.5" cy="24" r="2" fill="var(--accent)"/>
              <circle cx="19.5" cy="24" r="2" fill="var(--accent)"/>
            </svg>
            <span>Car4Rent</span>
          </a>

          <nav className="header__nav">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href.startsWith("#") && activeSection === item.href.slice(1);
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`header__nav-link ${isActive ? "header__nav-link--active" : ""}`}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                >
                  {t(item.key)}
                </a>
              );
            })}
          </nav>

          <div className="header__actions">
            <LanguageSwitcher />
            <a href="#contacts" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.85rem" }} onClick={(e) => { e.preventDefault(); handleNavClick("#contacts"); }}>
              {t("hero_cta")}
            </a>
            <button
              className="btn-ghost"
              style={{ display: "none" }}
              onClick={() => setMobileOpen(true)}
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect y="0" width="22" height="2" rx="1" fill="currentColor"/>
                <rect y="7" width="22" height="2" rx="1" fill="currentColor"/>
                <rect y="14" width="22" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
