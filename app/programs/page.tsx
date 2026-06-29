"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const subpages = [
  { ko: "위밋프로그램", en: "WE MEET Program", href: "/programs/wemeet", desc: { ko: "일요일 진행 — 문화 체험 및 교류 프로그램", en: "Sundays — Cultural experience and exchange programs" } },
  { ko: "미밋프로그램", en: "MI MEET Program", href: "/programs/mimeet", desc: { ko: "화·목 저녁 — 한국어 수업 및 직업 검사", en: "Tue & Thu evenings — Korean class and career aptitude test" } },
  { ko: "프로그램후기", en: "Reviews", href: "/programs/reviews", desc: { ko: "참여자들의 생생한 후기를 확인하세요.", en: "Read firsthand reviews from program participants." } },
];

export default function ProgramsPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("위밋 프로그램", "WE MEET Programs")}
        subtitle={t("다양한 문화와 사람이 함께하는 프로그램", "Programs where diverse cultures and people come together")}
        breadcrumb={[t("홈", "Home"), t("위밋 프로그램", "Programs")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {subpages.map((p, i) => (
          <Link key={i} href={p.href} className="border rounded-xl p-8 bg-white hover:border-[#E8541A] hover:shadow-md transition-all group">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#E8541A] transition-colors mb-2">{t(p.ko, p.en)}</h2>
            <p className="text-gray-500 text-sm">{t(p.desc.ko, p.desc.en)}</p>
            <span className="mt-4 inline-block text-[#E8541A] text-sm">{t("바로가기 →", "Go →")}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
