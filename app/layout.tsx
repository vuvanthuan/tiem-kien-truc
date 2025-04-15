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
    const metaData = {
        title: "Tiệm Kiến Trúc - Thiết kế Kiến trúc & Nội thất Cao cấp",
        description: "Tiệm Kiến Trúc chuyên thiết kế kiến trúc, nội thất sang trọng với phong cách hiện đại. Chúng tôi mang đến giải pháp thiết kế tối ưu cho không gian sống của bạn.",
        siteName: "Tiệm Kiến Trúc",
    };

    return {
        metadataBase: new URL(META.URL),
        title: {
            default: metaData.siteName,
            template: `%s | ${metaData.siteName}`,
        },
        description: metaData.description,
        openGraph: {
            title: metaData.title,
            description: metaData.description,
            url: META.URL,
            siteName: metaData.siteName,
            images: [
                {
                    url: META.og.ogImage,
                    width: META.og.width,
                    height: META.og.height,
                },
            ],
            type: META.og.type || "website",
        },
        icons: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                url: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                url: '/favicon-16x16.png',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                url: '/apple-touch-ico.png',
            },
        ],
        robots: {
            index: true,
            follow: true,
            noarchive: true,
            nosnippet: true,
            noimageindex: true,
            nocache: true,
        },
        alternates: {
            canonical: `${META.URL}`,
        },
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
