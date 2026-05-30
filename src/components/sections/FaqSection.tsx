"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useFaqs } from "@/hooks/useQueries";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function FaqSection() {
  const { t } = useTranslation();
  const { data: faqs } = useFaqs();
  const items = Array.isArray(faqs) ? faqs : [];
  const [openId, setOpenId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = items.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const displayed = showAll ? filtered : filtered.slice(0, 5);

  return (
    <section id="faq" className="section-padding">
      <div className="container-wide" style={{ maxWidth: 800 }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("faq_title")}
        </motion.h2>

        {/* Search */}
        <div style={{ marginBottom: 32 }}>
          <input
            className="input-field"
            placeholder={t("faq_search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ textAlign: "center" }}
          />
        </div>

        {/* FAQ List */}
        <div style={{ borderTop: "1px solid var(--border-low)" }}>
          {displayed.map((faq) => (
            <div key={faq.id} className="accordion-item">
              <button
                className="accordion-trigger"
                aria-expanded={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                {faq.question}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: openId === faq.id ? "rotate(180deg)" : undefined,
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="accordion-content">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filtered.length > 5 && !showAll && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="btn-ghost" onClick={() => setShowAll(true)}>
              {t("faq_view_all")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
