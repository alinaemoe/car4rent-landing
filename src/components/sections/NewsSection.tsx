"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useNews } from "@/hooks/useQueries";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import type { NewsItem } from "@/types";

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        style={{ background: "rgba(0,0,0,0.75)", zIndex: 3000 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content glass-strong"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: 680, padding: 0, overflow: "hidden", borderRadius: 20 }}
        >
          {/* Image */}
          {item.image && (
            <div style={{ width: "100%", aspectRatio: "16/7", overflow: "hidden", position: "relative" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.9) 100%)" }} />
              {item.badge && (
                <span className="badge badge--accent" style={{ position: "absolute", top: 16, left: 16 }}>
                  {item.badge}
                </span>
              )}
            </div>
          )}

          {/* Close button */}
          <button
            className="modal-close"
            onClick={onClose}
            style={{ zIndex: 10, background: "rgba(0,0,0,0.5)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div style={{ padding: "28px 32px 36px" }}>
            {!item.image && item.badge && (
              <span className="badge badge--accent" style={{ marginBottom: 12, display: "inline-block" }}>
                {item.badge}
              </span>
            )}

            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
              color: "var(--text-main)",
              lineHeight: 1.3,
              marginBottom: 12,
            }}>
              {item.title}
            </h2>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--text-dim)",
              fontSize: "0.82rem",
              marginBottom: 24,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {formatDate(item.published_at)}
            </div>

            {/* Full article content — render as HTML if it contains tags, otherwise as text */}
            {item.content.includes("<") ? (
              <div
                style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.95rem" }}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ) : (
              <p style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>
                {item.content}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function NewsSection() {
  const { t } = useTranslation();
  const { data: news } = useNews();
  const items = Array.isArray(news) ? news : [];
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

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
              style={{ overflow: "hidden", padding: 0, display: "flex", flexDirection: "column", cursor: "pointer" }}
              onClick={() => setSelectedItem(item)}
            >
              {item.image && (
                <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "var(--bg-dark-2)", flexShrink: 0 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    loading="lazy"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              )}
              <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                {item.badge && (
                  <span className="badge badge--accent" style={{ marginBottom: 8, alignSelf: "flex-start" }}>
                    {item.badge}
                  </span>
                )}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-main)",
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  marginBottom: 12,
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {item.excerpt}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
                    {formatDate(item.published_at)}
                  </span>
                  <button
                    className="btn-ghost"
                    style={{ fontSize: "0.8rem", padding: "4px 8px", color: "var(--accent)", gap: 4 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                  >
                    {t("news_read_more")}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <NewsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
