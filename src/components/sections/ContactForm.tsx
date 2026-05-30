"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useSettings } from "@/hooks/useQueries";
import { motion } from "framer-motion";
import { useState } from "react";
import { submitRentalLead } from "@/lib/api-client";

export function ContactForm() {
  const { t } = useTranslation();
  const { data: settings } = useSettings();

  const getSetting = (key: string) =>
    Array.isArray(settings) ? settings.find((s) => s.key === key)?.value || "" : "";
  const phone = getSetting("support_phone");
  const email = getSetting("support_email");
  const address = getSetting("company_address");

  const [form, setForm] = useState({ name: "", phone: "", start_date: "", end_date: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitRentalLead({
        name: form.name,
        phone: form.phone,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        comment: form.comment || undefined,
      });
      setStatus("success");
      setForm({ name: "", phone: "", start_date: "", end_date: "", comment: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="section-padding bg-grid" style={{ position: "relative" }}>
      <div className="ambient-orb" style={{ width: 400, height: 400, bottom: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("contact_title")}
        </motion.h2>

        <div className="premium-grid--2" style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: 24,
                color: "var(--text-main)",
              }}
            >
              {t("contact_form_title")}
            </h3>

            {status === "success" ? (
              <div className="glass-card" style={{ textAlign: "center", padding: "40px 24px" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" style={{ margin: "0 auto 16px" }}>
                  <circle cx="12" cy="12" r="10"/><polyline points="16 8 10 16 7 13"/>
                </svg>
                <p style={{ color: "var(--text-muted)" }}>{t("form_success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="floating-label-group">
                  <input className="input-field" placeholder=" " required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <label className="input-label">{t("form_name")}</label>
                </div>
                <div className="floating-label-group">
                  <input className="input-field" placeholder=" " required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <label className="input-label">{t("form_phone")}</label>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="floating-label-group">
                    <input className="input-field" type="date" placeholder=" " value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} style={{ colorScheme: "dark" }} />
                    <label className="input-label">Начало</label>
                  </div>
                  <div className="floating-label-group">
                    <input className="input-field" type="date" placeholder=" " value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} style={{ colorScheme: "dark" }} />
                    <label className="input-label">Конец</label>
                  </div>
                </div>
                <div className="floating-label-group">
                  <textarea className="input-field" placeholder=" " rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
                  <label className="input-label">{t("form_comment")}</label>
                </div>
                <button className="btn-primary" type="submit" disabled={status === "loading"} style={{ justifyContent: "center", padding: "14px 28px" }}>
                  {status === "loading" ? <><div className="spinner" style={{ width: 18, height: 18 }} /> Отправка...</> : t("form_submit")}
                </button>
                {status === "error" && (
                  <p style={{ color: "var(--error)", fontSize: "0.85rem", textAlign: "center" }}>{t("form_error")}</p>
                )}
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div className="glass-card">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>Phone</div>
                  {phone ? (
                    <a href={`tel:${phone}`} style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{phone}</a>
                  ) : (
                    <div className="skeleton" style={{ height: 20, width: 140 }} />
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>Email</div>
                  {email ? (
                    <a href={`mailto:${email}`} style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{email}</a>
                  ) : (
                    <div className="skeleton" style={{ height: 20, width: 180 }} />
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 4 }}>Address</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{address || "ул. Тимирязева, 74, Минск"}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              {phone && (
                <a href={`https://t.me/${phone}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.127.037.358.027.56-.074 1.482-.786 5.082-1.11 6.74-.137.7-.408 1.074-.668 1.12-.567.098-1.49-.718-2.413-1.418-.527-.399-1.059-.77-1.59-.742-.562.03-1.038.255-1.272.427.315.408.718.85 1.102 1.25.27.28.576.583.9.842.6.493 1.163.953 1.17 1.482.01.591-.603.995-1.116 1.287-.582.33-1.17.57-1.74.733-.287.082-.572.15-.846.203-.22.035-.442.056-.645.056-.745-.01-1.36-.483-1.53-.847-.196-.412-.462-.784-.71-1.137a24.106 24.106 0 00-1.093-1.4c-.41-.488-.822-.978-1.036-1.298a1.577 1.577 0 01-.13-.195c-.266-.474-.263-.823.246-1.172.91-.618 1.853-1.336 2.572-1.927-1.072-1.385-2.043-2.853-2.325-3.562a4.065 4.065 0 01-.112-.3c-.158-.466-.04-.708.32-.73.25-.016.516.014.78.032.226.016.458.033.687.034.305 0 .634-.108.958-.158.437-.069.92-.1 1.33-.03.305.05.39.316.375.485-.036.406-.12.955-.245 1.45-.15.585-1.188 2.544-1.624 3.323l.012-.006c.234-.054.458-.106.732-.143.333-.045.658-.064 1.003-.033.43.04.78.122.98.267-.036.176-.196.524-.36.855-.17.348-.35.713-.35.786 0 .025.005.049.017.067.162.242.623.704.92.997.33.328.856.768 1.39 1.094.578.353 1.166.634 1.6.544.065-.013.13-.034.19-.06.108-.047.2-.117.276-.2.142-.155.18-.43.18-.68l-.003-.005c-.009-.282-.13-.575-.234-.82-.064-.153-.13-.307-.178-.476-.137-.497-.09-.926.24-1.167.058-.042.12-.076.183-.108.758-.37 1.72-.676 2.636-.897.47-.114.928-.172 1.336-.166z"/></svg>
                  Telegram
                </a>
              )}
              {phone && (
                <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
