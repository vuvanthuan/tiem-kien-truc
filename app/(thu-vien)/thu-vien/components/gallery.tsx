"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/molecules/dialog";

interface SanityImage {
    _id: string;
    url: string;
    originalFilename: string;
    metadata: {
        dimensions: {
            width: number;
            height: number;
        };
        palette?: any;
        lqip?: string;
    };
}

export default function Gallery({ images }: { images: SanityImage[] }) {
    const [selectedImage, setSelectedImage] = useState<SanityImage | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {images.map((img) => (
                    <div
                        key={img._id}
                        className="transition cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img.url}
                            alt={img.originalFilename}
                            width={img.metadata.dimensions.width}
                            height={img.metadata.dimensions.height}
                            className="rounded-md object-cover w-full h-[200px]"
                        />
                    </div>
                ))}
            </div>

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
                    {selectedImage && (
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.originalFilename}
                            className="object-contain w-full h-auto rounded"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
