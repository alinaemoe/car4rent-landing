"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useCompanyReviews } from "@/hooks/useQueries";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function ReviewsSlider() {
  const { t } = useTranslation();
  const { data: reviews } = useCompanyReviews();
  const items = Array.isArray(reviews) ? reviews : [];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (items.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [items.length]);

  if (!items.length) return null;

  const goTo = (i: number) => {
    setCurrent(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
  };

  const review = items[current];

  return (
    <section id="reviews" className="section-padding">
      <div className="container-wide">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("reviews_title")}
        </motion.h2>

        <div style={{ maxWidth: 650, margin: "0 auto", position: "relative", minHeight: 200 }}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{ padding: "40px 32px", textAlign: "center" }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--bg-main)",
              }}
            >
              {review.author_name.charAt(0)}
            </div>

            {/* Stars */}
            <div className="stars stars--gold" style={{ justifyContent: "center", marginBottom: 16 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} viewBox="0 0 24 24" fill={star <= review.rating ? "var(--accent)" : "var(--text-dim)"} stroke={star <= review.rating ? "var(--accent)" : "var(--text-dim)"} strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>

            {/* Text */}
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>
              &ldquo;{review.text}&rdquo;
            </p>

            {/* Author */}
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text-main)" }}>
              {review.author_name}
            </div>
          </motion.div>

          {/* Dots */}
          {items.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: i === current ? "var(--accent)" : "var(--text-dim)",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
