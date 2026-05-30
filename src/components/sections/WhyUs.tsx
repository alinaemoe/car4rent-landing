"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

const FEATURES = [
  { key: "mileage", icon: "speed" },
  { key: "insurance", icon: "shield" },
  { key: "support", icon: "headphones" },
  { key: "price", icon: "diamond" },
];

export function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-grid" style={{ position: "relative" }}>
      <div className="ambient-orb" style={{ width: 400, height: 400, top: "20%", left: "-10%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("why_us_title")}
        </motion.h2>

        <div className="premium-grid--4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: "32px 24px", textAlign: "center" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "rgba(245,158,11,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                {feat.icon === "shield" && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                )}
                {feat.icon === "speed" && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                )}
                {feat.icon === "headphones" && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                  </svg>
                )}
                {feat.icon === "diamond" && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                )}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "var(--text-main)",
                }}
              >
                {t(`feature_${feat.key}`)}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                {t(`feature_${feat.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
