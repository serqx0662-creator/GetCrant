"use client";

import { useState, useEffect, useMemo } from "react";
import ProgramFilterSidebar, { type ProgramFilters } from "./ProgramFilterSidebar";
import ProgramsGrid from "./ProgramsGrid";
import MobileFilterToggle from "@/app/components/MobileFilterToggle";
import { usePaginatedList } from "@/app/hooks/usePaginatedList";
import { type Program, type StrapiProgram, normalizeProgram } from "../data/program";

const STRAPI = "http://localhost:1337";

const DEFAULT_FILTERS: ProgramFilters = {
    search: "",
    directions: [],
    levels: [],
};

// Скелетон карточки
function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-pulse">
            <div className="h-48 w-full bg-slate-200" />
            <div className="p-4 flex flex-col gap-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-16 rounded-lg bg-slate-100" />
                <div className="flex gap-2 mt-auto">
                    <div className="h-6 w-24 rounded-full bg-slate-200" />
                    <div className="h-6 w-20 rounded-full bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

export default function ProgramsCatalogLayout() {
    const [allPrograms, setAllPrograms] = useState<Program[]>([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState<string | null>(null);
    const [filters, setFilters]         = useState<ProgramFilters>(DEFAULT_FILTERS);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    useEffect(() => {
        fetch(`${STRAPI}/api/programs?populate=*`)
            .then((res) => {
                if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
                return res.json();
            })
            .then((json: { data: StrapiProgram[] }) => {
                setAllPrograms(json.data.map(normalizeProgram));
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        return allPrograms.filter((p) => {
            if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase()))
                return false;
            if (filters.directions.length && !filters.directions.includes(p.direction))
                return false;
            return !(filters.levels.length && !filters.levels.includes(p.level));
        });
    }, [allPrograms, filters]);

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
                <p className="text-sm text-gray-400 mt-1">
                    {loading ? "Загрузка..." : `Найдено ${filtered.length} программ обучения`}
                </p>
                {error && <p className="text-sm text-red-500 mt-1">Ошибка: {error}</p>}
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

                {loading ? (
                    <div className="flex-1 w-full min-w-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                        </div>
                    </div>
                ) : (
                    <ProgramsGrid
                        programs={visible}
                        total={filtered.length}
                        onShowMore={showMore}
                        onCollapse={collapse}
                        hasMore={hasMore}
                        canCollapse={canCollapse}
                    />
                )}
            </div>
        </div>
    );
}
