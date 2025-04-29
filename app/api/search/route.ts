import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2025-04-27",
    useCdn: true,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase() || "";

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    try {
        const results = await client.fetch(
            `*[_type == "designPost" && slug.current match $queryParam + "*"]{
          title,
          slug,
          excerpt,
          thumbnail,
          publishedAt,
          category->{
            title
          }
        }`,
            { queryParam: query }
        );

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
