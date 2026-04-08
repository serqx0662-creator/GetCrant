"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, Globe, BookOpen, Clock, Users, LogIn } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Следим за скроллом для смены дизайна
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: "/University", label: "Университеты", icon: <GraduationCap size={18} /> },
        { href: "/Countries", label: "Страны", icon: <Globe size={18} /> },
        { href: "/Programs", label: "Программы", icon: <BookOpen size={18} /> },
        { href: "/Preparation", label: "Онлайн-подготовка", icon: <Clock size={18} /> },
        { href: "/About", label: "О нас", icon: <Users size={18} /> },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12 flex items-center justify-between ${
                isScrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b" : "bg-transparent py-6"
            }`}>

                {/* Логотип */}
                <Link href="/Home" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                        <GraduationCap size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-gray-900">
                        Get<span className="text-blue-600">Grant</span>
                    </span>
                </Link>

                {/* Навигация (Desktop) */}
                <nav className="hidden xl:flex items-center gap-1 bg-gray-100/50 border border-gray-200 rounded-2xl p-1.5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                                pathname.startsWith(link.href)
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Кнопки и Бургер */}
                <div className="flex items-center gap-3">
                    <Link href="/login" className="hidden sm:flex items-center gap-2 text-gray-600 font-bold hover:text-blue-600 px-4 py-2 transition-colors">
                        <LogIn size={20} />
                        Войти
                    </Link>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95">
                        Консультация
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="xl:hidden p-2.5 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Мобильное меню (Overlay) */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
                <div
                    className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out p-8 ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Меню</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all ${
                                    pathname.startsWith(link.href)
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <span className={pathname.startsWith(link.href) ? "text-blue-600" : "text-gray-400"}>
                                    {link.icon}
                                </span>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-10 left-8 right-8 space-y-4">
                        <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-700"
                        >
                            Войти в аккаунт
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}