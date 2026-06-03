import { Suspense } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CatalogLayout from "./components/CatalogLayout";

export default function UniversitiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-20">
                <Suspense fallback={
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
                        <div className="h-8 w-64 rounded bg-slate-200 animate-pulse mb-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-72 rounded-xl bg-slate-200 animate-pulse" />
                            ))}
                        </div>
                    </div>
                }>
                    <CatalogLayout />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
