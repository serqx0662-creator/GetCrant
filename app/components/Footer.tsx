import Link from "next/link";

import {
    Phone,
    Mail,
    MapPin,

} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "Образование",
            links: [
                { label: "Университеты", href: "/University" },
                { label: "Страны", href: "/Countries" },
                { label: "Программы", href: "/Programs" },
                { label: "Онлайн-подготовка", href: "/Preparation" },
            ],
        },
        {
            title: "Компания",
            links: [
                { label: "О нас", href: "/About" },
                { label: "Наша команда", href: "/Team" },
                { label: "Партнёры", href: "/Partners" },
            ],
        },
        {
            title: "Поддержка",
            links: [
                { label: "FAQ", href: "/faq" },
                { label: "Контакты", href: "/Contacts" },
                { label: "Блог", href: "/Blog" },
                { label: "Документы", href: "/Docs" },
            ],
        },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: "https://www.facebook.com/getgrant.kg/",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            )
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/getgrant.kg?igsh=ZnBrbnl0aGg1M2lk",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            )
        },
        {
            name: "Linkedin",
            href: "https://linkedin.com/company/getgrant",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            )
        },
        {
            name: "Youtube",
            href: "https://youtube.com/@getgrant",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z"/><path d="m10 15 5-3-5-3z"/></svg>
            )
        },
    ];

    return (
        <footer className="bg-[#0B1221] text-gray-400 py-10 lg:pt-14 pb-14">
            <div className="max-w-[1440px] m-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-10">

                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-blue-600 py-2 px-4 rounded-lg">
                                <span className="text-white font-bold text-2xl ">G</span>
                            </div>
                            <span className="text-white text-2xl font-bold tracking-tight ">GetGrant</span>
                        </Link>

                        <p className="max-w-xs text-[15px] leading-relaxed">
                            Онлайн-сервис для подготовки и сопровождения поступления студентов 9–11 классов за рубеж.
                        </p>

                        <div className="space-y-4 pt-4">
                            <a href="tel:+996554123456" className="flex items-center gap-3 hover:text-white transition-colors">
                                <Phone size={18} className="text-gray-500" />
                                <span className="text-sm font-medium">+996 554 123 456</span>
                            </a>
                            <a href="mailto:info@getgrant.kg" className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail size={18} className="text-gray-500" />
                                <span className="text-sm font-medium">info@getgrant.kg</span>
                            </a>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-gray-500" />
                                <span className="text-sm font-medium leading-tight">
                                    Бишкек, ул. Касыма Тыныстанова, 197/1
                                </span>
                            </div>
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <h4 className="text-white font-black uppercase text-sm tracking-widest">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="hover:text-blue-500 transition-colors text-[15px]">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800/50 py-7 flex flex-wrap gap-4">
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.href}
                            className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-blue-600 text-white transition-all duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <div className="border-t border-gray-800/50 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <p className="text-sm">
                        © {currentYear} GetGrant. Все права защищены.
                    </p>

                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                        <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Условия использования</Link>
                        <Link href="/license" className="hover:text-white transition-colors">Лицензии</Link>
                    </div>
                </div>

                <div className="mt-8 text-[11px] text-gray-600 leading-relaxed max-w-4xl italic">
                    Лицензия на образовательную деятельность № 240000733 от 01.01.2020 | Свидетельство об аккредитации № 654321 от 15.03.2021
                </div>
            </div>
        </footer>
    );
}