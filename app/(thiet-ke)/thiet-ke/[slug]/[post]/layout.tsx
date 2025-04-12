import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";
import { sanityFetch } from "@/sanity/lib/fetch";
import { designPostBySlugQuery } from "@/sanity/lib/queries";

type Props = {
    params: Promise<{ slug: string; post: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;

    const post = await sanityFetch({
        query: designPostBySlugQuery,
        params: { slug: resolvedParams.post },
    });

    if (!post) {
        return {
            title: "Không tìm thấy bài viết - Tiệm Kiến Trúc",
            description: "Bài viết không tồn tại. Khám phá các bài viết thiết kế khác tại Tiệm Kiến Trúc.",
        };
    }

    return {
        title: `${post.title} - Tiệm Kiến Trúc`,
        description: post.excerpt || "Khám phá bài viết về thiết kế kiến trúc và nội thất cao cấp tại Tiệm Kiến Trúc.",
        keywords: [
            "thiết kế kiến trúc",
            "nội thất cao cấp",
            "Tiệm Kiến Trúc",
            post.title.toLowerCase(),
            post.category.title.toLowerCase(),
        ],
        openGraph: {
            title: `${post.title} - Tiệm Kiến Trúc`,
            description: post.excerpt || "Khám phá bài viết về thiết kế kiến trúc và nội thất cao cấp tại Tiệm Kiến Trúc.",
            url: `${META.URL}/thiet-ke/${post.category.slug}/${post.slug}`,
            siteName: "Tiệm Kiến Trúc",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} - Tiệm Kiến Trúc`,
            description: post.excerpt || "Khám phá bài viết về thiết kế kiến trúc và nội thất cao cấp tại Tiệm Kiến Trúc.",
        },
    };
}

export default function DesignPostLayout({
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
