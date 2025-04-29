import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";

export async function generateMetadata(): Promise<Metadata> {
    const metaData = {
        title: "Báo Giá Thiết Kế Kiến Trúc & Nội Thất Chi Tiết | Tiệm Kiến Trúc",
        description: "Xem bảng báo giá thiết kế kiến trúc, nội thất chi tiết và ưu đãi tại Tiệm Kiến Trúc. Cập nhật chi phí thiết kế nhà phố, biệt thự, căn hộ với cam kết chất lượng cao.",
        siteName: "Tiệm Kiến Trúc",
        keywords: [
            "báo giá thiết kế kiến trúc",
            "báo giá thiết kế nội thất",
            "chi phí thiết kế nhà phố",
            "chi phí thiết kế biệt thự",
            "chi phí thiết kế căn hộ",
            "dịch vụ thiết kế kiến trúc giá tốt",
            "báo giá thi công nội thất",
            ...META.keywords,
        ],
    };

    return {
        metadataBase: new URL(META.URL),
        title: {
            default: metaData.title,
            template: `%s | ${metaData.siteName}`,
        },
        description: metaData.description,
        keywords: metaData.keywords.join(", "),
        openGraph: {
            title: metaData.title,
            description: metaData.description,
            url: `${META.URL}/bao-gia`,
            siteName: metaData.siteName,
            images: [
                {
                    url: META.og.ogImage,
                    width: META.og.width,
                    height: META.og.height,
                    alt: "Báo giá thiết kế kiến trúc nội thất",
                },
            ],
            type: META.og.type ?? "website",
            locale: META.og.locale,
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
                url: '/apple-touch-icon.png',
            },
        ],
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
        alternates: {
            canonical: `${META.URL}/bao-gia`,
        },
        authors: [
            { name: metaData.siteName },
        ],
        category: "Báo giá thiết kế nội thất và kiến trúc",
    };
}

export default async function QuotationLayout({
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
