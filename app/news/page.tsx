"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const subpages = [
  { ko: "알림톡톡", en: "Newsletter", href: "/news/newsletter", desc: { ko: "최신 소식과 공지사항을 확인하세요.", en: "Check the latest news and announcements." } },
  { ko: "이벤트", en: "Events", href: "/news/events", desc: { ko: "위밋 센터의 이벤트 일정을 확인하세요.", en: "Check WE MEET's upcoming event schedule." } },
  { ko: "갤러리", en: "Gallery", href: "/news/gallery", desc: { ko: "프로그램 활동 사진을 구경하세요.", en: "Browse photos from our program activities." } },
];

export default function NewsPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("알림공간", "News & Announcements")}
        subtitle={t("위밋의 최신 소식을 확인하세요.", "Check WE MEET's latest news.")}
        breadcrumb={[t("홈", "Home"), t("알림공간", "News")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {subpages.map((p, i) => (
          <Link key={i} href={p.href} className="border rounded-xl p-8 bg-white hover:border-[#1a6db1] hover:shadow-md transition-all group">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#1a6db1] transition-colors mb-2">{t(p.ko, p.en)}</h2>
            <p className="text-gray-500 text-sm">{t(p.desc.ko, p.desc.en)}</p>
            <span className="mt-4 inline-block text-[#1a6db1] text-sm">{t("바로가기 →", "Go →")}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
