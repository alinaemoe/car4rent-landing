import { create } from "zustand";
import type { CatalogFilters } from "@/types";

interface FilterStore {
  filters: CatalogFilters;
  setFilters: (filters: Partial<CatalogFilters>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: { page: 1, limit: 12, sort: "default" },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),
  resetFilters: () =>
    set({ filters: { page: 1, limit: 12, sort: "default" } }),
}));

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (carId: number) => void;
  isFavorite: (carId: number) => boolean;
}

const getInitialFavorites = (): number[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  return [];
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: getInitialFavorites(),
  toggleFavorite: (carId) =>
    set((state) => {
      const exists = state.favorites.includes(carId);
      const updated = exists
        ? state.favorites.filter((id) => id !== carId)
        : [...state.favorites, carId];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updated));
      }
      return { favorites: updated };
    }),
  isFavorite: (carId) => get().favorites.includes(carId),
}));
