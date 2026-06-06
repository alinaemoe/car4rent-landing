export interface CarImage {
  id: number;
  url: string;
  is_main: boolean;
}

export interface DiscountTier {
  days_from: number;
  discount_percent: number;
}

export interface Feature {
  id: number;
  name: string;
  slug: string;
  icon?: string;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  body_type: string;
  transmission: string;
  fuel_type: string;
  drive_type: string;
  engine_capacity: number;
  horsepower: number;
  fuel_consumption: number;
  seats: number;
  color: string;
  vin: string;
  price_per_day: number;
  deposit_amount: number;
  min_age: number;
  min_experience: number;
  insurance: string;
  description: string;
  rating: number;
  review_count: number;
  is_active: boolean;
  is_new: boolean;
  is_promo: boolean;
  images: CarImage[];
  features: Feature[];
  discount_tiers: DiscountTier[];
  location?: Location;
}

export type CatalogFilters = {
  page?: number;
  limit?: number;
  sort?: string;
  brands?: string[];
  body_types?: string[];
  transmissions?: string[];
  fuel_types?: string[];
  drive_types?: string[];
  colors?: string[];
  feature_ids?: number[];
  min_price?: number;
  max_price?: number;
  min_year?: number;
  max_year?: number;
  min_mileage?: number;
  max_mileage?: number;
  min_power?: number;
  max_power?: number;
  min_rating?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
};

export interface CatalogMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface CatalogResponse {
  data: Car[];
  meta: CatalogMeta;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  is_main: boolean;
}

export interface Review {
  id: number;
  author_name: string;
  author_avatar?: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  badge?: string;
  published_at: string;
  is_active: boolean;
}

export interface Translation {
  id: number;
  key: string;
  value: Record<string, string>;
}

export interface Language {
  id: number;
  code: string;
  name: string;
  is_active: boolean;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
}

export interface RentalLead {
  name: string;
  phone: string;
  start_date?: string;
  end_date?: string;
  comment?: string;
}

export interface PartnershipRequest {
  owner_name: string;
  owner_phone: string;
  car_brand: string;
  car_model: string;
  car_year: number;
}
