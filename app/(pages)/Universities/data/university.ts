// Единый тип University для каталога (данные из Strapi)
export interface University {
  id: number;
  documentId?: string;
  name: string;
  imageUrl: string;
  programsCount: string;
  studentsCount: string;
  location: string;       // плоская строка: "Cambridge, MA, США"
  price: string;          // стоимость: "$54,000/год"
  programsTotal: string;  // число программ для нижней сетки
  acceptanceRate: string; // процент поступления
  type: string;           // "Частный" | "Государственный"
  href: string;
}

// Сырой объект из Strapi
export interface StrapiUniversity {
  id: number;
  documentId?: string;
  name?: string;
  programsCount?: string;
  studentsCount?: string;
  location?: string;
  price?: string;
  programsTotal?: string;
  acceptanceRate?: string;
  type?: string;
  href?: string;
  image?: { url?: string; formats?: Record<string, { url?: string }> } | null;
  attributes?: {
    name?: string;
    programsCount?: string;
    studentsCount?: string;
    location?: string;
    price?: string;
    programsTotal?: string;
    acceptanceRate?: string;
    type?: string;
    href?: string;
    image?: { data?: { attributes?: { url?: string } } | null } | null;
  };
}

const STRAPI = "http://localhost:1337";

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

export function normalizeUniversity(item: StrapiUniversity): University {
  const isV4 = !!item.attributes;
  const a    = item.attributes;

  const name           = isV4 ? a?.name           : item.name;
  const programsCount  = isV4 ? a?.programsCount  : item.programsCount;
  const studentsCount  = isV4 ? a?.studentsCount  : item.studentsCount;
  const location       = isV4 ? a?.location       : item.location;
  const price          = isV4 ? a?.price          : item.price;
  const programsTotal  = isV4 ? a?.programsTotal  : item.programsTotal;
  const acceptanceRate = isV4 ? a?.acceptanceRate : item.acceptanceRate;
  const type           = isV4 ? a?.type           : item.type;
  const href           = isV4 ? a?.href           : item.href;

  const rawImage = isV4
    ? a?.image?.data?.attributes?.url ?? ""
    : extractUrl(item.image);

  const imageUrl = rawImage
    ? rawImage.startsWith("http") ? rawImage : `${STRAPI}${rawImage}`
    : "";

  return {
    id:            item.id,
    documentId:    item.documentId,
    name:          name           ?? "—",
    imageUrl,
    programsCount: programsCount  ?? "—",
    studentsCount: studentsCount  ?? "—",
    location:      location       ?? "—",
    price:         price          ?? "—",
    programsTotal: programsTotal  ?? programsCount ?? "—",
    acceptanceRate: acceptanceRate ?? "—",
    type:          type           ?? "—",
    href:          href           ?? "#",
  };
}
