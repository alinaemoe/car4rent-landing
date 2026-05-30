"use client";

import type { Car } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";
import { useFavoritesStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface CarCardProps {
  car: Car;
  onDetail: (id: number) => void;
}

export function CarCard({ car, onDetail }: CarCardProps) {
  const { t, i18n } = useTranslation();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(car.id);
  const [imgIndex, setImgIndex] = useState(0);
  const mainImage = car.images?.[imgIndex % (car.images?.length || 1)]?.url || "";

  const bodyLabels: Record<string, string> = {
    sedan: i18n.language === "ru" ? "Седан" : "Sedan",
    suv: "SUV",
    hatchback: i18n.language === "ru" ? "Хэтчбек" : "Hatchback",
    wagon: i18n.language === "ru" ? "Универсал" : "Wagon",
    coupe: "Coupe",
    convertible: i18n.language === "ru" ? "Кабриолет" : "Convertible",
  };

  return (
    <div
      className="car-card"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = x / rect.width;
        if (Array.isArray(car.images) && car.images.length > 1) {
          setImgIndex(pct > 0.5 ? 1 : 0);
        }
      }}
      onMouseLeave={() => setImgIndex(0)}
    >
      <div className="car-card__image">
        {mainImage && (
          <img
            src={mainImage}
            alt={`${car.brand} ${car.model}`}
            loading="lazy"
          />
        )}
        {car.is_new && (
          <div className="car-card__badge">
            <span className="badge badge--accent">
              {i18n.language === "ru" ? "Новинка" : "New"}
            </span>
          </div>
        )}
        {car.is_promo && (
          <div className="car-card__badge">
            <span className="badge badge--success">
              {i18n.language === "ru" ? "Акция" : "Promo"}
            </span>
          </div>
        )}
        <button
          className={`car-card__favorite ${favorite ? "car-card__favorite--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleFavorite(car.id); }}
          aria-label="Toggle favorite"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="car-card__body">
        <div className="car-card__header">
          <div>
            <div className="car-card__title">{car.brand} {car.model}</div>
            <div className="car-card__subtitle">
              {car.year} &middot; {bodyLabels[car.body_type] || car.body_type}
            </div>
          </div>
        </div>

        <div className="car-card__specs">
          <div className="car-card__spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            {car.transmission === "automatic"
              ? i18n.language === "ru" ? "Автомат" : "Auto"
              : i18n.language === "ru" ? "Механика" : "Manual"}
          </div>
          <div className="car-card__spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20V10a8 8 0 0 1 16 0v10"/><path d="M2 20h20"/></svg>
            {car.fuel_type === "petrol"
              ? i18n.language === "ru" ? "Бензин" : "Petrol"
             : car.fuel_type === "diesel"
               ? i18n.language === "ru" ? "Дизель" : "Diesel"
               : car.fuel_type}
          </div>
        </div>

        <div className="car-card__footer">
          <div>
            <div className="car-card__price">{formatPrice(car.price_per_day)} ₽</div>
            <div className="car-card__price-label">{t("car_detail_per_day")}</div>
          </div>
          <div className="car-card__rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {car.rating.toFixed(1)}
            <span style={{ color: "var(--text-dim)", marginLeft: 2 }}>
              ({car.review_count})
            </span>
          </div>
        </div>

        <button
          className="btn-secondary"
          style={{ width: "100%", marginTop: 8 }}
          onClick={() => onDetail(car.id)}
        >
          {i18n.language === "ru" ? "Подробнее" : "Details"}
        </button>
      </div>
    </div>
  );
}
