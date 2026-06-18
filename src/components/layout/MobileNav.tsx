"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { key: "nav_catalog", href: "/catalog" },
  { key: "nav_how_it_works", href: "#how-it-works" },
  { key: "nav_reviews", href: "#reviews" },
  { key: "nav_faq", href: "#faq" },
  { key: "nav_contacts", href: "#contacts" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    onClose();
    if (!href.startsWith("#")) return;
    if (location.pathname === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="mobile-nav-drawer glass-strong"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem" }}>Car4Rent</span>
              <button onClick={onClose} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    } else {
                      onClose();
                    }
                  }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    fontSize: "1rem",
                    color: "var(--text-main)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-glass)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>
            <div style={{ marginTop: "auto", paddingTop: 24 }}>
              <LanguageSwitcher />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
