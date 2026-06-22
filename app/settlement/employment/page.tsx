"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const sections = [
  {
    title: { ko: "교육 정보", en: "Education" },
    icon: "🏫",
    items: [
      { ko: "자녀 학교 입학 절차", en: "School enrollment procedures for children" },
      { ko: "대학 입학 및 편입 안내", en: "University admission and transfer guide" },
      { ko: "장학금 및 학비 지원 정보", en: "Scholarship and tuition support information" },
      { ko: "방과 후 학교 및 교육 프로그램", en: "After-school programs" },
    ],
  },
  {
    title: { ko: "취업 정보", en: "Employment" },
    icon: "💼",
    items: [
      { ko: "외국인 취업 비자 종류 안내", en: "Work visa types for foreigners" },
      { ko: "취업 허가 및 절차", en: "Work permit and procedures" },
      { ko: "구직 사이트 및 헤드헌팅 정보", en: "Job search sites and headhunting info" },
      { ko: "직업 맞춤 검사 서비스", en: "Career aptitude testing service" },
    ],
  },
  {
    title: { ko: "직업 훈련", en: "Vocational Training" },
    icon: "🛠️",
    items: [
      { ko: "외국인 대상 직업 훈련 과정", en: "Vocational training programs for foreigners" },
      { ko: "자격증 취득 지원", en: "Certificate acquisition support" },
      { ko: "고용노동부 연계 프로그램", en: "Ministry of Employment-linked programs" },
    ],
  },
];

export default function EmploymentPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("교육/취업정보", "Education & Jobs")}
        subtitle={t("학교 진학과 취업에 관한 정보를 안내합니다.", "Information on school admissions and employment.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide"), t("교육/취업정보", "Education & Jobs")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
              <div className="text-3xl mb-3">{sec.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">{t(sec.title.ko, sec.title.en)}</h3>
              <ul className="space-y-2">
                {sec.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0 mt-1.5" />
                    {t(item.ko, item.en)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-[#e8f2fb] rounded-xl p-6 text-center">
          <p className="text-[#1a6db1] font-semibold mb-2">
            {t("취업·교육 관련 전문 상담이 필요하신가요?", "Need professional advice on employment or education?")}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            {t("위밋 센터의 전문 상담사가 개인 맞춤 안내를 제공합니다.", "Our professional counselors at WE MEET provide personalized guidance.")}
          </p>
          <Link
            href="/consultation/online"
            className="inline-block bg-[#1a6db1] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#145591] transition-colors"
          >
            {t("상담 신청하기", "Apply for Consultation")}
          </Link>
        </div>
      </div>
    </div>
  );
}
