"use client";

import { useRef } from "react";
import { BookOpen, Users, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/app/components/SectionHeader";

// ─── Типы ────────────────────────────────────────────────────────────────────

interface University {
  id: number;
  name: string;
  programs: string;
  students: string;
  location: string;
  image: string;
  href: string;
}

// ─── Данные ──────────────────────────────────────────────────────────────────

const universities: University[] = [
  { id: 1,  name: "Harvard University",                 programs: "120 программ", students: "23 000", location: "Cambridge, MA, США",       image: "/image/HomeContent/PartnerUniversities/Frame 53 (3).png",            href: "https://en.wikipedia.org/wiki/Harvard_University" },
  { id: 2,  name: "Stanford University",                programs: "150 программ", students: "22 000", location: "Stanford, CA, США",         image: "/image/HomeContent/PartnerUniversities/Frame 53 (4).png",            href: "https://en.wikipedia.org/wiki/Stanford_University" },
  { id: 3,  name: "MIT",                                programs: "120 программ", students: "11 000", location: "Cambridge, MA, США",       image: "/image/HomeContent/PartnerUniversities/Frame 53 (5).png",            href: "https://en.wikipedia.org/wiki/Massachusetts_Institute_of_Technology" },
  { id: 4,  name: "University of California, Berkeley", programs: "140 программ", students: "30 000", location: "Berkeley, CA, США",        image: "/image/HomeContent/PartnerUniversities/Frame 53 (6).png",            href: "https://en.wikipedia.org/wiki/University_of_California,_Berkeley" },
  { id: 5,  name: "Princeton University",               programs: "90 программ",  students: "8 000",  location: "Princeton, NJ, США",       image: "/image/HomeContent/PartnerUniversities/Princeton University.webp",   href: "https://en.wikipedia.org/wiki/Princeton_University" },
  { id: 6,  name: "Oxford University",                  programs: "150 программ", students: "24 000", location: "Oxford, Великобритания",    image: "/image/HomeContent/PartnerUniversities/Oxford University.webp",     href: "https://en.wikipedia.org/wiki/University_of_Oxford" },
  { id: 7,  name: "Cambridge University",               programs: "180 программ", students: "21 000", location: "Cambridge, Великобритания", image: "/image/HomeContent/PartnerUniversities/Cambridge University.jpg",   href: "https://en.wikipedia.org/wiki/University_of_Cambridge" },
  { id: 8,  name: "ETH Zurich",                         programs: "95 программ",  students: "22 000", location: "Цюрих, Швейцария",          image: "/image/HomeContent/PartnerUniversities/ETH Zurich.jpg",             href: "https://en.wikipedia.org/wiki/ETH_Zurich" },
  { id: 9,  name: "University of Toronto",              programs: "130 программ", students: "97 000", location: "Торонто, Канада",           image: "/image/HomeContent/PartnerUniversities/University of Toronto.jpg",  href: "https://en.wikipedia.org/wiki/University_of_Toronto" },
  { id: 10, name: "University of Melbourne",            programs: "100 программ", students: "52 000", location: "Мельбурн, Австралия",       image: "/image/HomeContent/PartnerUniversities/University of Melbourne.jpg", href: "https://en.wikipedia.org/wiki/University_of_Melbourne" },
];

// ─── Карточка ─────────────────────────────────────────────────────────────────

function UniversityCard({ university }: { university: University }) {
  return (
    <Link
      href={university.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 flex flex-col w-[300px] p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Фото */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-200">
        {university.image ? (
          <Image src={university.image} alt={university.name} fill className="object-cover" sizes="300px" />
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
            {university.programs}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} className="text-[#1570EF]" />
            {university.students}
          </span>
        </div>

        {/* Местоположение — кликабельная ссылка на Google Maps */}
        <div className="flex items-center gap-1 text-xs text-[#1D2939]">
          <MapPin size={12} className="text-[#1D2939] flex-shrink-0" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(university.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:text-blue-500 transition-colors cursor-pointer"
          >
            {university.location}
          </a>
        </div>
      </div>
    </Link>
  );
}

// ─── Секция ───────────────────────────────────────────────────────────────────

export default function PartnerUniversities() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Университеты-партнёры"
          subtitle="Мы работаем с ведущими университетами мира"
          onPrev={() => scroll("left")}
          onNext={() => scroll("right")}
        />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-6 lg:px-12 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {universities.map((u) => (
          <UniversityCard key={u.id} university={u} />
        ))}
      </div>
    </section>
  );
}
