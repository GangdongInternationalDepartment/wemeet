"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const subpages = [
  { ko: "한국생활정보", en: "Life in Korea", href: "/settlement/living", desc: { ko: "외국인등록, 비자, 거주관련 정보", en: "Foreigner registration, visa, and residence information" } },
  { ko: "다국어학습정보", en: "Language Learning", href: "/settlement/language", desc: { ko: "한국어 및 다국어 교육 정보", en: "Korean and multilingual education resources" } },
  { ko: "교육/취업정보", en: "Education & Jobs", href: "/settlement/employment", desc: { ko: "학교 진학 및 취업 관련 안내", en: "School admissions and employment guidance" } },
];

export default function SettlementPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("한국정착정보", "Korea Settlement Guide")}
        subtitle={t("한국 생활에 필요한 정보를 안내합니다.", "Information you need to settle in Korea.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide")]}
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
