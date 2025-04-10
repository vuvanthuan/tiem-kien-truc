import Link from "next/link";

import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { designCategoryWithPostsQuery } from "@/sanity/lib/queries";

import CoverImage from "@/components/organisms/cover-image-sanity";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const category = await sanityFetch({
        query: designCategoryWithPostsQuery,
        params
    });

    if (!category) return { title: "Không tìm thấy hạng mục" };

    return {
        title: category.title,
        description: `Các bài viết trong hạng mục thiết kế: ${category.title}`,
    };
}

export default async function DesignCategoryPage({ params }: Props) {
    const category = await sanityFetch({
        query: designCategoryWithPostsQuery,
        params
    });

    if (!category) return notFound();

    return (
        <div className="w-full">

            {category.thumbnail && (
                <div className="mb-2 md:mb-4">
                    <CoverImage
                        priority
                        image={category.thumbnail}
                        height={400}
                        className="w-full h-[400px] object-cover object-center"
                    />
                </div>
            )}

            <div className="container max-w-6xl py-10 mx-auto">
                <nav className="mb-6">
                    <Link href="/" className="text-blue-600 hover:underline">
                        Trang chủ
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">Thiết kế</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">{category.title}</span>
                </nav>

                <div className="w-full mx-auto">
                    {category.posts?.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {category.posts.map((post: any) => (
                                <Link
                                    key={post.slug}
                                    href={`/thiet-ke/${category.slug}/${post.slug}`}
                                    className="group block overflow-hidden border rounded-lg hover:shadow-md transition"
                                >
                                    {post.thumbnail && (
                                        <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                                            <CoverImage
                                                priority
                                                image={post.thumbnail}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">Chưa có bài viết nào trong hạng mục này.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
