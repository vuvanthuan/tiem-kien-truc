"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import type { EmblaCarouselType } from "embla-carousel"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/molecules/carousel"
import { Button } from "@/components/atoms/button"
import { cn } from "@/lib/utils/tw-merge"

const CarouselDots = ({ banners, carouselApi }: { banners: any[]; carouselApi: EmblaCarouselType | null }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    React.useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => {
            const currentIndex = carouselApi.selectedScrollSnap();
            setSelectedIndex(currentIndex);
        };

        onSelect();

        carouselApi.on("select", onSelect);

        return () => {
            carouselApi.off("select", onSelect);
        };
    }, [carouselApi]);

    return (
        <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2 z-4">
            {banners.map((_, index) => (
                <button
                    key={index}
                    className={cn(
                        "w-3 h-3 rounded-full transition-colors",
                        selectedIndex === index ? "bg-black border border-white/50" : "bg-white/50 border border-black/50"
                    )}
                    onClick={() => carouselApi?.scrollTo(index)}
                />
            ))}
        </div>
    )
}

export default function BannerCarousel() {
    const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
    const carouselRef = React.useRef<EmblaCarouselType | null>(null)

    const banners = [
        {
            id: 1,
            title: "TiemKienTruc",
            image: "/assets/swiper1.jpg",
            description: "Thiết kế hiện đại, sang trọng",
        },
        {
            id: 2,
            title: "TiemKienTruc",
            image: "/assets/swiper2.jpg",
            description: "Không gian sống hoàn hảo",
        },
        {
            id: 3,
            title: "TiemKienTruc",
            image: "/assets/swiper3.jpg",
            description: "Giải pháp kiến trúc toàn diện",
        },
        {
            id: 4,
            title: "TiemKienTruc",
            image: "/assets/swiper4.jpg",
            description: "Giải pháp kiến trúc toàn diện",
        },
        {
            id: 5,
            title: "TiemKienTruc",
            image: "/assets/swiper5.jpg",
            description: "Giải pháp kiến trúc toàn diện",
        },
        {
            id: 6,
            title: "TiemKienTruc",
            image: "/assets/swiper6.jpg",
            description: "Giải pháp kiến trúc toàn diện",
        },
        {
            id: 7,
            title: "TiemKienTruc",
            image: "/assets/swiper7.jpg",
            description: "Giải pháp kiến trúc toàn diện",
        },
        {
            id: 8,
            title: "TiemKienTruc",
            image: "/assets/swiper8.jpg",
            description: "Giải pháp kiến trúc toàn diện",
        },
    ]

    return (
        <div className="w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                setApi={(api) => {
                    if (api) {
                        carouselRef.current = api
                    }
                }}
                opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    dragFree: false,
                }}
            >
                <CarouselContent>
                    {banners.map((banner) => (
                        <CarouselItem key={banner.id}>
                            <div className="relative h-[500px] w-full overflow-hidden">
                                <Image
                                    src={banner.image || "/placeholder.svg"}
                                    alt={banner.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white bg-black/40">
                                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">{banner.title}</h2>
                                    <p className="mb-8 text-xl md:text-2xl">{banner.description}</p>
                                    <Button
                                        variant="outline"
                                        className="text-black transition-colors border-white hover:bg-white"
                                    >
                                        Khám phá ngay
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="z-10 text-white border-none left-4 bg-white/20 hover:bg-white/40" />
                <CarouselNext className="z-10 text-white border-none right-4 bg-white/20 hover:bg-white/40" />
                <CarouselDots banners={banners} carouselApi={carouselRef.current} />
            </Carousel>
        </div>
    )
}
