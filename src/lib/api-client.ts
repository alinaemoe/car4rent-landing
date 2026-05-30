import axios from "axios";
import type {
  Car,
  CatalogFilters,
  CatalogResponse,
  Feature,
  Location,
  Review,
  Faq,
  NewsItem,
  Translation,
  Language,
  Setting,
  RentalLead,
  PartnershipRequest,
} from "@/types";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (import.meta.env.DEV) {
      console.error("[API Error]", err.response?.status, err.response?.data);
    }
    return Promise.reject(err);
  }
);

/* ─── Cars ─── */
export async function fetchCars(
  filters: CatalogFilters = {}
): Promise<CatalogResponse> {
  const params: Record<string, string> = {};
  if (filters.page) params.page = String(filters.page);
  if (filters.limit) params.limit = String(filters.limit);
  if (filters.sort) params.sort = filters.sort;
  if (filters.brands?.length) params.brands = filters.brands.join(",");
  if (filters.body_types?.length)
    params.body_types = filters.body_types.join(",");
  if (filters.transmissions?.length)
    params.transmissions = filters.transmissions.join(",");
  if (filters.fuel_types?.length)
    params.fuel_types = filters.fuel_types.join(",");
  if (filters.drive_types?.length)
    params.drive_types = filters.drive_types.join(",");
  if (filters.features?.length)
    params.features = filters.features.join(",");
  if (filters.price_min) params.price_min = String(filters.price_min);
  if (filters.price_max) params.price_max = String(filters.price_max);
  if (filters.rating_min) params.rating_min = String(filters.rating_min);
  if (filters.start_date) params.start_date = filters.start_date;
  if (filters.end_date) params.end_date = filters.end_date;

  const { data } = await apiClient.get<CatalogResponse>("/cars/catalog", {
    params,
  });
  return data;
}

export async function fetchCarDetail(id: number): Promise<Car> {
  const { data } = await apiClient.get<Car>(`/cars/catalog/${id}`);
  return data;
}

/* ─── Features ─── */
export async function fetchFeatures(): Promise<Feature[]> {
  const { data } = await apiClient.get<Feature[]>("/features");
  return data;
}

/* ─── Locations ─── */
export async function fetchLocations(): Promise<Location[]> {
  const { data } = await apiClient.get<Location[]>("/locations");
  return data;
}

/* ─── Reviews ─── */
export async function fetchCompanyReviews(): Promise<Review[]> {
  const { data } = await apiClient.get<Review[]>("/reviews/company");
  return data;
}

/* ─── FAQ ─── */
export async function fetchFaqs(): Promise<Faq[]> {
  const { data } = await apiClient.get<Faq[]>("/faq");
  return data;
}

/* ─── News ─── */
export async function fetchNews(): Promise<NewsItem[]> {
  const { data } = await apiClient.get<NewsItem[]>("/news");
  return data;
}

/* ─── Translations ─── */
export async function fetchTranslations(): Promise<Translation[]> {
  const { data } = await apiClient.get<Translation[]>("/translations");
  return data;
}

/* ─── Languages ─── */
export async function fetchLanguages(): Promise<Language[]> {
  const { data } = await apiClient.get<Language[]>("/languages");
  return data;
}

/* ─── Settings ─── */
export async function fetchSettings(): Promise<Setting[]> {
  const { data } = await apiClient.get<Setting[]>("/settings");
  return data;
}

/* ─── Rental Lead ─── */
export async function submitRentalLead(
  lead: RentalLead
): Promise<{ id: number }> {
  const { data } = await apiClient.post("/rental-leads", lead);
  return data;
}

/* ─── Partnership Request ─── */
export async function submitPartnershipRequest(
  req: PartnershipRequest
): Promise<{ id: number }> {
  const { data } = await apiClient.post("/partnership-requests", req);
  return data;
}
