"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const sections = [
  {
    title: { ko: "한국어 교육 기관", en: "Korean Language Institutions" },
    icon: "🗣️",
    color: "border-blue-200 bg-blue-50",
    accent: "text-blue-700",
    items: {
      ko: [
        { label: "사회통합프로그램 (KIIP)", desc: "법무부 운영 — 5단계 한국어·한국사회이해 과정 / 수료 시 귀화·영주권 심사 가점", url: "https://www.kiip.kr" },
        { label: "세종학당", desc: "전 세계 한국어 보급 기관 / 온라인 학습 콘텐츠 무료 제공", url: "https://www.sejonglearning.org" },
        { label: "국립국어원 한국어교수학습샘터", desc: "국립국어원 운영 학습 자료·교재 무료 다운로드", url: "https://kcenter.korean.go.kr" },
        { label: "EBS 한국어 (외국인용)", desc: "TV·온라인으로 무료 한국어 강좌 시청 가능", url: "https://www.ebs.co.kr" },
      ],
      en: [
        { label: "KIIP (Korea Immigration Integration Program)", desc: "Ministry of Justice — 5-level Korean language & society course / Extra points for naturalization/PR applications", url: "https://www.kiip.kr" },
        { label: "Sejong Institute", desc: "Global Korean language institution / Free online learning content", url: "https://www.sejonglearning.org" },
        { label: "NIKL Korean Teaching & Learning Center", desc: "Free learning materials and textbooks from the National Institute of Korean Language", url: "https://kcenter.korean.go.kr" },
        { label: "EBS Korean (for foreigners)", desc: "Free Korean language programs available on TV and online", url: "https://www.ebs.co.kr" },
      ],
    },
  },
  {
    title: { ko: "온라인 한국어 학습", en: "Online Korean Learning" },
    icon: "💻",
    color: "border-indigo-200 bg-indigo-50",
    accent: "text-indigo-700",
    items: {
      ko: [
        { label: "Talk To Me In Korean (TTMIK)", desc: "영어 기반 한국어 학습 사이트 — 문법·회화·교재 제공", url: "https://talktomeinkorean.com" },
        { label: "How to Study Korean", desc: "영어 설명으로 한국어 문법을 체계적으로 배울 수 있는 무료 사이트", url: "https://www.howtostudykorean.com" },
        { label: "Naver 한국어사전", desc: "영어·중국어·일본어 등 다국어 지원 한국어 사전", url: "https://dict.naver.com" },
        { label: "Papago 번역", desc: "네이버 번역기 — 한국어·영어·중국어·베트남어 등 지원", url: "https://papago.naver.com" },
      ],
      en: [
        { label: "Talk To Me In Korean (TTMIK)", desc: "English-based Korean learning site — grammar, conversation, and textbooks", url: "https://talktomeinkorean.com" },
        { label: "How to Study Korean", desc: "Free site for systematic Korean grammar learning with English explanations", url: "https://www.howtostudykorean.com" },
        { label: "Naver Korean Dictionary", desc: "Korean dictionary with multilingual support (English, Chinese, Japanese, etc.)", url: "https://dict.naver.com" },
        { label: "Papago Translate", desc: "Naver translator — supports Korean, English, Chinese, Vietnamese, and more", url: "https://papago.naver.com" },
      ],
    },
  },
  {
    title: { ko: "다국어 지원 서비스", en: "Multilingual Support Services" },
    icon: "🌐",
    color: "border-green-200 bg-green-50",
    accent: "text-green-700",
    items: {
      ko: [
        { label: "다누리 (다문화가족지원포털)", desc: "13개 언어 지원 — 한국생활 안내, 통번역 서비스 제공", url: "https://www.liveinkorea.kr" },
        { label: "전화 통역 서비스 (1588-0050)", desc: "24시간 무료 다국어 전화 통역 서비스 (경찰청 운영)", url: "https://www.police.go.kr" },
        { label: "외국인 종합안내센터 (1345)", desc: "13개 언어로 비자·체류·생활 전반 안내", url: "https://www.immigration.go.kr" },
      ],
      en: [
        { label: "Danuri (Multicultural Family Portal)", desc: "13 languages supported — Korean life guide, translation and interpretation services", url: "https://www.liveinkorea.kr" },
        { label: "Phone Interpretation Service (1588-0050)", desc: "24-hour free multilingual phone interpretation (operated by National Police Agency)", url: "https://www.police.go.kr" },
        { label: "Foreign Residents Information Center (1345)", desc: "Visa, residency, and daily life guidance in 13 languages", url: "https://www.immigration.go.kr" },
      ],
    },
  },
  {
    title: { ko: "한국어 시험 안내", en: "Korean Proficiency Tests" },
    icon: "📝",
    color: "border-yellow-200 bg-yellow-50",
    accent: "text-yellow-700",
    items: {
      ko: [
        { label: "TOPIK (한국어능력시험)", desc: "전 세계 응시 가능 / TOPIK I (1~2급) · TOPIK II (3~6급) / 취업·유학·귀화에 활용", url: "https://www.topik.go.kr" },
        { label: "사회통합프로그램 사전평가", desc: "KIIP 등록 시 레벨 배정을 위한 사전 평가 (온라인·오프라인)", url: "https://www.kiip.kr" },
      ],
      en: [
        { label: "TOPIK (Test of Proficiency in Korean)", desc: "Available worldwide / TOPIK I (Lv.1–2) · TOPIK II (Lv.3–6) / Used for employment, study, and naturalization", url: "https://www.topik.go.kr" },
        { label: "KIIP Pre-evaluation", desc: "Level placement test for KIIP registration (online and offline)", url: "https://www.kiip.kr" },
      ],
    },
  },
];

export default function LanguagePage() {
  const { lang, t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader
        title={t("다국어학습정보", "Language Learning")}
        subtitle={t("한국어 교육 및 다국어 지원 서비스를 안내합니다.", "Korean language education and multilingual support services.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide"), t("다국어학습정보", "Language Learning")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 빠른 외부 링크 */}
        <div className="bg-[#e8f2fb] rounded-xl p-5 mb-10">
          <p className="text-[#1a6db1] font-semibold text-sm mb-3">{t("주요 학습 사이트 바로가기", "Key Learning Websites")}</p>
          <div className="flex flex-wrap gap-3">
            {[
              { ko: "KIIP 사회통합프로그램", en: "KIIP Program", url: "https://www.kiip.kr" },
              { ko: "TOPIK 시험", en: "TOPIK Test", url: "https://www.topik.go.kr" },
              { ko: "다누리 포털", en: "Danuri Portal", url: "https://www.liveinkorea.kr" },
              { ko: "외국인 안내 1345", en: "Info Center 1345", url: "https://www.immigration.go.kr" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1a6db1] border border-[#1a6db1] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#1a6db1] hover:text-white transition-colors"
              >
                {t(link.ko, link.en)} ↗
              </a>
            ))}
          </div>
        </div>

        {/* 아코디언 섹션 */}
        <div className="space-y-4">
          {sections.map((sec, i) => (
            <div key={i} className={`border-2 rounded-xl overflow-hidden ${sec.color}`}>
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sec.icon}</span>
                  <span className={`font-bold text-lg ${sec.accent}`}>{t(sec.title.ko, sec.title.en)}</span>
                </div>
                <svg
                  className={`w-5 h-5 ${sec.accent} flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 bg-white border-t border-gray-100">
                  <ul className="space-y-4 mt-4">
                    {(lang === "ko" ? sec.items.ko : sec.items.en).map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0 mt-2" />
                        <div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#1a6db1] hover:underline text-sm"
                          >
                            {item.label} ↗
                          </a>
                          <p className="text-gray-600 text-sm mt-0.5">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MI MEET 프로그램 배너 */}
        <div className="mt-10 bg-[#1a6db1] text-white rounded-xl p-8 text-center">
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
