'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils/tw-merge";

import { DesktopMenu } from "@/components/organisms/desktop-menu";
import { MobileMenu } from "@/components/organisms/mobile-menu";
import { Button } from "@/components/atoms/button";

import { initMenu } from "@/public/mocks/menu";

export default function Header() {
    const router = useRouter();

    return (
        <div className="sticky inset-x-0 top-0 z-10 md:bg-opacity-80 bg-white md:backdrop-blur-lg flex items-center justify-between px-4 md:px-12 lg:px-24">
            <div className="flex items-start justify-center">
                <Image src="/assets/logo.webp" width={150} height={150} alt="logo" className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] object-contain" />
            </div>

            <div className="hidden md:block">
                <DesktopMenu menu={initMenu} />
            </div>

            <div className="block md:hidden">
                <MobileMenu menu={initMenu} />
            </div>

            <div className="hidden flex-row items-center justify-center gap-2 md:flex">
                <Button
                    className={cn(
                        "px-[27px] py-[7px] border rounded-[29px] border-gray-700 text-gray-700 text-[14px] font-semibold bg-transparent hover:bg-gray-100"
                    )}
                    onClick={() => {
                        router.push("/contact");
                    }}
                >
                    Liên Hệ
                </Button>
            </div>
        </div>
    );
}
