import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-4xl font-bold text-[#101828]">Университеты</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
