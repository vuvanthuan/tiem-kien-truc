import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableTextBlock } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/fetch";
import { designPostBySlugQuery } from "@/sanity/lib/queries";
import { generateTableOfContents } from "@/sanity/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";

import CustomPortableText from "@/components/organisms/portable-text-sanity";
import TableOfContents from "@/components/organisms/table-of-contents-sanity";
import CoverImage from "@/components/organisms/cover-image-sanity";

type Props = {
    params: Promise<{ slug: string; post: string }>;
};

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params;

    const post = await sanityFetch({
        query: designPostBySlugQuery,
        params: { slug: resolvedParams.post },
    });

    if (!post) return { title: "Không tìm thấy bài viết" };

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function DesignPostPage({ params }: Props) {
    const resolvedParams = await params;

    const post = await sanityFetch({
        query: designPostBySlugQuery,
        params: { slug: resolvedParams.post },
    });

    if (!post) return notFound();

    const toc = post.content
        ? generateTableOfContents(post.content as PortableTextBlock[])
        : [];

    return (
        <div className="w-full">
            {post.thumbnail && (
                <div className="mb-2 md:mb-4">
                    <CoverImage
                        priority
                        image={post.thumbnail}
                        height={400}
                        className="w-full h-[400px] object-cover object-center"
                    />
                </div>
            )}
            <div className="w-full px-2 md:px-4 lg:px-8 max-w-4xl py-10 mx-auto lg:max-w-7xl">
                <nav className="mb-6">
                    <Link href="/" className="text-blue-600 hover:underline">Trang chủ</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">Thiết kế</span>
                    <span className="mx-2">/</span>
                    <Link
                        href={`/thiet-ke/${post.category.slug}`}
                        className="text-blue-600 hover:underline"
                    >
                        {post.category.title}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">{post.title}</span>
                </nav>

                <Card className="w-full mx-auto">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold tracking-tight">
                            {post.title}
                        </CardTitle>
                        {post.excerpt && (
                            <p className="mt-2 text-lg text-muted-foreground">{post.excerpt}</p>
                        )}
                    </CardHeader>

                    <CardContent>
                        {toc.length > 0 && (
                            <div className="mb-8">
                                <TableOfContents toc={toc} />
                            </div>
                        )}
                        <CustomPortableText
                            className="prose prose-lg max-w-none"
                            value={post.content as PortableTextBlock[]}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
