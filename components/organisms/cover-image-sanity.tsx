import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
    image: any;
    priority?: boolean;
    className?: string;
    containerClassName?: string;
    width?: number;
    height?: number;
    defaultWidth?: number;
    defaultHeight?: number;
}

export default function CoverImage(props: CoverImageProps) {
    const {
        image: source,
        priority,
        className = "",
        containerClassName = "",
        width,
        height,
        defaultWidth = 2000,
        defaultHeight = 1000
    } = props;

    const finalWidth = width || defaultWidth;
    const finalHeight = height || defaultHeight;

    const imageElement = source?.asset?._ref ? (
        <Image
            className={`w-full h-auto ${className}`}
            width={finalWidth}
            height={finalHeight}
            alt={source?.alt || ""}
            src={urlForImage(source)?.height(finalHeight).width(finalWidth).url() as string}
            priority={priority}
        />
    ) : (
        <div
            className={`bg-slate-50 ${className}`}
            style={{ paddingTop: `${(finalHeight/finalWidth) * 100}%` }}
        />
    );

    return (
        <div
            className={`transition-shadow duration-200 shadow-md group-hover:shadow-lg sm:mx-0 ${containerClassName}`}
        >
            {imageElement}
        </div>
    );
}
