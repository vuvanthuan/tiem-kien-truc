import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";

export async function generateMetadata(): Promise<Metadata> {
    const metaData = {
        title: "Giới Thiệu - Tiệm Kiến Trúc",
        description: "Tìm hiểu về Tiệm Kiến Trúc - đơn vị chuyên thiết kế kiến trúc và nội thất cao cấp. Chúng tôi cam kết mang đến không gian sống đẳng cấp và tối ưu cho bạn.",
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

export default async function IntroductionLayout({
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
