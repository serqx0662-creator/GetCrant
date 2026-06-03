"use client";

import { useState, useEffect } from "react";
import { Clock, TrendingUp, Crown } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SectionHeader from "@/app/components/SectionHeader";

const STRAPI = "http://localhost:1337";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Program {
  id: number;
  documentId: string;
  title: string;
  tags: string[];
  duration: string;
  salary: string;
  image: string;
  href: string;
}

// Сырой объект из Strapi
interface StrapiProgram {
  id: number;
  documentId?: string;
  // Strapi v5 — поля напрямую
  title?: string;
  tags?: string;
  duration?: string;
  salary?: string;
  href?: string;
  image?: { url?: string } | null;
  cover?: { url?: string } | null;
  // Strapi v4 — поля внутри attributes
  attributes?: {
    title?: string;
    tags?: string;
    duration?: string;
    salary?: string;
    href?: string;
    image?: { data?: { attributes?: { url?: string } } | null } | null;
    cover?: { data?: { attributes?: { url?: string } } | null } | null;
  };
}

// ─── Нормализация ─────────────────────────────────────────────────────────────

function normalizeProgram(item: StrapiProgram): Program {
  const isV4 = !!item.attributes;
  const a    = item.attributes;

  const title    = isV4 ? a?.title    : item.title;
  const tags     = isV4 ? a?.tags     : item.tags;
  const duration = isV4 ? a?.duration : item.duration;
  const salary   = isV4 ? a?.salary   : item.salary;
  const href     = isV4 ? a?.href     : item.href;

  // Пробуем cover, потом image — для v4 и v5
  let rawUrl: string | undefined;
  if (isV4) {
    rawUrl =
      a?.cover?.data?.attributes?.url ??
      a?.image?.data?.attributes?.url;
  } else {
    // v5: поле может быть объектом { url } или вложенным { formats, url }
    const mediaObj = (item.cover ?? item.image) as Record<string, unknown> | null | undefined;
    if (mediaObj) {
      if (typeof mediaObj.url === "string") {
        rawUrl = mediaObj.url;
      } else if (mediaObj.formats && typeof mediaObj.formats === "object") {
        const fmt = mediaObj.formats as Record<string, { url?: string }>;
        rawUrl = fmt.large?.url ?? fmt.medium?.url ?? fmt.small?.url ?? fmt.thumbnail?.url;
      }
    }
  }

  const imageUrl = rawUrl
    ? rawUrl.startsWith("http") ? rawUrl : `${STRAPI}${rawUrl}`
    : "";

  return {
    id:       item.id,
    documentId: item.documentId ?? String(item.id),
    title:    title    ?? "Без названия",
    tags:     tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    duration: duration ?? "—",
    salary:   salary   ?? "—",
    image:    imageUrl,
    href:     href     ?? "#",
  };
}

// ─── Карточка ─────────────────────────────────────────────────────────────────

function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="group flex flex-col w-75 p-2.5 pb-5 gap-2.5 rounded-2xl border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Изображение */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-200">
        {program.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
        <div className="absolute top-3 left-3 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center z-10">
          <Crown size={18} stroke="white" strokeWidth={2} />
        </div>
      </div>

      {/* Теги */}
      <div className="flex flex-wrap gap-1">
        {program.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium text-blue-600 border border-slate-200 bg-transparent px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Название */}
      <p className="text-sm font-bold text-gray-900 leading-tight">{program.title}</p>

      {/* Срок и зарплата */}
      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1 text-slate-900">
          <Clock size={12} className="text-blue-600" />
          {program.duration}
        </span>
        <span className="flex items-center gap-1 font-bold text-slate-900">
          <TrendingUp size={12} className="text-blue-600" />
          {program.salary}
        </span>
      </div>
    </div>
  );
}

// ─── Скелетон ─────────────────────────────────────────────────────────────────

function ProgramSkeleton() {
  return (
    <div className="flex flex-col w-75 p-2.5 pb-5 gap-2.5 rounded-2xl border border-[#EAECF0] bg-white animate-pulse">
      <div className="w-full h-40 rounded-xl bg-slate-200" />
      <div className="flex gap-1">
        <div className="h-5 w-20 rounded-full bg-slate-200" />
        <div className="h-5 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="h-4 w-3/4 rounded bg-slate-200" />
      <div className="h-3 w-1/2 rounded bg-slate-200" />
    </div>
  );
}

// ─── Секция ───────────────────────────────────────────────────────────────────

export default function PopularPrograms() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [programs, setPrograms]             = useState<Program[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);

  useEffect(() => {
    fetch(`${STRAPI}/api/programs?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
        return res.json();
      })
      .then((json: { data: StrapiProgram[] }) => {
        setPrograms(json.data.map(normalizeProgram));
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const skeletons = Array.from({ length: 5 });

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Популярные программы"
          subtitle="Выбирайте из топовых образовательных программ мира"
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={() => swiperInstance?.slideNext()}
        />
        {error && (
          <p className="text-sm text-red-500 mb-4">Не удалось загрузить программы: {error}</p>
        )}
      </div>

      <Swiper
        modules={[Navigation, Mousewheel]}
        onSwiper={setSwiperInstance}
        loop={!loading && programs.length > 1}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        slidesPerView="auto"
        spaceBetween={20}
        grabCursor={true}
        className="px-6! lg:px-12! pb-4!"
      >
        {loading
          ? skeletons.map((_, i) => (
              <SwiperSlide key={i} style={{ width: "auto" }}>
                <ProgramSkeleton />
              </SwiperSlide>
            ))
          : programs.map((p) => (
              <SwiperSlide key={p.id} style={{ width: "auto" }}>
                <Link href={`/Programs/${p.documentId}`} className="block">
                  <ProgramCard program={p} />
                </Link>
              </SwiperSlide>
            ))
        }
      </Swiper>
    </section>
  );
}
