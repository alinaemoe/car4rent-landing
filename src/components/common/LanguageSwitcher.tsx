"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguages } from "@/hooks/useQueries";
import { changeLanguage, getCurrentLanguage } from "@/hooks/useTranslation";
import { useCallback, useRef, useState, useEffect } from "react";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const current = getCurrentLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fallback = [
    { id: 1, code: "ru", name: "Русский", is_active: true },
    { id: 2, code: "en", name: "English", is_active: true },
  ];
  const available = Array.isArray(languages) ? languages.filter((l) => l.is_active) : fallback;

  const currentName = available.find((l) => l.code === current)?.name || "Русский";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = useCallback((code: string) => {
    changeLanguage(code);
    setOpen(false);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className="btn-ghost"
        onClick={() => setOpen(!open)}
        style={{ fontSize: "0.85rem", minWidth: 90, justifyContent: "space-between" }}
      >
        <span>{currentName}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
          transition: "transform 0.3s ease",
          transform: open ? "rotate(180deg)" : undefined,
        }}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div
          className="glass-strong"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 4,
            borderRadius: 8,
            minWidth: 140,
            padding: 4,
            zIndex: 100,
          }}
        >
          {available.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px 16px",
                textAlign: "left",
                fontSize: "0.85rem",
                borderRadius: 6,
                background: lang.code === current ? "rgba(245,158,11,0.15)" : "transparent",
                color: lang.code === current ? "var(--accent)" : "var(--text-muted)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { if (lang.code !== current) e.currentTarget.style.background = "var(--bg-glass)"; }}
              onMouseLeave={(e) => { if (lang.code !== current) e.currentTarget.style.background = "transparent"; }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
