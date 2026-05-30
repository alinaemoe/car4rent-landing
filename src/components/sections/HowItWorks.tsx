"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

const STEPS = [
  { icon: "search", key: "step1" },
  { icon: "calendar", key: "step2" },
  { icon: "car", key: "step3" },
];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="section-padding bg-grid">
      <div className="container-wide">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("how_it_works_title")}
        </motion.h2>

        <div
          className="how-it-works-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            position: "relative",
          }}
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: 60,
              left: "15%",
              right: "15%",
              height: 2,
              background: "linear-gradient(90deg, var(--accent), transparent)",
              opacity: 0.3,
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                textAlign: "center",
                padding: "40px 24px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "var(--bg-main)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                }}
              >
                {i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "var(--text-main)",
                }}
              >
                {t(`${step.key}_title`)}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {t(`${step.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>


    </section>
  );
}
