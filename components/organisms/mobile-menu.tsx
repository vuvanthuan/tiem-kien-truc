"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/atoms/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/molecules/accordion";

import { cn } from "@/lib/utils/tw-merge";
import { MenuWebsite } from "@/lib/types/menu";

export const MobileMenu = ({ menu }: { menu: MenuWebsite[] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuContent = useMemo(
    () => (
      <div className="flex flex-col items-start justify-between w-full gap-5 px-4 py-4 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full">
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              {item.children && item.children.length > 0 ? (
                <AccordionItem value={item.label}>
                  <AccordionTrigger className="w-full text-left text-zinc-950 dark:text-zinc-50">
                    <div className="flex items-center justify-between">
                      <p className="text-[16px] font-semibold text-black">
                        {item.label}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col items-start justify-start gap-2 pl-4 mt-3">
                    {item.children.map((child, idx) => (
                      <Link
                        href={`/${child.value}`}
                        key={idx}
                        className="text-[14px] text-gray-700 hover:text-black"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  href={`/${item.value}`}
                  key={index}
                  className="flex flex-row items-center justify-between w-full py-4 text-[16px] font-semibold text-black hover:text-gray-700"
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
    [menu]
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
