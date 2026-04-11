"use client";
import Image from "next/image";

// Локальный компонент для маленьких карточек (SAT, GRE и т.д.)
const ExamTile = ({
    title,
    desc,
    bgColor,
    href = "#",
}: {
    title: string;
    desc: string;
    bgColor: string;
    href?: string;
}) => (
    <div
        className={`${bgColor} rounded-[32px] text-[#101828] p-7 flex flex-col justify-between min-h-[200px] transition-transform hover:scale-[1.02] duration-300`}
    >
        <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {title}
            </h3>
            <p className="text-sm text-[#101828] mt-3 leading-relaxed">
                {desc}
            </p>
        </div>
        <a
            href={href}
            className="inline-flex items-center text-sm font-bold text-gray-900 mt-4 group"
        >
            Подобрать курс
            <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
            </span>
        </a>
    </div>
);

export default function GetGrantExamGrid() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* БОЛЬШАЯ КАРТОЧКА: TOEFL / IELTS */}
                <div className="lg:col-span-2 relative overflow-hidden rounded-[32px] bg-[linear-gradient(98deg,#3068E3_0%,#B0CAFC_100%)] text-white p-8 md:p-10 flex flex-col justify-between min-h-[400px]">
                    {/* Контентная часть */}
                    <div className="relative z-10 max-w-[260px]">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            TOEFL / IELTS
                        </h2>
                        <p className="text-lg opacity-90 leading-snug">
                            Подготовка к международным экзаменам в языковых
                            клубах.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <button className="bg-white text-blue-600 px-7 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md cursor-pointer">
                            Получи план за 5 минут <span>→</span>
                        </button>
                        <p className="text-[12px] mt-4 opacity-70">
                            Диагностика + план подготовки бесплатно
                        </p>
                    </div>

                    {/* Изображение девушки */}
                    <div className="absolute right-0 bottom-0 h-full w-[60%] pointer-events-none">
                        <Image
                            src="/vecteezy_young-woman-in-graduation-attire-with-backpack-and-book-back_65435262 1 (1).webp" // Путь к картинке
                            alt="Student"
                            fill
                            priority
                            className="object-contain object-right-bottom"
                        />
                    </div>
                </div>

                {/* СЕТКА МАЛЕНЬКИХ КАРТОЧЕК */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <ExamTile
                        title="SAT / ACT"
                        desc="Математика и English для поступления в США."
                        bgColor="bg-[linear-gradient(105deg,#F5F8FE_0%,#E9EFFD_100%)]"
                    />
                    <ExamTile
                        title="Personal Statement"
                        desc="Эссе, мотивационные письма и структура заявки."
                        bgColor="bg-[linear-gradient(105deg,#FEF9E8_0%,#FDE1A7_100%)]"
                    />
                    <ExamTile
                        title="GRE"
                        desc="Подготовка к экзамену для поступления в аспирантуру."
                        bgColor="bg-[linear-gradient(105deg,#FEFBFC_0%,#D0EFE9_100%)]"
                    />
                    <ExamTile
                        title="GMAT"
                        desc="Подготовка к тесту для бизнес-школ."
                        bgColor="bg-[linear-gradient(105deg,#ECD9FC_0%,#ECE6FC_100%)]"
                    />
                </div>
            </div>
        </section>
    );
}
