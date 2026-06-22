"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const activities = [
  { icon: "🍳", ko: "한식 쿠킹 클래스", en: "Korean Cooking Class", desc: { ko: "한국 전통 음식을 직접 만들어보는 체험 수업", en: "Hands-on class to make traditional Korean food" } },
  { icon: "🗺️", ko: "랜드마크 투어", en: "Landmark Tour", desc: { ko: "한국의 주요 관광지와 역사 명소를 함께 탐방", en: "Exploring Korea's major tourist spots and historical sites together" } },
  { icon: "🎪", ko: "다자회 (다문화 바자회)", en: "Multicultural Fair", desc: { ko: "다양한 나라의 문화, 음식, 물건을 나누는 바자회", en: "A fair sharing cultures, foods, and goods from various countries" } },
  { icon: "🌏", ko: "세계 음식 체험", en: "World Food Experience", desc: { ko: "여러 나라의 음식을 함께 맛보고 문화를 나누는 시간", en: "Tasting foods from different countries and sharing cultures" } },
];

export default function WeMeetProgramPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("위밋프로그램", "WE MEET Program")}
        subtitle={t("일요일 — 문화 교류와 함께하는 특별한 시간", "Sundays — Special time for cultural exchange")}
        breadcrumb={[t("홈", "Home"), t("위밋 프로그램", "Programs"), t("위밋프로그램", "WE MEET Program")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 첫 수업 소개 */}
        <div className="bg-[#e8f2fb] rounded-2xl p-8 mb-10 text-center">
          <p className="text-4xl mb-3">🍕🍗</p>
          <h2 className="text-xl font-bold text-[#1a6db1] mb-2">
            {t("첫 수업 후, 첫 식사!", "After the first class, the first meal together!")}
          </h2>
          <p className="text-gray-700">
            {t(
              "맛있는 피자와 치킨 파티로 한국어 프로그램의 포문을 열었습니다 :)",
              "We kicked off the Korean language program with a delicious pizza and chicken party :)"
            )}
          </p>
        </div>

        {/* 운영 정보 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8 flex flex-col sm:flex-row gap-6 items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("운영일", "Day")}</p>
            <p className="text-2xl font-bold text-[#1a6db1]">{t("일요일", "Sunday")}</p>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("대상", "For")}</p>
            <p className="text-lg font-bold text-gray-800">{t("외국인 누구나", "All Foreigners")}</p>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("비용", "Cost")}</p>
            <p className="text-lg font-bold text-gray-800">{t("무료", "Free")}</p>
          </div>
        </div>

        {/* 활동 목록 */}
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t("주요 활동", "Key Activities")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {activities.map((act, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#1a6db1] transition-colors">
              <div className="text-3xl mb-3">{act.icon}</div>
              <h4 className="font-bold text-gray-800 mb-1">{t(act.ko, act.en)}</h4>
              <p className="text-gray-500 text-sm">{t(act.desc.ko, act.desc.en)}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/consultation/online"
            className="bg-[#1a6db1] text-white px-8 py-3 rounded-full font-bold hover:bg-[#145591] transition-colors inline-block"
          >
            {t("프로그램 참여 신청", "Apply to Join")}
          </Link>
        </div>
      </div>
    </div>
  );
}
