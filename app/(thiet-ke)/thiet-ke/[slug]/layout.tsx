import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";
import { sanityFetch } from "@/sanity/lib/fetch";
import { designCategoryWithPostsQuery } from "@/sanity/lib/queries";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const category = await sanityFetch({
        query: designCategoryWithPostsQuery,
        params: resolvedParams,
    });

    if (!category) {
        return {
            title: "Không tìm thấy hạng mục - Tiệm Kiến Trúc",
            description: "Hạng mục thiết kế không tồn tại. Khám phá các dịch vụ thiết kế khác tại Tiệm Kiến Trúc.",
        };
    }

    return {
        title: `${category.title} - Tiệm Kiến Trúc`,
        description: `Các bài viết trong hạng mục thiết kế: ${category.title}. Tìm hiểu thêm về các giải pháp thiết kế sáng tạo tại Tiệm Kiến Trúc.`,
        keywords: ["thiết kế kiến trúc", "nội thất cao cấp", "Tiệm Kiến Trúc", category.title.toLowerCase()],
        openGraph: {
            title: `${category.title} - Tiệm Kiến Trúc`,
            description: `Các bài viết trong hạng mục thiết kế: ${category.title}. Tìm hiểu thêm về các giải pháp thiết kế sáng tạo tại Tiệm Kiến Trúc.`,
            url: `${META.URL}/thiet-ke/${category.slug}`,
            siteName: "Tiệm Kiến Trúc",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${category.title} - Tiệm Kiến Trúc`,
            description: `Các bài viết trong hạng mục thiết kế: ${category.title}. Tìm hiểu thêm về các giải pháp thiết kế sáng tạo tại Tiệm Kiến Trúc.`,
        },
    };
}

export default function DesignCategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}
