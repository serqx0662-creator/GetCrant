"use client";

import { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import CourseModal, { type CourseInfo } from "./CourseModal";

// Тип одного курса из Strapi
interface StrapiCourse {
  id: number;
  documentId?: string; // Strapi v5: строковый идентификатор для REST-запросов
  attributes?: {
    title?: string;
    description?: string;
    duration?: string;
    lessons?: number;
    students?: number;
    price?: string | number;
  };
  // Strapi v5 возвращает поля напрямую (без attributes)
  title?: string;
  description?: string;
  duration?: string;
  lessons?: number;
  students?: number;
  price?: string | number;
}

// Нормализованный тип для отображения
// documentId используется в URL при PUT (Strapi v5), id — для React key
type Course = CourseInfo & { id: number; documentId: string; lessons: number; students: number };

// Приводим ответ Strapi (v4 с attributes или v5 без) к единому виду
function normalizeCourse(item: StrapiCourse): Course {
  const attrs = item.attributes ?? item;
  return {
    id:          item.id,
    // v5 даёт documentId, v4 — нет; фоллбэк на строковый id
    documentId:  item.documentId ?? String(item.id),
    title:       attrs.title       ?? "Без названия",
    description: attrs.description ?? "",
    duration:    attrs.duration    ?? "—",
    lessons:     attrs.lessons     ?? 0,
    students:    attrs.students    ?? 0,
    price:       attrs.price       ?? "—",
  };
}

interface CourseCardProps {
  course: Course;
  enrolling: boolean;
  onEnroll: (course: Course) => void;
}

function CourseCard({ course, enrolling, onEnroll }: CourseCardProps) {
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
        <span className="text-[16px] font-bold text-[#101828]">${String(course.price).replace(/^\$/, "")}</span>
      </div>
      <button
        onClick={() => onEnroll(course)}
        disabled={enrolling}
        className="w-full py-2 rounded-lg bg-[#0047FF] text-white text-xs font-semibold hover:bg-[#0035CC] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {enrolling ? "Запись..." : "Записаться"}
      </button>
    </div>
  );
}

export default function CoursesSection() {
  const [courses, setCourses]               = useState<Course[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseInfo | null>(null);
  // id курса, по которому сейчас идёт PUT-запрос (блокирует кнопку)
  const [enrollingId, setEnrollingId]       = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/courses?sort=order:asc")
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
        return res.json();
      })
      .then((json: { data: StrapiCourse[] }) => {
        setCourses(json.data.map(normalizeCourse));
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Увеличивает счётчик студентов на 1 через PUT и открывает модалку записи
  async function handleEnroll(course: Course) {
    setEnrollingId(course.id);

    try {
      const res = await fetch(`http://localhost:1337/api/courses/${course.documentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { students: course.students + 1 } }),
      });

      if (!res.ok) throw new Error(`PUT вернул ${res.status}`);

      // Обновляем локальный state — пользователь сразу видит новое число
      setCourses((prev) =>
        prev.map((c) =>
          c.id === course.id ? { ...c, students: c.students + 1 } : c
        )
      );

      // Открываем модалку с актуальными данными (уже с +1 студентом)
      setSelectedCourse({ ...course, students: course.students + 1 } as CourseInfo);
    } catch (err) {
      console.error("Не удалось обновить счётчик студентов:", err);
      // Даже если PUT упал — всё равно открываем модалку записи
      setSelectedCourse(course);
    } finally {
      setEnrollingId(null);
    }
  }

  return (
    <>
      <section className="w-full container mx-auto px-4 md:px-6 lg:px-12">
        <h2 className="text-2xl font-bold text-[#101828] mb-6">Популярные курсы</h2>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full animate-pulse"
                style={{ padding: "20px", borderRadius: "16px", border: "1px solid #EAECF0", background: "#FFF", minHeight: "260px" }}
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">Не удалось загрузить курсы: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                enrolling={enrollingId === c.id}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        )}
      </section>

      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}
