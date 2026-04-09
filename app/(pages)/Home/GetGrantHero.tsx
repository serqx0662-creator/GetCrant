"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MessageSquare, Target, Zap, Clock3 } from "lucide-react";

export default function GetGrantHero() {
    const stats = [
        { value: "500+", label: "Поступивших студентов", icon: <Zap size={20} className="text-blue-600" /> },
        { value: "50+", label: "Университетов-партнёров", icon: <Target size={20} className="text-blue-600" /> },
        { value: "15+", label: "Стран для обучения", icon: <Star size={20} className="text-blue-600" /> },
    ];

    return (
        <section className="relative w-full min-h-[90vh] bg-white text-gray-900 overflow-hidden isolate">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#eef2ff_100%)]"></div>

            <div className="container mx-auto px-6 lg:px-12 pt-28 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            {/* Бейдж */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100/50 shadow-inner shadow-blue-100 animate-fade-in [animation-delay:100ms]">
                                <Star size={16} className="text-blue-500 fill-blue-500" />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    Лицензированный образовательный центр
                                </span>
                            </div>

                            {/* Заголовок */}
                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gray-950 text-wrap-balance animate-fade-in [animation-delay:200ms]">
                                Поступи в <br />
                                <span className="text-blue-600 bg-clip-text">зарубежный</span> <br />
                                университет
                            </h1>

                            {/* Описание */}
                            <p className="max-w-xl text-lg md:text-xl text-gray-600 font-medium leading-relaxed opacity-0 animate-fade-in [animation-delay:300ms]">
                                Профессиональная подготовка и полное сопровождение для учеников 9–11 классов.
                                От выбора университета до успешного поступления.
                            </p>
                        </div>

                        {/* Кнопки */}
                        <div className="flex flex-col sm:flex-row gap-5 opacity-0 animate-fade-in [animation-delay:400ms]">
                            <button className="flex items-center gap-2 justify-center bg-blue-600 text-white px-10 py-4.5 rounded-2xl font-black text-lg shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition active:scale-95 group">
                                <MessageSquare size={22} className="group-hover:rotate-12 transition" />
                                Получить консультацию
                            </button>
                            <button className="flex items-center gap-2 justify-center border-2 border-gray-100 bg-white text-gray-900 px-10 py-4.5 rounded-2xl font-black text-lg hover:border-blue-100 hover:bg-blue-50 transition active:scale-95 group">
                                <Zap size={22} className="text-blue-600" />
                                Начать подготовку
                            </button>
                        </div>

                        {/* Статистика */}
                        <div className="border-t border-gray-100 pt-10 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12 opacity-0 animate-fade-in [animation-delay:500ms]">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="space-y-2 group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                                            {stat.icon}
                                        </div>
                                        <span className="text-5xl font-black tracking-tighter text-gray-950 group-hover:text-blue-600 transition">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- ПРАВАЯ КОЛОНКА --- */}
                    <div className="relative flex items-center justify-center opacity-0 animate-fade-in [animation-delay:300ms]">
                        {/* Сама карточка */}
                        <div className="relative w-[85%] aspect-[5/6] bg-gradient-to-br from-white to-blue-50 border border-blue-100/50 rounded-[40px] p-8 shadow-2xl shadow-blue-500/5 group hover:rotate-2 hover:scale-105 transition-all duration-700 ease-out isolate overflow-hidden">
                            {/* Мягкий градиент внутри */}
                            <div className="absolute inset-0 -z-10 [background:radial-gradient(100%_100%_at_50%_10%,#fff_10%,#eef2ff_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Логотип по центру (заглушка под иконку) */}
                            <div className="absolute inset-0 flex items-center justify-center -translate-y-12">
                                <div className="p-6 rounded-full bg-blue-600/10 text-blue-600/30">
                                    <Zap size={100} strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* "Стеклянная" панель менеджера */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl shadow-black/5 flex items-center gap-5 transition group-hover:bg-blue-600/5 group-hover:border-blue-100 group-hover:scale-105">
                                <div className="p-3.5 bg-blue-600 rounded-full text-white shadow-md shadow-blue-600/20 group-hover:rotate-[360deg] transition-transform duration-700">
                                    <Zap size={22} className="fill-white" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1 space-y-1">
                                    <span className="text-lg font-black tracking-tight text-gray-950 truncate group-hover:text-blue-600 transition">
                                        Индивидуальный менеджер
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold truncate group-hover:text-blue-700 transition">
                                        <Clock3 size={16} className="text-blue-500" />
                                        Персональное сопровождение 24/7
                                    </div>
                                </div>
                                <span className="ml-auto text-blue-600 font-bold uppercase tracking-tight opacity-0 group-hover:opacity-100 transition group-hover:translate-x-1">→</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}