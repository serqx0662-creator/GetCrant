// Нормализованный тип программы (данные из Strapi)
export interface Program {
  id: number;
  documentId?: string;
  title: string;
  imageUrl: string;
  duration: string;
  salary: string;
  universitiesCount: string;
  tags: string[];          // разбитый массив из строки через запятую
  direction: string;
  level: string;
}

// Сырой объект из Strapi
export interface StrapiProgram {
  id: number;
  documentId?: string;
  // Strapi v5 — поля напрямую
  title?: string;
  duration?: string;
  salary?: string;
  universitiesCount?: string;
  tags?: string;
  direction?: string;
  level?: string;
  cover?: { url?: string; formats?: Record<string, { url?: string }> } | null;
  image?: { url?: string; formats?: Record<string, { url?: string }> } | null;
  // Strapi v4 — внутри attributes
  attributes?: {
    title?: string;
    duration?: string;
    salary?: string;
    universitiesCount?: string;
    tags?: string;
    direction?: string;
    level?: string;
    cover?: { data?: { attributes?: { url?: string } } | null } | null;
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

export function normalizeProgram(item: StrapiProgram): Program {
  const isV4 = !!item.attributes;
  const a    = item.attributes;

  const title            = isV4 ? a?.title            : item.title;
  const duration         = isV4 ? a?.duration         : item.duration;
  const salary           = isV4 ? a?.salary           : item.salary;
  const universitiesCount = isV4 ? a?.universitiesCount : item.universitiesCount;
  const tags             = isV4 ? a?.tags             : item.tags;
  const direction        = isV4 ? a?.direction        : item.direction;
  const level            = isV4 ? a?.level            : item.level;

  // cover приоритетнее image
  const rawUrl = isV4
    ? a?.cover?.data?.attributes?.url ?? a?.image?.data?.attributes?.url ?? ""
    : extractUrl(item.cover ?? item.image);

  const imageUrl = rawUrl
    ? rawUrl.startsWith("http") ? rawUrl : `${STRAPI}${rawUrl}`
    : "";

  return {
    id:               item.id,
    documentId:       item.documentId,
    title:            title            ?? "—",
    imageUrl,
    duration:         duration         ?? "—",
    salary:           salary           ?? "—",
    universitiesCount: universitiesCount ?? "—",
    // разбиваем строку тегов по запятой, убираем пробелы
    tags:             tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    direction:        direction        ?? "",
    level:            level            ?? "",
  };
}
