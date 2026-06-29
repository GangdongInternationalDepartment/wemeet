"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import type { NavItem, SiteBranding } from "@/lib/types";

const defaultBranding: SiteBranding = {
  topBarName: { ko: "WE MEET 다문화 행복센터", en: "WE MEET Multicultural Happiness Center" },
  logoAbbr: "WM",
  siteName: { ko: "WE MEET", en: "WE MEET" },
  siteSubtitle: { ko: "다문화 행복센터", en: "Multicultural Happiness Center" },
};

export default function Header({
  navItems,
  branding = defaultBranding,
}: {
  navItems: NavItem[];
  branding?: SiteBranding;
}) {
  const { lang, setLang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#E8541A] text-white text-sm py-1.5">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold tracking-wide">
            {t(branding.topBarName.ko, branding.topBarName.en)}
          </span>
          <div className="flex items-center gap-3">
            <a
              href="http://pf.kakao.com/_Hcktn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors"
            >
              카카오톡 상담
            </a>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setLang("ko")}
              className={`transition-colors ${lang === "ko" ? "font-bold text-yellow-300" : "hover:text-yellow-200"}`}
            >
              한국어
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setLang("en")}
              className={`transition-colors ${lang === "en" ? "font-bold text-yellow-300" : "hover:text-yellow-200"}`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#E8541A] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {branding.logoAbbr}
            </div>
            <span className="text-[#E8541A] font-bold text-lg leading-tight">
              {t(branding.siteName.ko, branding.siteName.en)}<br />
              <span className="text-xs font-normal text-gray-500">
                {t(branding.siteSubtitle.ko, branding.siteSubtitle.en)}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <div
                key={item.id}
                className="relative nav-item group"
                onMouseEnter={() => setOpenMenu(i)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-5 inline-block text-gray-700 hover:text-[#E8541A] font-medium text-sm transition-colors"
                >
                  {t(item.ko, item.en)}
                </Link>
                {openMenu === i && item.children.length > 0 && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded-b-md min-w-[160px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-gray-600 hover:bg-[#FFF3EC] hover:text-[#E8541A] transition-colors whitespace-nowrap"
                      >
                        {t(child.ko, child.en)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          {navItems.map((item, i) => (
            <div key={item.id} className="border-b border-gray-50">
              <button
                className="w-full text-left px-4 py-3 font-medium text-gray-700 flex justify-between items-center"
                onClick={() => setOpenMenu(openMenu === i ? null : i)}
              >
                {t(item.ko, item.en)}
                <svg
                  className={`w-4 h-4 transition-transform ${openMenu === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenu === i && (
                <div className="bg-gray-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-[#E8541A]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(child.ko, child.en)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
