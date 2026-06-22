"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const sections = [
  {
    title: { ko: "외국인등록", en: "Foreigner Registration" },
    icon: "📋",
    color: "border-blue-200 bg-blue-50",
    accent: "text-blue-700",
    steps: {
      ko: [
        "입국 후 90일 이내에 관할 출입국·외국인청에 방문하여 외국인등록을 해야 합니다.",
        "필요 서류: 여권, 사진 1매, 체류지 증명서류 (임대차계약서 등), 수수료",
        "등록이 완료되면 외국인등록증이 발급됩니다 (소요 기간: 약 1~2주).",
      ],
      en: [
        "You must register as a foreigner at your local immigration office within 90 days of entry.",
        "Required documents: passport, 1 photo, proof of residence (lease contract, etc.), fee",
        "Once registered, you will receive an Alien Registration Card (takes about 1–2 weeks).",
      ],
    },
    links: [
      { ko: "하이코리아 — 외국인등록 안내", en: "HiKorea — Foreigner Registration Guide", url: "https://www.hikorea.go.kr" },
      { ko: "출입국외국인정책본부", en: "Immigration & Foreign Policy HQ", url: "https://www.immigration.go.kr" },
    ],
  },
  {
    title: { ko: "비자 종류 및 체류", en: "Visa Types & Stay" },
    icon: "✈️",
    color: "border-indigo-200 bg-indigo-50",
    accent: "text-indigo-700",
    steps: {
      ko: [
        "E-6 (예술흥행), E-7 (특정활동), D-2 (유학), F-4 (재외동포), F-5 (영주), F-6 (결혼이민) 등 목적에 맞는 비자를 확인하세요.",
        "비자 연장은 체류기간 만료 2개월 전부터 신청할 수 있습니다.",
        "비자 변경·연장은 하이코리아 온라인 또는 출입국사무소 방문으로 진행합니다.",
      ],
      en: [
        "Check visa types for your purpose: E-6 (arts/entertainment), E-7 (specific activities), D-2 (study), F-4 (overseas Korean), F-5 (permanent residency), F-6 (marriage immigrant), etc.",
        "Visa extensions can be applied for 2 months before the expiry date.",
        "Visa changes/extensions can be done online via HiKorea or by visiting an immigration office.",
      ],
    },
    links: [
      { ko: "하이코리아 비자 안내", en: "HiKorea Visa Guide", url: "https://www.hikorea.go.kr/Visa/VisaGuide.pt" },
      { ko: "전자비자 발급 신청", en: "e-Visa Application", url: "https://www.visa.go.kr" },
    ],
  },
  {
    title: { ko: "주거 정보", en: "Housing Information" },
    icon: "🏠",
    color: "border-green-200 bg-green-50",
    accent: "text-green-700",
    steps: {
      ko: [
        "한국의 주거 유형: 아파트, 빌라/다세대, 원룸, 고시원, 오피스텔 등",
        "계약 방식: 전세(보증금 전액 납부, 월세 없음), 월세(보증금 + 매월 임대료)",
        "계약 전 반드시 등기부등본을 확인하고, 필요시 전월세 신고를 하세요 (의무 신고 대상 있음).",
      ],
      en: [
        "Korean housing types: apartment, villa/multi-family, studio room, gosiwon (shared housing), officetel",
        "Contract types: Jeonse (full deposit, no monthly rent), Wolse (deposit + monthly rent)",
        "Before signing, always check the registry certificate (등기부등본) and report the lease if required.",
      ],
    },
    links: [
      { ko: "정부24 — 주거지원 안내", en: "Government24 — Housing Support", url: "https://www.gov.kr" },
      { ko: "부동산 공시가격 알리미", en: "Real Estate Price Info", url: "https://www.realtyprice.kr" },
    ],
  },
  {
    title: { ko: "의료 및 건강보험", en: "Healthcare & Insurance" },
    icon: "🏥",
    color: "border-red-200 bg-red-50",
    accent: "text-red-700",
    steps: {
      ko: [
        "외국인도 일정 기간 체류 후 국민건강보험(NHIS) 의무 가입 대상이 됩니다 (6개월 체류 기준).",
        "건강보험 지역가입자로 등록하거나, 직장이 있는 경우 직장가입자로 가입됩니다.",
        "가까운 병원/의원에서 진료를 받을 수 있으며, 119 응급 서비스 이용 시 언어 지원이 가능합니다.",
      ],
      en: [
        "Foreigners staying over 6 months are generally required to join the National Health Insurance (NHIS).",
        "You can enroll as a local subscriber or as an employee subscriber if employed.",
        "You can visit nearby clinics/hospitals, and 119 emergency services offer language support.",
      ],
    },
    links: [
      { ko: "국민건강보험공단", en: "National Health Insurance Service", url: "https://www.nhis.or.kr" },
      { ko: "외국인 건강보험 안내", en: "Foreigner Health Insurance Guide", url: "https://www.nhis.or.kr/nhis/foreignerSiteMain.do" },
    ],
  },
  {
    title: { ko: "대한민국 소개", en: "About Korea" },
    icon: "🇰🇷",
    color: "border-yellow-200 bg-yellow-50",
    accent: "text-yellow-700",
    steps: {
      ko: [
        "한국은 4계절이 뚜렷하며, 봄(3~5월), 여름(6~8월, 장마 포함), 가을(9~11월), 겨울(12~2월)이 있습니다.",
        "대중교통(지하철·버스)이 발달되어 있으며, 교통카드(T-money 등)를 이용하면 편리합니다.",
        "응급 신고: 경찰 112 / 소방·응급 119 / 생활민원 110",
      ],
      en: [
        "Korea has four distinct seasons: spring (Mar–May), summer (Jun–Aug, incl. monsoon), autumn (Sep–Nov), winter (Dec–Feb).",
        "Public transportation (subway, bus) is well-developed. Using a transit card (T-money, etc.) is convenient.",
        "Emergency contacts: Police 112 / Fire & Ambulance 119 / General Inquiry 110",
      ],
    },
    links: [
      { ko: "대한민국 구석구석 (관광 정보)", en: "Korea Tourism Official Site", url: "https://korean.visitkorea.or.kr" },
      { ko: "정부24 (민원 서비스)", en: "Government24 (Civil Services)", url: "https://www.gov.kr" },
    ],
  },
];

export default function LivingPage() {
  const { lang, t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader
        title={t("한국생활정보", "Life in Korea")}
        subtitle={t("한국 생활에 필요한 기본 정보를 안내합니다.", "Essential information for living in Korea.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide"), t("한국생활정보", "Life in Korea")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 빠른 외부 링크 */}
        <div className="bg-[#e8f2fb] rounded-xl p-5 mb-10">
          <p className="text-[#1a6db1] font-semibold text-sm mb-3">{t("주요 정부 사이트 바로가기", "Key Government Websites")}</p>
          <div className="flex flex-wrap gap-3">
            {[
              { ko: "하이코리아", en: "HiKorea", url: "https://www.hikorea.go.kr" },
              { ko: "출입국외국인정책본부", en: "Immigration HQ", url: "https://www.immigration.go.kr" },
              { ko: "정부24", en: "Government24", url: "https://www.gov.kr" },
              { ko: "국민건강보험", en: "NHIS", url: "https://www.nhis.or.kr" },
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
                  <ol className="space-y-3 mt-4 mb-5">
                    {(lang === "ko" ? sec.steps.ko : sec.steps.en).map((step, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-700 text-sm">
                        <span className="w-6 h-6 bg-[#1a6db1] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {j + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold">{t("관련 사이트", "Related Sites")}</p>
                    <div className="flex flex-wrap gap-2">
                      {sec.links.map((link, j) => (
                        <a
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#1a6db1] text-xs font-medium hover:underline"
                        >
                          {t(link.ko, link.en)} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 상담 CTA */}
        <div className="mt-10 bg-[#1a6db1] text-white rounded-xl p-6 text-center">
          <p className="font-semibold mb-2">
            {t("직접 도움이 필요하신가요?", "Need personal assistance?")}
          </p>
          <p className="text-blue-100 text-sm mb-4">
            {t("위밋 센터의 전문 상담사가 한국 정착을 도와드립니다.", "WE MEET's professional counselors can help you settle in Korea.")}
          </p>
          <a
            href="/consultation/online"
            className="inline-block bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-300 transition-colors"
          >
            {t("전문 상담 신청하기", "Apply for Consultation")}
          </a>
        </div>
      </div>
    </div>
  );
}
