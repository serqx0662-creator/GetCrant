import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function SectionHeader({ title, subtitle, onPrev, onNext }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-segoe">{title}</h2>
        <p className="text-sm text-gray-500 mt-1 font-sans">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Назад"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Вперёд"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
