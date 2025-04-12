import "../globals.css";

import { Quicksand } from "next/font/google";

export { metadata, viewport } from "next-sanity/studio";

const nextFont = Quicksand({ subsets: ["latin"], weight: ['300', '400', '500', '700'], display: "swap" });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={nextFont.className}>
            <body className="min-h-screen">{children}</body>
        </html>
    );
}
