"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useSettings } from "@/hooks/useQueries";

export function Footer() {
  const { t } = useTranslation();
  const { data: settings } = useSettings();

  const getSetting = (key: string) =>
    Array.isArray(settings) ? settings.find((s) => s.key === key)?.value || "" : "";

  const phone = getSetting("support_phone");
  const email = getSetting("support_email");

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <a href="/" className="header__logo" style={{ fontSize: "1.3rem" }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="var(--accent)"/>
              <path d="M16 6L22 14H18L16 11L14 14H10L16 6Z" fill="var(--bg-main)"/>
              <rect x="10" y="14" width="12" height="10" rx="2" fill="var(--bg-main)" opacity="0.9"/>
            </svg>
            <span>Car4Rent</span>
          </a>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 300 }}>
            {t("footer_description")}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>
            {t("nav_catalog")}
          </h4>
          <a href="/catalog" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("fleet_economy")}</a>
          <a href="/catalog" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("fleet_comfort")}</a>
          <a href="/catalog" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("fleet_business")}</a>
          <a href="/catalog" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("fleet_premium")}</a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>
            {t("nav_contacts")}
          </h4>
          {phone && (
            <a href={`tel:${phone}`} style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              {email}
            </a>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <a href="#" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.127.037.358.027.56-.074 1.482-.786 5.082-1.11 6.74-.137.7-.408 1.074-.668 1.12-.567.098-1.49-.718-2.413-1.418-.527-.399-1.059-.77-1.59-.742-.562.03-1.038.255-1.272.427.315.408.718.85 1.102 1.25.27.28.576.583.9.842.6.493 1.163.953 1.17 1.482.01.591-.603.995-1.116 1.287-.582.33-1.17.57-1.74.733-.287.082-.572.15-.846.203-.22.035-.442.056-.645.056-.745-.01-1.36-.483-1.53-.847-.196-.412-.462-.784-.71-1.137a24.106 24.106 0 00-1.093-1.4c-.41-.488-.822-.978-1.036-1.298a1.577 1.577 0 01-.13-.195c-.266-.474-.263-.823.246-1.172.91-.618 1.853-1.336 2.572-1.927-1.072-1.385-2.043-2.853-2.325-3.562a4.065 4.065 0 01-.112-.3c-.158-.466-.04-.708.32-.73.25-.016.516.014.78.032.226.016.458.033.687.034.305 0 .634-.108.958-.158.437-.069.92-.1 1.33-.03.305.05.39.316.375.485-.036.406-.12.955-.245 1.45-.15.585-1.188 2.544-1.624 3.323l.012-.006c.234-.054.458-.106.732-.143.333-.045.658-.064 1.003-.033.43.04.78.122.98.267-.036.176-.196.524-.36.855-.17.348-.35.713-.35.786 0 .025.005.049.017.067.162.242.623.704.92.997.33.328.856.768 1.39 1.094.578.353 1.166.634 1.6.544.065-.013.13-.034.19-.06.108-.047.2-.117.276-.2.142-.155.18-.43.18-.68l-.003-.005c-.009-.282-.13-.575-.234-.82-.064-.153-.13-.307-.178-.476-.137-.497-.09-.926.24-1.167.058-.042.12-.076.183-.108.758-.37 1.72-.676 2.636-.897.47-.114.928-.172 1.336-.166z"/></svg>
            </a>
            <a href="#" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.62-5.961-7.62-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976v16.023H.396zM2.882 0C1.29 0 0 1.29 0 2.882s1.29 2.883 2.882 2.883 2.882-1.291 2.882-2.883C5.764 1.29 4.473 0 2.882 0z"/></svg>
            </a>
            <a href="#" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.088l-1.282 8.81c-.072.514-.426.646-.862.402l-2.38-1.762-1.074 1.042c-.14.14-.252.252-.488.252l.174-2.492 4.52-4.092c.198-.176-.042-.274-.307-.098l-5.586 3.524-2.404-.81c-.516-.17-.526-.516.108-.77l9.386-3.62c.43-.158.806.104.665.606z"/></svg>
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>
            Language
          </h4>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="footer__bottom">
        <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
          &copy; {new Date().getFullYear()} Car4Rent. {t("footer_copyright")}
        </span>
      </div>
    </footer>
  );
}
