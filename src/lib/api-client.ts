import axios from "axios";
import type {
  Car,
  CarImage,
  CatalogFilters,
  CatalogResponse,
  DiscountTier,
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

/* ─── helpers ─── */

function pickFromJsonb(
  obj: Record<string, string> | null | undefined,
  lang = "ru"
): string {
  if (!obj) return "";
  return obj[lang] || Object.values(obj)[0] || "";
}

function toDiscountTiers(
  raw: Record<string, number> | null | undefined
): DiscountTier[] {
  if (!raw) return [];
  return Object.entries(raw).map(([days, percent]) => ({
    days_from: Number(days),
    discount_percent: percent,
  }));
}

function toCar(raw: any): Car {
  return {
    id: raw.id,
    brand: raw.brand,
    model: raw.model,
    year: raw.year,
    body_type: raw.body_type,
    transmission: raw.transmission,
    fuel_type: raw.fuel_type,
    drive_type: raw.drive_type,
    engine_capacity: Number(raw.engine_capacity) || 0,
    horsepower: Number(raw.horsepower) || 0,
    fuel_consumption: Number(raw.fuel_consumption) || 0,
    seats: raw.seats ?? 5,
    color: raw.color,
    vin: raw.vin,
    price_per_day: Number(raw.price_per_day),
    deposit_amount: Number(raw.deposit_amount) || 0,
    min_age: raw.min_age ?? 21,
    min_experience: raw.min_experience ?? 2,
    insurance: raw.insurance_type || raw.insurance || "ОСАГО",
    description: pickFromJsonb(raw.description),
    rating: Number(raw.avg_rating ?? raw.rating ?? 0),
    review_count: Number(raw.reviews_count ?? raw.review_count ?? 0),
    is_active: raw.status === "AVAILABLE",
    is_new: !!raw.is_new,
    is_promo: !!raw.is_promo,
    images: (raw.images || []).map((img: any): CarImage => ({
      id: img.id,
      url: img.url,
      is_main: !!img.is_main,
    })),
    features: (raw.features || []).map(toFeature),
    discount_tiers: toDiscountTiers(raw.discount_tiers),
    location: raw.location ? toLocation(raw.location) : undefined,
  };
}

function toFeature(raw: any): Feature {
  return {
    id: raw.id,
    name: pickFromJsonb(raw.description) || raw.internal_name || raw.name || "",
    slug: raw.internal_name || raw.slug || "",
    icon: raw.icon_url || raw.icon || undefined,
  };
}

function toLocation(raw: any): Location {
  return {
    id: raw.id,
    name: raw.name,
    address: raw.address,
    latitude: Number(raw.latitude),
    longitude: Number(raw.longitude),
    phone: raw.phone || undefined,
    is_main: !!raw.is_main,
  };
}

function toReview(raw: any): Review {
  const firstName = raw.user?.first_name || raw.userFirstName || "";
  const lastName = raw.user?.last_name || raw.userLastName || "";
  return {
    id: raw.id,
    author_name: raw.author_name || `${firstName} ${lastName}`.trim() || "Аноним",
    author_avatar: raw.user?.avatar_url || raw.userAvatarUrl || undefined,
    rating: raw.rating,
    text: raw.comment || raw.text || "",
    created_at: raw.created_at || raw.createdAt || "",
  };
}

function toFaq(raw: any): Faq {
  return {
    id: raw.id,
    question: pickFromJsonb(raw.question) || raw.question || "",
    answer: pickFromJsonb(raw.answer) || raw.answer || "",
    sort_order: raw.order_index ?? raw.sort_order ?? 0,
    is_active: raw.is_active ?? true,
  };
}

function toNews(raw: any): NewsItem {
  const fullText = pickFromJsonb(raw.text) || raw.text || "";
  return {
    id: raw.id,
    title: pickFromJsonb(raw.title) || raw.title || "",
    excerpt: raw.excerpt || fullText.slice(0, 120) || "",
    content: fullText,
    image: raw.image_url || raw.image || undefined,
    badge: pickFromJsonb(raw.badge) || raw.badge || undefined,
    published_at: raw.created_at || raw.published_at || "",
    is_active: raw.is_active ?? true,
  };
}

function toLanguage(raw: any): Language {
  return {
    id: raw.code?.charCodeAt(0) || raw.id || 0,
    code: raw.code,
    name: raw.name,
    is_active: !!raw.is_active,
  };
}

function toSetting(raw: any): Setting {
  return {
    id: raw.id || raw.key?.length || 0,
    key: raw.key,
    value: raw.value || "",
  };
}

/* ─── Cars ─── */
export async function fetchCars(
  filters: CatalogFilters = {}
): Promise<CatalogResponse> {
  const params: Record<string, string> = {};
  if (filters.page) params.page = String(filters.page);
  if (filters.limit) params.limit = String(filters.limit);
  if (filters.sort) {
    params.sort_by = filters.sort;
  }
  if (filters.brands?.length) params.brands = filters.brands.join(",");
  if (filters.body_types?.length)
    params.body_types = filters.body_types.join(",");
  if (filters.transmissions?.length)
    params.transmissions = filters.transmissions.join(",");
  if (filters.fuel_types?.length)
    params.fuel_types = filters.fuel_types.join(",");
  if (filters.drive_types?.length)
    params.drive_types = filters.drive_types.join(",");
  if (filters.colors?.length) params.colors = filters.colors.join(",");
  if (filters.feature_ids?.length)
    params.feature_ids = filters.feature_ids.join(",");
  if (filters.min_price) params.min_price = String(filters.min_price);
  if (filters.max_price) params.max_price = String(filters.max_price);
  if (filters.min_year) params.min_year = String(filters.min_year);
  if (filters.max_year) params.max_year = String(filters.max_year);
  if (filters.min_mileage) params.min_mileage = String(filters.min_mileage);
  if (filters.max_mileage) params.max_mileage = String(filters.max_mileage);
  if (filters.min_power) params.min_power = String(filters.min_power);
  if (filters.max_power) params.max_power = String(filters.max_power);
  if (filters.min_rating) params.min_rating = String(filters.min_rating);
  if (filters.status) params.status = filters.status;
  if (filters.start_date) params.start_date = filters.start_date;
  if (filters.end_date) params.end_date = filters.end_date;

  const { data } = await apiClient.get<any>("/cars/catalog", { params });

  return {
    data: (data.data || []).map(toCar),
    meta: {
      total: data.meta?.total ?? 0,
      page: data.meta?.page ?? 1,
      limit: data.meta?.limit ?? 10,
      total_pages: data.meta?.totalPages ?? data.meta?.total_pages ?? 1,
    },
  };
}

export async function fetchCarDetail(id: number): Promise<Car> {
  const { data } = await apiClient.get<any>(`/cars/catalog/${id}`);
  return toCar(data);
}

/* ─── Features ─── */
export async function fetchFeatures(): Promise<Feature[]> {
  const { data } = await apiClient.get<any[]>("/features");
  return (data || []).map(toFeature);
}

/* ─── Locations ─── */
export async function fetchLocations(): Promise<Location[]> {
  const { data } = await apiClient.get<any[]>("/locations");
  return (data || []).map(toLocation);
}

/* ─── Reviews ─── */
export async function fetchCompanyReviews(): Promise<Review[]> {
  const { data } = await apiClient.get<any[]>("/reviews/company");
  return (data || []).map(toReview);
}

/* ─── FAQ ─── */
export async function fetchFaqs(): Promise<Faq[]> {
  const { data } = await apiClient.get<any[]>("/faq");
  return (data || []).map(toFaq);
}

/* ─── News ─── */
export async function fetchNews(): Promise<NewsItem[]> {
  const { data } = await apiClient.get<any[]>("/news");
  return (data || []).map(toNews);
}

/* ─── Translations ─── */
export async function fetchTranslations(): Promise<Translation[]> {
  const { data } = await apiClient.get<Translation[]>("/translations");
  return data;
}

/* ─── Languages ─── */
export async function fetchLanguages(): Promise<Language[]> {
  const { data } = await apiClient.get<any[]>("/languages");
  return (data || []).map(toLanguage);
}

/* ─── Settings ─── */
export async function fetchSettings(): Promise<Setting[]> {
  const { data } = await apiClient.get<any[]>("/settings");
  return (data || []).map(toSetting);
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
