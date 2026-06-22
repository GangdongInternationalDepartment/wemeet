"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const categories = [
  {
    title: { ko: "대한민국 소개", en: "About Korea" },
    icon: "🇰🇷",
    items: [
      { ko: "한국의 역사와 문화", en: "Korean History & Culture" },
      { ko: "지역별 생활 환경", en: "Regional Living Environment" },
      { ko: "기후와 계절", en: "Climate & Seasons" },
    ],
  },
  {
    title: { ko: "외국인등록", en: "Foreigner Registration" },
    icon: "📋",
    items: [
      { ko: "외국인등록증 발급 절차", en: "Alien Registration Card Procedure" },
      { ko: "등록 필요 서류", en: "Required Documents" },
      { ko: "출입국관리소 안내", en: "Immigration Office Guide" },
    ],
  },
  {
    title: { ko: "거주관련정보", en: "Residence Information" },
    icon: "🏠",
    items: [
      { ko: "주거 유형 (아파트/원룸/고시원)", en: "Housing Types (Apartment/Studio/Gosiwon)" },
      { ko: "전세/월세 계약 방법", en: "Lease Contract Guide" },
      { ko: "생활 편의시설 이용", en: "Amenities & Facilities" },
    ],
  },
  {
    title: { ko: "비자", en: "Visa" },
    icon: "✈️",
    items: [
      { ko: "비자 종류별 안내", en: "Visa Types" },
      { ko: "비자 연장 및 변경", en: "Visa Extension & Change" },
      { ko: "영주권/귀화 안내", en: "Permanent Residency & Naturalization" },
    ],
  },
];

export default function LivingPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("한국생활정보", "Life in Korea")}
        subtitle={t("한국 생활에 필요한 기본 정보를 안내합니다.", "Basic information you need for life in Korea.")}
        breadcrumb={[t("홈", "Home"), t("한국정착정보", "Settlement Guide"), t("한국생활정보", "Life in Korea")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="text-lg font-bold text-gray-800">{t(cat.title.ko, cat.title.en)}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0" />
                    {t(item.ko, item.en)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#e8f2fb] rounded-xl p-6 text-center">
          <p className="text-[#1a6db1] font-semibold mb-3">
            {t("더 자세한 정보가 필요하신가요?", "Need more detailed information?")}
          </p>
          <a
            href="/consultation/online"
            className="inline-block bg-[#1a6db1] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#145591] transition-colors"
          >
            {t("전문 상담 신청하기", "Apply for Professional Consultation")}
          </a>
        </div>
      </div>
    </div>
  );
}
