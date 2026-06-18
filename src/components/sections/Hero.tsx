"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLocations } from "@/hooks/useQueries";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const WORDS = ["идеальный", "премиальный", "надёжный"];

export function Hero() {
  const { t, i18n } = useTranslation();
  const { data: locations } = useLocations();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? current.slice(0, displayText.length - 1)
              : current.slice(0, displayText.length + 1)
          );
        },
        isDeleting ? 50 : 100
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const locationsList = Array.isArray(locations) && locations.length > 0
    ? locations
    : [{ id: 0, name: "Минск", address: "ул. Тимирязева, 74", latitude: 0, longitude: 0, is_main: true }];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg-main)",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=900&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) saturate(0.8)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.9) 100%)",
          zIndex: 1,
        }}
      />

      {/* Ambient Orbs */}
      <div className="ambient-orb" style={{ width: 600, height: 600, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />
      <div className="ambient-orb" style={{ width: 500, height: 500, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />

      {/* Content */}
      <div
        className="container-wide"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            color: "var(--text-main)",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Найди свой{" "}
          <span style={{ color: "var(--accent)", position: "relative" }}>
            {displayText}
            <span
              style={{
                position: "absolute",
                right: -4,
                top: 0,
                width: 3,
                height: "1em",
                background: "var(--accent)",
                animation: "pulse 1s step-end infinite",
              }}
            />
          </span>
          <br />
          {i18n.language === "ru" ? "автомобиль" : "car"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-muted)",
            marginBottom: 40,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          {t("hero_subtitle")}
        </motion.p>

        {/* Quick search form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-strong"
          style={{
            display: "flex",
            gap: 12,
            padding: 16,
            borderRadius: 16,
            maxWidth: 700,
            margin: "0 auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div className="select-wrapper" style={{ flex: "1 1 140px", minWidth: 0 }}>
            <select className="input-field">
              {locationsList.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          <input
            type="date"
            className="input-field"
            placeholder={t("hero_search_placeholder")}
            style={{ flex: "1 1 120px", minWidth: 0, colorScheme: "dark" }}
          />
          <input
            type="date"
            className="input-field"
            placeholder={t("hero_search_placeholder")}
            style={{ flex: "1 1 120px", minWidth: 0, colorScheme: "dark" }}
          />
          <a href="/catalog" className="btn-primary" style={{ flex: "1 1 120px", minWidth: 0, justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            {t("hero_cta")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--text-dim)",
        }}
      >
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div className="animate-pulse-up-down">
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="2"/>
            <circle cx="10" cy="8" r="2" fill="currentColor"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
