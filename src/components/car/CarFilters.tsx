"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useFilterStore } from "@/store";
import { useFeatures } from "@/hooks/useQueries";
import { BRANDS } from "@/lib/utils";
import { useState } from "react";

export function CarFilters() {
  const { t, i18n } = useTranslation();
  const { filters, setFilters, resetFilters } = useFilterStore();
  const { data: features } = useFeatures();
  const [mobileOpen, setMobileOpen] = useState(false);

  const bodyTypes = ["sedan", "hatchback", "wagon", "coupe", "suv", "convertible"];
  const bodyLabels: Record<string, string> = {
    sedan: i18n.language === "ru" ? "Седан" : "Sedan",
    hatchback: i18n.language === "ru" ? "Хэтчбек" : "Hatchback",
    wagon: i18n.language === "ru" ? "Универсал" : "Wagon",
    coupe: "Coupe",
    suv: "SUV",
    convertible: i18n.language === "ru" ? "Кабриолет" : "Convertible",
  };

  const toggleArray = (key: "brands" | "body_types", value: string) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ [key]: next });
  };

  const toggleFeature = (id: number) => {
    const current = filters.feature_ids || [];
    const next = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];
    setFilters({ feature_ids: next });
  };

  const content = (
    <div>
      {/* Brand */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_brand")}</div>
        <div style={{ maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {BRANDS.map((brand) => (
            <label key={brand} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={() => toggleArray("brands", brand)}
              />
              <span className="filter-checkbox__indicator">
                {(filters.brands?.includes(brand)) && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bg-main)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </span>
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Body type */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_body")}</div>
        {bodyTypes.map((bt) => (
          <label key={bt} className="filter-checkbox">
            <input type="checkbox" checked={filters.body_types?.includes(bt) || false} onChange={() => toggleArray("body_types", bt)} />
            <span className="filter-checkbox__indicator">
              {(filters.body_types?.includes(bt)) && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bg-main)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              )}
            </span>
            {bodyLabels[bt] || bt}
          </label>
        ))}
      </div>

      {/* Transmission */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_transmission")}</div>
        {["automatic", "manual"].map((t) => (
          <label key={t} className="filter-radio">
            <input
              type="radio"
              name="transmission"
              checked={filters.transmissions?.includes(t) || false}
              onChange={() => setFilters({ transmissions: [t] })}
            />
            <span className="filter-radio__indicator" />
            {t === "automatic"
              ? i18n.language === "ru" ? "Автомат" : "Automatic"
              : i18n.language === "ru" ? "Механика" : "Manual"}
          </label>
        ))}
      </div>

      {/* Fuel type */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_fuel")}</div>
        {["petrol", "diesel", "hybrid", "electric"].map((ft) => (
          <label key={ft} className="filter-radio">
            <input
              type="radio"
              name="fuel"
              checked={filters.fuel_types?.includes(ft) || false}
              onChange={() => setFilters({ fuel_types: [ft] })}
            />
            <span className="filter-radio__indicator" />
            {ft === "petrol" ? (i18n.language === "ru" ? "Бензин" : "Petrol")
             : ft === "diesel" ? "Diesel"
             : ft === "hybrid" ? "Hybrid"
             : i18n.language === "ru" ? "Электро" : "Electric"}
          </label>
        ))}
      </div>

      {/* Price range */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_price")}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input-field"
            type="number"
            placeholder={i18n.language === "ru" ? "От" : "From"}
            value={filters.min_price || ""}
            onChange={(e) => setFilters({ min_price: e.target.value ? Number(e.target.value) : undefined })}
            style={{ padding: "8px 12px", fontSize: "0.8rem" }}
          />
          <input
            className="input-field"
            type="number"
            placeholder={i18n.language === "ru" ? "До" : "To"}
            value={filters.max_price || ""}
            onChange={(e) => setFilters({ max_price: e.target.value ? Number(e.target.value) : undefined })}
            style={{ padding: "8px 12px", fontSize: "0.8rem" }}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_rating")}</div>
        <select
          className="input-field"
          value={filters.min_rating || ""}
          onChange={(e) => setFilters({ min_rating: e.target.value ? Number(e.target.value) : undefined })}
          style={{ padding: "8px 12px", fontSize: "0.8rem" }}
        >
          <option value="">{i18n.language === "ru" ? "Любой" : "Any"}</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>&ge; {r}</option>
          ))}
        </select>
      </div>

      {/* Features */}
      {Array.isArray(features) && features.length > 0 && (
        <div className="filter-group">
          <div className="filter-group__title">{t("catalog_filter_features")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {features.map((f) => (
              <label
                key={f.id}
                className={`badge ${filters.feature_ids?.includes(f.id) ? "badge--accent" : "badge--ghost"}`}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={filters.feature_ids?.includes(f.id) || false}
                  onChange={() => toggleFeature(f.id)}
                  style={{ display: "none" }}
                />
                {f.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button className="btn-primary" style={{ flex: 1, padding: "8px 12px", fontSize: "0.8rem" }} onClick={() => setFilters({ page: 1 })}>
          {t("catalog_apply")}
        </button>
        <button className="btn-secondary" style={{ flex: 1, padding: "8px 12px", fontSize: "0.8rem" }} onClick={resetFilters}>
          {t("catalog_reset")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="catalog-sidebar glass" style={{ display: "block" }}>
        {content}
      </div>

      {/* Mobile filter button */}
      <button
        className="btn-primary"
        style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 998, display: "none", padding: "12px 24px" }}
        onClick={() => setMobileOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
        {t("catalog_filter_brand")}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="modal-overlay" style={{ background: "rgba(0,0,0,0.6)", zIndex: 2000, alignItems: "flex-end" }} onClick={() => setMobileOpen(false)}>
          <div className="glass-strong" style={{ maxHeight: "80vh", width: "100%", maxWidth: 500, borderRadius: "20px 20px 0 0", padding: 24, overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{t("catalog_filter_brand")}</span>
              <button onClick={() => setMobileOpen(false)} style={{ color: "var(--text-muted)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}


    </>
  );
}
