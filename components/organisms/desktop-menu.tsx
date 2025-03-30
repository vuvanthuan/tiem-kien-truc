"use client";

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
} from "@/components/molecules/navigation-menu"

import { MenuWebsite } from "@/lib/types/menu";

export const DesktopMenu = ({ menu }: { menu: MenuWebsite[] }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menu.map((item) => (
                    <NavigationMenuItem key={item.value}>
                        {item.children ? (
                            <>
                                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="p-4 w-[800px] max-w-[90vw]">
                                        <div className="flex flex-wrap gap-6">
                                            {item.children.map((child) => (
                                                <div key={child.value} className="min-w-[200px]">
                                                    {child.children ? (
                                                        <div>
                                                            <HorizontalListItem
                                                                title={child.label}
                                                                href={`/${item.value}/${child.value}`}
                                                                className="font-medium border-b pb-2 mb-2"
                                                            />
                                                            <div className="flex flex-col gap-1 pl-2">
                                                                {child.children.map((subChild) => (
                                                                    <HorizontalListItem
                                                                        key={subChild.value}
                                                                        title={subChild.label}
                                                                        href={`/${item.value}/${child.value}/${subChild.value}`}
                                                                        className="text-sm"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <HorizontalListItem title={child.label} href={`/${item.value}/${child.value}`} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link href={`/${item.value}`} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.label}</NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
