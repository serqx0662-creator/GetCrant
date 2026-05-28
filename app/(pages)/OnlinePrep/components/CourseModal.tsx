"use client";

import { useState } from "react";
import { X, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CourseInfo {
  title: string;
  description: string;
  duration: string;
  price: string | number;
}

interface CourseModalProps {
  course: CourseInfo | null;
  onClose: () => void;
}

const timeSlots = [
  "Пн/Ср/Пт — 09:00",
  "Пн/Ср/Пт — 18:00",
  "Вт/Чт/Сб — 10:00",
  "Вт/Чт/Сб — 19:00",
  "Сб/Вс — 11:00",
];

const levels = [
  { value: "beginner",     label: "Начальный (A1–A2)" },
  { value: "intermediate", label: "Средний (B1–B2)" },
  { value: "advanced",     label: "Продвинутый (C1–C2)" },
];

function parsePrice(price: string | number): number {
  return parseInt(String(price).replace(/[^0-9]/g, ""), 10);
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const [timeSlot, setTimeSlot]   = useState("");
  const [level, setLevel]         = useState("intermediate");
  const [agreed, setAgreed]       = useState(false);

  if (!course) return null;

  const basePrice    = parsePrice(course.price);
  const discountAmt  = Math.round(basePrice * 0.1);
  const finalPrice   = basePrice - discountAmt;
  const currency     = String(course.price).replace(/[0-9,. ]/g, "").trim() || "$";

  return (
    <AnimatePresence>
      {course && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-120 overflow-hidden"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <p className="text-xs text-[#667085] mb-1">Записаться на курс</p>
                  <p className="text-lg font-bold text-[#101828]">{course.title}</p>
                  <p className="text-xs text-[#667085] mt-0.5">{course.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors shrink-0 ml-4"
                >
                  <X size={16} className="text-[#667085]" />
                </button>
              </div>

              <div className="px-6 pb-6 flex flex-col gap-5">
                {/* Инфо-блоки */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-[#F2F4F7] rounded-xl px-4 py-3">
                    <Calendar size={16} className="text-[#0047FF] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#667085]">Длительность</p>
                      <p className="text-xs font-bold text-[#0047FF]">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F2F4F7] rounded-xl px-4 py-3">
                    <Users size={16} className="text-[#0047FF] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#667085]">Формат обучения</p>
                      <p className="text-xs font-bold text-[#0047FF]">Онлайн</p>
                    </div>
                  </div>
                </div>

                {/* Выбор времени */}
                <div>
                  <p className="text-sm font-semibold text-[#101828] mb-2">Выберите удобное время</p>
                  <div className="relative">
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full appearance-none border border-[#EAECF0] rounded-xl px-4 py-2.5 text-sm text-[#344054] bg-white focus:outline-none focus:border-[#0047FF] transition-colors"
                    >
                      <option value="" disabled>Выберите группу или время начала</option>
                      {timeSlots.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]">▾</div>
                  </div>
                </div>

                {/* Уровень */}
                <div>
                  <p className="text-sm font-semibold text-[#101828] mb-2">Ваш уровень английского</p>
                  <div className="flex flex-col gap-2">
                    {levels.map((l) => (
                      <label key={l.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="level"
                          value={l.value}
                          checked={level === l.value}
                          onChange={() => setLevel(l.value)}
                          className="w-4 h-4 accent-[#0047FF]"
                        />
                        <span className="text-sm text-[#344054]">{l.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Расчёт цены */}
                <div className="bg-[#F9FAFB] rounded-xl px-4 py-3 flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between text-[#344054]">
                    <span>Стоимость курса</span>
                    <span>{currency}{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-[#0047FF]">
                    <span>Скидка</span>
                    <span>− {currency}{discountAmt} (10%)</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#101828] pt-1 border-t border-[#EAECF0] mt-1">
                    <span>Итого к оплате</span>
                    <span>{currency}{finalPrice}</span>
                  </div>
                </div>

                {/* Согласие */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#0047FF] shrink-0"
                  />
                  <span className="text-xs text-[#667085]">
                    Я согласен с условиями{" "}
                    <a href="#" className="text-[#0047FF] hover:underline">оферты</a>
                    {" "}и{" "}
                    <a href="#" className="text-[#0047FF] hover:underline">политикой возврата</a>
                  </span>
                </label>

                {/* Кнопки */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClose}
                    className="py-2.5 rounded-xl border border-[#EAECF0] text-sm font-semibold text-[#344054] hover:bg-gray-50 transition-colors"
                  >
                    Отменить
                  </button>
                  <button
                    disabled={!agreed || !timeSlot}
                    className="py-2.5 rounded-xl bg-[#0047FF] text-white text-sm font-semibold hover:bg-[#0035CC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Перейти к оплате
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
