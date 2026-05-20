"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import CourseModal, { type CourseInfo } from "./CourseModal";

const courses: (CourseInfo & { id: number; lessons: number; students: number })[] = [
  { id: 1, title: "TOEFL Preparation",  description: "Комплексная подготовка к экзамену TOEFL",                duration: "12 недель", lessons: 24, students: 45, price: "$600" },
  { id: 2, title: "IELTS Mastery",       description: "Подготовка к экзамену IELTS с опытными преподавателями", duration: "10 недель", lessons: 20, students: 35, price: "$550" },
  { id: 3, title: "Cambridge English",   description: "Подготовка к экзаменам Cambridge English",               duration: "14 недель", lessons: 28, students: 30, price: "$650" },
  { id: 4, title: "Business English",    description: "Курс делового английского для профессионалов",           duration: "8 недель",  lessons: 16, students: 40, price: "$400" },
];

function CourseCard({ course, onEnroll }: { course: typeof courses[0]; onEnroll: (c: CourseInfo) => void }) {
  return (
    <div className="w-full" style={{ padding: "20px", borderRadius: "16px", border: "1px solid #EAECF0", background: "#FFF", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className="w-8 h-8 rounded-lg bg-[#0047FF] flex items-center justify-center shrink-0">
        <GraduationCap size={18} className="text-white" />
      </div>
      <div className="min-h-[52px]">
        <p className="text-sm font-bold text-[#101828]">{course.title}</p>
        <p className="text-xs text-[#667085] mt-1 leading-relaxed">{course.description}</p>
      </div>
      <div className="w-full rounded-lg bg-[#F2F4F7] px-3 py-2 flex flex-col gap-1.5 text-xs mt-auto">
        <div className="flex justify-between">
          <span className="text-[#667085]">Длительность</span>
          <span className="font-semibold text-[#0047FF]">{course.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">Занятий</span>
          <span className="font-semibold text-[#101828]">{course.lessons}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">Студентов</span>
          <span className="font-semibold text-[#101828]">{course.students}</span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-1">
        <span className="text-[14px] text-[#667085]">Стоимость</span>
        <span className="text-[16px] font-bold text-[#101828]">{course.price}</span>
      </div>
      <button
        onClick={() => onEnroll(course)}
        className="w-full py-2 rounded-lg bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0035CC] transition-colors"
      >
        Записаться
      </button>
    </div>
  );
}

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);

  return (
    <>
      <section className="w-full container mx-auto px-4 md:px-6 lg:px-12">
        <h2 className="text-2xl font-bold text-[#101828] mb-6">Популярные курсы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} onEnroll={setSelectedCourse} />
          ))}
        </div>
      </section>

      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}
