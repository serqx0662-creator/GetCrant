"use client";

import { useState, useEffect } from "react";
import { Check, Building2, Users } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SectionHeader from "@/app/components/SectionHeader";

const STRAPI = "http://localhost:1337";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Country {
  id: number;
  documentId: string;
  name: string;
  nameEn: string;
  flagUrl: string;
  imageUrl: string;
  universitiesCount: string;
  studentsCount: string;
  benefits: string[];
  href: string;
}

// Сырой объект из Strapi
interface StrapiCountry {
  id: number;
  documentId?: string;
  name?: string;
  nameEn?: string;
  universitiesCount?: string;
  studentsCount?: string;
  features?: string;  // текст с переносами строк
  href?: string;
  // медиа-поля (Strapi v5 — объект напрямую)
  image?: { url?: string; formats?: Record<string, { url?: string }> } | null;
  flag?:  { url?: string; formats?: Record<string, { url?: string }> } | null;
  // Strapi v4 — внутри attributes
  attributes?: {
    name?: string;
    nameEn?: string;
    universitiesCount?: string;
    studentsCount?: string;
    features?: string;
    href?: string;
    image?: { data?: { attributes?: { url?: string } } | null } | null;
    flag?:  { data?: { attributes?: { url?: string } } | null } | null;
  };
}

// ─── Нормализация ─────────────────────────────────────────────────────────────

function extractUrl(
  v5media: { url?: string; formats?: Record<string, { url?: string }> } | null | undefined
): string {
  if (!v5media) return "";
  if (typeof v5media.url === "string") return v5media.url;
  if (v5media.formats) {
    const f = v5media.formats;
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

  const name             = isV4 ? a?.name             : item.name;
  const nameEn           = isV4 ? a?.nameEn           : item.nameEn;
  const universitiesCount = isV4 ? a?.universitiesCount : item.universitiesCount;
  const studentsCount    = isV4 ? a?.studentsCount    : item.studentsCount;
  const features         = isV4 ? a?.features         : item.features;
  const href             = isV4 ? a?.href             : item.href;

  const rawImage = isV4
    ? a?.image?.data?.attributes?.url ?? ""
    : extractUrl(item.image);

  const rawFlag = isV4
    ? a?.flag?.data?.attributes?.url ?? ""
    : extractUrl(item.flag);

  return {
    id:                item.id,
    documentId:        item.documentId ?? String(item.id),
    name:              name              ?? "—",
    nameEn:            nameEn            ?? "",
    imageUrl:          toFullUrl(rawImage),
    flagUrl:           toFullUrl(rawFlag),
    universitiesCount: universitiesCount ?? "—",
    studentsCount:     studentsCount     ?? "—",
    benefits:          features
      ? features.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    href: href ?? "#",
  };
}

// ─── Карточка ─────────────────────────────────────────────────────────────────

function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/Countries/${country.documentId}`}
      className="group flex flex-col w-[300px] p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Фон карточки с оверлеем */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-200">
        {country.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={country.imageUrl}
            alt={country.name}
            className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Плашка с флагом */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#101828]/90 rounded-lg px-3 py-2 z-10">
          {country.flagUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={country.flagUrl}
              alt={`Флаг ${country.name}`}
              className="w-5 h-3.5 shrink-0 rounded-[2px] object-cover"
            />
          ) : null}
          <div>
            <p className="text-white text-xs font-bold leading-tight">{country.name}</p>
            <p className="text-white/50 text-[10px] leading-tight">{country.nameEn}</p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="bg-[#F9FAFB] rounded-lg p-3 flex justify-between items-center">
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
          <Building2 size={14} className="text-[#1570EF]" />
          {country.universitiesCount}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
          <Users size={14} className="text-[#1570EF]" />
          {country.studentsCount}
        </span>
      </div>

      {/* Преимущества */}
      <ul className="flex flex-col gap-y-[12px]">
        {country.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-[#344054]">
            <Check size={14} className="text-blue-500 mt-0.5 shrink-0 w-4 h-4" />
            {b}
          </li>
        ))}
      </ul>
    </Link>
  );
}

// ─── Скелетон ─────────────────────────────────────────────────────────────────

function CountrySkeleton() {
  return (
    <div className="flex flex-col w-[300px] p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white animate-pulse">
      <div className="w-full h-[160px] rounded-xl bg-slate-200" />
      <div className="h-10 rounded-lg bg-slate-200" />
      <div className="flex flex-col gap-3">
        <div className="h-3 w-4/5 rounded bg-slate-200" />
        <div className="h-3 w-3/5 rounded bg-slate-200" />
        <div className="h-3 w-4/5 rounded bg-slate-200" />
      </div>
    </div>
  );
}

// ─── Секция ───────────────────────────────────────────────────────────────────

export default function PopularCountries() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [countries, setCountries]           = useState<Country[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);

  useEffect(() => {
    fetch(`${STRAPI}/api/countries?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
        return res.json();
      })
      .then((json: { data: StrapiCountry[] }) => {
        setCountries(json.data.map(normalizeCountry));
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
          title="Популярные страны"
          subtitle="Выбирайте страну для обучения из наших топовых направлений"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
        />
        {error && (
          <p className="text-sm text-red-500 mb-4">Не удалось загрузить страны: {error}</p>
        )}
      </div>

      <Swiper
        modules={[Navigation, Mousewheel]}
        onSwiper={setSwiperInstance}
        loop={!loading && countries.length > 1}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        slidesPerView="auto"
        spaceBetween={20}
        grabCursor={true}
        className="!px-6 lg:!px-12 !pb-4"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i} style={{ width: "auto" }}>
                <CountrySkeleton />
              </SwiperSlide>
            ))
          : countries.map((c) => (
              <SwiperSlide key={c.id} style={{ width: "auto" }}>
                <CountryCard country={c} />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </section>
  );
}
