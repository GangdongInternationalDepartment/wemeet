"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const subpages = [
  { ko: "설립의도", en: "Our Purpose", href: "/about/purpose" },
  { ko: "센터위치", en: "Location", href: "/about/location" },
  { ko: "운영시간", en: "Operating Hours", href: "/about/hours" },
  { ko: "협력기관", en: "Partner Organizations", href: "/about/partners" },
];

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("위밋 소개", "About WE MEET")}
        subtitle={t("WE MEET 다문화 행복센터를 소개합니다.", "Learn about WE MEET Multicultural Happiness Center.")}
        breadcrumb={[t("홈", "Home"), t("위밋 소개", "About Us")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {subpages.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="border rounded-xl p-8 bg-white hover:border-[#E8541A] hover:shadow-md transition-all group"
          >
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#E8541A] transition-colors">
              {t(p.ko, p.en)}
            </h2>
            <span className="mt-2 inline-block text-[#E8541A] text-sm">{t("바로가기 →", "Go →")}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
