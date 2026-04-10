"use client";

import Image from "next/image";
import { Star, Target, Zap, Clock3, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function GetGrantHero() {
    const stats = [
        { value: "500+", label: "Поступивших студентов" },
        { value: "50+", label: "Университетов-партнёров" },
        { value: "15+", label: "Стран для обучения" },
    ];

    return (
        <section className="relative w-full min-h-screen py-10 md:py-14 bg-white text-gray-900 overflow-hidden flex items-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,#eef2ff_0%,#fff_100%)]"></div>

            <div className="max-w-[1440px] m-auto px-6 lg:px-12 pt-12 md:pt-18">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-19 items-center">

                    <div className="flex flex-col space-y-3">
                        <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-[#D1E9FF] text-blue-700 border border-blue-100/50 shadow-sm">
                            <Star size={14} className="text-blue-600 fill-blue-600" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                                Лицензированный образовательный центр
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-[42px] sm:text-[52px] md:text-[72px] uppercase font-semibold leading-[1.1] md:leading-[1.2] text-gray-950">
                                поступи в <br />
                                <span className="text-blue-600">
                                    зарубежный <br />
                                    <span className="inline-block">университет</span>
                                </span>
                            </h1>
                            <p className="max-w-md text-lg text-gray-600 font-medium leading-relaxed">
                                Профессиональная подготовка и полное сопровождение для учеников 9–11 классов.
                                От выбора университета до успешного поступления.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600 px-10 py-7 rounded-xl font-bold text-lg transition-all active:scale-95">
                                Начать подготовку
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>

                        <div className="mt-6 py-8 px-6 md:py-6 md:px-10 bg-[#F8F9FB] rounded-[24px] grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col space-y-1">
                                <span className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#101828]">
                                    {stat.value}
                                </span>
                                    <span className="text-sm font-medium text-[#667085] leading-tight whitespace-nowrap sm:whitespace-normal">
                                    {stat.label}
                                </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group w-full">
                        <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] lg:aspect-[4/4] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl shadow-blue-900/10">
                            <Image
                                src="/image/hero-students.jpeg"
                                alt="Students in University"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-5 rounded-[24px] md:rounded-[32px] bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl flex items-center gap-3 md:gap-4 transition-transform duration-500">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
                                    <Clock3 size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm md:text-base font-black text-gray-950 leading-none truncate">
                                        Индивидуальный менеджер
                                    </span>
                                    <span className="text-[11px] md:text-[13px] font-bold text-gray-500 mt-1">
                                        Сопровождение 24/7
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-5 -right-5 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-indigo-50 rounded-full blur-3xl -z-10"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}