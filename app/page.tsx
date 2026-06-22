"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const programs = [
  {
    title: { ko: "WE MEET 프로그램", en: "WE MEET Program" },
    desc: {
      ko: "일요일 진행 — 한식 쿠킹 클래스, 랜드마크 투어, 다자회, 세계 음식 체험",
      en: "Sundays — Korean cooking class, landmark tour, multicultural fair, world food experience",
    },
    href: "/programs/wemeet",
    color: "bg-blue-50 border-blue-200",
    icon: "🌍",
  },
  {
    title: { ko: "MI MEET 프로그램", en: "MI MEET Program" },
    desc: {
      ko: "화·목 19:30~21:00 — 한국어 수업, 직업 맞춤 검사 등",
      en: "Tue & Thu 19:30–21:00 — Korean language class, career aptitude test, and more",
    },
    href: "/programs/mimeet",
    color: "bg-indigo-50 border-indigo-200",
    icon: "📚",
  },
  {
    title: { ko: "온/오프라인 상담", en: "Consultation" },
    desc: {
      ko: "비자, 생활, 취업, 심리 등 다양한 분야의 전문 상담 서비스",
      en: "Professional counseling on visa, daily life, employment, mental health, and more",
    },
    href: "/consultation/online",
    color: "bg-sky-50 border-sky-200",
    icon: "💬",
  },
];

const infoLinks = [
  {
    ko: "한국생활정보",
    en: "Life in Korea",
    href: "/settlement/living",
    desc: { ko: "외국인등록, 비자, 거주 정보", en: "Foreigner registration, visa, residence" },
  },
  {
    ko: "다국어학습정보",
    en: "Language Learning",
    href: "/settlement/language",
    desc: { ko: "한국어 및 다국어 교육 정보", en: "Korean and multilingual education" },
  },
  {
    ko: "교육/취업정보",
    en: "Education & Jobs",
    href: "/settlement/employment",
    desc: { ko: "학교 진학 및 취업 관련 정보", en: "School admissions and job information" },
  },
];

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a6db1] via-[#1e7fd4] to-[#2590e0] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="text-blue-200 uppercase tracking-widest text-sm mb-4 font-medium">
            WM Global Community
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {t("우리가 만나다", "Where We Meet")}
            <br />
            <span className="text-yellow-300">WE MEET</span>{" "}
            {t("다문화 행복센터", "Multicultural Happiness Center")}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            {t(
              "한국에 정착하는 외국인 분들을 위해 안정된 삶을 가질 수 있도록 다양한 프로그램과 상담 서비스를 제공합니다.",
              "We provide various programs and counseling services to help foreigners build a stable life in Korea."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation/online"
              className="bg-yellow-400 text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-yellow-300 transition-colors"
            >
              {t("상담 신청하기", "Apply for Consultation")}
            </Link>
            <Link
              href="/about/purpose"
              className="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-[#1a6db1] transition-colors"
            >
              {t("위밋 소개", "About WE MEET")}
            </Link>
          </div>
        </div>
      </section>

      {/* 5대 설립의도 배너 */}
      <section className="bg-[#e8f2fb] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-center text-sm">
            {[
              { ko: "다문화가족 안정적 정착", en: "Stable Settlement" },
              { ko: "사회 통합과 차별 해소", en: "Social Integration" },
              { ko: "정책 개발과 권익 보호", en: "Rights Protection" },
              { ko: "문화 교류와 상호 이해", en: "Cultural Exchange" },
              { ko: "심리·정서적 지원", en: "Psychological Support" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[#1a6db1] font-medium">
                <span className="w-6 h-6 bg-[#1a6db1] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {t(item.ko, item.en)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1a6db1] font-semibold text-sm uppercase tracking-wider mb-2">Programs</p>
            <h2 className="text-3xl font-bold text-gray-800">{t("위밋 프로그램", "WE MEET Programs")}</h2>
            <p className="text-gray-500 mt-3">
              {t(
                "다양한 문화와 사람이 함께하는 프로그램에 참여하세요.",
                "Join programs where diverse cultures and people come together."
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <Link
                key={i}
                href={prog.href}
                className={`border rounded-xl p-6 ${prog.color} hover:shadow-md transition-shadow`}
              >
                <div className="text-4xl mb-4">{prog.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{t(prog.title.ko, prog.title.en)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t(prog.desc.ko, prog.desc.en)}</p>
                <span className="mt-4 inline-block text-[#1a6db1] text-sm font-semibold">
                  {t("자세히 보기 →", "Learn more →")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 한국정착정보 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1a6db1] font-semibold text-sm uppercase tracking-wider mb-2">Settlement Guide</p>
            <h2 className="text-3xl font-bold text-gray-800">{t("한국정착정보", "Korea Settlement Guide")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#1a6db1] hover:shadow-md transition-all group"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1a6db1] transition-colors">
                  {t(item.ko, item.en)}
                </h3>
                <p className="text-gray-500 text-sm">{t(item.desc.ko, item.desc.en)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 운영시간 + CTA */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1a6db1] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">{t("센터 운영시간", "Center Hours")}</h2>
              <p className="text-blue-100">{t("월~금 / 일  09:00 ~ 21:00", "Mon–Fri & Sun  09:00–21:00")}</p>
              <p className="text-blue-200 text-sm mt-1">
                {t("(토요일 및 공휴일 휴무)", "(Closed on Saturdays and public holidays)")}
              </p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                href="/consultation/online"
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors"
              >
                {t("상담 신청", "Apply")}
              </Link>
              <a
                href="http://pf.kakao.com/_Hcktn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors"
              >
                {t("카카오톡 상담", "KakaoTalk")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
