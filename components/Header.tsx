"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

const navItems = [
  {
    ko: "한국정착정보",
    en: "Settlement Guide",
    href: "/settlement",
    children: [
      { ko: "한국생활정보", en: "Life in Korea", href: "/settlement/living" },
      { ko: "다국어학습정보", en: "Language Learning", href: "/settlement/language" },
      { ko: "교육/취업정보", en: "Education & Jobs", href: "/settlement/employment" },
    ],
  },
  {
    ko: "위밋 소개",
    en: "About Us",
    href: "/about",
    children: [
      { ko: "설립의도", en: "Our Purpose", href: "/about/purpose" },
      { ko: "센터위치", en: "Location", href: "/about/location" },
      { ko: "운영시간", en: "Hours", href: "/about/hours" },
      { ko: "협력기관", en: "Partners", href: "/about/partners" },
    ],
  },
  {
    ko: "위밋 프로그램",
    en: "Programs",
    href: "/programs",
    children: [
      { ko: "위밋프로그램", en: "WE MEET Program", href: "/programs/wemeet" },
      { ko: "미밋프로그램", en: "MI MEET Program", href: "/programs/mimeet" },
      { ko: "프로그램후기", en: "Reviews", href: "/programs/reviews" },
    ],
  },
  {
    ko: "알림공간",
    en: "News",
    href: "/news",
    children: [
      { ko: "알림톡톡", en: "Newsletter", href: "/news/newsletter" },
      { ko: "이벤트", en: "Events", href: "/news/events" },
      { ko: "갤러리", en: "Gallery", href: "/news/gallery" },
    ],
  },
  {
    ko: "상담안내/신청",
    en: "Consultation",
    href: "/consultation",
    children: [
      { ko: "온/오프라인 상담", en: "Online/Offline", href: "/consultation/online" },
      { ko: "위밋행복콜센터", en: "Call Center", href: "/consultation/callcenter" },
      { ko: "FAQ", en: "FAQ", href: "/consultation/faq" },
    ],
  },
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1a6db1] text-white text-sm py-1.5">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="font-semibold tracking-wide">WE MEET 다문화 행복센터</span>
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
            <div className="w-9 h-9 bg-[#1a6db1] rounded-full flex items-center justify-center text-white font-bold text-sm">
              WM
            </div>
            <span className="text-[#1a6db1] font-bold text-lg leading-tight">
              WE MEET<br />
              <span className="text-xs font-normal text-gray-500">다문화 행복센터</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <div
                key={i}
                className="relative nav-item group"
                onMouseEnter={() => setOpenMenu(i)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-5 inline-block text-gray-700 hover:text-[#1a6db1] font-medium text-sm transition-colors"
                >
                  {t(item.ko, item.en)}
                </Link>
                {openMenu === i && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded-b-md min-w-[160px] z-50">
                    {item.children.map((child, j) => (
                      <Link
                        key={j}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-gray-600 hover:bg-[#e8f2fb] hover:text-[#1a6db1] transition-colors whitespace-nowrap"
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
            <div key={i} className="border-b border-gray-50">
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
                  {item.children.map((child, j) => (
                    <Link
                      key={j}
                      href={child.href}
                      className="block px-8 py-2.5 text-sm text-gray-600 hover:text-[#1a6db1]"
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
