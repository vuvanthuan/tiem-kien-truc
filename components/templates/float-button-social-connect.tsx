"use client"

import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils/tw-merge"
import { Button } from "@/components/atoms/button"

export default function FloatButtonSocialConnect() {
    const socialLinks = [
        {
            href: "https://zalo.me/0904993688",
            icon: "/assets/zalo.png",
            alt: "Zalo",
            isImage: true,
            delay: "animation-delay-0",
        },
        {
            href: "https://facebook.com",
            icon: '/assets/facebook.svg',
            alt: "Facebook",
            isImage: true,
            delay: "animation-delay-100",
        },
    ]

    return (
        <div className="fixed z-50 flex flex-col items-end gap-4 bottom-6 right-6">
            {socialLinks.map((item, index) => (
                <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="relative">
                        <span
                            className={cn(
                                "absolute w-full h-full rounded-full opacity-75 animate-ping",
                                item.alt === "Zalo" ? "bg-[#0068ff]" : "bg-[#1877F2]",
                                "duration-1000",
                                item.delay,
                            )} />
                        <Button
                            size="icon"
                            className={cn(
                                "w-10 h-10 bg-transparent rounded-full shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
                                "group-hover:scale-110 group-hover:bg-slate-100",
                                "flex items-center justify-center animate-wiggle",
                            )}
                        >
                            {item.isImage ? (
                                <Image
                                    src={(item.icon as string) || "/placeholder.svg"}
                                    alt={item.alt}
                                    width={28}
                                    height={28}
                                    className="object-contain object-center w-full h-full"
                                />
                            ) : (
                                item.icon
                            )}
                            <span className="sr-only">{item.alt}</span>
                        </Button>
                    </div>
                </Link>
            ))}
        </div>
    )
}
