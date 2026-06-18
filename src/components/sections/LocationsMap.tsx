import "leaflet/dist/leaflet.css";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocations } from "@/hooks/useQueries";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function LocationsMap() {
  const { i18n } = useTranslation();
  const { data: locations } = useLocations();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const items = Array.isArray(locations) ? locations : [];

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      if (!mapRef.current) return;

      const L = await import("leaflet");
      if (cancelled) return;

      // Destroy any previous instance before creating a new one
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      const center: [number, number] =
        items.length > 0 && items[0].latitude && items[0].longitude
          ? [items[0].latitude, items[0].longitude]
          : [53.9045, 27.5615]; // Minsk default

      const map = L.map(mapRef.current, {
        center,
        zoom: 11,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // invalidateSize forces Leaflet to recalculate tile layout.
      // Without this, tiles render as grey squares when the container
      // becomes visible after initial render (e.g. inside a hidden/flex layout).
      map.invalidateSize();
      setTimeout(() => map.invalidateSize(), 200);

      const customIcon = L.divIcon({
        className: "",
        html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26S28 24.5 28 14C28 6.268 21.732 0 14 0z" fill="#F59E0B"/>
          <circle cx="14" cy="14" r="5" fill="#0a0a0f"/>
        </svg>`,
        iconSize: [28, 40],
        iconAnchor: [14, 40],
        popupAnchor: [0, -42],
      });

      items.forEach((loc) => {
        if (!loc.latitude || !loc.longitude) return;
        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(map);
        marker.bindPopup(
          `<div style="color:#1a1a2e;font-family:Inter,sans-serif;font-size:0.85rem;padding:4px">
            <strong style="font-size:0.95rem">${loc.name}</strong>
            <div style="margin-top:4px;color:#555">${loc.address}</div>
            ${loc.phone ? `<div style="margin-top:4px;color:#F59E0B">${loc.phone}</div>` : ""}
          </div>`,
          { maxWidth: 240 }
        );
      });

      mapInstance.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // Re-init whenever locations data changes (loaded async after first render)
  }, [items.length]);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {i18n.language === "ru" ? "Наши офисы" : "Our Offices"}
        </motion.h2>

        <div className="premium-grid--2" style={{ gap: 32 }}>
          {/* Map container */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              minHeight: 400,
              border: "1px solid var(--border-low)",
              background: "var(--bg-dark-2)",
            }}
          >
            <div ref={mapRef} style={{ height: 400, width: "100%" }} />
          </div>

          {/* Address list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {items.length === 0 ? (
              // Skeleton while loading
              [1, 2, 3].map((i) => (
                <div key={i} className="glass-card">
                  <div className="skeleton" style={{ height: 16, width: "60%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "80%" }} />
                </div>
              ))
            ) : (
              items.map((loc) => (
                <motion.div
                  key={loc.id}
                  className="glass-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{
                    cursor: "pointer",
                    borderColor: hoveredId === loc.id ? "var(--accent)" : undefined,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={() => {
                    setHoveredId(loc.id);
                    // Pan the map to this location on hover
                    if (mapInstance.current && loc.latitude && loc.longitude) {
                      mapInstance.current.panTo([loc.latitude, loc.longitude]);
                    }
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 8 12 24 12 24s12-16 12-24C24 5.373 18.627 0 12 0zm0 16a4 4 0 110-8 4 4 0 010 8z" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          color: "var(--text-main)",
                          marginBottom: 4,
                        }}
                      >
                        {loc.name}
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 4 }}>
                        {loc.address}
                      </div>
                      {loc.phone && (
                        <a href={`tel:${loc.phone}`} style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
                          {loc.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
