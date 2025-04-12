import React from "react";
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";
import { sanityFetch } from "@/sanity/lib/fetch";
import { introductionQuery } from "@/sanity/lib/queries";

const introductionSlugs = [
    { label: "Giới thiệu chung", value: "gioi-thieu-chung" },
    { label: "Đội ngũ nhân sự", value: "gioi-thieu-doi-ngu-nhan-su" },
    { label: "Quy trình làm việc", value: "gioi-thieu-quy-trinh-lam-viec" },
    { label: "Hồ sơ năng lực", value: "gioi-thieu-ho-so-nang-luc" },
];

interface LayoutProps {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const introduction = await sanityFetch({
        query: introductionQuery,
        params: { slug },
        stega: false,
    }).catch((error) => {
        console.error("Sanity fetch error:", error);
        return null;
    });

    const matchedItem = introductionSlugs.find((item) => item.value === slug);
    const pageTitle = matchedItem ? matchedItem.label : "Giới thiệu";

    if (!introduction) {
        return {
            title: `${pageTitle} - Tiệm Kiến Trúc`,
            description:
                "Tiệm Kiến Trúc chuyên thiết kế kiến trúc và nội thất cao cấp. Khám phá thêm về chúng tôi qua các thông tin giới thiệu chi tiết.",
            openGraph: {
                title: `${pageTitle} - Tiệm Kiến Trúc`,
                description:
                    "Tiệm Kiến Trúc chuyên thiết kế kiến trúc và nội thất cao cấp. Khám phá thêm về chúng tôi qua các thông tin giới thiệu chi tiết.",
                url: `${META.URL}/${slug}`,
                siteName: "Tiệm Kiến Trúc",
                type: "website",
            },
        } satisfies Metadata;
    }

    return {
        title: `${introduction.title || pageTitle} - Tiệm Kiến Trúc`,
        description:
            introduction.description ||
            "Tiệm Kiến Trúc mang đến giải pháp thiết kế kiến trúc và nội thất cao cấp, tối ưu cho không gian sống của bạn.",
        keywords: ["thiết kế kiến trúc", "nội thất cao cấp", "Tiệm Kiến Trúc", pageTitle.toLowerCase()],
        openGraph: {
            title: `${introduction.title || pageTitle} - Tiệm Kiến Trúc`,
            description:
                introduction.description ||
                "Tiệm Kiến Trúc mang đến giải pháp thiết kế kiến trúc và nội thất cao cấp, tối ưu cho không gian sống của bạn.",
            url: `${META.URL}/${slug}`,
            siteName: "Tiệm Kiến Trúc",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${introduction.title || pageTitle} - Tiệm Kiến Trúc`,
            description:
                introduction.description ||
                "Tiệm Kiến Trúc mang đến giải pháp thiết kế kiến trúc và nội thất cao cấp, tối ưu cho không gian sống của bạn.",
        },
    } satisfies Metadata;
}

export default async function IntroductionContentLayout({ params, children }: LayoutProps) {
    return <React.Fragment>{children}</React.Fragment>;
}
