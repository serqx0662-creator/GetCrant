"use client";

import { useRef } from "react";
import { Check, Building2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/app/components/SectionHeader";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Country {
  id: number;
  name: string;
  nameEn: string;
  flag: string;
  flagImage?: string;
  programs: string;
  students: string;
  benefits: string[];
  image: string | null;
  href: string;
}

// ─── Данные ──────────────────────────────────────────────────────────────────

const countries: Country[] = [
  {
    id: 1, name: "США", nameEn: "United States", flag: "🇺🇸",
    flagImage: "/image/HomeContent/Countries/flag/usa-flag-1 1.png",
    programs: "2,500+", students: "200+",
    benefits: ["Топ университеты мира", "ОРТ — работа после учёбы", "Стипендии и гранты"],
    image: "/image/HomeContent/Countries/Rectangle 1 (1).png",
    href: "https://en.wikipedia.org/wiki/United_States",
  },
  {
    id: 2, name: "Канада", nameEn: "Canada", flag: "🇨🇦",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Canada_(Pantone).svg.webp",
    programs: "1,000+", students: "150+",
    benefits: ["Высокое качество образования", "Работа для студентов", "Множество стипендий"],
    image: "/image/HomeContent/Countries/Rectangle 1 (2).png",
    href: "https://en.wikipedia.org/wiki/Canada",
  },
  {
    id: 3, name: "Великобритания", nameEn: "United Kingdom", flag: "🇬🇧",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_the_United_Kingdom_(1-2).svg.webp",
    programs: "1,300+", students: "170+",
    benefits: ["Классическое образование", "Визовые возможности", "Государственные и частные гранты"],
    image: "/image/HomeContent/Countries/Rectangle 1 (3).png",
    href: "https://en.wikipedia.org/wiki/United_Kingdom",
  },
  {
    id: 4, name: "Австралия", nameEn: "Australia", flag: "🇦🇺",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Australia_(converted).svg.webp",
    programs: "1,200+", students: "100+",
    benefits: ["Многокультурная среда", "Гибкие учебные курсы", "Стипендии от университетов"],
    image: "/image/HomeContent/Countries/Rectangle 1 (4).png",
    href: "https://en.wikipedia.org/wiki/Australia",
  },
  {
    id: 5, name: "Новая Зеландия", nameEn: "New Zealand", flag: "🇳🇿",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_New_Zealand.svg.webp",
    programs: "500+", students: "80+",
    benefits: ["Индивидуальный подход к студентам", "Работа во время учёбы", "Стипендии для студентов"],
    image: "/image/HomeContent/Countries/Новая Зеландия.jpg",
    href: "https://en.wikipedia.org/wiki/New_Zealand",
  },
  {
    id: 6, name: "Германия", nameEn: "Germany", flag: "🇩🇪",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Germany.svg.webp",
    programs: "1,800+", students: "350+",
    benefits: ["Бесплатное образование", "Право на работу", "Сильная инженерная школа"],
    image: "/image/HomeContent/Countries/Германия.webp",
    href: "https://en.wikipedia.org/wiki/Germany",
  },
  {
    id: 7, name: "Нидерланды", nameEn: "Netherlands", flag: "🇳🇱",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_the_Netherlands.svg.webp",
    programs: "700+", students: "90+",
    benefits: ["Программы на английском", "Высокий уровень жизни", "Гранты для иностранцев"],
    image: "/image/HomeContent/Countries/Нидерланды.webp",
    href: "https://en.wikipedia.org/wiki/Netherlands",
  },
  {
    id: 8, name: "Франция", nameEn: "France", flag: "🇫🇷",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_France.svg.webp",
    programs: "800+", students: "110+",
    benefits: ["Престижные Grandes Écoles", "Стипендии Eiffel", "Культурная среда"],
    image: "/image/HomeContent/Countries/Франция.webp",
    href: "https://en.wikipedia.org/wiki/France",
  },
];

// ─── Карточка ─────────────────────────────────────────────────────────────────

function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={country.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 flex flex-col w-[300px] p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Изображение с оверлеем */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-200">
        {country.image ? (
          <Image src={country.image} alt={country.name} fill className="object-cover" sizes="300px" />
        ) : (
          <div className="w-full h-full bg-slate-200 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Плашка с флагом */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#101828]/90 rounded-lg px-3 py-2 z-10">
          {country.flagImage ? (
            <div className="relative w-5 h-3.5 flex-shrink-0 rounded-[2px] overflow-hidden">
              <Image src={country.flagImage} alt={`Флаг ${country.name}`} fill className="object-cover" sizes="20px" />
            </div>
          ) : (
            <span className="text-base leading-none">{country.flag}</span>
          )}
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
          {country.programs}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
          <Users size={14} className="text-[#1570EF]" />
          {country.students}
        </span>
      </div>

      {/* Преимущества */}
      <ul className="flex flex-col gap-y-[12px]">
        {country.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-[#344054]">
            <Check size={14} className="text-blue-500 mt-0.5 flex-shrink-0 w-4 h-4" />
            {b}
          </li>
        ))}
      </ul>
    </Link>
  );
}

// ─── Секция ───────────────────────────────────────────────────────────────────

export default function PopularCountries() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Популярные страны"
          subtitle="Выбирайте страну для обучения из наших топовых направлений"
          onPrev={() => scroll("left")}
          onNext={() => scroll("right")}
        />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-6 lg:px-12 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {countries.map((c) => (
          <CountryCard key={c.id} country={c} />
        ))}
      </div>
    </section>
  );
}
