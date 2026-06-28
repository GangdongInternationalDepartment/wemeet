import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNavigation, getBranding } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WE MEET 다문화 행복센터",
  description: "한국에 정착하는 외국인 분들을 위한 종합 지원 기관 — WE MEET 다문화 행복센터",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navItems, branding] = await Promise.all([getNavigation(), getBranding()]);

  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Header navItems={navItems} branding={branding} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
