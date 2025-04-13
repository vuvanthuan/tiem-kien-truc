"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    HorizontalListItem,
    navigationMenuTriggerStyle
} from "@/components/molecules/navigation-menu";

import { cn } from "@/lib/utils/tw-merge";
import { IMenuWebsite } from "@/lib/types/menu";

export const DesktopMenu = ({ menu }: { menu: IMenuWebsite[] }) => {
    const pathname = usePathname();

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

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item) => (
                    <NavigationMenuItem key={item.value}>
                        {item.children ? (
                            <>
                                <NavigationMenuTrigger
                                    className={cn(
                                        isActive(`/${item.value}`, 1) && "text-[#854836] border-b border-b-[#854836]"
                                    )}
                                >
                                    {item.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="p-4 w-[800px] max-w-[90vw]">
                                        <div className="flex flex-wrap gap-6">
                                            {item.children.map((child, idx) => {
                                                const isParent = child.value === "";
                                                const childPath = isParent ? `/${item.value}` : `/${item.value}/${child.value}`;
                                                const childValues = child.children ? child.children.map(sub => sub.value) : [];
                                                return (
                                                    <div key={idx} className="min-w-[200px]">
                                                        {child.children ? (
                                                            <div>
                                                                <HorizontalListItem
                                                                    title={child.label}
                                                                    href={childPath}
                                                                    className={cn(
                                                                        "pb-2 mb-2 font-medium border-b",
                                                                        "hover:border-b hover:border-[#854836] transition-all duration-200",
                                                                        isActive("#", 2, isParent, item.value, childValues) && "text-[#854836]  border-b border-b-[#854836]"
                                                                    )}
                                                                />
                                                                <div className="flex flex-col gap-1 pl-2">
                                                                    {child.children.map((subChild) => {
                                                                        const subChildPath = `/${item.value}/${subChild.value}`;
                                                                        return (
                                                                            <HorizontalListItem
                                                                                key={subChild.value}
                                                                                title={subChild.label}
                                                                                href={subChildPath}
                                                                                className={cn(
                                                                                    "text-sm",
                                                                                    "hover:border-b hover:border-[#854836] transition-all duration-200",
                                                                                    isActive(subChildPath, 3) && "text-[#854836]  border-b border-b-[#854836]"
                                                                                )}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <HorizontalListItem
                                                                title={child.label}
                                                                href={childPath}
                                                                className={cn(
                                                                    "hover:border-b hover:border-[#854836] transition-all duration-200",
                                                                    isActive(childPath, 2, isParent, item.value) && "text-[#854836]  border-b border-b-[#854836]"
                                                                )}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link href={`/${item.value}`} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        isActive(`/${item.value}`, 1) && "text-[#854836]  border-b border-b-[#854836]"
                                    )}
                                >
                                    {item.label}
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
