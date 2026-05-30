import { useTranslation } from "@/hooks/useTranslation";
import { useLocations } from "@/hooks/useQueries";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function LocationsMap() {
  const { t, i18n } = useTranslation();
  const { data: locations } = useLocations();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const items = Array.isArray(locations) ? locations : [];

  useEffect(() => {
    let map: any = null;
    let markers: any[] = [];

    async function initMap() {
      const L = await import("leaflet");
      const { TileLayer, Marker, Popup } = await import("react-leaflet");

      if (!mapRef.current || mapInstance.current) return;

      const center: [number, number] = items.length > 0
        ? [items[0].latitude, items[0].longitude]
        : [53.893, 27.559];

      map = L.map(mapRef.current, {
        center,
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      new L.TileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      }).addTo(map);

      const customIcon = L.divIcon({
        className: "",
        html: `<svg width="24" height="36" viewBox="0 0 24 36" fill="none"><path d="M12 0C5.373 0 0 5.373 0 12c0 8 12 24 12 24s12-16 12-24C24 5.373 18.627 0 12 0zm0 16a4 4 0 110-8 4 4 0 010 8z" fill="#40a9ff"/><circle cx="12" cy="12" r="2" fill="#0a0a0f"/></svg>`,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -36],
      });

      items.forEach((loc) => {
        const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(map);
        marker.bindPopup(
          `<div style="color:#0a0a0f;font-family:Inter,sans-serif;font-size:0.85rem">
            <strong>${loc.name}</strong><br/>${loc.address}${loc.phone ? `<br/><br/>${loc.phone}` : ""}
          </div>`
        );
        markers.push(marker);
      });

      mapInstance.current = map;
    }

    initMap();

    return () => {
      markers.forEach((m) => m.remove());
      markers = [];
      if (map) {
        map.remove();
        map = null;
      }
      mapInstance.current = null;
    };
  }, [items]);

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
          {/* Map */}
          <div style={{ borderRadius: 16, overflow: "hidden", minHeight: 400, border: "1px solid var(--border-low)" }}>
            <div ref={mapRef} style={{ height: 400, width: "100%", background: "var(--bg-dark-2)" }} />
          </div>

          {/* Address list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {items.map((loc) => (
              <div
                key={loc.id}
                className="glass-card"
                style={{
                  cursor: "pointer",
                  borderColor: hoveredId === loc.id ? "var(--border-accent)" : undefined,
                }}
                onMouseEnter={() => setHoveredId(loc.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 8 12 24 12 24s12-16 12-24C24 5.373 18.627 0 12 0zm0 16a4 4 0 110-8 4 4 0 010 8z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
