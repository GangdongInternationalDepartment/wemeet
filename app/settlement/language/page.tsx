"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const resources = [
  {
    title: { ko: "한국어 학습", en: "Korean Language" },
    icon: "🗣️",
    items: [
      { ko: "초급·중급·고급 한국어 수업 안내", en: "Beginner, Intermediate & Advanced Korean Classes" },
      { ko: "사회통합프로그램(KIIP)", en: "Korea Immigration and Integration Program (KIIP)" },
      { ko: "온라인 한국어 학습 자료", en: "Online Korean Learning Resources" },
    ],
  },
  {
    title: { ko: "다국어 지원", en: "Multilingual Support" },
    icon: "🌐",
    items: [
      { ko: "영어, 중국어, 베트남어 등 통역 서비스", en: "Interpretation in English, Chinese, Vietnamese, and more" },
      { ko: "다국어 생활 안내 자료", en: "Multilingual daily life guides" },
      { ko: "법률·의료 통역 연계", en: "Legal & medical interpretation referrals" },
    ],
  },
  {
    title: { ko: "문화 이해", en: "Cultural Understanding" },
    icon: "🎭",
    items: [
      { ko: "한국 문화 이해 교육", en: "Korean culture education" },
      { ko: "전통 예절 및 생활 문화", en: "Traditional etiquette and daily culture" },
      { ko: "명절 및 기념일 안내", en: "Holidays and commemorative days" },
    ],
  },
];

export default function LanguagePage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("다국어학습정보", "Language Learning")}
        subtitle={t("한국어 교육 및 다국어 지원 서비스를 안내합니다.", "Korean language education and multilingual support services.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide"), t("다국어학습정보", "Language Learning")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {resources.map((res, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
              <div className="text-3xl mb-3">{res.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">{t(res.title.ko, res.title.en)}</h3>
              <ul className="space-y-2">
                {res.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0 mt-1.5" />
                    {t(item.ko, item.en)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-[#1a6db1] text-white rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">
            {t("MI MEET 한국어 프로그램에 참여하세요", "Join the MI MEET Korean Language Program")}
          </h3>
          <p className="text-blue-100 mb-6">
            {t("화·목 19:30~21:00 — 체계적인 한국어 수업을 무료로 제공합니다.", "Tue & Thu 19:30–21:00 — Free structured Korean language classes.")}
          </p>
          <Link
            href="/programs/mimeet"
            className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-full font-bold hover:bg-yellow-300 transition-colors inline-block"
          >
            {t("프로그램 자세히 보기", "Learn More")}
          </Link>
        </div>
      </div>
    </div>
  );
}
