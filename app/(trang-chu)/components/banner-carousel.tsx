"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils/tw-merge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/molecules/carousel"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/molecules/form"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"

import { carouselData } from "@/public/mocks/carousel";


const formSchema = z.object({
    query: z.string().min(1, { message: "Vui lòng nhập từ khóa tìm kiếm" }),
});

interface SearchResult {
    title: string;
    slug: { current: string };
    excerpt?: string;
    thumbnail?: { asset: { url: string } };
    publishedAt: string;
    category: { title: string };
}

const CarouselDots = ({ banners, carouselApi }: { banners: any[]; carouselApi: any }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    React.useEffect(() => {
        if (!carouselApi) return

        const onSelect = () => {
            setSelectedIndex(carouselApi.selectedScrollSnap())
        }

        onSelect()
        carouselApi.on("select", onSelect)

        return () => {
            carouselApi.off("select", onSelect)
        }
    }, [carouselApi])

    return (
        <div className="absolute z-10 flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
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
    const router = useRouter();
    const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
    const [carouselApi, setCarouselApi] = React.useState<any>(null)
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(values.query)}`);
            const data = await response.json();
            setSearchResults(data.results || []);
            router.push(`/tim-kiem?keyword=${encodeURIComponent(values.query)}`);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputFocus = () => {
        plugin.current.stop();
    };

    const handleInputBlur = () => {
        plugin.current.play();
    };

    return (
        <div className="w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                setApi={setCarouselApi}
                opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    dragFree: false,
                }}
            >
                <CarouselContent>
                    {carouselData.map((banner) => (
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
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(onSubmit)}
                                            className="flex w-full max-w-md gap-2"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="query"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Tìm kiếm bài viết..."
                                                                {...field}
                                                                className="text-black bg-white"
                                                                onFocus={handleInputFocus}
                                                                onBlur={handleInputBlur}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" disabled={isLoading}>
                                                {isLoading ? "Đang tìm..." : "Tìm"}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="z-10 text-white border-none left-4 bg-white/20 hover:bg-white/40" />
                <CarouselNext className="z-10 text-white border-none right-4 bg-white/20 hover:bg-white/40" />
                <CarouselDots banners={carouselData} carouselApi={carouselApi} />
            </Carousel>
        </div>
    )
}
