"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { BookOpen, Clock, Users, Award } from "lucide-react";

function openModal() {
  window.dispatchEvent(new CustomEvent("open-consultation-modal"));
}

// ─── Данные курсов ────────────────────────────────────────────────────────────

const courses = [
  {
    id: 1,
    icon: <BookOpen size={18} className="text-white" />,
    title: "TOEFL Preparation",
    description: "Комплексная подготовка к экзамену TOEFL",
    duration: "12 недель",
    lessons: 24,
    students: 45,
    price: "$600",
  },
  {
    id: 2,
    icon: <BookOpen size={18} className="text-white" />,
    title: "IELTS Mastery",
    description: "Подготовка к экзамену IELTS с опытными преподавателями",
    duration: "10 недель",
    lessons: 20,
    students: 35,
    price: "$550",
  },
  {
    id: 3,
    icon: <BookOpen size={18} className="text-white" />,
    title: "Cambridge English",
    description: "Подготовка к экзаменам Cambridge English",
    duration: "14 недель",
    lessons: 28,
    students: 30,
    price: "$650",
  },
  {
    id: 4,
    icon: <BookOpen size={18} className="text-white" />,
    title: "Business English",
    description: "Курс делового английского для профессионалов",
    duration: "8 недель",
    lessons: 16,
    students: 40,
    price: "$400",
  },
];

// ─── Данные преподавателей ────────────────────────────────────────────────────

const teachers = [
  { id: 1, name: "Elena Smith",   subject: "TOEFL & IELTS",       rate: "$50/час", exp: "8 лет",  cert: "Cambridge CELTA" },
  { id: 2, name: "John Doe",      subject: "Cambridge English",    rate: "$45/час", exp: "5 лет",  cert: "Cambridge CELTA" },
  { id: 3, name: "Maria Johnson", subject: "SAT & ACT Prep",       rate: "$60/час", exp: "10 лет", cert: "Certified Tutor" },
  { id: 4, name: "Alex Brown",    subject: "GRE & GMAT Coaching",  rate: "$55/час", exp: "7 лет",  cert: "MBA Graduate"    },
];

// ─── Карточка курса ───────────────────────────────────────────────────────────

function CourseCard({ course }: { course: typeof courses[0] }) {
  return (
    <div className="flex flex-col p-5 rounded-2xl border border-[#EAECF0] bg-white shadow-sm gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#0047FF] flex items-center justify-center flex-shrink-0">
        {course.icon}
      </div>
      <div>
        <p className="text-sm font-bold text-[#101828]">{course.title}</p>
        <p className="text-xs text-[#667085] mt-1 leading-relaxed">{course.description}</p>
      </div>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between text-[#344054]">
          <span className="flex items-center gap-1"><Clock size={12} className="text-[#667085]" /> Длительность</span>
          <span className="font-semibold text-[#0047FF]">{course.duration}</span>
        </div>
        <div className="flex justify-between text-[#344054]">
          <span className="flex items-center gap-1"><BookOpen size={12} className="text-[#667085]" /> Занятий</span>
          <span className="font-semibold">{course.lessons}</span>
        </div>
        <div className="flex justify-between text-[#344054]">
          <span className="flex items-center gap-1"><Users size={12} className="text-[#667085]" /> Студентов</span>
          <span className="font-semibold">{course.students}</span>
        </div>
        <div className="flex justify-between text-[#344054] pt-1 border-t border-[#EAECF0]">
          <span>Стоимость</span>
          <span className="font-bold text-[#101828]">{course.price}</span>
        </div>
      </div>
      <button
        onClick={openModal}
        className="w-full py-2 rounded-lg bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0035CC] transition-colors mt-auto"
      >
        Записаться
      </button>
    </div>
  );
}

// ─── Карточка преподавателя ───────────────────────────────────────────────────

function TeacherCard({ teacher }: { teacher: typeof teachers[0] }) {
  const initials = teacher.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="flex flex-col p-4 rounded-2xl border border-[#EAECF0] bg-white shadow-sm gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#101828] flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-[#101828]">{teacher.name}</p>
          <p className="text-xs text-[#667085]">{teacher.subject}</p>
          <p className="text-xs text-[#667085]">Стоимость <span className="font-semibold text-[#101828]">{teacher.rate}</span></p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between text-[#344054]">
          <span className="flex items-center gap-1"><Clock size={12} className="text-[#667085]" /> Опыт</span>
          <span className="font-semibold">{teacher.exp}</span>
        </div>
        <div className="flex justify-between text-[#344054]">
          <span className="flex items-center gap-1"><Award size={12} className="text-[#667085]" /> Сертификаты</span>
          <span className="font-semibold">{teacher.cert}</span>
        </div>
      </div>
      <button
        onClick={openModal}
        className="w-full py-2 rounded-lg border border-[#0047FF] text-[#0047FF] text-xs font-semibold hover:bg-[#0047FF] hover:text-white transition-colors"
      >
        Записаться
      </button>
    </div>
  );
}

// ─── Страница ─────────────────────────────────────────────────────────────────

export default function OnlinePrepPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">

          {/* ── Заголовок ── */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#101828]">Онлайн-подготовка</h1>
            <p className="mt-2 text-sm text-[#667085]">
              Занятия с профессиональными преподавателями для успешного поступления
            </p>
          </div>

          {/* ── Популярные курсы ── */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#101828] mb-6">Популярные курсы</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </section>

          {/* ── Преподаватели ── */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#101828] mb-6">Наши преподаватели</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {teachers.map((t) => <TeacherCard key={t.id} teacher={t} />)}
            </div>
          </section>

        </div>

        {/* ── CTA ── */}
        <section className="bg-[#F0F5FF] py-14 px-6">
          <div className="container mx-auto flex flex-col items-center text-center gap-4">
            <h2 className="text-2xl font-bold text-[#101828]">Готовы начать обучение в США?</h2>
            <p className="text-sm text-[#667085] max-w-md leading-relaxed">
              Получите персональную консультацию по выбору университета и помощь в подготовке документов
            </p>
            <button
              onClick={openModal}
              className="px-8 py-3 rounded-lg bg-[#0047FF] text-white text-sm font-semibold hover:bg-[#0035CC] transition-colors"
            >
              Получить консультацию
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
