import createImageUrlBuilder from "@sanity/image-url";
import { PortableTextBlock } from "next-sanity";

import { dataset, projectId } from "@/sanity/lib/api";

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || "",
    dataset: dataset || "",
});

export const urlForImage = (source: any) => {
    // Ensure that source image contains a valid reference
    if (!source?.asset?._ref) {
        return undefined;
    }

    return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
    if (!image) return;
    const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
    if (!url) return;
    return { url, alt: image?.alt as string, width, height };
}

export function resolveHref(
    documentType?: string,
    slug?: string,
): string | undefined {
    switch (documentType) {
        case "post":
            return slug ? `/posts/${slug}` : undefined;
        default:
            console.warn("Invalid document type:", documentType);
            return undefined;
    }
}

export interface TocItem {
    id: string;
    level: number;
    text: string;
}

export function generateTableOfContents(content: PortableTextBlock[]): TocItem[] {
  const toc: TocItem[] = [];

  content.forEach((block, index) => {
    if (block._type === "block" && block.style?.startsWith("h")) {
      const level = parseInt(block.style.replace("h", ""), 10);
      const text = block.children
        .filter((child) => child._type === "span")
        .map((child) => child.text)
        .join("");
      const id = `heading-${block._key || index}`; // Sử dụng _key thay vì index để đảm bảo tính duy nhất

      toc.push({ id, level, text });
    }
  });

  return toc;
}
