"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen, Users, MapPin, GraduationCap,
  Briefcase, Lightbulb, Star, FileText,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

function openModal() {
  window.dispatchEvent(new CustomEvent("open-consultation-modal"));
}

// ─── Типы ────────────────────────────────────────────────────────────────────

interface Advantage { icon: React.ReactNode; title: string; desc: string; }
interface CostRow   { category: string; min: string; avg: string; max: string; }
interface CostTotal { min: string; avg: string; max: string; }
interface University { id: number; name: string; programs: string; students: string; location: string; image: string; href: string; }
interface VisaType  { title: string; desc: string; }

interface CountryData {
  name: string;
  description: string;
  heroImage: string;
  flagImage: string;
  ctaTitle: string;
  advantages: Advantage[];
  costRows: CostRow[];
  costTotal: CostTotal;
  universities: University[];
  visaTypes: VisaType[];
}

// ─── США ─────────────────────────────────────────────────────────────────────

const usaData: CountryData = {
  name: "США",
  description: "США входит в число лидеров мирового образования с более чем 4000 университетами.",
  heroImage: "/image/HomeContent/Countries/Rectangle 1 (1).png",
  flagImage: "/image/HomeContent/Countries/flag/usa-flag-1 1.png",
  ctaTitle: "Готовы начать обучение в США?",
  advantages: [
    { icon: <GraduationCap size={20} className="text-white" />, title: "Топовое образование",   desc: "США входит в число лидеров мирового образования" },
    { icon: <Briefcase    size={20} className="text-white" />, title: "Карьерные возможности", desc: "Высокие возможности для работы после окончания обучения" },
    { icon: <Lightbulb   size={20} className="text-white" />, title: "Инновации",              desc: "Развитие научного и технологического сектора" },
    { icon: <Star        size={20} className="text-white" />, title: "Качество жизни",         desc: "Высокий уровень жизни и развитая инфраструктура" },
  ],
  costRows: [
    { category: "Аренда жилья",        min: "$800",  avg: "$1,500", max: "$2,500" },
    { category: "Питание",             min: "$200",  avg: "$400",   max: "$800"   },
    { category: "Транспорт",           min: "$50",   avg: "$100",   max: "$150"   },
    { category: "Коммунальные услуги", min: "$100",  avg: "$150",   max: "$200"   },
  ],
  costTotal: { min: "$1,150", avg: "$2,150", max: "$3,650" },
  universities: [
    { id: 1, name: "Harvard University",                 programs: "120 программ", students: "23 000", location: "Cambridge, MA, США", image: "/image/HomeContent/PartnerUniversities/Frame 53 (3).png",          href: "https://ru.wikipedia.org/wiki/Гарвардский_университет" },
    { id: 2, name: "Stanford University",                programs: "150 программ", students: "22 000", location: "Stanford, CA, США",   image: "/image/HomeContent/PartnerUniversities/Frame 53 (4).png",          href: "https://ru.wikipedia.org/wiki/Стэнфордский_университет" },
    { id: 3, name: "MIT",                                programs: "120 программ", students: "11 000", location: "Cambridge, MA, США", image: "/image/HomeContent/PartnerUniversities/Frame 53 (5).png",          href: "https://ru.wikipedia.org/wiki/Массачусетский_технологический_институт" },
    { id: 4, name: "University of California, Berkeley", programs: "140 программ", students: "30 000", location: "Berkeley, CA, США",  image: "/image/HomeContent/PartnerUniversities/Frame 53 (6).png",          href: "https://ru.wikipedia.org/wiki/Калифорнийский_университет_в_Беркли" },
    { id: 5, name: "Princeton University",               programs: "90 программ",  students: "8 000",  location: "Princeton, NJ, США", image: "/image/HomeContent/PartnerUniversities/Princeton University.webp", href: "https://ru.wikipedia.org/wiki/Принстонский_университет" },
  ],
  visaTypes: [
    { title: "F-1 Student Visa",  desc: "Основная студенческая виза для аккредитованных университетов" },
    { title: "J-1 Exchange Visa", desc: "Для программ обмена и стажировок" },
    { title: "OPT",               desc: "12–36 месяцев работы после окончания обучения" },
  ],
};

// ─── Канада ───────────────────────────────────────────────────────────────────

const canadaData: CountryData = {
  name: "Канада",
  description: "Высокое качество жизни и дружелюбная иммиграционная политика для студентов.",
  heroImage: "/image/HomeContent/Countries/Rectangle 1 (2).png",
  flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Canada_(Pantone).svg.webp",
  ctaTitle: "Готовы начать обучение в Канаде?",
  advantages: [
    { icon: <GraduationCap size={20} className="text-white" />, title: "Качественное образование",  desc: "Канадские университеты входят в топ мировых рейтингов" },
    { icon: <Briefcase    size={20} className="text-white" />, title: "Работа после учёбы",         desc: "PGWP позволяет работать до 3 лет после окончания вуза" },
    { icon: <Lightbulb   size={20} className="text-white" />, title: "Иммиграционные возможности", desc: "Один из самых доступных путей к постоянному резидентству" },
    { icon: <Star        size={20} className="text-white" />, title: "Безопасность и комфорт",     desc: "Канада стабильно входит в топ стран по качеству жизни" },
  ],
  costRows: [
    { category: "Аренда жилья",        min: "$900",  avg: "$1,600", max: "$2,800" },
    { category: "Питание",             min: "$350",  avg: "$500",   max: "$700"   },
    { category: "Транспорт",           min: "$70",   avg: "$120",   max: "$180"   },
    { category: "Коммунальные услуги", min: "$120",  avg: "$180",   max: "$250"   },
  ],
  costTotal: { min: "$1,440", avg: "$2,400", max: "$3,930" },
  universities: [
    { id: 1, name: "University of Toronto",  programs: "130 программ", students: "97 000", location: "Toronto, ON",   image: "/image/HomeContent/PartnerUniversities/University of Toronto.jpg", href: "https://ru.wikipedia.org/wiki/Университет_Торонто" },
    { id: 2, name: "UBC",                    programs: "100 программ", students: "65 000", location: "Vancouver, BC", image: "/image/HomeContent/PartnerUniversities/Cambridge University.jpg",  href: "https://ru.wikipedia.org/wiki/Университет_Британской_Колумбии" },
    { id: 3, name: "McGill University",      programs: "90 программ",  students: "40 000", location: "Montreal, QC",  image: "/image/HomeContent/PartnerUniversities/Oxford University.webp",   href: "https://ru.wikipedia.org/wiki/Университет_Макгилла" },
    { id: 4, name: "University of Waterloo", programs: "80 программ",  students: "42 000", location: "Waterloo, ON",  image: "/image/HomeContent/PartnerUniversities/ETH Zurich.jpg",           href: "https://ru.wikipedia.org/wiki/Университет_Ватерлоо" },
  ],
  visaTypes: [
    { title: "Study Permit",      desc: "Основная виза для обучения продолжительностью более 6 месяцев" },
    { title: "PGWP",              desc: "Разрешение на работу после окончания вуза — до 3 лет" },
    { title: "Co-op Work Permit", desc: "Для программ со стажировками в рамках учебного плана" },
  ],
};

// ─── Австралия ────────────────────────────────────────────────────────────────

const australiaData: CountryData = {
  name: "Австралия",
  description: "Уникальная природа, высокий уровень безопасности и дипломы, признанные во всем мире.",
  heroImage: "/image/HomeContent/Countries/Rectangle 1 (4).png",
  flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Australia_(converted).svg.webp",
  ctaTitle: "Готовы начать обучение в Австралии?",
  advantages: [
    { icon: <GraduationCap size={20} className="text-white" />, title: "Признанные дипломы",    desc: "Австралийские дипломы котируются работодателями по всему миру" },
    { icon: <Briefcase    size={20} className="text-white" />, title: "Работа после учёбы",     desc: "Visa 485 позволяет остаться работать до 4 лет после окончания" },
    { icon: <Lightbulb   size={20} className="text-white" />, title: "Инновационная среда",    desc: "Австралия входит в топ стран по уровню научных исследований" },
    { icon: <Star        size={20} className="text-white" />, title: "Безопасность и природа", desc: "Высокий уровень безопасности и уникальная природная среда" },
  ],
  costRows: [
    { category: "Аренда жилья",        min: "$1,000", avg: "$1,800", max: "$3,000" },
    { category: "Питание",             min: "$400",   avg: "$600",   max: "$850"   },
    { category: "Транспорт",           min: "$100",   avg: "$150",   max: "$220"   },
    { category: "Коммунальные услуги", min: "$150",   avg: "$220",   max: "$310"   },
  ],
  costTotal: { min: "$1,650", avg: "$2,770", max: "$4,380" },
  universities: [
    { id: 1, name: "University of Melbourne",        programs: "100 программ", students: "52 000", location: "Melbourne, VIC", image: "/image/HomeContent/PartnerUniversities/University of Melbourne.jpg", href: "https://ru.wikipedia.org/wiki/Мельбурнский_университет" },
    { id: 2, name: "University of Sydney",           programs: "110 программ", students: "73 000", location: "Sydney, NSW",    image: "/image/HomeContent/PartnerUniversities/Oxford University.webp",     href: "https://ru.wikipedia.org/wiki/Сиднейский_университет" },
    { id: 3, name: "Australian National University", programs: "80 программ",  students: "25 000", location: "Canberra, ACT",  image: "/image/HomeContent/PartnerUniversities/ETH Zurich.jpg",             href: "https://ru.wikipedia.org/wiki/Австралийский_национальный_университет" },
    { id: 4, name: "University of Queensland",       programs: "90 программ",  students: "55 000", location: "Brisbane, QLD",  image: "/image/HomeContent/PartnerUniversities/Princeton University.webp",  href: "https://ru.wikipedia.org/wiki/Университет_Квинсленда" },
  ],
  visaTypes: [
    { title: "Student Visa (subclass 500)",            desc: "Основная виза для всех иностранных студентов" },
    { title: "Temporary Graduate Visa (subclass 485)", desc: "Позволяет остаться работать после учёбы — до 2–4 лет" },
    { title: "Student Guardian Visa (subclass 590)",   desc: "Для опекунов несовершеннолетних студентов" },
  ],
};

// ─── Великобритания ───────────────────────────────────────────────────────────

const ukData: CountryData = {
  name: "Великобритания",
  description: "Вековые традиции образования, престижные дипломы Russell Group и насыщенная культурная жизнь.",
  heroImage: "/image/HomeContent/Countries/Rectangle 1 (3).png",
  flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_the_United_Kingdom_(1-2).svg.webp",
  ctaTitle: "Готовы начать обучение в Великобритании?",
  advantages: [
    { icon: <GraduationCap size={20} className="text-white" />, title: "Вековые традиции",       desc: "Оксфорд и Кембридж — старейшие университеты мира" },
    { icon: <Briefcase    size={20} className="text-white" />, title: "Престижные дипломы",      desc: "Дипломы Russell Group признаются работодателями по всему миру" },
    { icon: <Lightbulb   size={20} className="text-white" />, title: "Культурная жизнь",        desc: "Насыщенная культурная среда и международное сообщество" },
    { icon: <Star        size={20} className="text-white" />, title: "Graduate Visa",            desc: "Возможность работать 2 года после окончания обучения" },
  ],
  costRows: [
    { category: "Аренда жилья",        min: "£800", avg: "£1,400", max: "£2,200" },
    { category: "Питание",             min: "£300", avg: "£450",   max: "£600"   },
    { category: "Транспорт",           min: "£80",  avg: "£130",   max: "£190"   },
    { category: "Коммунальные услуги", min: "£90",  avg: "£140",   max: "£200"   },
  ],
  costTotal: { min: "£1,270", avg: "£2,120", max: "£3,190" },
  universities: [
    { id: 1, name: "University of Oxford",    programs: "150 программ", students: "24 000", location: "Oxford, UK",    image: "/image/HomeContent/PartnerUniversities/Oxford University.webp",   href: "https://ru.wikipedia.org/wiki/Оксфордский_университет" },
    { id: 2, name: "University of Cambridge", programs: "180 программ", students: "21 000", location: "Cambridge, UK", image: "/image/HomeContent/PartnerUniversities/Cambridge University.jpg", href: "https://ru.wikipedia.org/wiki/Кембриджский_университет" },
    { id: 3, name: "Imperial College London", programs: "100 программ", students: "19 000", location: "London, UK",    image: "/image/HomeContent/PartnerUniversities/Frame 53 (5).png",         href: "https://ru.wikipedia.org/wiki/Имперский_колледж_Лондона" },
    { id: 4, name: "UCL",                     programs: "120 программ", students: "42 000", location: "London, UK",    image: "/image/HomeContent/PartnerUniversities/Frame 53 (6).png",         href: "https://ru.wikipedia.org/wiki/Университетский_колледж_Лондона" },
  ],
  visaTypes: [
    { title: "Student Visa (бывшая Tier 4)", desc: "Основная виза для обучения в аккредитованных учебных заведениях" },
    { title: "Graduate Visa",                desc: "Позволяет работать в Великобритании 2 года после окончания вуза" },
    { title: "Visitor Student Visa",         desc: "Для краткосрочных курсов продолжительностью до 6 месяцев" },
  ],
};

// ─── Германия ─────────────────────────────────────────────────────────────────

const germanyData: CountryData = {
  name: "Германия",
  description: "Бесплатное образование в государственных вузах, сильная инженерная школа и центр инноваций Европы.",
  heroImage: "/image/HomeContent/Countries/Германия.webp",
  flagImage: "/image/HomeContent/Countries/flag/500px-Flag_of_Germany.svg.webp",
  ctaTitle: "Готовы начать обучение в Германии?",
  advantages: [
    { icon: <GraduationCap size={20} className="text-white" />, title: "Бесплатное образование", desc: "Государственные вузы Германии не взимают плату за обучение" },
    { icon: <Briefcase    size={20} className="text-white" />, title: "Инженерная школа",        desc: "Германия — мировой лидер в области инженерии и технологий" },
    { icon: <Lightbulb   size={20} className="text-white" />, title: "Центр инноваций",         desc: "Развитая экосистема стартапов и научных исследований" },
    { icon: <Star        size={20} className="text-white" />, title: "Работа после учёбы",      desc: "Job Seeker Visa позволяет искать работу после окончания вуза" },
  ],
  costRows: [
    { category: "Аренда жилья",        min: "€700", avg: "€1,100", max: "€1,800" },
    { category: "Питание",             min: "€250", avg: "€400",   max: "€550"   },
    { category: "Транспорт",           min: "€60",  avg: "€90",    max: "€130"   },
    { category: "Коммунальные услуги", min: "€100", avg: "€160",   max: "€220"   },
  ],
  costTotal: { min: "€1,110", avg: "€1,750", max: "€2,700" },
  universities: [
    { id: 1, name: "Technical University of Munich (TUM)",          programs: "120 программ", students: "50 000", location: "Munich, Germany",  image: "/image/HomeContent/PartnerUniversities/ETH Zurich.jpg",           href: "https://ru.wikipedia.org/wiki/Технический_университет_Мюнхена" },
    { id: 2, name: "Ludwig Maximilian University of Munich (LMU)",  programs: "100 программ", students: "52 000", location: "Munich, Germany",  image: "/image/HomeContent/PartnerUniversities/Frame 53 (3).png",         href: "https://ru.wikipedia.org/wiki/Мюнхенский_университет" },
    { id: 3, name: "Heidelberg University",                         programs: "80 программ",  students: "30 000", location: "Heidelberg, Germany", image: "/image/HomeContent/PartnerUniversities/Oxford University.webp", href: "https://ru.wikipedia.org/wiki/Гейдельбергский_университет" },
    { id: 4, name: "Humboldt University of Berlin",                 programs: "90 программ",  students: "36 000", location: "Berlin, Germany",  image: "/image/HomeContent/PartnerUniversities/Cambridge University.jpg", href: "https://ru.wikipedia.org/wiki/Берлинский_университет_имени_Гумбольдта" },
  ],
  visaTypes: [
    { title: "Student Visa",       desc: "Для долгосрочного обучения в немецком вузе" },
    { title: "Job Seeker Visa",    desc: "Позволяет искать работу в Германии после окончания учёбы" },
    { title: "Residence Permit",   desc: "Временный вид на жительство для студентов на период обучения" },
  ],
};

// ─── Реестр ───────────────────────────────────────────────────────────────────

const countriesData: Record<string, CountryData> = {
  usa:       usaData,
  canada:    canadaData,
  australia: australiaData,
  uk:        ukData,
  germany:   germanyData,
};

// ─── Карточка университета ────────────────────────────────────────────────────

function UniversityCard({ u }: { u: University }) {
  return (
    <div
      className="group flex flex-col w-full p-[10px] pb-[20px] gap-[10px] rounded-2xl border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
      onClick={() => window.open(u.href, "_blank")}
    >
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-slate-200">
        <Image
          src={u.image}
          alt={u.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="flex flex-col gap-y-[8px]">
        <p className="text-sm font-bold text-[#101828] leading-tight line-clamp-2">{u.name}</p>
        <div className="flex items-center gap-3 text-xs text-[#344054]">
          <span className="flex items-center gap-1">
            <BookOpen size={13} className="text-[#1570EF]" />
            {u.programs}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} className="text-[#1570EF]" />
            {u.students}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#1D2939]">
          <MapPin size={12} className="text-[#1D2939] flex-shrink-0" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:text-blue-500 transition-colors"
          >
            {u.location}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Основной компонент ───────────────────────────────────────────────────────

export default function CountryContent({ id }: { id: string }) {
  const country = countriesData[id] || countriesData["usa"];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative w-full h-[420px] md:h-[500px]">
          <Image src={country.heroImage} alt={country.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-6 lg:left-12 bg-white rounded-[16px] shadow-xl p-4 flex items-center gap-4 max-w-[420px]">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#EAECF0]">
              <Image src={country.flagImage} alt={`Флаг ${country.name}`} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="text-base font-bold text-[#101828]">{country.name}</p>
              <p className="text-xs text-[#667085] leading-relaxed mt-0.5">
                {country.description}{" "}
                <button onClick={openModal} className="text-[#1570EF] hover:underline">
                  Получить консультацию →
                </button>
              </p>
            </div>
          </div>
        </section>

        {/* ── Преимущества ── */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-[#101828] mb-8">Преимущества обучения</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {country.advantages.map((a, i) => (
                <div key={i} className="flex flex-col gap-3 p-5 rounded-[16px] border border-[#EAECF0] bg-white">
                  <div className="w-10 h-10 rounded-[10px] bg-[#1570EF] flex items-center justify-center flex-shrink-0">
                    {a.icon}
                  </div>
                  <p className="text-sm font-bold text-[#101828]">{a.title}</p>
                  <p className="text-xs text-[#667085] leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Стоимость жизни ── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-[#101828] mb-8">Стоимость жизни (в месяц)</h2>
            <div className="rounded-[16px] border border-[#EAECF0] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#EAECF0]">
                    {["Категория", "Минимум", "Среднее", "Максимум"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#667085]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {country.costRows.map((row, i) => (
                    <tr key={i} className="border-b border-[#EAECF0]">
                      <td className="px-5 py-3 text-[#344054]">{row.category}</td>
                      <td className="px-5 py-3 text-[#344054]">{row.min}</td>
                      <td className="px-5 py-3 font-semibold text-[#101828]">{row.avg}</td>
                      <td className="px-5 py-3 text-[#344054]">{row.max}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F9FAFB]">
                    <td className="px-5 py-3 font-bold text-[#101828]">Итого</td>
                    <td className="px-5 py-3 font-bold text-[#101828]">{country.costTotal.min}</td>
                    <td className="px-5 py-3 font-bold text-[#101828]">{country.costTotal.avg}</td>
                    <td className="px-5 py-3 font-bold text-[#101828]">{country.costTotal.max}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Топ университеты ── */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#101828]">Топ университеты</h2>
              <Link href="/Universities" className="px-5 py-2 rounded-[8px] bg-[#1570EF] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors">
                Показать все
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {country.universities.map((u) => (
                <UniversityCard key={u.id} u={u} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Визовая информация ── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-[#101828] mb-6">Визовая информация</h2>
            <div className="flex flex-col gap-3">
              {country.visaTypes.map((v, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-[12px] border border-[#EAECF0] bg-white">
                  <div className="w-9 h-9 rounded-[8px] bg-[#1570EF] flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#101828]">{v.title}</p>
                    <p className="text-xs text-[#667085] mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="bg-[#F9FAFB] rounded-[24px] py-14 px-6 flex flex-col items-center text-center gap-5">
              <h2 className="text-2xl font-bold text-[#101828]">{country.ctaTitle}</h2>
              <p className="text-sm text-[#667085] max-w-md leading-relaxed">
                Получите персональную консультацию по выбору университета и помощь в подготовке документов
              </p>
              <button
                onClick={openModal}
                className="px-8 py-3 rounded-[8px] bg-[#1570EF] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors"
              >
                Получить консультацию
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
