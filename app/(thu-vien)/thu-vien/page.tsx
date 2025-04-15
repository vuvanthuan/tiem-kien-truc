import { sanityFetch } from "@/sanity/lib/fetch";
import { allImagesQuery } from "@/sanity/lib/queries";
import Gallery from "./components/gallery";

export default async function GalleryPage() {
  const images = await sanityFetch({ query: allImagesQuery });

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold">Gallery</h1>
      <Gallery images={images} />
    </div>
  );
}
