import CountryCard, { type Country } from "./CountryCard";

const STRAPI = "http://localhost:1337";

// Сырой объект из Strapi
interface StrapiCountry {
  id: number;
  documentId?: string;
  // Strapi v5 — поля напрямую
  name?: string;
  nameEn?: string;
  englishName?: string; // альтернативное название поля
  description?: string;
  image?: { url?: string; formats?: Record<string, { url?: string }> } | null;
  flag?:  { url?: string; formats?: Record<string, { url?: string }> } | null;
  href?: string;
  // Strapi v4 — внутри attributes
  attributes?: {
    name?: string;
    nameEn?: string;
    englishName?: string;
    description?: string;
    href?: string;
    image?: { data?: { attributes?: { url?: string } } | null } | null;
    flag?:  { data?: { attributes?: { url?: string } } | null } | null;
  };
}

function extractUrl(
  media: { url?: string; formats?: Record<string, { url?: string }> } | null | undefined
): string {
  if (!media) return "";
  if (typeof media.url === "string") return media.url;
  if (media.formats) {
    const f = media.formats;
    return f.large?.url ?? f.medium?.url ?? f.small?.url ?? f.thumbnail?.url ?? "";
  }
  return "";
}

function toFullUrl(raw: string): string {
  if (!raw) return "";
  return raw.startsWith("http") ? raw : `${STRAPI}${raw}`;
}

function normalizeCountry(item: StrapiCountry): Country {
  const isV4 = !!item.attributes;
  const a    = item.attributes;

  const name        = isV4 ? a?.name        : item.name;
  // поддерживаем оба варианта названия поля
  const nameEn      = isV4 ? (a?.nameEn ?? a?.englishName) : (item.nameEn ?? item.englishName);
  const description = isV4 ? a?.description : item.description;
  const href        = isV4 ? a?.href        : item.href;

  const rawImage = isV4
    ? a?.image?.data?.attributes?.url ?? ""
    : extractUrl(item.image);

  const rawFlag = isV4
    ? a?.flag?.data?.attributes?.url ?? ""
    : extractUrl(item.flag);

  return {
    id:          item.id,
    documentId:  item.documentId ?? String(item.id),
    name:        name        ?? "—",
    nameEn:      nameEn      ?? "",
    description: description ?? "",
    imageUrl:    toFullUrl(rawImage),
    flagUrl:     toFullUrl(rawFlag),
    href:        href        ?? "#",
  };
}

export default async function CountriesGrid() {
  let countries: Country[] = [];

  try {
    const res = await fetch(`${STRAPI}/api/countries?populate=*`, {
      // next.js revalidate — обновляем данные раз в минуту
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json: { data: StrapiCountry[] } = await res.json();
      countries = json.data.map(normalizeCountry);
    }
  } catch {
    // если Strapi недоступен — рендерим пустую сетку без краша
  }

  if (countries.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-12 text-center">
        Страны не найдены. Проверьте подключение к Strapi.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0">
      {countries.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
    </div>
  );
}
