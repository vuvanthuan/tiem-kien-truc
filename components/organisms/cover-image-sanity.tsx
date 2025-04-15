import { Dialog, DialogContent, DialogTrigger } from "@/components/molecules/dialog";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@/lib/utils/tw-merge";

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

    const imageUrl = source?.asset?._ref
        ? urlForImage(source)?.height(finalHeight).width(finalWidth).url()
        : "";

    return (
        <div className={cn('w-full transition-shadow duration-200 shadow-md group-hover:shadow-lg sm:mx-0', containerClassName)}>
            {imageUrl ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Image
                            className={cn('w-full h-auto object-contain object-center cursor-zoom-in !m-0', className)}
                            width={finalWidth}
                            height={finalHeight}
                            alt={source?.alt || ""}
                            src={imageUrl as string}
                            priority={priority}
                        />
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
                        <img
                            src={imageUrl as string}
                            alt={source?.alt || ""}
                            className="object-contain w-full h-auto"
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <div
                    className={className}
                    style={{ paddingTop: `${(finalHeight / finalWidth) * 100}%` }}
                />
            )}
        </div>
    );
}
