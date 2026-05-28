"use client";

import { useState, useEffect } from "react";
import TeacherCard, { type Teacher } from "./TeacherCard";
import TeacherModal from "./TeacherModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SectionHeader from "@/app/components/SectionHeader";

const STRAPI = "http://localhost:1337";

// Тип сырого объекта из Strapi
interface StrapiTeacher {
  id: number;
  documentId?: string;
  // Strapi v5 — поля напрямую
  name?: string;
  role?: string;
  price?: string;
  experience?: string;
  certificates?: string;
  avatar?: { url?: string } | null;
  // Strapi v4 — поля внутри attributes
  attributes?: {
    name?: string;
    role?: string;
    price?: string;
    experience?: string;
    certificates?: string;
    avatar?: {
      data?: { attributes?: { url?: string } } | null;
    } | null;
  };
}

function normalizeTeacher(item: StrapiTeacher): Teacher {
  const isV4 = !!item.attributes;
  const a    = item.attributes;

  const name         = isV4 ? a?.name         : item.name;
  const role         = isV4 ? a?.role         : item.role;
  const price        = isV4 ? a?.price        : item.price;
  const experience   = isV4 ? a?.experience   : item.experience;
  const certificates = isV4 ? a?.certificates : item.certificates;

  let rawUrl: string | undefined;

  if (isV4) {
    // Strapi v4: { data: { attributes: { url } } }
    rawUrl = a?.avatar?.data?.attributes?.url;
  } else {
    const av = item.avatar as Record<string, unknown> | null | undefined;
    if (av) {
      // Strapi v5 вариант 1: { url: "/uploads/..." }
      if (typeof av.url === "string") {
        rawUrl = av.url;
      }
      // Strapi v5 вариант 2: { formats: { thumbnail: { url } }, url }
      else if (av.formats && typeof (av.formats as Record<string, unknown>) === "object") {
        const formats = av.formats as Record<string, { url?: string }>;
        rawUrl = formats.thumbnail?.url ?? formats.small?.url ?? formats.medium?.url;
      }
    }
  }

  const avatarUrl = rawUrl
    ? rawUrl.startsWith("http") ? rawUrl : `${STRAPI}${rawUrl}`
    : "/image/OnlinePrep/placeholder.png";

  return {
    id:           item.id,
    documentId:   item.documentId,
    name:         name         ?? "Без имени",
    role:         role         ?? "",
    price:        price        ?? "—",
    experience:   experience   ?? "—",
    certificates: certificates ?? "—",
    avatar:       avatarUrl,
  };
}

export default function TeachersSection() {
  const [swiperInstance, setSwiperInstance]   = useState<SwiperType | null>(null);
  const [teachers, setTeachers]               = useState<Teacher[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    fetch(`${STRAPI}/api/teachers?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
        return res.json();
      })
      .then((json: { data: StrapiTeacher[] }) => {
        setTeachers(json.data.map(normalizeTeacher));
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <SectionHeader
            title="Наши преподаватели"
            subtitle="Профессиональные преподаватели для успешного поступления"
            onPrev={() => swiperInstance?.slidePrev()}
            onNext={() => swiperInstance?.slideNext()}
          />
        </div>

        {error && (
          <p className="container mx-auto px-4 md:px-6 lg:px-12 text-sm text-red-500">
            Не удалось загрузить преподавателей: {error}
          </p>
        )}

        <Swiper
          modules={[Navigation, Mousewheel]}
          onSwiper={setSwiperInstance}
          loop={!loading && teachers.length > 1}
          mousewheel={{ forceToAxis: true, sensitivity: 1 }}
          slidesPerView="auto"
          spaceBetween={20}
          grabCursor={true}
          className="px-6! lg:px-12! pb-4!"
          breakpoints={{
            320:  { slidesPerView: 1, spaceBetween: 15 },
            640:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {loading
            ? // Скелетоны пока грузятся
              Array.from({ length: 4 }).map((_, i) => (
                <SwiperSlide key={i} style={{ width: "auto" }}>
                  <div
                    className="w-[342px] min-w-[342px] animate-pulse"
                    style={{ height: "220px", borderRadius: "16px", background: "#F2F4F7" }}
                  />
                </SwiperSlide>
              ))
            : teachers.map((teacher) => (
                <SwiperSlide key={teacher.id} style={{ width: "auto" }}>
                  <TeacherCard teacher={teacher} onEnroll={setSelectedTeacher} />
                </SwiperSlide>
              ))
          }
        </Swiper>
      </section>

      <TeacherModal
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </>
  );
}
