"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Users, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SectionHeader from "@/app/components/SectionHeader";

const STRAPI = "http://localhost:1337";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface University {
  id: number;
  documentId: string;
  name: string;
  programsCount: string;
  studentsCount: string;
  location: string;
  imageUrl: string;
  href: string;
}

// Сырой объект из Strapi
interface StrapiUniversity {
  id: number;
  documentId?: string;
  // Strapi v5 — поля напрямую
  name?: string;
  programsCount?: string;
  studentsCount?: string;
  location?: string;
  href?: string;
  image?: { url?: string; formats?: Record<string, { url?: string }> } | null;
  // Strapi v4 — поля внутри attributes
  attributes?: {
    name?: string;
    programsCount?: string;
    studentsCount?: string;
    location?: string;
    href?: string;
    image?: { data?: { attributes?: { url?: string } } | null } | null;
  };
}

// ─── Нормализация ─────────────────────────────────────────────────────────────

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

function normalizeUniversity(item: StrapiUniversity): University {
  const isV4 = !!item.attributes;
  const a    = item.attributes;

  const name          = isV4 ? a?.name          : item.name;
  const programsCount = isV4 ? a?.programsCount : item.programsCount;
  const studentsCount = isV4 ? a?.studentsCount : item.studentsCount;
  const location      = isV4 ? a?.location      : item.location;
  const href          = isV4 ? a?.href          : item.href;

  const rawImage = isV4
    ? a?.image?.data?.attributes?.url ?? ""
    : extractUrl(item.image);

  return {
    id:            item.id,
    documentId:    item.documentId ?? String(item.id),
    name:          name          ?? "—",
    programsCount: programsCount ?? "—",
    studentsCount: studentsCount ?? "—",
    location:      location      ?? "—",
    imageUrl:      toFullUrl(rawImage),
    href:          href          ?? "#",
  };
}

// ─── Карточка ─────────────────────────────────────────────────────────────────

function UniversityCard({ university }: { university: University }) {
  return (
    <Link
      href="/Universities"
      className="group flex flex-col w-[300px] p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Фото */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-200">
        {university.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={university.imageUrl}
            alt={university.name}
            className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
      </div>

      {/* Контент */}
      <div className="flex flex-col gap-y-[8px]">
        {/* Название */}
        <p className="text-sm font-bold text-[#101828] leading-tight line-clamp-2">{university.name}</p>

        {/* Программы и студенты */}
        <div className="flex items-center gap-3 text-xs text-[#344054]">
          <span className="flex items-center gap-1">
            <BookOpen size={13} className="text-[#1570EF]" />
            {university.programsCount}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} className="text-[#1570EF]" />
            {university.studentsCount}
          </span>
        </div>

        {/* Местоположение */}
        <div className="flex items-center gap-1 text-xs text-[#1D2939]">
          <MapPin size={12} className="text-[#1D2939] shrink-0" />
          <span className="hover:text-blue-500 transition-colors">
            {university.location}
          </span>
        </div>
      </div>
    </Link>
  );
}

function UniversitySkeleton() {
  return (
    <div className="flex flex-col w-[300px] p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white animate-pulse">
      <div className="w-full h-[160px] rounded-xl bg-slate-200" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
      </div>
    </div>
  );
}

// ─── Секция ───────────────────────────────────────────────────────────────────

export default function PartnerUniversities() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [universities, setUniversities]     = useState<University[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);

  useEffect(() => {
    fetch(`${STRAPI}/api/partner-universities?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
        return res.json();
      })
      .then((json: { data: StrapiUniversity[] }) => {
        setUniversities(json.data.map(normalizeUniversity));
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Университеты-партнёры"
          subtitle="Мы работаем с ведущими университетами мира"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
        />
        {error && (
          <p className="text-sm text-red-500 mb-4">Не удалось загрузить университеты: {error}</p>
        )}
      </div>

      <Swiper
        modules={[Navigation, Mousewheel]}
        onSwiper={setSwiperInstance}
        loop={!loading && universities.length > 1}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        slidesPerView="auto"
        spaceBetween={20}
        grabCursor={true}
        className="!px-6 lg:!px-12 !pb-4"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i} style={{ width: "auto" }}>
                <UniversitySkeleton />
              </SwiperSlide>
            ))
          : universities.map((u) => (
              <SwiperSlide key={u.id} style={{ width: "auto" }}>
                <UniversityCard university={u} />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </section>
  );
}

// ─── Скелетон ─────────────────────────────────────────────────────────────────