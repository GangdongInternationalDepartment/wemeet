"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const purposes = [
  {
    ko: { title: "다문화가족 안정적 정착", desc: "초기 정착 지원 및 다양한 서비스를 제공하여 외국인 가족이 한국 사회에 안정적으로 뿌리내릴 수 있도록 돕습니다." },
    en: { title: "Stable Settlement", desc: "We help multicultural families take root in Korean society by providing initial settlement support and diverse services." },
  },
  {
    ko: { title: "사회 통합과 차별 해소", desc: "문화적 차이로 인한 차별을 예방하고, 서로를 이해하며 공존하는 사회를 만들기 위한 프로그램을 운영합니다." },
    en: { title: "Social Integration", desc: "We operate programs to prevent discrimination based on cultural differences and create a society of mutual understanding." },
  },
  {
    ko: { title: "정책 개발과 권익 보호", desc: "외국인과 다문화 가정의 권익을 보호하고, 관련 정책 개발에 참여하여 제도적 개선을 이끌어냅니다." },
    en: { title: "Rights Protection", desc: "We protect the rights of foreigners and multicultural families and advocate for policy improvements." },
  },
  {
    ko: { title: "문화 교류와 상호 이해", desc: "다문화 가족과 지역사회가 서로의 문화를 나누고 이해할 수 있는 교류의 장을 마련합니다." },
    en: { title: "Cultural Exchange", desc: "We create spaces for multicultural families and local communities to share and understand each other's cultures." },
  },
  {
    ko: { title: "심리·정서적 지원", desc: "낯선 환경에서 겪는 심리적 어려움을 전문 상담과 커뮤니티 활동을 통해 지원합니다." },
    en: { title: "Psychological Support", desc: "We support the psychological difficulties of adapting to a new environment through professional counseling and community activities." },
  },
];

export default function PurposePage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("설립의도", "Our Purpose")}
        subtitle={t("우리가 만나다 — WE MEET 다문화 행복", "Where We Meet — WE MEET Multicultural Happiness")}
        breadcrumb={[t("홈", "Home"), t("위밋 소개", "About Us"), t("설립의도", "Our Purpose")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="bg-[#FFF3EC] rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold text-[#E8541A] mb-4">
            {t("\"우리가 만나다 — WE MEET 다문화 행복\"", "\"Where We Meet — Multicultural Happiness\"")}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t(
              "다양한 문화와 배경을 가진 사람들이 한국 사회에서 서로를 이해하고 함께 성장할 수 있는 공간을 제공하기 위해 설립되었습니다.",
              "We were established to provide a space where people of diverse cultures and backgrounds can understand each other and grow together in Korean society."
            )}
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {t("5대 설립 의도", "5 Core Purposes")}
        </h3>
        <div className="space-y-5">
          {purposes.map((item, i) => (
            <div key={i} className="flex gap-5 bg-white border border-gray-100 rounded-xl p-6 hover:border-[#E8541A] transition-colors">
              <div className="w-10 h-10 bg-[#E8541A] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-1">
                  {t(item.ko.title, item.en.title)}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t(item.ko.desc, item.en.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
