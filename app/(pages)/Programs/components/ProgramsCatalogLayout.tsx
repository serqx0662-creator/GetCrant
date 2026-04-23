"use client";

import { useState, useMemo } from "react";
import ProgramFilterSidebar, {
    type ProgramFilters,
} from "./ProgramFilterSidebar";
import ProgramsGrid from "./ProgramsGrid";
import { mockPrograms } from "../data/ mockPrograms";
import MobileFilterToggle from "@/app/components/MobileFilterToggle";
import { usePaginatedList } from "@/app/hooks/usePaginatedList";

const DEFAULT_FILTERS: ProgramFilters = {
    search: "",
    directions: [],
    levels: [],
};

export default function ProgramsCatalogLayout() {
    const [filters, setFilters] = useState<ProgramFilters>(DEFAULT_FILTERS);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const filtered = useMemo(() => {
        return mockPrograms.filter((p) => {
            if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase()))
                return false;
            if (filters.directions.length && !filters.directions.includes(p.direction))
                return false;
            return !(filters.levels.length && !filters.levels.includes(p.level));
        });
    }, [filters]);

    const { visible, hasMore, canCollapse, showMore, collapse, reset } = usePaginatedList(filtered);

    const handleReset = () => {
        setFilters(DEFAULT_FILTERS);
        reset();
    };

    const hasActiveFilters =
        filters.directions.length > 0 ||
        filters.levels.length > 0 ||
        !!filters.search;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Каталог программ</h1>
                <p className="text-sm text-gray-400 mt-1">Найдено {filtered.length} программ обучения</p>
            </div>

            <MobileFilterToggle
                isOpen={mobileFilterOpen}
                hasActive={hasActiveFilters}
                onToggle={() => setMobileFilterOpen((v) => !v)}
            />

            <div className="flex flex-col xl:flex-row gap-6 items-start">
                <div className={`w-full xl:w-80 shrink-0 xl:sticky xl:top-24 ${mobileFilterOpen ? "block" : "hidden xl:block"}`}>
                    <ProgramFilterSidebar
                        filters={filters}
                        onChange={(f) => { setFilters(f); reset(); }}
                        onReset={handleReset}
                    />
                </div>
                <ProgramsGrid
                    programs={visible}
                    total={filtered.length}
                    onShowMore={showMore}
                    onCollapse={collapse}
                    hasMore={hasMore}
                    canCollapse={canCollapse}
                />
            </div>
        </div>
    );
}
