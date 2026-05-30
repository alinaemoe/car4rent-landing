export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

export function getDaysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86400000));
}

export function calculateDiscount(
  days: number,
  discountTiers: { days_from: number; discount_percent: number }[]
): number {
  let maxDiscount = 0;
  for (const tier of discountTiers) {
    if (days >= tier.days_from) {
      maxDiscount = Math.max(maxDiscount, tier.discount_percent);
    }
  }
  return maxDiscount;
}

export function buildQueryString(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => search.append(key, String(v)));
      } else {
        search.set(key, String(value));
      }
    }
  });
  return search.toString();
}

export const BODY_TYPE_LABELS: Record<string, string> = {
  sedan: "Седан",
  hatchback: "Хэтчбек",
  wagon: "Универсал",
  coupe: "Купе",
  convertible: "Кабриолет",
  suv: "Внедорожник",
  minivan: "Минивэн",
  pickup: "Пикап",
  limousine: "Лимузин",
  electric: "Электромобиль",
};

export const BODY_TYPE_LABELS_EN: Record<string, string> = {
  sedan: "Sedan",
  hatchback: "Hatchback",
  wagon: "Wagon",
  coupe: "Coupe",
  convertible: "Convertible",
  suv: "SUV",
  minivan: "Minivan",
  pickup: "Pickup",
  limousine: "Limousine",
  electric: "Electric",
};

export const BRANDS = [
  "BMW",
  "Mercedes",
  "Audi",
  "Toyota",
  "Volkswagen",
  "Lexus",
  "Porsche",
  "Volvo",
  "Mazda",
  "Hyundai",
  "Kia",
  "Honda",
  "Nissan",
  "Ford",
  "Skoda",
  "Renault",
  "Chevrolet",
  "Mitsubishi",
  "Subaru",
  "Land Rover",
];
