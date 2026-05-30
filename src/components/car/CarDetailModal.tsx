"use client";

import { useCarDetail } from "@/hooks/useQueries";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPrice, calculateDiscount, getDaysBetween } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CarDetailModalProps {
  carId: number | null;
  onClose: () => void;
}

export function CarDetailModal({ carId, onClose }: CarDetailModalProps) {
  const { t, i18n } = useTranslation();
  const { data: car, isLoading } = useCarDetail(carId);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (carId) { document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [carId, onClose]);

  const bodyLabels: Record<string, string> = {
    sedan: i18n.language === "ru" ? "Седан" : "Sedan",
    suv: "SUV",
    hatchback: i18n.language === "ru" ? "Хэтчбек" : "Hatchback",
    wagon: i18n.language === "ru" ? "Универсал" : "Wagon",
    coupe: "Coupe",
    convertible: i18n.language === "ru" ? "Кабриолет" : "Convertible",
  };

  return (
    <AnimatePresence>
      {carId && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            className="modal-content glass-strong"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <button className="modal-close" onClick={onClose} style={{ background: "var(--bg-glass)", color: "var(--text-muted)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {isLoading ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <div className="spinner" style={{ margin: "0 auto" }} />
              </div>
            ) : car ? (
              <div>
                {/* Gallery */}
                {Array.isArray(car.images) && car.images.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <img
                      src={car.images[imgIndex]?.url}
                      alt={`${car.brand} ${car.model}`}
                      style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 12, background: "var(--bg-dark-2)" }}
                    />
                    {car.images.length > 1 && (
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        {car.images.map((img, i) => (
                          <button
                            key={img.id}
                            onClick={() => setImgIndex(i)}
                            style={{
                              width: 60,
                              height: 40,
                              borderRadius: 6,
                              overflow: "hidden",
                              border: i === imgIndex ? "2px solid var(--accent)" : "2px solid transparent",
                              opacity: i === imgIndex ? 1 : 0.5,
                              transition: "all 0.2s",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Title & Rating */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--text-main)" }}>
                      {car.brand} {car.model} {car.year}
                    </h2>
                    <div className="stars stars--gold" style={{ marginTop: 8 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(car.rating) ? "var(--accent)" : "var(--text-dim)"} stroke={s <= Math.round(car.rating) ? "var(--accent)" : "var(--text-dim)"} strokeWidth="1">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                      <span style={{ marginLeft: 8, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        {car.rating.toFixed(1)} ({car.review_count} {car.review_count === 1 ? t("reviews_one") : car.review_count < 5 ? t("reviews_few") : t("reviews_many")})
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--accent)" }}>
                      {formatPrice(car.price_per_day)} ₽
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t("car_detail_per_day")}</div>
                  </div>
                </div>

                {/* Specs */}
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 12 }}>{t("car_detail_specs")}</h4>
                  <div className="premium-grid--2" style={{ gap: 8 }}>
                    {[
                      { label: i18n.language === "ru" ? "Кузов" : "Body", value: bodyLabels[car.body_type] || car.body_type },
                      { label: i18n.language === "ru" ? "Коробка" : "Transmission", value: car.transmission === "automatic" ? (i18n.language === "ru" ? "Автомат" : "Automatic") : (i18n.language === "ru" ? "Механика" : "Manual") },
                      { label: i18n.language === "ru" ? "Привод" : "Drive", value: car.drive_type === "awd" ? "AWD" : car.drive_type === "fwd" ? "FWD" : "RWD" },
                      { label: i18n.language === "ru" ? "Топливо" : "Fuel", value: car.fuel_type === "petrol" ? (i18n.language === "ru" ? "Бензин" : "Petrol") : car.fuel_type === "diesel" ? "Diesel" : car.fuel_type },
                      { label: "Л.с.", value: String(car.horsepower) },
                      { label: i18n.language === "ru" ? "Расход" : "Consumption", value: `${car.fuel_consumption} л/100км` },
                    ].map((spec) => (
                      <div key={spec.label} style={{ padding: "8px 12px", background: "var(--bg-glass)", borderRadius: 8 }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{spec.label}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {Array.isArray(car.features) && car.features.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 12 }}>{t("car_detail_features")}</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {car.features.map((f) => (
                        <span key={f.id} className="badge badge--ghost">{f.name}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Discounts */}
                {Array.isArray(car.discount_tiers) && car.discount_tiers.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 12 }}>{t("car_detail_discounts")}</h4>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {car.discount_tiers.map((tier) => (
                        <div key={tier.days_from} className="badge badge--success" style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
                          {tier.days_from}+ {t("days")} &minus;{tier.discount_percent}%
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules */}
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 12 }}>{t("car_detail_rules")}</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <div><strong style={{ color: "var(--text-main)" }}>{t("car_detail_deposit")}:</strong> {formatPrice(car.deposit_amount)} ₽</div>
                    <div><strong style={{ color: "var(--text-main)" }}>{t("car_detail_min_age")}:</strong> {car.min_age}+</div>
                    <div><strong style={{ color: "var(--text-main)" }}>{t("car_detail_min_exp")}:</strong> {car.min_experience}+ {i18n.language === "ru" ? "года" : "years"}</div>
                    <div><strong style={{ color: "var(--text-main)" }}>{t("car_detail_insurance")}:</strong> {car.insurance}</div>
                  </div>
                </div>

                {/* Location */}
                {car.location && (
                  <div style={{ marginBottom: 24, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <strong style={{ color: "var(--text-main)" }}>{t("car_detail_location")}:</strong> {car.location.address}
                  </div>
                )}

                {/* Book button */}
                <a href="#contacts" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem" }} onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }), 300); }}>
                  {t("car_detail_book")}
                </a>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
                {t("error")}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
