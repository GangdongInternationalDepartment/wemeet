"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const subpages = [
  { ko: "온/오프라인 상담", en: "Online/Offline Consultation", href: "/consultation/online", desc: { ko: "오프라인 방문 및 온라인 상담 신청", en: "Apply for in-person or online consultation" } },
  { ko: "위밋행복콜센터", en: "WE MEET Call Center", href: "/consultation/callcenter", desc: { ko: "전화 상담 안내 및 운영 시간", en: "Phone consultation guide and hours" } },
  { ko: "FAQ", en: "FAQ", href: "/consultation/faq", desc: { ko: "자주 묻는 질문 모음", en: "Frequently asked questions" } },
];

export default function ConsultationPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("상담안내/신청", "Consultation")}
        subtitle={t("다양한 채널을 통해 상담을 신청하세요.", "Apply for consultation through various channels.")}
        breadcrumb={[t("홈", "Home"), t("상담안내/신청", "Consultation")]}
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
