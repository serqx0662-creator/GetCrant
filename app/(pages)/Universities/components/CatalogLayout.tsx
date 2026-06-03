"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar, { type Filters } from "./FilterSidebar";
import UniversityGrid from "./UniversityGrid";
import MobileFilterToggle from "@/app/components/MobileFilterToggle";
import { usePaginatedList } from "@/app/hooks/usePaginatedList";
import { type University, type StrapiUniversity, normalizeUniversity } from "../data/university";

const STRAPI = "http://localhost:1337";

const DEFAULT_FILTERS: Filters = {
    search: "",
    countries: [],
    types: [],
    maxCost: 100000,
};

// Скелетон карточки
function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
            <div className="h-48 w-full bg-slate-200" />
            <div className="p-4 flex flex-col gap-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="bg-slate-100 rounded-lg p-4 grid grid-cols-2 gap-3 mt-2">
                    <div className="h-8 rounded bg-slate-200" />
                    <div className="h-8 rounded bg-slate-200" />
                    <div className="h-8 rounded bg-slate-200" />
                    <div className="h-8 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

export default function CatalogLayout() {
    const searchParams = useSearchParams();

    // Читаем ?country= из URL и сразу подставляем в начальный фильтр
    const countryFromUrl = searchParams.get("country") ?? "";

    const [allUniversities, setAllUniversities] = useState<University[]>([]);
    const [loading, setLoading]                 = useState(true);
    const [error, setError]                     = useState<string | null>(null);
    const [filters, setFilters]                 = useState<Filters>({
        ...DEFAULT_FILTERS,
        countries: countryFromUrl ? [countryFromUrl] : [],
    });
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Если URL-параметр меняется (например, пользователь нажал «назад»), синхронизируем фильтр
    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            countries: countryFromUrl ? [countryFromUrl] : [],
        }));
    }, [countryFromUrl]);

    useEffect(() => {
        fetch(`${STRAPI}/api/partner-universities?populate=*`)
            .then((res) => {
                if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
                return res.json();
            })
            .then((json: { data: StrapiUniversity[] }) => {
                setAllUniversities(json.data.map(normalizeUniversity));
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        return allUniversities.filter((u) => {
            if (filters.search && !u.name.toLowerCase().includes(filters.search.toLowerCase()))
                return false;
            if (filters.countries.length && !filters.countries.includes(u.country))
                return false;
            if (filters.types.length && !filters.types.includes(u.type))
                return false;
            return true;
        });
    }, [allUniversities, filters]);

    // Динамические списки для фильтра
    const availableCountries = useMemo(() =>
        [...new Set(allUniversities.map((u) => u.country).filter(Boolean))].sort(),
        [allUniversities]
    );
    const availableTypes = useMemo(() =>
        [...new Set(allUniversities.map((u) => u.type).filter(Boolean))].sort(),
        [allUniversities]
    );

    const { visible, hasMore, canCollapse, showMore, collapse, reset } = usePaginatedList(filtered);

    const handleReset = () => {
        setFilters(DEFAULT_FILTERS);
        reset();
    };

    const hasActiveFilters =
        filters.countries.length > 0 ||
        filters.types.length > 0 ||
        !!filters.search ||
        filters.maxCost < 100000;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Каталог университетов</h1>
                <p className="text-sm text-gray-400 mt-1">
                    {loading ? "Загрузка..." : `Найдено ${filtered.length} университетов`}
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
                    <FilterSidebar
                        filters={filters}
                        onChange={(f) => { setFilters(f); reset(); }}
                        onReset={handleReset}
                        availableCountries={availableCountries}
                        availableTypes={availableTypes}
                    />
                </div>

                {loading ? (
                    <div className="flex-1 w-full min-w-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                        </div>
                    </div>
                ) : (
                    <UniversityGrid
                        universities={visible}
                        total={filtered.length}
                        onShowMore={showMore}
                        onCollapse={collapse}
                        hasMore={hasMore}
                        canCollapse={canCollapse}
                        className="w-full min-w-0"
                    />
                )}
            </div>
        </div>
    );
}
