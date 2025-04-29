import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";

export async function generateMetadata(): Promise<Metadata> {
  const thiCongKeywords = [
    "thi công nội thất",
    "thi công kiến trúc",
    "thi công nhà phố",
    "thi công biệt thự",
    "công ty thi công nội thất",
    "công ty thi công xây dựng",
    "thi công trọn gói",
    "thi công hoàn thiện nhà",
    ...META.keywords,
  ];

  return {
    metadataBase: new URL(META.URL),
    title: {
      default: "Thi Công Nội Thất & Kiến Trúc Chuyên Nghiệp | Tiệm Kiến Trúc",
      template: "%s | Tiệm Kiến Trúc",
    },
    description: "Tiệm Kiến Trúc chuyên thi công nội thất và kiến trúc cao cấp, đảm bảo tiến độ và chất lượng vượt trội. Tối ưu không gian sống biệt thự, nhà phố, căn hộ hiện đại.",
    keywords: thiCongKeywords.join(", "),
    openGraph: {
      title: "Thi Công Nội Thất & Kiến Trúc Chuyên Nghiệp | Tiệm Kiến Trúc",
      description: "Dịch vụ thi công nội thất, kiến trúc chuyên nghiệp, đúng tiến độ, đảm bảo chất lượng cao. Tiệm Kiến Trúc đồng hành cùng không gian sống hoàn hảo của bạn.",
      url: `${META.URL}/thi-cong`,
      siteName: META.siteName,
      images: [
        {
          url: "/assets/og-image-thi-cong.jpg",
          width: META.og.width,
          height: META.og.height,
          alt: "Thi công nội thất và kiến trúc cao cấp",
        },
      ],
      locale: META.og.locale,
      type: META.og.type ?? "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    alternates: {
      canonical: `${META.URL}/thi-cong`,
    },
    authors: [
      { name: META.siteName },
    ],
    category: "Thi công nội thất và kiến trúc",
  };
}

export default async function IntroductionLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
