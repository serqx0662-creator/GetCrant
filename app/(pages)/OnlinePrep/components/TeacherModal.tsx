"use client";

import { useState } from "react";
import { X, GraduationCap, Star, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Teacher } from "./TeacherCard";

interface TeacherModalProps {
  teacher: Teacher | null;
  onClose: () => void;
}

export default function TeacherModal({ teacher, onClose }: TeacherModalProps) {
  const [format, setFormat]   = useState<"individual" | "trial">("individual");
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [notes, setNotes]     = useState("");
  const [agreed, setAgreed]   = useState(false);

  if (!teacher) return null;

  const hourlyRate = parseInt(teacher.rate.replace(/[^0-9]/g, ""), 10);
  const trialRate  = Math.round(hourlyRate * 0.5);
  const currency   = teacher.rate.replace(/[0-9]/g, "").trim() || "$";

  const canSubmit = agreed && date && time && name && email;

  return (
    <AnimatePresence>
      {teacher && (
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] my-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-xl object-cover bg-gray-200 flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                  <div>
                    <p className="text-[10px] text-[#667085] mb-0.5">Записаться к преподавателю</p>
                    <p className="text-lg font-bold text-[#101828] leading-tight">{teacher.name}</p>
                    <p className="text-xs text-[#667085]">{teacher.subject}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 ml-4"
                >
                  <X size={16} className="text-[#667085]" />
                </button>
              </div>

              <div className="px-6 pb-6 flex flex-col gap-5">
                {/* Инфо-блоки */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-2 bg-[#F2F4F7] rounded-xl px-3 py-2.5">
                    <GraduationCap size={14} className="text-[#0047FF] flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-[#667085]">Специализация</p>
                      <p className="text-[10px] font-bold text-[#0047FF] leading-tight">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F2F4F7] rounded-xl px-3 py-2.5">
                    <Star size={14} className="text-[#0047FF] flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-[#667085]">Опыт работы</p>
                      <p className="text-[10px] font-bold text-[#0047FF] leading-tight">{teacher.exp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F2F4F7] rounded-xl px-3 py-2.5">
                    <FileText size={14} className="text-[#0047FF] flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-[#667085]">Сертификаты</p>
                      <p className="text-[10px] font-bold text-[#0047FF] leading-tight">{teacher.cert}</p>
                    </div>
                  </div>
                </div>

                {/* Формат занятия */}
                <div>
                  <p className="text-sm font-semibold text-[#101828] mb-2">Выберите формат занятия</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Индивидуальное */}
                    <button
                      onClick={() => setFormat("individual")}
                      className={`flex flex-col items-start gap-1 p-4 rounded-xl border-2 text-left transition-colors ${
                        format === "individual"
                          ? "border-[#0047FF] bg-blue-50/50"
                          : "border-[#EAECF0] hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          format === "individual" ? "border-[#0047FF]" : "border-gray-300"
                        }`}>
                          {format === "individual" && <div className="w-2 h-2 rounded-full bg-[#0047FF]" />}
                        </div>
                        <span className="text-xs font-semibold text-[#101828]">Индивидуальное занятие</span>
                      </div>
                      <p className="text-[10px] text-[#667085] pl-6">Персональное занятие один на один с преподавателем</p>
                      <p className="text-sm font-bold text-[#101828] pl-6">{currency}{hourlyRate}/час</p>
                    </button>

                    {/* Пробное */}
                    <button
                      onClick={() => setFormat("trial")}
                      className={`flex flex-col items-start gap-1 p-4 rounded-xl border-2 text-left transition-colors ${
                        format === "trial"
                          ? "border-[#0047FF] bg-blue-50/50"
                          : "border-[#EAECF0] hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          format === "trial" ? "border-[#0047FF]" : "border-gray-300"
                        }`}>
                          {format === "trial" && <div className="w-2 h-2 rounded-full bg-[#0047FF]" />}
                        </div>
                        <span className="text-xs font-semibold text-[#101828]">Пробное занятие (30 мин)</span>
                      </div>
                      <p className="text-[10px] text-[#667085] pl-6">Короткое знакомство и оценка уровня</p>
                      <p className="text-sm font-bold text-[#101828] pl-6">{currency}{trialRate}</p>
                    </button>
                  </div>
                </div>

                {/* Дата и время */}
                <div>
                  <p className="text-sm font-semibold text-[#101828] mb-2">Выберите дату и время</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border border-[#EAECF0] rounded-xl px-4 py-2.5 text-sm text-[#344054] focus:outline-none focus:border-[#0047FF] transition-colors"
                    />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="border border-[#EAECF0] rounded-xl px-4 py-2.5 text-sm text-[#344054] focus:outline-none focus:border-[#0047FF] transition-colors"
                    />
                  </div>
                </div>

                {/* Контакты */}
                <div>
                  <p className="text-sm font-semibold text-[#101828] mb-2">Ваши контакты</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Как к вам обращаться?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-[#EAECF0] rounded-xl px-4 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#0047FF] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-[#EAECF0] rounded-xl px-4 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#0047FF] transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#667085] mb-1.5">Дополнительные пожелания <span className="text-[#98A2B3]">(необязательно)</span></p>
                    <textarea
                      placeholder="Расскажите о своих целях, уровне подготовки или особых пожеланиях..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full border border-[#EAECF0] rounded-xl px-4 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-[#0047FF] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Согласие */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#0047FF] flex-shrink-0"
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
                    disabled={!canSubmit}
                    className="py-2.5 rounded-xl bg-[#0047FF] text-white text-sm font-semibold hover:bg-[#0035CC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Подтвердить запись
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
