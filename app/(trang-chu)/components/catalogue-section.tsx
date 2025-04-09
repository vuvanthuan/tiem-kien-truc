"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/button";

interface CatalogueItem {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
}

const catalogueItems: CatalogueItem[] = [
  {
    id: "01",
    category: "Phòng ngủ",
    title: "Không gian phòng ngủ ấm cúng",
    image: "/image/badroom.jpg",
    description: "Thiết kế phòng ngủ sạch sẽ, thoải mái dành cho gia đình bạn.",
  },
  {
    id: "02",
    category: "Căn hộ",
    title: "Gian bếp gọn gàng, hiện đại",
    image: "/image/kitchen1.jpg",
    description: "Phòng bếp hiện đại với thiết kế tối giản, tiện nghi cho mọi gia đình.",
  },
  {
    id: "03",
    category: "Biệt thự",
    title: "Phòng khách sang trọng",
    image: "/image/drowing.jpg",
    description: "Không gian phòng khách rộng rãi, lý tưởng cho những buổi họp mặt gia đình.",
  },
  {
    id: "04",
    category: "Nhà phố",
    title: "Phòng sinh hoạt chung hiện đại",
    image: "/image/living.jpg",
    description: "Không gian sống thân thiện, phù hợp với các gia đình hiện đại.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const overlayVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

export default function CatalogueSection() {
  return (
    <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gray-300 lg:gap-0">
      {catalogueItems.map((item) => (
        <motion.div
          key={item.id}
          className="relative overflow-hidden group"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          {/* Image */}
          <div>
            <Image
              src={item.image}
              width={380}
              height={100}
              alt={item.title}
              className="object-cover w-full"
            />
          </div>

          {/* Main Info - Always visible */}
          <div className="absolute top-0 p-8 m-12 bg-white/60 backdrop-blur-md">
            <div className="flex justify-between pb-4">
              <span className="text-sm text-gray-600">{item.category}</span>
              <span className="text-sm font-medium">{item.id}</span>
            </div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="py-4 text-sm text-gray-500">{item.description}</p>
            <Button
              variant="link"
              className="inline-flex items-center h-auto p-0 font-medium text-blue-600 hover:text-blue-800"
              asChild
            >
              <a href="#">
                Xem chi tiết
                {/* <TbArrowNarrowRight className="ml-2 text-xl" /> */}
              </a>
            </Button>
          </div>

          {/* Overlay - Hidden on mobile, slides up on hover */}
          <motion.div
            className="absolute inset-0 flex-col items-center justify-end hidden pb-16 md:flex bg-zinc-100"
            variants={overlayVariants}
            initial="hidden"
            whileHover="visible"
            transition={{ duration: 0.3 }}
          >
            <p className="text-xl tracking-wider text-gray-700 -rotate-90">
              {item.category}
            </p>
            <span className="text-xl font-bold">{item.id}</span>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}
