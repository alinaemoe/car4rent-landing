"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useCatalog, useSettings } from "@/hooks/useQueries";
import { CarGrid } from "@/components/car/CarGrid";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { CatalogFilters } from "@/types";

const TABS = [
  { key: "", labelKey: "fleet_view_all" },
  { key: "economy", labelKey: "fleet_economy" },
  { key: "comfort", labelKey: "fleet_comfort" },
  { key: "business", labelKey: "fleet_business" },
  { key: "premium", labelKey: "fleet_premium" },
  { key: "suv", labelKey: "fleet_suv" },
];

interface FleetPreviewProps {
  onDetail: (id: number) => void;
}

export function FleetPreview({ onDetail }: FleetPreviewProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("");

  // Load body_type dict from settings so SUV tab uses the real DB value
  const { data: settings } = useSettings();
  const suvBodyTypes: string[] = (() => {
    if (!Array.isArray(settings)) return ["suv"];
    const s = (settings as { key: string; value: string }[]).find((x) => x.key === "DICT_BODY_TYPES");
    if (!s?.value) return ["suv"];
    try {
      const dict: { id: string; label: string }[] = JSON.parse(s.value);
      const found = dict.filter(
        (d) =>
          d.id.toLowerCase().includes("suv") ||
          d.label.toLowerCase().includes("внедорожник") ||
          d.label.toLowerCase().includes("suv") ||
          d.label.toLowerCase().includes("кроссовер")
      );
      return found.length > 0 ? found.map((d) => d.id) : ["suv"];
    } catch {
      return ["suv"];
    }
  })();

  // Category → filter mapping.
  // Price-based tabs are reliable because every car has price_per_day.
  // SUV uses body_type IDs loaded from the settings dict (same source as mobile).
  const tabFilters: Record<string, Partial<CatalogFilters>> = {
    "": {},
    economy: { max_price: 70 },
    comfort: { min_price: 70, max_price: 170 },
    business: { min_price: 170, max_price: 300 },
    premium: { min_price: 300, max_price: 600 },
    suv: { body_types: suvBodyTypes },
  };

  const filters: CatalogFilters = {
    ...tabFilters[activeTab],
    limit: 4,
    sort: "rating_desc",
  };

  const { data, isLoading } = useCatalog(filters);
  const cars = Array.isArray(data?.data) ? data.data : [];

  return (
    <section id="fleet" className="section-padding">
      <div className="container-wide">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("fleet_title")}
        </motion.h2>

        {/* Tabs */}
        <div className="tabs-bar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? "tab-button--active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="premium-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card" style={{ aspectRatio: "3/4" }}>
                <div className="skeleton" style={{ height: "60%", marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 20, width: "70%", marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 16, width: "50%" }} />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CarGrid cars={cars} onDetail={onDetail} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* View all link */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a href="/catalog" className="btn-secondary">
            {t("fleet_view_all")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
