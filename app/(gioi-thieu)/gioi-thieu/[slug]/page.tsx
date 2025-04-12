import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableTextBlock } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/fetch";
import { generateTableOfContents } from "@/sanity/lib/utils";
import { introductionQuery } from "@/sanity/lib/queries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";
import CustomPortableText from "@/components/organisms/portable-text-sanity";
import TableOfContents from "@/components/organisms/table-of-contents-sanity";

type Props = {
    params: Promise<{ slug: string }>;
};

const introductionSlugs = [
    { label: "Giới thiệu chung", value: "gioi-thieu-chung" },
    { label: "Đội ngũ nhân sự", value: "gioi-thieu-doi-ngu-nhan-su" },
    { label: "Quy trình làm việc", value: "gioi-thieu-quy-trinh-lam-viec" },
    { label: "Hồ sơ năng lực", value: "gioi-thieu-ho-so-nang-luc" },
];

export async function generateStaticParams() {
    return introductionSlugs.map((item) => ({ slug: item.value }));
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params;
    const introduction = await sanityFetch({
        query: introductionQuery,
        params: resolvedParams,
        stega: false,
    });

    if (!introduction) return {};

    return {
        title: introduction.title,
        description: introduction.description,
    } satisfies Metadata;
}

export default async function IntroductionPage({ params }: Props) {
    const resolvedParams = await params;

    const introduction = await sanityFetch({
        query: introductionQuery,
        params: resolvedParams,
    }).catch((error) => {
        console.error("Sanity fetch error:", error);
        return null;
    });

    if (!introduction) {
        return notFound();
    }

    const content = introduction.content;
    const toc = content ? generateTableOfContents(content as PortableTextBlock[]) : [];

    const matchedItem = introductionSlugs.find((item) => item.value === resolvedParams.slug);
    const pageTitle = matchedItem ? matchedItem.label : introduction.title;

    return (
        <div className="w-full max-w-4xl px-2 py-10 mx-auto md:px-4 lg:px-8 lg:max-w-7xl">
            <nav className="mb-6">
                <Link href="/" className="text-blue-600 hover:underline">
                    Trang chủ
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-500">Giới thiệu</span>
                <span className="mx-2">/</span>
                <span className="text-gray-500">{pageTitle}</span>
            </nav>

            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold tracking-tight">
                        {pageTitle}
                    </CardTitle>
                    {introduction.description && (
                        <p className="mt-2 text-lg text-muted-foreground">
                            {introduction.description}
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    {toc.length > 0 && (
                        <div className="mb-8">
                            <TableOfContents toc={toc} />
                        </div>
                    )}

                    {introduction.content?.length && (
                        <CustomPortableText
                            className="prose prose-lg max-w-none"
                            value={introduction.content as PortableTextBlock[]}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
