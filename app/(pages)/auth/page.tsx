"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap, FileText, Globe, ArrowLeft } from "lucide-react";
import Header from "@/app/components/Header";

// ─── Данные правой панели ─────────────────────────────────────────────────────

const features = [
  { icon: <GraduationCap size={18} className="text-white" />, title: "Подбор программ",           desc: "Найдём лучшие программы и университеты под ваш профиль" },
  { icon: <FileText      size={18} className="text-white" />, title: "Поддержка на всех этапах",  desc: "Сопровождаем от выбора до зачисления и адаптации" },
  { icon: <Globe         size={18} className="text-white" />, title: "Международные возможности", desc: "Обучение в ведущих университетах мира" },
];

// ─── Форма входа ──────────────────────────────────────────────────────────────

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-center">
        <h1 className="text-[22px] font-bold text-[#101828]">Добро пожаловать!</h1>
        <p className="text-sm text-[#667085] mt-1 leading-relaxed">
          Войдите в свой аккаунт, чтобы продолжить обучение<br />и пользоваться всеми возможностями GetGrant.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#344054]">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#EAECF0] rounded-lg px-3 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#344054]">Пароль</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#EAECF0] rounded-lg px-3 py-2.5 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#667085] transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="flex justify-end mt-0.5">
            <a href="#" className="text-xs text-blue-600 hover:underline">Забыли пароль?</a>
          </div>
        </div>
      </div>

      <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all">
        Войти
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#EAECF0]" />
        <span className="text-xs text-[#98A2B3]">или</span>
        <div className="flex-1 h-px bg-[#EAECF0]" />
      </div>

      <div className="flex flex-col gap-2">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#EAECF0] text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Войти через Google
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#EAECF0] text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors">
          <svg width="14" height="16" viewBox="0 0 16 18" fill="currentColor">
            <path d="M13.173 9.545c-.02-2.17 1.772-3.22 1.853-3.272-1.01-1.476-2.582-1.678-3.143-1.7-1.337-.136-2.61.79-3.287.79-.676 0-1.72-.772-2.832-.75-1.454.021-2.8.847-3.547 2.148C.7 9.27 1.8 13.5 3.4 15.9c.8 1.17 1.76 2.48 3.01 2.43 1.21-.05 1.67-.78 3.13-.78 1.46 0 1.87.78 3.14.76 1.3-.02 2.12-1.19 2.92-2.36.92-1.35 1.3-2.66 1.32-2.73-.03-.01-2.53-.97-2.55-3.67zM10.9 3.17c.67-.81 1.12-1.93.99-3.05-.96.04-2.12.64-2.81 1.44-.62.71-1.16 1.85-1.01 2.94 1.07.08 2.16-.54 2.83-1.33z"/>
          </svg>
          Войти через Apple
        </button>
      </div>

      <p className="text-center text-xs text-[#667085]">
        Нет аккаунта?{" "}
        <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">
          Зарегистрируйтесь
        </button>
      </p>
    </div>
  );
}

// ─── Форма регистрации ────────────────────────────────────────────────────────

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName]                 = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-center">
        <h1 className="text-[22px] font-bold text-[#101828]">Создать аккаунт</h1>
        <p className="text-sm text-[#667085] mt-1 leading-relaxed">
          Зарегистрируйтесь, чтобы получить доступ<br />ко всем возможностям GetGrant.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#344054]">Имя</label>
          <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#EAECF0] rounded-lg px-3 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#344054]">Email</label>
          <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#EAECF0] rounded-lg px-3 py-2.5 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#344054]">Пароль</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Придумайте пароль" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#EAECF0] rounded-lg px-3 py-2.5 pr-10 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:border-blue-500 transition-colors" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#667085] transition-colors">
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
      </div>

      <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all">
        Зарегистрироваться
      </button>

      <p className="text-center text-xs text-[#667085]">
        Уже есть аккаунт?{" "}
        <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">Войти</button>
      </p>
    </div>
  );
}

// ─── Страница ─────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Кнопка «На главную» — фиксированная в углу страницы */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group text-sm font-medium"
      >
        <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
        На главную
      </Link>

      {/* Основной контент */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-[900px] bg-white rounded-[24px] shadow-lg overflow-hidden flex h-[580px]">

          {/* Левая панель — форма */}
          <div className="w-full md:w-[420px] flex-shrink-0 flex flex-col px-8 py-6 overflow-y-auto">

            {/* Табы */}
            <div className="flex border-b border-[#EAECF0] mb-5">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2.5 px-1 mr-6 text-sm font-medium transition-colors relative ${
                    tab === t ? "text-blue-600" : "text-[#667085] hover:text-[#344054]"
                  }`}
                >
                  {t === "login" ? "Вход" : "Регистрация"}
                  {tab === t && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Форма */}
            <div>
              {tab === "login"
                ? <LoginForm    onSwitch={() => setTab("register")} />
                : <RegisterForm onSwitch={() => setTab("login")} />
              }
            </div>
          </div>

          {/* Правая панель — фото (скрыта на мобилке) */}
          <div className="hidden md:block relative flex-1 overflow-hidden group">
            <Image
              src="/image/hero-students.jpg"
              alt="Студенты GetGrant"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute z-10 top-0 left-0 right-0 p-8">
              <h2 className="text-xl font-bold text-white leading-snug">
                Ваш путь к международному образованию
              </h2>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                Присоединяйтесь к тысячам студентов, которые уже строят своё будущее вместе с GetGrant.
              </p>
            </div>
            <div className="absolute z-10 bottom-0 left-0 right-0 p-8 flex flex-col gap-3">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 px-6 text-center">
        <p className="text-xs text-[#98A2B3] flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>© 2025 GetGrant. Все права защищены.</span>
          <a href="#" className="hover:text-[#667085] transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-[#667085] transition-colors">Условия использования</a>
        </p>
      </footer>
    </div>
  );
}
