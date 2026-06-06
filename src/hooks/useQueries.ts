import { useQuery } from "@tanstack/react-query";
import {
  fetchCars,
  fetchCarDetail,
  fetchFeatures,
  fetchLocations,
  fetchCompanyReviews,
  fetchFaqs,
  fetchNews,
  fetchLanguages,
  fetchSettings,
} from "@/lib/api-client";
import type {
  CatalogFilters,
  Car,
  Feature,
  Location,
  Review,
  Faq,
  NewsItem,
  Language,
  Setting,
} from "@/types";
import {
  MOCK_FEATURES,
  MOCK_LOCATIONS,
  MOCK_REVIEWS,
  MOCK_FAQS,
  MOCK_NEWS,
  MOCK_SETTINGS,
  generateMockCars,
} from "@/mock/data";

export function useCatalog(filters: CatalogFilters = {}) {
  return useQuery({
    queryKey: ["cars", "catalog", filters],
    queryFn: async () => {
      try {
        return await fetchCars(filters);
      } catch {
        return {
          data: generateMockCars(4),
          meta: { total: 20, page: 1, limit: 4, total_pages: 5 },
        };
      }
    },
    staleTime: 0,
    initialData: {
      data: generateMockCars(4),
      meta: { total: 20, page: 1, limit: 4, total_pages: 5 },
    },
  });
}

export function useCarDetail(id: number | null) {
  return useQuery({
    queryKey: ["cars", "detail", id],
    queryFn: async () => {
      try {
        return await fetchCarDetail(id!);
      } catch {
        return generateMockCars(1)[0];
      }
    },
    enabled: id !== null,
    staleTime: 0,
    initialData: null,
  });
}

export function useFeatures() {
  return useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: async () => {
      try {
        return await fetchFeatures();
      } catch {
        return MOCK_FEATURES as Feature[];
      }
    },
    staleTime: 0,
    initialData: MOCK_FEATURES as Feature[],
  });
}

export function useLocations() {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: async () => {
      try {
        return await fetchLocations();
      } catch {
        return MOCK_LOCATIONS as Location[];
      }
    },
    staleTime: 0,
    initialData: MOCK_LOCATIONS as Location[],
  });
}

export function useCompanyReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews", "company"],
    queryFn: async () => {
      try {
        return await fetchCompanyReviews();
      } catch {
        return MOCK_REVIEWS as Review[];
      }
    },
    staleTime: 0,
    initialData: MOCK_REVIEWS as Review[],
  });
}

export function useFaqs() {
  return useQuery<Faq[]>({
    queryKey: ["faq"],
    queryFn: async () => {
      try {
        return await fetchFaqs();
      } catch {
        return MOCK_FAQS as Faq[];
      }
    },
    staleTime: 0,
    initialData: MOCK_FAQS as Faq[],
  });
}

export function useNews() {
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      try {
        return await fetchNews();
      } catch {
        return MOCK_NEWS as NewsItem[];
      }
    },
    staleTime: 0,
    initialData: MOCK_NEWS as NewsItem[],
  });
}

export function useLanguages() {
  return useQuery<Language[]>({
    queryKey: ["languages"],
    queryFn: async () => {
      try {
        return await fetchLanguages();
      } catch {
        return [
          { id: 1, code: "ru", name: "Русский", is_active: true },
          { id: 2, code: "en", name: "English", is_active: true },
        ] as Language[];
      }
    },
    staleTime: 0,
    initialData: [
      { id: 1, code: "ru", name: "Русский", is_active: true },
      { id: 2, code: "en", name: "English", is_active: true },
    ] as Language[],
  });
}

export function useSettings() {
  return useQuery<Setting[]>({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        return await fetchSettings();
      } catch {
        return MOCK_SETTINGS as Setting[];
      }
    },
    staleTime: 0,
    initialData: MOCK_SETTINGS as Setting[],
  });
}
