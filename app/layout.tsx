import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from 'next/font/google';
import { ViewTransitions } from "next-view-transitions";

import { cn } from "@/lib/utils/tw-merge";
import { META } from "@/lib/constants/app";
import { ThemeProvider } from "@/lib/providers/theme";
import { Toaster } from "@/lib/providers/toaster"

import RootLayoutTemplate from "@/components/templates/root-layout";

const nextFont = Quicksand({ subsets: ["latin"], weight: ['300', '400', '500', '700'], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL(META.URL),
        title: {
            default: "Thiết Kế Kiến Trúc & Nội Thất Cao Cấp | Tiệm Kiến Trúc",
            template: "%s | Tiệm Kiến Trúc",
        },
        description: "Dịch vụ thiết kế kiến trúc và nội thất cao cấp, hiện đại. Tiệm Kiến Trúc mang đến giải pháp tối ưu không gian sống, biệt thự, nhà phố, căn hộ với phong cách sang trọng.",
        keywords: META.keywords.join(", "),
        openGraph: {
            title: "Thiết Kế Kiến Trúc & Nội Thất Cao Cấp | Tiệm Kiến Trúc",
            description: "Dịch vụ thiết kế kiến trúc và nội thất cao cấp, hiện đại. Tiệm Kiến Trúc mang đến giải pháp tối ưu không gian sống, biệt thự, nhà phố, căn hộ với phong cách sang trọng.",
            url: META.URL,
            siteName: "Tiệm Kiến Trúc",
            images: [
                {
                    url: META.og.ogImage,
                    width: META.og.width,
                    height: META.og.height,
                    alt: "Thiết kế kiến trúc & nội thất cao cấp",
                },
            ],
            locale: META.og.locale,
            type: (META.og.type ?? 'website') as 'website',
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
        icons: {
            icon: [
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            ],
            apple: [
                { url: "/apple-touch-icon.png", sizes: "180x180" },
            ],
        },
        alternates: {
            canonical: META.URL,
        },
        authors: [
            { name: "Tiệm Kiến Trúc" },
        ],
        category: "Thiết kế kiến trúc nội thất",
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ViewTransitions>
            <html lang="vi" suppressHydrationWarning>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="apple-touch-icon" href="/logo-circle.png" sizes="180x180" />
                <link rel="icon" type="image/png" sizes="any" href="/logo-circle.png" />
                <body className={cn("min-h-screen bg-background", nextFont.className)}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <RootLayoutTemplate>
                            {children}
                        </RootLayoutTemplate>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
