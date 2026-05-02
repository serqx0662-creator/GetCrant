"use client";

import { useState, useMemo } from "react";
import FilterSidebar, { type Filters } from "./FilterSidebar";
import UniversityGrid from "./UniversityGrid";
import { mockUniversities } from "../data/mockUniversities";
import MobileFilterToggle from "@/app/components/MobileFilterToggle";
import { usePaginatedList } from "@/app/hooks/usePaginatedList";

const DEFAULT_FILTERS: Filters = {
    search: "",
    countries: [],
    types: [],
    maxCost: 100000,
};

export default function CatalogLayout() {
    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const filtered = useMemo(() => {
        return mockUniversities.filter((u) => {
            if (filters.search && !u.name.toLowerCase().includes(filters.search.toLowerCase()))
                return false;
            if (filters.countries.length && !filters.countries.includes(u.location.country))
                return false;
            if (filters.types.length && !filters.types.includes(u.type))
                return false;
            return u.cost <= filters.maxCost;
        });
    }, [filters]);

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
                <p className="text-sm text-gray-400 mt-1">Найдено {filtered.length} университетов</p>
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
                    />
                </div>
                <UniversityGrid
                    universities={visible}
                    total={filtered.length}
                    onShowMore={showMore}
                    onCollapse={collapse}
                    hasMore={hasMore}
                    canCollapse={canCollapse}
                    className="w-full min-w-0"
                />
            </div>
        </div>
    );
}
