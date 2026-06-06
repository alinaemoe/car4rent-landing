import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CarFilters } from "../components/car/CarFilters";
import { CarGrid } from "../components/car/CarGrid";
import { CarDetailModal } from "../components/car/CarDetailModal";
import { ScrollToTop } from "../components/common/ScrollToTop";
import { ScrollProgressBar } from "../components/common/ScrollProgressBar";
import { useTranslation } from "../hooks/useTranslation";
import { useCatalog } from "../hooks/useQueries";
import { useFilterStore } from "../store";

export default function CatalogPage() {
  const { t } = useTranslation();
  const { filters } = useFilterStore();
  const { data, isLoading } = useCatalog(filters);
  const [detailCarId, setDetailCarId] = useState<number | null>(null);

  const cars = data?.data || [];
  const total = data?.meta?.total || 0;

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main style={{ minHeight: "100vh" }}>
        <div className="catalog-layout container-wide">
          <CarFilters />
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--text-main)", marginBottom: 8 }}>
                {t("catalog_title")}
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                {t("catalog_found")}: {total}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <select
                className="input-field"
                value={filters.sort || "newest"}
                onChange={(e) => useFilterStore.getState().setFilters({ sort: e.target.value })}
                style={{ width: "auto", minWidth: 180, padding: "8px 12px", fontSize: "0.85rem" }}
              >
                <option value="newest">{t("catalog_sort_default")}</option>
                <option value="price_asc">{t("catalog_sort_price_asc")}</option>
                <option value="price_desc">{t("catalog_sort_price_desc")}</option>
                <option value="rating_desc">{t("catalog_sort_rating")}</option>
              </select>
            </div>

            {isLoading ? (
              <div className="premium-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="glass-card" style={{ aspectRatio: "3/4" }}>
                    <div className="skeleton" style={{ height: "60%", marginBottom: 16 }} />
                    <div className="skeleton" style={{ height: 20, width: "70%", marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 16, width: "50%" }} />
                  </div>
                ))}
              </div>
            ) : cars.length > 0 ? (
              <>
                <CarGrid cars={cars} onDetail={setDetailCarId} />
                {data?.meta && data.meta.page < data.meta.total_pages && (
                  <div style={{ textAlign: "center", marginTop: 32 }}>
                    <button
                      className="btn-secondary"
                      onClick={() => useFilterStore.getState().setFilters({ page: (filters.page || 1) + 1 })}
                    >
                      {t("catalog_load_more")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px", opacity: 0.5 }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p>{t("catalog_empty")}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <CarDetailModal carId={detailCarId} onClose={() => setDetailCarId(null)} />
    </>
  );
}
