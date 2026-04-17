import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CatalogLayout from "./components/CatalogLayout";

export default function UniversitiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-20">
                <CatalogLayout />
            </main>
            <Footer />
        </div>
    );
}
