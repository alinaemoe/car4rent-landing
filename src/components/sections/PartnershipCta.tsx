"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useState } from "react";
import { submitPartnershipRequest } from "@/lib/api-client";
import type { PartnershipRequest } from "@/types";

export function PartnershipCta() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ owner_name: "", owner_phone: "", car_brand: "", car_model: "", car_year: new Date().getFullYear() });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitPartnershipRequest(form as PartnershipRequest);
      setStatus("success");
      setForm({ owner_name: "", owner_phone: "", car_brand: "", car_model: "", car_year: new Date().getFullYear() });
      setTimeout(() => { setOpen(false); setStatus("idle"); }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <div className="ambient-orb" style={{ width: 500, height: 500, top: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)" }} />
      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        <div className="glass-strong" style={{ borderRadius: 24, padding: "64px 48px", textAlign: "center" }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 16 }}
          >
            {t("partnership_title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}
          >
            {t("partnership_desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 40 }}
          >
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{t(`partnership_benefit${i}`)}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="btn-primary" style={{ padding: "14px 36px", fontSize: "1rem" }} onClick={() => setOpen(true)}>
              {t("partnership_cta")}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="modal-overlay" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => { if (status !== "loading") setOpen(false); }}>
          <div className="modal-content glass-strong" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: 24 }}>
              {t("partnership_title")}
            </h3>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" style={{ margin: "0 auto 16px" }}>
                  <circle cx="12" cy="12" r="10"/><polyline points="16 8 10 16 7 13"/>
                </svg>
                <p style={{ color: "var(--text-muted)" }}>{t("form_success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="floating-label-group">
                  <input className="input-field" placeholder=" " required value={form.owner_name} onChange={(e) => setForm({ ...form, owner_name: e.target.value })} />
                  <label className="input-label">{t("form_name")}</label>
                </div>
                <div className="floating-label-group">
                  <input className="input-field" placeholder=" " required value={form.owner_phone} onChange={(e) => setForm({ ...form, owner_phone: e.target.value })} />
                  <label className="input-label">{t("form_phone")}</label>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="floating-label-group">
                    <input className="input-field" placeholder=" " required value={form.car_brand} onChange={(e) => setForm({ ...form, car_brand: e.target.value })} />
                    <label className="input-label">{t("catalog_filter_brand")}</label>
                  </div>
                  <div className="floating-label-group">
                    <input className="input-field" placeholder=" " required value={form.car_model} onChange={(e) => setForm({ ...form, car_model: e.target.value })} />
                    <label className="input-label">Модель</label>
                  </div>
                </div>
                <div className="floating-label-group">
                  <input className="input-field" type="number" placeholder=" " required value={form.car_year} onChange={(e) => setForm({ ...form, car_year: parseInt(e.target.value) || new Date().getFullYear() })} />
                  <label className="input-label">Год выпуска</label>
                </div>
                <button className="btn-primary" type="submit" disabled={status === "loading"} style={{ justifyContent: "center", marginTop: 8 }}>
                  {status === "loading" ? <><div className="spinner" style={{ width: 18, height: 18 }} /> Отправка...</> : t("form_submit")}
                </button>
                {status === "error" && (
                  <p style={{ color: "var(--error)", fontSize: "0.85rem", textAlign: "center" }}>{t("form_error")}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
