import { SlidersHorizontal } from "lucide-react";

interface MobileFilterToggleProps {
  isOpen: boolean;
  hasActive: boolean;
  onToggle: () => void;
}

export default function MobileFilterToggle({ isOpen, hasActive, onToggle }: MobileFilterToggleProps) {
  return (
    <div className="xl:hidden mb-4">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <SlidersHorizontal size={16} />
        {isOpen ? "Скрыть фильтры" : "Показать фильтры"}
        {hasActive && (
          <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        )}
      </button>
    </div>
  );
}
