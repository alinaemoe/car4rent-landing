import type { Car, Feature, Location, Review, Faq, NewsItem, Setting } from "@/types";

export const MOCK_FEATURES: Feature[] = [
  { id: 1, name: "Климат-контроль", slug: "climate" },
  { id: 2, name: "Bluetooth", slug: "bluetooth" },
  { id: 3, name: "GPS", slug: "gps" },
  { id: 4, name: "Кожаный салон", slug: "leather" },
  { id: 5, name: "Панорамная крыша", slug: "panoramic" },
  { id: 6, name: "Подогрев сидений", slug: "heated_seats" },
  { id: 7, name: "Камера заднего вида", slug: "rear_camera" },
  { id: 8, name: "Парктроник", slug: "parktronic" },
];

export const MOCK_LOCATIONS: Location[] = [
  { id: 1, name: "Центральный офис", address: "ул. Тимирязева, 74, Минск", latitude: 53.893, longitude: 27.559, phone: "+375 29 111-11-11", is_main: true },
  { id: 2, name: "Аэропорт Минск", address: "Национальный аэропорт Минск, стойка A12", latitude: 53.888, longitude: 28.035, is_main: false },
  { id: 3, name: "Железнодорожный вокзал", address: "Привокзальная пл., 3, Минск", latitude: 53.891, longitude: 27.548, is_main: false },
  { id: 4, name: "Уручье", address: "пр. Независимости, 150, Минск", latitude: 53.945, longitude: 27.686, is_main: false },
];

export const MOCK_REVIEWS: Review[] = [
  { id: 1, author_name: "Алексей К.", rating: 5, text: "Отличный сервис! Брал BMW X5 на неделю — машина в идеальном состоянии, все документы оформили быстро. Обязательно вернусь!", created_at: "2026-05-15" },
  { id: 2, author_name: "Марина С.", rating: 5, text: "Очень довольна сотрудничеством. Цены адекватные, машина чистая, заправленная. Отдельное спасибо за страховку — чувствуешь себя уверенно.", created_at: "2026-05-10" },
  { id: 3, author_name: "Дмитрий В.", rating: 4, text: "Хороший выбор авто, удобное расположение офиса. Единственное — хотелось бы более гибкие условия по возврату.", created_at: "2026-04-28" },
  { id: 4, author_name: "Екатерина П.", rating: 5, text: "Пользовались услугой несколько раз, всегда отличное качество. Приятно, что есть программа лояльности для постоянных клиентов.", created_at: "2026-04-20" },
  { id: 5, author_name: "Иван М.", rating: 5, text: "Брал Mercedes E-Class в командировку. Машина премиум-класса, обслуживание на высшем уровне. Рекомендую!", created_at: "2026-04-12" },
];

export const MOCK_FAQS: Faq[] = [
  { id: 1, question: "Как забронировать автомобиль?", answer: "Выберите автомобиль в каталоге, укажите желаемые даты аренды и оставьте заявку на бронирование. Наш менеджер свяжется с вами в течение 15 минут для подтверждения.", sort_order: 1, is_active: true },
  { id: 2, question: "Какие документы нужны для аренды?", answer: "Для аренды автомобиля необходимы: паспорт, водительское удостоверение категории B (стаж не менее 2 лет), и возраст от 21 года.", sort_order: 2, is_active: true },
  { id: 3, question: "Есть ли ограничения по пробегу?", answer: "Нет, мы не устанавливаем ограничения по пробегу. Вы можете путешествовать без лишних забот и дополнительных платежей.", sort_order: 3, is_active: true },
  { id: 4, question: "Как работает страховка?", answer: "КАСКО включено в стоимость аренды. Вы получаете полную страховую защиту без франшизы. В случае ДТП наша поддержка 24/7 поможет решить все вопросы.", sort_order: 4, is_active: true },
  { id: 5, question: "Можно ли вернуть авто в другом городе?", answer: "Да, у нас есть офисы в нескольких городах. Вы можете забрать автомобиль в одном городе и сдать в другом. Услуга платная, стоимость зависит от маршрута.", sort_order: 5, is_active: true },
  { id: 6, question: "Какой депозит требуется?", answer: "Размер депозита зависит от класса автомобиля и составляет от 200 до 2000 BYN. Депозит полностью возвращается после возврата авто в надлежащем состоянии.", sort_order: 6, is_active: true },
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 1, title: "Новые поступления: BMW X5 2026", excerpt: "В наш автопарк поступили новые BMW X5 2026 года. Современный дизайн, максимальная комплектация, полный привод.", content: "", published_at: "2026-05-20", badge: "Новинка", is_active: true },
  { id: 2, title: "Сезонное предложение: скидка 15%", excerpt: "Лето — время путешествий! При аренде на 7+ дней скидка 15%. Предложение действует на все классы автомобилей.", content: "", published_at: "2026-05-15", badge: "Акция", is_active: true },
  { id: 3, title: "Новый офис в Минске", excerpt: "Мы открыли новый офис в центре Минска. Теперь забрать авто стало ещё удобнее! Ждём вас по адресу пр. Независимости, 150.", content: "", published_at: "2026-05-10", badge: "Новость", is_active: true },
];

export const MOCK_SETTINGS: Setting[] = [
  { id: 1, key: "support_phone", value: "+375 29 111-11-11" },
  { id: 2, key: "support_email", value: "info@aurum.by" },
  { id: 3, key: "company_name", value: "Car4Rent" },
  { id: 4, key: "company_address", value: "ул. Тимирязева, 74, Минск" },
];

export function generateMockCars(count: number = 8): Car[] {
  const brands = ["BMW", "Mercedes", "Audi", "Toyota", "Lexus", "Porsche", "Volkswagen", "Mazda"];
  const models = ["X5", "E-Class", "A6", "Camry", "RX", "Cayenne", "Passat", "CX-5"];
  const bodyTypes = ["suv", "sedan", "wagon", "coupe", "suv", "suv", "sedan", "suv"];
  const transmissions = ["automatic", "automatic", "automatic", "automatic", "automatic", "automatic", "manual", "automatic"];
  const fuelTypes = ["petrol", "diesel", "petrol", "petrol", "hybrid", "petrol", "diesel", "petrol"];
  const driveTypes = ["awd", "rwd", "awd", "fwd", "awd", "awd", "fwd", "awd"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    brand: brands[i % brands.length],
    model: models[i % models.length],
    year: 2024 - (i % 3),
    body_type: bodyTypes[i % bodyTypes.length],
    transmission: transmissions[i % transmissions.length],
    fuel_type: fuelTypes[i % fuelTypes.length],
    drive_type: driveTypes[i % driveTypes.length],
    engine_capacity: 2.0 + (i % 4) * 0.5,
    horsepower: 180 + (i % 6) * 30,
    fuel_consumption: 6.5 + (i % 5) * 0.5,
    seats: 5,
    color: ["Black", "White", "Silver", "Blue"][i % 4],
    vin: `MOCK${String(i + 1).padStart(8, "0")}`,
    price_per_day: 80 + (i % 5) * 30,
    deposit_amount: 300 + (i % 4) * 100,
    min_age: 21,
    min_experience: 2,
    insurance: "КАСКО включено",
    description: `Новый ${brands[i % brands.length]} ${models[i % models.length]} в идеальном состоянии. Полный фарш, кожаный салон, люк.`,
    rating: 4 + (i % 2) * 0.5,
    review_count: 10 + i * 3,
    is_active: true,
    is_new: i < 2,
    is_promo: i >= 4 && i < 6,
    images: [
      { id: i * 2 + 1, url: `https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop`, is_main: true },
      { id: i * 2 + 2, url: `https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop`, is_main: false },
    ],
    features: MOCK_FEATURES.slice(0, 3 + (i % 4)),
    discount_tiers: [
      { days_from: 3, discount_percent: 5 },
      { days_from: 7, discount_percent: 10 },
      { days_from: 14, discount_percent: 15 },
    ],
    location: MOCK_LOCATIONS[i % MOCK_LOCATIONS.length],
  }));
}
