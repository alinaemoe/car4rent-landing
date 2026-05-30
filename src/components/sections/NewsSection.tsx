"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useNews } from "@/hooks/useQueries";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

export function NewsSection() {
  const { t } = useTranslation();
  const { data: news } = useNews();
  const items = Array.isArray(news) ? news : [];

  if (!items.length) return null;

  return (
    <section className="section-padding bg-grid">
      <div className="container-wide">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("news_title")}
        </motion.h2>

        <div className="premium-grid--3">
          {items.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ overflow: "hidden", padding: 0 }}
            >
              {item.image && (
                <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "var(--bg-dark-2)" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    loading="lazy"
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
              )}
              <div style={{ padding: 20 }}>
                {item.badge && (
                  <span className="badge badge--accent" style={{ marginBottom: 8 }}>
                    {item.badge}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.excerpt}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
                    {formatDate(item.published_at)}
                  </span>
                  <button className="btn-ghost" style={{ fontSize: "0.8rem", padding: "4px 8px" }}>
                    {t("news_read_more")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
