import { Clock, BookOpen, Crown } from "lucide-react";
import type { Program } from "../data/program";

interface ProgramCardProps {
    program: Program;
}

// Сколько тегов показываем до счётчика
const VISIBLE_TAGS = 2;

export default function ProgramCard({ program }: ProgramCardProps) {
    const { title, imageUrl, duration, universitiesCount, salary, tags } = program;

    const visibleTags  = tags.slice(0, VISIBLE_TAGS);
    const hiddenCount  = tags.length - VISIBLE_TAGS;

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            {/* Image */}
            <div className="relative h-48 w-full bg-slate-200">
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200" />
                )}
                <div className="absolute top-3 left-3 bg-blue-600 text-white p-1.5 rounded-md">
                    <Crown size={14} />
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base leading-tight">
                    {title}
                </h3>

                {/* Stats row */}
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock size={13} className="text-gray-400" />
                        {duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <BookOpen size={13} className="text-gray-400" />
                        {universitiesCount} ВУЗов
                    </span>
                </div>

                {/* Salary block */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[11px] text-gray-400 mb-1">Средняя зарплата</p>
                    <p className="text-base font-bold text-gray-800">{salary}</p>
                </div>

                {/* Tags (карьерные пути) */}
                <div className="mt-auto">
                    <p className="text-[11px] text-gray-400 mb-2">Карьерные пути:</p>
                    <div className="flex flex-wrap gap-2">
                        {visibleTags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-gray-200 rounded-full px-3 py-1 text-xs text-blue-600 bg-white whitespace-nowrap"
                            >
                                {tag}
                            </span>
                        ))}
                        {hiddenCount > 0 && (
                            <span className="border border-gray-200 rounded-full px-3 py-1 text-xs text-blue-600 bg-white">
                                +{hiddenCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
