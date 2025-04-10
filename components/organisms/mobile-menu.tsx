"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/atoms/button";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/molecules/accordion";

import { cn } from "@/lib/utils/tw-merge";
import { IMenuWebsite } from "@/lib/types/menu";

export const MobileMenu = ({ menu }: { menu: IMenuWebsite[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const isActive = (path: string, level: number, isParent: boolean = false, itemValue: string = "", childValues: string[] = []) => {
        if (pathname === "/" && path !== "/") return false;
        if (path === "/") return pathname === "/";

        const pathSegments = pathname.split("/").filter(Boolean);

        if (level === 1) return pathname.startsWith(path);

        if (level === 2) {
            if (isParent) {
                const parentPath = `/${itemValue}`;
                return childValues.some(childValue => {
                    const childPath = childValue ? `${parentPath}/${childValue}` : parentPath;
                    return pathSegments.length === 2 ? pathname === childPath : pathname.startsWith(childPath);
                });
            }
            const trimmedPathname = pathSegments.length >= 2 ? `/${pathSegments[0]}/${pathSegments[1]}` : "";
            return trimmedPathname === path;
        }

        return pathname === path;
    };

    const menuContent = useMemo(
        () => (
            <div className="flex flex-col items-start justify-between w-full gap-5 px-4 py-4 overflow-y-auto">
                <Accordion type="single" collapsible className="w-full">
                    {menu.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.children && item.children.length > 0 ? (
                                <AccordionItem value={item.label}>
                                    <AccordionTrigger className="w-full text-left">
                                        <div className="flex items-center justify-between">
                                            <p
                                                className={cn(
                                                    "text-[16px] font-semibold",
                                                    isActive(`/${item.value}`, 1) ? "text-amber-500" : "text-zinc-950"
                                                )}
                                            >
                                                {item.label}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col items-start justify-start gap-4 pl-4 mt-3">
                                        {item.children.map((child, idx) => {
                                            const isParent = child.value === "";
                                            const childPath = isParent ? `/${item.value}` : `/${item.value}/${child.value}`;
                                            const childValues = child.children ? child.children.map(sub => sub.value) : [];
                                            return child.children && child.children.length > 0 ? (
                                                <Accordion className="w-full" key={idx} type="single" collapsible>
                                                    <AccordionItem value={child.label}>
                                                        <AccordionTrigger
                                                            className={cn(
                                                                "text-[14px] p-0",
                                                                isActive(childPath, 2, isParent, item.value, childValues) ? "text-amber-500" : "text-gray-700"
                                                            )}
                                                        >
                                                            {child.label}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="flex flex-col gap-2 pl-4 mt-2">
                                                            {child.children.map((subChild, subIdx) => {
                                                                const subChildPath = `/${item.value}/${subChild.value}`;
                                                                return (
                                                                    <Link
                                                                        href={subChildPath}
                                                                        key={subIdx}
                                                                        className={cn(
                                                                            "text-[14px] text-gray-700 hover:text-black",
                                                                            isActive(subChildPath, 3) && "text-amber-500"
                                                                        )}
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        {subChild.label}
                                                                    </Link>
                                                                );
                                                            })}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            ) : (
                                                <Link
                                                    href={childPath}
                                                    key={idx}
                                                    className={cn(
                                                        "text-[14px]",
                                                        isActive(childPath, 2, isParent, item.value) ? "text-amber-500" : "text-gray-700"
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            );
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            ) : (
                                <Link
                                    href={`/${item.value}`}
                                    key={index}
                                    className={cn(
                                        "flex flex-row items-center justify-between w-full py-4 text-[16px] font-semibold text-black hover:text-gray-700",
                                        isActive(`/${item.value}`, 1) && "text-amber-500"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </Accordion>
            </div>
        ),
        [menu, pathname]
    );

    return (
        <React.Fragment>
            <div className="relative md:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMenu}
                    className="p-2"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? (
                        <X className="h-6 w-6 text-black" />
                    ) : (
                        <Menu className="h-6 w-6 text-black" />
                    )}
                </Button>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed top-[75px] border-t border-t-black/30 left-0 w-full bg-white shadow-lg z-40 flex flex-col justify-between items-center max-h-[calc(100vh-100px)]"
                >
                    {menuContent}
                    <div className="flex flex-row items-center justify-center gap-2 pb-4">
                        <Button
                            className={cn(
                                "px-[27px] py-[7px] border rounded-[29px] border-gray-700 text-gray-700 text-[14px] font-semibold bg-transparent hover:bg-gray-100"
                            )}
                            onClick={() => {
                                router.push("/contact");
                                setIsOpen(false);
                            }}
                        >
                            Liên Hệ
                        </Button>
                    </div>
                </motion.div>
            )}
        </React.Fragment>
    );
};
