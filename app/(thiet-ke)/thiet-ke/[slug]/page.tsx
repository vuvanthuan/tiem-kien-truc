import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/fetch";
import { designCategoryWithPostsQuery } from "@/sanity/lib/queries";

import CoverImage from "@/components/organisms/cover-image-sanity";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function DesignCategoryPage({ params }: Props) {
    const category = await sanityFetch({
        query: designCategoryWithPostsQuery,
        params,
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

            <div className="container max-w-6xl py-4 mx-auto md:py-8">
                <nav className="mb-6">
                    <Link href="/" className="text-[#854836] hover:underline">
                        Trang chủ
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">Thiết kế</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">{category.title}</span>
                </nav>

                <div className="w-full mx-auto">
                    {category.posts?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {category.posts.map((post: any) => (
                                <Link
                                    key={post.slug}
                                    href={`/thiet-ke/${category.slug}/${post.slug}`}
                                    className="block overflow-hidden transition border rounded-lg group hover:shadow-md"
                                >
                                    {post.thumbnail && (
                                        <div className="overflow-hidden aspect-w-16 aspect-h-10">
                                            <CoverImage
                                                priority
                                                image={post.thumbnail}
                                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-[#854836]">
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
                        <p className="py-8 text-center text-gray-500">
                            Chưa có bài viết nào trong hạng mục này.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
