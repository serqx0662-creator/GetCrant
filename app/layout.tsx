import type { Metadata } from "next";
import "@/app/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
        <html lang="ru" className={cn("font-sans", geist.variable)}>
        <body className="antialiased bg-white">
            {children}
        </body>
        </html>
    );
}