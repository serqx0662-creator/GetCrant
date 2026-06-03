import { GraduationCap, Briefcase, Lightbulb, Star } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CountryHero from "./components/CountryHero";
import CountryAdvantages from "./components/CountryAdvantages";
import CountryCosts from "./components/CountryCosts";
import CountryUniversities from "./components/CountryUniversities";
import CountryVisas from "./components/CountryVisas";
import CountryCta from "./components/CountryCta";
import type { Advantage, CostRow, CostTotal, University, VisaType } from "./components/types";

const STRAPI = "http://localhost:1337";

// ─── Типы ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

// ─── Утилиты ──────────────────────────────────────────────────────────────────

function extractUrl(media: AnyRecord | null | undefined): string {
  if (!media) return "";
  // v5: { url: "..." }
  if (typeof media.url === "string") return media.url;
  // v4: { data: { attributes: { url } } }
  if (media.data?.attributes?.url) return media.data.attributes.url;
  // форматы
  const f = media.formats as Record<string, { url?: string }> | undefined;
  if (f) return f.large?.url ?? f.medium?.url ?? f.small?.url ?? f.thumbnail?.url ?? "";
  return "";
}

function toFullUrl(raw: string): string {
  if (!raw) return "";
  return raw.startsWith("http") ? raw : `${STRAPI}${raw}`;
}

function normalizeUni(raw: AnyRecord): University {
  // Strapi v5: поля напрямую; v4: поля внутри attributes
  const u: AnyRecord = raw.attributes ?? raw;
  return {
    id:       raw.id ?? 0,
    name:     u.name          ?? u.title    ?? "—",
    programs: u.programsCount ?? u.programs_count ?? "—",
    students: u.studentsCount ?? u.students_count ?? "—",
    location: u.location      ?? u.city     ?? "—",
    image:    toFullUrl(extractUrl(u.image)),
    href:     u.href          ?? "#",
  };
}

function extractUnisArray(d: AnyRecord): AnyRecord[] {
  // Все возможные ключи и форматы
  const candidates = [
    d.partner_universities,
    d.partnerUniversities,
    d.PartnerUniversity,
    d.attributes?.partner_universities,
    d.attributes?.partnerUniversities,
  ];
  for (const c of candidates) {
    // v5: массив напрямую
    if (Array.isArray(c) && c.length > 0) return c;
    // v4: { data: [...] }
    if (c?.data && Array.isArray(c.data) && c.data.length > 0) return c.data;
  }
  return [];
}

// ─── Статичные данные (добавим в Strapi позже) ────────────────────────────────

const STATIC_ADVANTAGES: Advantage[] = [
  { icon: <GraduationCap size={20} className="text-white" />, title: "Топовое образование",   desc: "Страна входит в число лидеров мирового образования" },
  { icon: <Briefcase    size={20} className="text-white" />, title: "Карьерные возможности", desc: "Широкие возможности для работы после окончания обучения" },
  { icon: <Lightbulb   size={20} className="text-white" />, title: "Инновации",              desc: "Развитая экономика и технологический сектор" },
  { icon: <Star        size={20} className="text-white" />, title: "Качество жизни",         desc: "Высокий уровень жизни и развитая инфраструктура" },
];

const STATIC_COST_ROWS: CostRow[] = [
  { category: "Аренда жилья",        min: "$800",  avg: "$1,500", max: "$2,500" },
  { category: "Питание",             min: "$300",  avg: "$400",   max: "$600"   },
  { category: "Транспорт",           min: "$50",   avg: "$100",   max: "$150"   },
  { category: "Коммунальные услуги", min: "$100",  avg: "$150",   max: "$200"   },
];

const STATIC_COST_TOTAL: CostTotal = { min: "$1,250", avg: "$2,150", max: "$3,450" };

const STATIC_VISAS: VisaType[] = [
  { title: "Student Visa",     desc: "Основная виза для обучения в аккредитованных учебных заведениях" },
  { title: "Work Permit",      desc: "Разрешение на работу во время и после обучения" },
  { title: "Residence Permit", desc: "Временный вид на жительство на период обучения" },
];

// ─── Серверный компонент ──────────────────────────────────────────────────────

export default async function CountryContent({ id }: { id: string }) {
  const res = await fetch(`${STRAPI}/api/countries/${id}?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#344054]">
        Ошибка загрузки данных страны: {res.status}
      </div>
    );
  }

  const responseData = await res.json();

  // Выводим полный ответ в терминал — смотри в консоль npm run dev
  console.log("=== STRAPI RESPONSE ===", JSON.stringify(responseData, null, 2));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d: Record<string, any> = responseData?.data ?? {};

  const universities = extractUnisArray(d).map(normalizeUni);

  const name        = d.name        ?? d.attributes?.name        ?? "—";
  const description = d.description ?? d.attributes?.description ?? "";
  const imageUrl    = toFullUrl(extractUrl(d.image)        || extractUrl(d.attributes?.image));
  const flagUrl     = toFullUrl(extractUrl(d.flag)         || extractUrl(d.attributes?.flag));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[72px]">
        <CountryHero
          bannerImage={imageUrl}
          name={name}
          flagImage={flagUrl}
          description={description}
        />
        <CountryAdvantages advantages={STATIC_ADVANTAGES} />
        <CountryCosts costRows={STATIC_COST_ROWS} costTotal={STATIC_COST_TOTAL} />
        <CountryUniversities universities={universities} />
        <CountryVisas visaTypes={STATIC_VISAS} />
        <CountryCta ctaTitle={`Готовы начать обучение в ${name}?`} />
      </main>
      <Footer />
    </div>
  );
}
