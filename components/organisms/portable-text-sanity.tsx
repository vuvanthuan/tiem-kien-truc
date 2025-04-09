// components/portable-text.tsx
import { PortableText, PortableTextBlock, PortableTextComponents } from "next-sanity";
import CoverImage from "./cover-image-sanity";

export default function CustomPortableText({
    className,
    value,
}: {
    className?: string;
    value: PortableTextBlock[];
}) {
    const components: PortableTextComponents = {
        block: {
            h1: ({ children, value }) => (
                <h1 id={`heading-${value._key}`} className="mb-4 text-4xl font-bold">
                    {children}
                </h1>
            ),
            h2: ({ children, value }) => (
                <h2 id={`heading-${value._key}`} className="mb-3 text-3xl font-bold">
                    {children}
                </h2>
            ),
            h3: ({ children, value }) => (
                <h3 id={`heading-${value._key}`} className="mb-2 text-2xl font-bold">
                    {children}
                </h3>
            ),
            h5: ({ children }) => (
                <h5 className="mb-2 text-sm font-semibold">{children}</h5>
            ),
            h6: ({ children }) => (
                <h6 className="mb-1 text-xs font-semibold">{children}</h6>
            ),
        },
        marks: {
            link: ({ children, value }) => (
                <a href={value?.href} rel="noreferrer noopener" className="text-blue-600 hover:underline">
                    {children}
                </a>
            ),
        },
        types: {
            image: ({ value }) => {
                if (!value?.asset?._ref) return null;
                return (
                    <div className="flex justify-center my-4">
                        <CoverImage image={value} priority />
                    </div>
                );
            },
        },
    };

    return (
        <div className={["prose", className].filter(Boolean).join(" ")}>
            <PortableText components={components} value={value} />
        </div>
    );
}
