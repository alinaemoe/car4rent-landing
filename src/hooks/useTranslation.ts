"use client";
import { useTranslation as useI18nTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

export function useTranslation() {
  return useI18nTranslation();
}

export function changeLanguage(lng: string) {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
}

export function getCurrentLanguage(): string {
  return i18n.language || "ru";
}
