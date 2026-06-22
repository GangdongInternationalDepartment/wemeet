"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const sections = [
  {
    title: { ko: "자녀 교육 정보", en: "Children's Education" },
    icon: "🏫",
    color: "border-blue-200 bg-blue-50",
    accent: "text-blue-700",
    items: {
      ko: [
        { label: "초·중·고등학교 입학", desc: "주소지 관할 교육지원청에 문의하면 학교 배정을 받을 수 있습니다. 체류 자격에 관계없이 입학 가능합니다.", url: "https://www.moe.go.kr" },
        { label: "다문화학생 교육지원", desc: "교육부 운영 — 한국어 교육, 이중언어 교육, 심리·정서 지원 등 제공", url: "https://www.moe.go.kr" },
        { label: "대학 입학 (외국인 특별전형)", desc: "각 대학은 외국인 학생 특별 전형을 운영합니다. 지원 자격·서류는 각 대학 입학처에 문의하세요.", url: "https://www.adiga.kr" },
        { label: "장학금 안내", desc: "정부초청장학금(GKS), 각 대학 장학금, 다문화가족 자녀 지원 장학금 등이 있습니다.", url: "https://www.studyinkorea.go.kr" },
      ],
      en: [
        { label: "Elementary/Middle/High School Enrollment", desc: "Contact your district's Education Support Office. Foreign children can enroll regardless of visa status.", url: "https://www.moe.go.kr" },
        { label: "Multicultural Student Education Support", desc: "Ministry of Education — Korean language education, bilingual education, psychological support, and more", url: "https://www.moe.go.kr" },
        { label: "University Admission (Special Track for Foreign Students)", desc: "Most universities have special admissions tracks for foreign students. Contact each university's admissions office for requirements.", url: "https://www.adiga.kr" },
        { label: "Scholarships", desc: "Government Scholarship (GKS), university scholarships, and multicultural family scholarship programs are available.", url: "https://www.studyinkorea.go.kr" },
      ],
    },
  },
  {
    title: { ko: "취업 비자 및 허가", en: "Work Visa & Permit" },
    icon: "🪪",
    color: "border-indigo-200 bg-indigo-50",
    accent: "text-indigo-700",
    items: {
      ko: [
        { label: "주요 취업 비자 종류", desc: "E-7(특정활동), E-9(비전문취업), E-4(기술지도), F-2(거주), F-5(영주) 등. 비자 종류에 따라 취업 가능 업종이 다릅니다.", url: "https://www.hikorea.go.kr" },
        { label: "고용허가제 (EPS)", desc: "비전문 외국인근로자(E-9)를 위한 제도. 한국산업인력공단을 통해 신청합니다.", url: "https://www.eps.go.kr" },
        { label: "체류자격 외 활동 허가", desc: "비취업 비자 소지자도 허가를 받으면 일부 아르바이트 가능. 출입국사무소에 신청.", url: "https://www.immigration.go.kr" },
        { label: "근로 계약 및 노동법", desc: "외국인 근로자도 최저임금, 주휴수당, 4대 보험 적용 대상입니다. 부당 대우 시 노동부에 신고하세요.", url: "https://www.moel.go.kr" },
      ],
      en: [
        { label: "Key Work Visa Types", desc: "E-7 (specific activities), E-9 (non-professional), E-4 (technology guidance), F-2 (residence), F-5 (permanent). Permitted industries vary by visa type.", url: "https://www.hikorea.go.kr" },
        { label: "Employment Permit System (EPS)", desc: "System for non-professional foreign workers (E-9). Apply through the Human Resources Development Service of Korea (HRD Korea).", url: "https://www.eps.go.kr" },
        { label: "Activity Outside of Visa Status (Part-time Work)", desc: "Non-work visa holders may work part-time with a special permit. Apply at your local immigration office.", url: "https://www.immigration.go.kr" },
        { label: "Labor Contracts & Labor Law", desc: "Foreign workers are also entitled to minimum wage, weekly holiday pay, and four major insurances. Report unfair treatment to the Ministry of Employment.", url: "https://www.moel.go.kr" },
      ],
    },
  },
  {
    title: { ko: "구직 및 취업 사이트", en: "Job Search Platforms" },
    icon: "💼",
    color: "border-green-200 bg-green-50",
    accent: "text-green-700",
    items: {
      ko: [
        { label: "워크넷 (Work Net)", desc: "고용노동부 공식 구인·구직 플랫폼. 외국인 취업 정보도 포함", url: "https://www.work.go.kr" },
        { label: "고용24", desc: "실업급여·직업훈련·취업 지원 통합 서비스 포털", url: "https://www.work24.go.kr" },
        { label: "사람인", desc: "한국 최대 민간 구인·구직 사이트 중 하나", url: "https://www.saramin.co.kr" },
        { label: "잡코리아", desc: "채용 공고·이력서 등록·커리어 정보 제공 사이트", url: "https://www.jobkorea.co.kr" },
        { label: "외국인 고용허가제 (EPS-TOPIK)", desc: "E-9 비자 지원 시 한국어 능력시험(EPS-TOPIK) 응시 필요", url: "https://eps.hrdkorea.or.kr" },
      ],
      en: [
        { label: "Work Net", desc: "Official Ministry of Employment job portal, including foreign worker listings", url: "https://www.work.go.kr" },
        { label: "Go24 (Work24)", desc: "Integrated portal for unemployment benefits, vocational training, and job support", url: "https://www.work24.go.kr" },
        { label: "Saramin", desc: "One of Korea's largest private job platforms", url: "https://www.saramin.co.kr" },
        { label: "JobKorea", desc: "Job listings, resume registration, and career info platform", url: "https://www.jobkorea.co.kr" },
        { label: "EPS-TOPIK (Employment Permit Korean Test)", desc: "An EPS-TOPIK Korean language test is required to apply for E-9 visa positions", url: "https://eps.hrdkorea.or.kr" },
      ],
    },
  },
  {
    title: { ko: "직업 훈련", en: "Vocational Training" },
    icon: "🛠️",
    color: "border-yellow-200 bg-yellow-50",
    accent: "text-yellow-700",
    items: {
      ko: [
        { label: "국민내일배움카드", desc: "실업자·재직자 대상 직업훈련비 지원 카드. 외국인도 일부 자격 충족 시 발급 가능", url: "https://www.hrd.go.kr" },
        { label: "한국산업인력공단 (HRD Korea)", desc: "직업훈련·자격증·EPS-TOPIK 관련 업무 총괄 기관", url: "https://www.hrdkorea.or.kr" },
        { label: "직업능력개발훈련 포털 (HRD-Net)", desc: "전국 훈련 과정 검색 및 신청 가능", url: "https://www.hrd.go.kr" },
      ],
      en: [
        { label: "National Lifelong Learning Card", desc: "Job training cost support card for unemployed/employed. Foreigners may qualify if they meet requirements.", url: "https://www.hrd.go.kr" },
        { label: "HRD Korea (Human Resources Development Service)", desc: "Agency overseeing vocational training, certifications, and EPS-TOPIK", url: "https://www.hrdkorea.or.kr" },
        { label: "HRD-Net (Vocational Training Portal)", desc: "Search and apply for training courses nationwide", url: "https://www.hrd.go.kr" },
      ],
    },
  },
];

export default function EmploymentPage() {
  const { lang, t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader
        title={t("교육/취업정보", "Education & Jobs")}
        subtitle={t("학교 진학과 취업에 관한 실용 정보를 안내합니다.", "Practical information on school admissions and employment.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide"), t("교육/취업정보", "Education & Jobs")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 빠른 외부 링크 */}
        <div className="bg-[#e8f2fb] rounded-xl p-5 mb-10">
          <p className="text-[#1a6db1] font-semibold text-sm mb-3">{t("주요 사이트 바로가기", "Key Websites")}</p>
          <div className="flex flex-wrap gap-3">
            {[
              { ko: "워크넷 (구직)", en: "WorkNet (Jobs)", url: "https://www.work.go.kr" },
              { ko: "고용허가제 EPS", en: "EPS System", url: "https://www.eps.go.kr" },
              { ko: "HRD-Net (직업훈련)", en: "HRD-Net (Training)", url: "https://www.hrd.go.kr" },
              { ko: "교육부", en: "Ministry of Education", url: "https://www.moe.go.kr" },
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

        {/* 상담 CTA */}
        <div className="mt-10 bg-[#e8f2fb] rounded-xl p-6 text-center">
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
