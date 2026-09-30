import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_KR({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const serif = Noto_Serif_KR({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const brand = Cormorant_Garamond({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "ONYU — Botanical Skincare",
  description:
    "자연에서 온 수분과 고요함. ONYU 스킨케어 공식 스토어.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${sans.variable} ${serif.variable} ${brand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
