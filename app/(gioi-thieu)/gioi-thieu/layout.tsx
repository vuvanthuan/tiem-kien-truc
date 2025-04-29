import React from "react"
import type { Metadata } from "next";

import { META } from "@/lib/constants/app";

export async function generateMetadata(): Promise<Metadata> {
  const metaData = {
    title: "Giới Thiệu Công Ty Thiết Kế Kiến Trúc & Nội Thất | Tiệm Kiến Trúc",
    description: "Tiệm Kiến Trúc - đơn vị thiết kế kiến trúc và nội thất hàng đầu Việt Nam. Khám phá hành trình, tầm nhìn và giá trị cốt lõi chúng tôi mang đến cho không gian sống hiện đại.",
    siteName: "Tiệm Kiến Trúc",
    keywords: [
      "giới thiệu công ty thiết kế kiến trúc",
      "giới thiệu công ty nội thất",
      "công ty thiết kế kiến trúc uy tín",
      "công ty thiết kế nội thất cao cấp",
      "về Tiệm Kiến Trúc",
      ...META.keywords,
    ],
  };

  return {
    metadataBase: new URL(META.URL),
    title: {
      default: metaData.title,
      template: `%s | ${metaData.siteName}`,
    },
    description: metaData.description,
    keywords: metaData.keywords.join(", "),
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: `${META.URL}/gioi-thieu`,
      siteName: metaData.siteName,
      images: [
        {
          url: META.og.ogImage,
          width: META.og.width,
          height: META.og.height,
          alt: "Giới thiệu công ty Tiệm Kiến Trúc",
        },
      ],
      type: META.og.type ?? "website",
      locale: META.og.locale,
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/apple-touch-icon.png'
      },
    ],
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    alternates: {
      canonical: `${META.URL}/gioi-thieu`
    },
    authors: [
      { name: metaData.siteName },
    ],
    category: "Giới thiệu công ty thiết kế nội thất và kiến trúc",
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
