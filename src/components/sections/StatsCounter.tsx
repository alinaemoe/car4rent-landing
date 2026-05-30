"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { motion } from "framer-motion";

const STATS = [
  { target: 320, suffix: "+", key: "stats_cars" },
  { target: 8, suffix: "", key: "stats_years" },
  { target: 15000, suffix: "+", key: "stats_clients" },
  { target: 15, suffix: "", key: "stats_offices" },
];

export function StatsCounter() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-grid" style={{ position: "relative" }}>
      <div className="container-wide">
        <div className="premium-grid--4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{
                textAlign: "center",
                padding: "32px 24px",
                border: "1px solid var(--border-low)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
