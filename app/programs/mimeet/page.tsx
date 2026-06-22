"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const subjects = [
  { icon: "📖", ko: "한국어 수업", en: "Korean Language Class", desc: { ko: "체계적인 커리큘럼으로 한국어를 배웁니다.", en: "Learn Korean with a structured curriculum." } },
  { icon: "🎯", ko: "직업 맞춤 검사", en: "Career Aptitude Test", desc: { ko: "자신에게 맞는 직업을 탐색하는 검사 및 상담", en: "Assessment and counseling to explore suitable career paths." } },
];

export default function MiMeetProgramPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("미밋프로그램", "MI MEET Program")}
        subtitle={t("화·목 저녁 — 한국어 & 커리어 개발 프로그램", "Tue & Thu evenings — Korean language & career development")}
        breadcrumb={[t("홈", "Home"), t("위밋 프로그램", "Programs"), t("미밋프로그램", "MI MEET Program")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 운영 정보 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-[#1a6db1] text-lg mb-4">{t("프로그램 정보", "Program Info")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: { ko: "운영일", en: "Day" }, value: { ko: "화요일 · 목요일", en: "Tue & Thu" } },
              { label: { ko: "시간", en: "Time" }, value: { ko: "19:30 ~ 21:00", en: "19:30–21:00" } },
              { label: { ko: "대상", en: "For" }, value: { ko: "외국인 누구나", en: "All Foreigners" } },
              { label: { ko: "비용", en: "Cost" }, value: { ko: "무료", en: "Free" } },
            ].map((info, i) => (
              <div key={i} className="bg-[#e8f2fb] rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">{t(info.label.ko, info.label.en)}</p>
                <p className="font-bold text-[#1a6db1]">{t(info.value.ko, info.value.en)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 수업 내용 */}
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t("수업 내용", "Curriculum")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {subjects.map((sub, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
              <div className="text-3xl mb-3">{sub.icon}</div>
              <h4 className="font-bold text-gray-800 mb-2">{t(sub.ko, sub.en)}</h4>
              <p className="text-gray-500 text-sm">{t(sub.desc.ko, sub.desc.en)}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1a6db1] text-white rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">{t("MI MEET에 함께하세요", "Join MI MEET")}</h3>
          <p className="text-blue-100 mb-6">
            {t("화요일과 목요일 저녁, 함께 배우고 성장하는 시간을 만들어 드립니다.", "Tuesday and Thursday evenings — a time to learn and grow together.")}
          </p>
          <Link
            href="/consultation/online"
            className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-full font-bold hover:bg-yellow-300 transition-colors inline-block"
          >
            {t("참여 신청하기", "Apply Now")}
          </Link>
        </div>
      </div>
    </div>
  );
}
