import Header from "@/app/components/Header";
import GetGrantHero from "@/app/(pages)/Home/GetGrantHero";
import GetGrantExamGrid from "./GetGrantExamGrid";
import Footer from "@/app/components/Footer";
 

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Твой главный экран с отступом, чтобы шапка его не закрывала */}
            <main className="pt-10">
                <GetGrantHero />
                <GetGrantExamGrid/>
            </main>

            <Footer/>
        </div>
    );
}