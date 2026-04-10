import Header from "@/app/components/Header";
import GetGrantHero from "@/app/(pages)/Home/GetGrantHero";
import BentoGrid from "@/app/(pages)/Home/BentoGrid";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Твой главный экран с отступом, чтобы шапка его не закрывала */}
            <main className="pt-10">
                <GetGrantHero />
                <BentoGrid/>
            </main>

            {/* Сюда потом просто докинешь другие секции */}
        </div>
    );
}