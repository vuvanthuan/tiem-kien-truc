import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableTextBlock } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/fetch";
import { generateTableOfContents } from "@/sanity/lib/utils";
import { quotationQuery } from "@/sanity/lib/queries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";
import CustomPortableText from "@/components/organisms/portable-text-sanity";
import TableOfContents from "@/components/organisms/table-of-contents-sanity";

type Props = {
    params: Promise<{ slug: string }>;
};

const quotationSlugs = [
    { label: 'Báo giá thiết kế', value: 'bao-gia-thiet-ke' },
    { label: 'Báo giá thi công', value: 'bao-gia-thi-cong' }
];

export async function generateStaticParams() {
    return quotationSlugs.map((item) => ({ slug: item.value }));
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const quotation = await sanityFetch({
        query: quotationQuery,
        params: resolvedParams,
        stega: false,
    });

    if (!quotation) return {};

    return {
        title: quotation.title,
        description: quotation.description,
    } satisfies Metadata;
}

export default async function quotationPage({ params }: Props) {
    const resolvedParams = await params;

    const quotation = await sanityFetch({
        query: quotationQuery,
        params: resolvedParams,
    }).catch((error) => {
        console.error("Sanity fetch error:", error);
        return null;
    });

    if (!quotation) {
        return notFound();
    }

    const content = quotation.content;
    const toc = content ? generateTableOfContents(content as PortableTextBlock[]) : [];

    const matchedItem = quotationSlugs.find((item) => item.value === resolvedParams.slug);
    const pageTitle = matchedItem ? matchedItem.label : quotation.title;

    return (
        <div className="container max-w-4xl py-10 mx-auto lg:max-w-7xl">
            <nav className="mb-6">
                <Link href="/" className="text-blue-600 hover:underline">
                    Trang chủ
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-500">Báo giá</span>
                <span className="mx-2">/</span>
                <span className="text-gray-500">{pageTitle}</span>
            </nav>

            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold tracking-tight">
                        {pageTitle}
                    </CardTitle>
                    {quotation.description && (
                        <p className="mt-2 text-lg text-muted-foreground">
                            {quotation.description}
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    {toc.length > 0 && (
                        <div className="mb-8">
                            <TableOfContents toc={toc} />
                        </div>
                    )}

                    {quotation.content?.length && (
                        <CustomPortableText
                            className="prose prose-lg max-w-none"
                            value={quotation.content as PortableTextBlock[]}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
