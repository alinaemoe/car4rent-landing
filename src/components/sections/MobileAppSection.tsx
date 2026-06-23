"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

// 🔗 Ссылка, зашитая в QR (public/app-qr.png) и в кнопки-бейджи сторов.
// Пока ведёт на сборку APK. Когда появится финальный архив/стор — поменять
// здесь И перегенерировать QR (см. README/скрипт генерации).
const APP_URL =
  "https://expo.dev/accounts/sohalina/projects/car4rent/builds/2b59bd44-09ec-4abc-aa3b-8172efe78127";

const FEATURES = ["catalog", "booking", "tracking", "support"] as const;

export function MobileAppSection() {
  const { t } = useTranslation();

  return (
    <section
      id="mobile-app"
      className="section-padding bg-grid"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Ambient orb для атмосферы (как в WhyUs) */}
      <div
        className="ambient-orb"
        style={{
          width: 480,
          height: 480,
          top: "10%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(64,169,255,0.14) 0%, transparent 70%)",
        }}
      />

      <div
        className="container-wide"
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("mobile_app_title")}
        </motion.h2>

        <div
          className="premium-grid--2"
          style={{ alignItems: "center", gap: 56 }}
        >
          {/* ─── ЛЕВО: Текст, преимущества, бейджи сторов ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: 16,
                color: "var(--text-main)",
              }}
            >
              {t("mobile_app_subtitle")}
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              {t("mobile_app_desc")}
            </p>

            {/* Список преимуществ */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 36,
              }}
            >
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{ display: "flex", gap: 14, alignItems: "center" }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "rgba(64,169,255,0.12)",
                      border: "1px solid var(--border-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span
                    style={{
                      color: "var(--text-main)",
                      fontSize: "0.98rem",
                      fontFamily: "var(--font-body), sans-serif",
                    }}
                  >
                    {t(`mobile_feature_${feat}`)}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Бейджи сторов */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <StoreBadge
                href={APP_URL}
                topLine={t("mobile_store_appstore_label")}
                bottomLine="App Store"
                icon={
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                    <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.23 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.29-1.27 3.14-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.73-1.05-2.76-4.16zM14.6 4.5c.71-.87 1.19-2.06 1.06-3.26-1.02.04-2.27.68-3 1.54-.65.76-1.23 1.99-1.08 3.16 1.14.09 2.31-.58 3.02-1.44z" />
                  </svg>
                }
              />
              <StoreBadge
                href={APP_URL}
                topLine={t("mobile_store_google_label")}
                bottomLine="Google Play"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1L13 12.1v-.2L3.7 2.2l-.1.1z"
                      fill="#00D4FF"
                    />
                    <path
                      d="M16.3 15.4 13 12.1v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2h-.1z"
                      fill="#FFCE00"
                    />
                    <path
                      d="M16.4 15.3 13 12 3.6 21.7c.4.4 1 .4 1.7.1l11.1-6.5z"
                      fill="#FF3D44"
                    />
                    <path
                      d="M16.4 8.7 5.3 2.2c-.7-.4-1.3-.3-1.7.1L13 12l3.4-3.3z"
                      fill="#00F076"
                    />
                  </svg>
                }
              />
            </div>
          </motion.div>

          {/* ─── ПРАВО: Большой QR в стеклянной карточке ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="glass-card"
              style={{
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                maxWidth: 380,
                width: "100%",
              }}
            >
              {/* Белая подложка под QR (чтобы сканировался на тёмном фоне) */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: 18,
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                <img
                  src="/app-qr.png"
                  alt={t("mobile_app_scan")}
                  width={260}
                  height={260}
                  style={{ display: "block", width: 260, height: 260 }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    marginBottom: 4,
                  }}
                >
                  {t("mobile_app_scan")}
                </p>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.88rem",
                  }}
                >
                  {t("mobile_app_scan_hint")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Бейдж стора (App Store / Google Play) ───
function StoreBadge({
  href,
  topLine,
  bottomLine,
  icon,
}: {
  href: string;
  topLine: string;
  bottomLine: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-strong"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 18px",
        borderRadius: "var(--radius-md)",
        transition: "all var(--transition-base)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {topLine}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "var(--text-main)",
          }}
        >
          {bottomLine}
        </span>
      </span>
    </a>
  );
}
