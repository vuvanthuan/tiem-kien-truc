import React from "react"
import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { quotationQuery } from "@/sanity/lib/queries";

type Props = {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
};

const quotationSlugs = [
    { label: "Báo giá thiết kế", value: "bao-gia-thiet-ke" },
    { label: "Báo giá thi công", value: "bao-gia-thi-cong" },
];

export async function generateStaticParams() {
    return quotationSlugs.map((item) => ({ slug: item.value }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const quotation = await sanityFetch({
        query: quotationQuery,
        params: resolvedParams,
        stega: false,
    });

    if (!quotation) {
        return {
            title: "Báo giá | Tiệm Kiến Trúc",
            description: "Nhận báo giá thiết kế và thi công từ Tiệm Kiến Trúc.",
        };
    }

    return {
        title: quotation.title,
        description: quotation.description,
    } satisfies Metadata;
}

export default async function QuotationLayout({ children }: Props) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}
