import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "GetGrant",
    description: "Образование за рубежом и поиск грантов",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <body className="antialiased bg-white">
            {children}
        </body>
        </html>
    );
}