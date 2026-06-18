"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useFilterStore } from "@/store";
import { useFeatures, useSettings } from "@/hooks/useQueries";
import { BRANDS } from "@/lib/utils";
import { useState } from "react";

interface DictOption {
  id: string;
  label: string;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bg-main)" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Static fallbacks used when settings haven't loaded yet.
// IDs must match what the admin panel saves via DICT_* settings.
const FALLBACK_BODY_TYPES: DictOption[] = [
  { id: "sedan", label: "Седан" },
  { id: "hatchback", label: "Хэтчбек" },
  { id: "wagon", label: "Универсал" },
  { id: "coupe", label: "Купе" },
  { id: "suv", label: "Внедорожник" },
  { id: "convertible", label: "Кабриолет" },
];
const FALLBACK_TRANSMISSIONS: DictOption[] = [
  { id: "automatic", label: "Автомат" },
  { id: "manual", label: "Механика" },
];
const FALLBACK_FUEL_TYPES: DictOption[] = [
  { id: "petrol", label: "Бензин" },
  { id: "diesel", label: "Дизель" },
  { id: "hybrid", label: "Гибрид" },
  { id: "electric", label: "Электро" },
];
const FALLBACK_DRIVE_TYPES: DictOption[] = [
  { id: "fwd", label: "Передний" },
  { id: "rwd", label: "Задний" },
  { id: "awd", label: "Полный" },
];

// EN display labels for fallback dict IDs
const EN_LABELS: Record<string, string> = {
  sedan: "Sedan", hatchback: "Hatchback", wagon: "Wagon", coupe: "Coupe",
  suv: "SUV", convertible: "Convertible",
  automatic: "Automatic", manual: "Manual",
  petrol: "Petrol", diesel: "Diesel", hybrid: "Hybrid", electric: "Electric",
  fwd: "FWD", rwd: "RWD", awd: "AWD",
};

export function CarFilters() {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const { filters, setFilters, resetFilters } = useFilterStore();
  const { data: features } = useFeatures();
  const { data: settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load dicts from settings API — same source as mobile & admin panel,
  // so filter IDs always match the values stored in the DB.
  const parseSetting = (key: string): DictOption[] => {
    if (!Array.isArray(settings)) return [];
    const s = (settings as { key: string; value: string }[]).find((x) => x.key === key);
    if (!s?.value) return [];
    try { return JSON.parse(s.value); } catch { return []; }
  };

  const rawBody = parseSetting("DICT_BODY_TYPES");
  const rawTrans = parseSetting("DICT_TRANSMISSIONS");
  const rawFuel = parseSetting("DICT_FUEL_TYPES");
  const rawDrive = parseSetting("DICT_DRIVE_TYPES");

  const bodyTypes = rawBody.length > 0 ? rawBody : FALLBACK_BODY_TYPES;
  const transmissions = rawTrans.length > 0 ? rawTrans : FALLBACK_TRANSMISSIONS;
  const fuelTypes = rawFuel.length > 0 ? rawFuel : FALLBACK_FUEL_TYPES;
  const driveTypes = rawDrive.length > 0 ? rawDrive : FALLBACK_DRIVE_TYPES;

  const getLabel = (opt: DictOption) =>
    isRu ? opt.label : (EN_LABELS[opt.id.toLowerCase()] || opt.label);

  type ArrayKey = "brands" | "body_types" | "transmissions" | "fuel_types" | "drive_types";

  const toggleFilter = (key: ArrayKey, value: string) => {
    const current = (filters[key] as string[] | undefined) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ [key]: next } as Parameters<typeof setFilters>[0]);
  };

  const toggleFeature = (id: number) => {
    const current = filters.feature_ids || [];
    const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id];
    setFilters({ feature_ids: next });
  };

  const renderCheckboxGroup = (
    title: string,
    opts: DictOption[],
    key: ArrayKey,
    maxHeight?: number
  ) => (
    <div className="filter-group">
      <div className="filter-group__title">{title}</div>
      <div style={maxHeight ? { maxHeight, overflowY: "auto", display: "flex", flexDirection: "column" } : {}}>
        {opts.map((opt) => {
          const checked = ((filters[key] as string[] | undefined) || []).includes(opt.id);
          return (
            <label key={opt.id} className="filter-checkbox">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleFilter(key, opt.id)}
              />
              <span className="filter-checkbox__indicator">{checked && <CheckIcon />}</span>
              {getLabel(opt)}
            </label>
          );
        })}
      </div>
    </div>
  );

  const content = (
    <div>
      {/* Brand */}
      {renderCheckboxGroup(t("catalog_filter_brand"), BRANDS.map((b) => ({ id: b, label: b })), "brands", 200)}

      {/* Body type */}
      {renderCheckboxGroup(t("catalog_filter_body"), bodyTypes, "body_types")}

      {/* Transmission */}
      {renderCheckboxGroup(t("catalog_filter_transmission"), transmissions, "transmissions")}

      {/* Fuel type */}
      {renderCheckboxGroup(t("catalog_filter_fuel"), fuelTypes, "fuel_types")}

      {/* Drive type */}
      {renderCheckboxGroup(t("catalog_filter_drive"), driveTypes, "drive_types")}

      {/* Price range */}
      <div className="filter-group">
        <div className="filter-group__title">{t("catalog_filter_price")}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input-field"
            type="number"
            placeholder={isRu ? "От" : "From"}
            value={filters.min_price || ""}
            onChange={(e) => setFilters({ min_price: e.target.value ? Number(e.target.value) : undefined })}
            style={{ padding: "8px 12px", fontSize: "0.8rem" }}
          />
          <input
            className="input-field"
            type="number"
            placeholder={isRu ? "До" : "To"}
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
          <option value="">{isRu ? "Любой" : "Any"}</option>
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
        <button
          className="btn-primary"
          style={{ flex: 1, padding: "8px 12px", fontSize: "0.8rem" }}
          onClick={() => {
            // Close mobile drawer and ensure page resets to 1
            setMobileOpen(false);
            useFilterStore.getState().setFilters({ page: 1 });
          }}
        >
          {t("catalog_apply")}
        </button>
        <button
          className="btn-secondary"
          style={{ flex: 1, padding: "8px 12px", fontSize: "0.8rem" }}
          onClick={() => { resetFilters(); setMobileOpen(false); }}
        >
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
        className="btn-primary catalog-filter-mobile-btn"
        style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 998, display: "none", padding: "12px 24px" }}
        onClick={() => setMobileOpen(true)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        {isRu ? "Фильтры" : "Filters"}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="modal-overlay"
          style={{ background: "rgba(0,0,0,0.6)", zIndex: 2000, alignItems: "flex-end" }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="glass-strong"
            style={{ maxHeight: "80vh", width: "100%", maxWidth: 500, borderRadius: "20px 20px 0 0", padding: 24, overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {isRu ? "Фильтры" : "Filters"}
              </span>
              <button onClick={() => setMobileOpen(false)} style={{ color: "var(--text-muted)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
