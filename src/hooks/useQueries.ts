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
import type { CatalogFilters, Car, Feature, Location, Review, Faq, NewsItem, Language, Setting } from "@/types";
import { MOCK_FEATURES, MOCK_LOCATIONS, MOCK_REVIEWS, MOCK_FAQS, MOCK_NEWS, MOCK_SETTINGS, generateMockCars } from "@/mock/data";

export function useCatalog(filters: CatalogFilters = {}) {
  return useQuery({
    queryKey: ["cars", "catalog", filters],
    queryFn: () => fetchCars(filters),
    staleTime: 30_000,
    initialData: {
      data: generateMockCars(4),
      meta: { total: 20, page: 1, limit: 4, total_pages: 5 },
    },
  });
}

export function useCarDetail(id: number | null) {
  return useQuery({
    queryKey: ["cars", "detail", id],
    queryFn: () => fetchCarDetail(id!),
    enabled: id !== null,
    staleTime: 60_000,
    initialData: null,
  });
}

export function useFeatures() {
  return useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: fetchFeatures,
    staleTime: 300_000,
    initialData: MOCK_FEATURES as Feature[],
  });
}

export function useLocations() {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 300_000,
    initialData: MOCK_LOCATIONS as Location[],
  });
}

export function useCompanyReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews", "company"],
    queryFn: fetchCompanyReviews,
    staleTime: 60_000,
    initialData: MOCK_REVIEWS as Review[],
  });
}

export function useFaqs() {
  return useQuery<Faq[]>({
    queryKey: ["faq"],
    queryFn: fetchFaqs,
    staleTime: 300_000,
    initialData: MOCK_FAQS as Faq[],
  });
}

export function useNews() {
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 60_000,
    initialData: MOCK_NEWS as NewsItem[],
  });
}

export function useLanguages() {
  return useQuery<Language[]>({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    staleTime: 300_000,
    initialData: [
      { id: 1, code: "ru", name: "Русский", is_active: true },
      { id: 2, code: "en", name: "English", is_active: true },
    ] as Language[],
  });
}

export function useSettings() {
  return useQuery<Setting[]>({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 300_000,
    initialData: MOCK_SETTINGS as Setting[],
  });
}
