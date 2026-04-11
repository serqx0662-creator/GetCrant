import Header from "@/app/components/Header";
import GetGrantHero from "@/app/(pages)/Home/GetGrantHero";
import HomeContent from "@/app/(pages)/Home/HomeContent";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-10">
                <GetGrantHero />
                <HomeContent />
            </main>
        </div>
    );
}
