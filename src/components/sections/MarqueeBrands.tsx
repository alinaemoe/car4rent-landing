"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "BMW", "Mercedes", "Audi", "Toyota", "Volkswagen", "Lexus",
  "Porsche", "Volvo", "Mazda", "Hyundai", "Kia", "Honda",
  "Nissan", "Ford", "Skoda", "Renault", "Chevrolet", "Mitsubishi",
];

export function MarqueeBrands() {
  return (
    <section style={{ padding: "48px 0", overflow: "hidden", background: "var(--bg-dark-2)" }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: i < BRANDS.length ? "var(--text-dim)" : "var(--text-dim)",
                opacity: i < BRANDS.length ? 1 : 1,
                whiteSpace: "nowrap",
                letterSpacing: "0.05em",
                transition: "color 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
