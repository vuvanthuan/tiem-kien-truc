import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL(META.URL),
        title: {
            default: "Trang chủ | Tiệm Kiến Trúc",
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
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
