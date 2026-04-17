"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Country {
  id: number;
  name: string;
  nameEn: string;
  flag: string;
  flagImage?: string;
  description: string;
  image: string | null;
  href: string;
}

// ─── Данные ──────────────────────────────────────────────────────────────────

const countries: Country[] = [
  {
    id: 1,
    name: "США",
    nameEn: "United States",
    flag: "🇺🇸",
    flagImage: "/image/HomeContent/Countries/flag/usa-flag-1 1.png",
    description: "США — мировой лидер в образовании с более чем 4000 университетами.",
    image: "/image/HomeContent/Countries/Rectangle 1 (1).png",
    href: "/Countries/usa",
  },
  {
    id: 2,
    name: "Канада",
    nameEn: "Canada",
    flag: "🇨🇦",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Canada_(Pantone).svg.webp",
    description: "Канада известна своими высокими уровнями жизни и качественным образованием.",
    image: "/image/HomeContent/Countries/Rectangle 1 (2).png",
    href: "/Countries/canada",
  },
  {
    id: 3,
    name: "Австралия",
    nameEn: "Australia",
    flag: "🇦🇺",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Australia_(converted).svg.webp",
    description: "Австралия привлекает студентов со всего мира своими университетами с высоким рейтингом.",
    image: "/image/HomeContent/Countries/Rectangle 1 (4).png",
    href: "/Countries/australia",
  },
  {
    id: 4,
    name: "Великобритания",
    nameEn: "United Kingdom",
    flag: "🇬🇧",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_the_United_Kingdom_(1-2).svg.webp",
    description: "Великобритания — дом для многих престижных университетов и культурных достопримечательностей.",
    image: "/image/HomeContent/Countries/Rectangle 1 (3).png",
    href: "/Countries/uk",
  },
  {
    id: 5,
    name: "Германия",
    nameEn: "Germany",
    flag: "🇩🇪",
    flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Germany.svg.webp",
    description: "Германия предлагает бесплатное образование для студентов на разных уровнях, что делает её популярным выбором.",
    image: "/image/HomeContent/Countries/Германия.webp",
    href: "/Countries/germany",
  },
];

// ─── Карточка ─────────────────────────────────────────────────────────────────

function CountryCard({ country }: { country: Country }) {
  return (
    <div className="group flex flex-col w-full max-w-[305px] p-[10px] pb-[20px] gap-[10px] rounded-[16px] border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Изображение */}
      <div className="relative h-[180px] rounded-[8px] overflow-hidden bg-slate-200">
        {country.image ? (
          <Image
            src={country.image}
            alt={country.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="305px"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 animate-pulse" />
        )}
      </div>

      {/* Флаг + название */}
      <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-[8px] p-3">
        {country.flagImage ? (
          <div className="relative w-6 h-4 flex-shrink-0 rounded-[2px] overflow-hidden">
            <Image src={country.flagImage} alt={`Флаг ${country.name}`} fill className="object-cover" sizes="24px" />
          </div>
        ) : (
          <span className="text-xl leading-none">{country.flag}</span>
        )}
        <div>
          <p className="text-sm font-bold text-[#101828] leading-tight">{country.name}</p>
          <p className="text-xs text-[#667085] leading-tight">{country.nameEn}</p>
        </div>
      </div>

      {/* Описание */}
      <p className="text-xs text-[#344054] leading-relaxed px-1 flex-1">
        {country.description}
      </p>

      {/* Кнопка */}
      <Link
        href={`/Countries/${country.id}`}
        className="mt-auto mx-1 flex items-center justify-center h-9 rounded-[8px] border border-[#1570EF] text-[#1570EF] text-xs font-semibold bg-transparent hover:bg-[#1570EF] hover:text-white transition-colors duration-200"
      >
        Подробнее о стране
      </Link>
    </div>
  );
}

// ─── Страница ─────────────────────────────────────────────────────────────────

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#101828]">Выберите страну для обучения</h1>
            <p className="mt-2 text-sm text-[#667085]">
              Исследуйте образовательные возможности в ведущих странах мира
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
