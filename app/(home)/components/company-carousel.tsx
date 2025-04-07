"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "@/components/molecules/carousel";

interface Company {
    id: string;
    name: string;
    logo: string;
}

const companies: Company[] = [
    { id: "1", name: "Ken Design", logo: "/assets/companies/ken.jpg" },
    { id: "2", name: "La Nha Design", logo: "/assets/companies/lanha.webp" },
    { id: "3", name: "Decox Design", logo: "/assets/companies/decox.svg" },
    { id: "4", name: "Kien Truc Hoan My Design", logo: "/assets/companies/kientruchoanmy.webp" },
];

export default function CompanyCarousel() {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <section className="py-8 bg-zinc-100">
            <p className="mb-6 text-lg font-medium text-center text-zinc-500">
                Được đồng hành cùng các công ty tốt nhất Việt Nam
            </p>
            <div className="container px-4 mx-auto">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                        slidesToScroll: 1,
                        containScroll: "trimSnaps",
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {companies.map((company) => (
                            <CarouselItem
                                key={company.id}
                                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                            >
                                <div className="flex items-center justify-center p-2">
                                    <Image
                                        src={company.logo}
                                        width={128}
                                        height={128}
                                        alt={`${company.name} logo`}
                                        className="object-contain object-center h-full transition-opacity duration-300 opacity-40 hover:opacity-80"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
