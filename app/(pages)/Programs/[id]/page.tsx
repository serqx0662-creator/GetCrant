import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Clock, TrendingUp, BookOpen, Check, GraduationCap, Award } from "lucide-react";
import ProgramCta from "./components/ProgramCta";

const STRAPI = "http://localhost:1337";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getProgram(id: string): Promise<Record<string, any> | null> {
  try {
    const res = await fetch(`${STRAPI}/api/programs/${id}?populate=*`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProgram(id);

  // Нормализуем — поля могут быть напрямую (v5) или в attributes (v4)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: Record<string, any> = data?.attributes ?? data ?? {};

  const title    = p.title    ?? "Программа";
  const duration = p.duration ?? "—";
  const salary   = p.salary   ?? "—";
  const description = p.description ?? "";
  const tags: string = p.tags ?? "";
  const tagList  = tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

  const rawCoverUrl =
    p.cover?.url ?? p.cover?.data?.attributes?.url ??
    p.image?.url ?? p.image?.data?.attributes?.url ?? "";
  const coverUrl = rawCoverUrl
    ? rawCoverUrl.startsWith("http") ? rawCoverUrl : `${STRAPI}${rawCoverUrl}`
    : "";

  // Навыки (если есть поле skills в Strapi, иначе заглушка)
  const skillsData = p.skills ?? "";
  const skills = skillsData 
    ? skillsData.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [
        "Проектирование и разработка программного обеспечения",
        "Работа с базами данных и облачными технологиями",
        "Алгоритмы и структуры данных",
        "Разработка веб и мобильных приложений",
        "Машинное обучение и искусственный интеллект",
      ];

  // Университеты (если есть связь, иначе заглушка)
  const universitiesCount = p.universitiesCount ?? "50+";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        
        {/* Герой-секция с обложкой и градиентом */}
        <div className="relative w-full h-[400px] md:h-[500px] bg-slate-900 overflow-hidden">
          {coverUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={coverUrl} 
                alt={title} 
                className="w-full h-full object-cover opacity-60"
              />
              {/* Градиентный оверлей */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
          )}
          
          {/* Контент поверх изображения */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 lg:px-16 pb-12 md:pb-16">
              <div className="max-w-4xl">
                {/* Теги карьерных путей */}
                {tagList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tagList.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Название программы */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {title}
                </h1>
                
                {description && (
                  <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-6 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Статистика — крупнее и с акцентами */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={24} className="text-white" />
                </div>
                <p className="text-sm text-[#667085] mb-1">Длительность</p>
                <p className="text-2xl font-bold text-[#101828]">{duration}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <p className="text-sm text-[#667085] mb-1">Средняя зарплата</p>
                <p className="text-2xl font-bold text-[#101828]">{salary}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <p className="text-sm text-[#667085] mb-1">Университетов</p>
                <p className="text-2xl font-bold text-[#101828]">{universitiesCount}</p>
              </div>
            </div>

            {/* Секция "Чему вы научитесь" */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#101828]">
                  Чему вы научитесь
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill: string, index: number) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <p className="text-sm text-[#344054] leading-relaxed">{skill}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Секция "О программе" (если есть расширенное описание) */}
            {description && (
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-[#101828] mb-6">
                  О программе
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-base text-[#344054] leading-relaxed">
                    {description}
                  </p>
                </div>
              </section>
            )}

            {/* Секция "Университеты" — заглушка */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#101828]">
                  Университеты, предлагающие программу
                </h2>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 text-center">
                <GraduationCap size={48} className="text-slate-400 mx-auto mb-4" />
                <p className="text-base text-[#667085] mb-2">
                  Программу предлагают <span className="font-bold text-[#101828]">{universitiesCount}</span> университетов
                </p>
                <p className="text-sm text-[#98A2B3]">
                  Список университетов будет доступен после подключения данных
                </p>
              </div>
            </section>

            {/* CTA блок */}
            <ProgramCta />

          </div>
        </div>

        {!data && (
          <div className="container mx-auto px-6 lg:px-16 py-16 text-center">
            <p className="text-lg text-red-500">Программа не найдена (ID: {id})</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
