"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import HeroSlider from "@/components/HeroSlider";

const programs = [
  {
    title: { ko: "WE MEET 프로그램", en: "WE MEET Program" },
    desc: {
      ko: "일요일 진행 — 한식 쿠킹 클래스, 랜드마크 투어, 다자회, 세계 음식 체험",
      en: "Sundays — Korean cooking class, landmark tour, multicultural fair, world food experience",
    },
    href: "/programs/wemeet",
    image: "/images/programs/prog-01.jpg",
    badge: { ko: "매주 일요일", en: "Every Sunday" },
  },
  {
    title: { ko: "MI MEET 프로그램", en: "MI MEET Program" },
    desc: {
      ko: "화·목 19:30~21:00 — 한국어 수업, 직업 맞춤 검사 등",
      en: "Tue & Thu 19:30–21:00 — Korean language class, career aptitude test, and more",
    },
    href: "/programs/mimeet",
    image: "/images/programs/prog-10.jpg",
    badge: { ko: "화·목요일", en: "Tue & Thu" },
  },
  {
    title: { ko: "온/오프라인 상담", en: "Consultation" },
    desc: {
      ko: "비자, 생활, 취업, 심리 등 다양한 분야의 전문 상담 서비스",
      en: "Professional counseling on visa, daily life, employment, mental health, and more",
    },
    href: "/consultation/online",
    image: "/images/programs/prog-11.jpg",
    badge: { ko: "월~금 / 일", en: "Mon–Fri & Sun" },
  },
];

const infoLinks = [
  {
    ko: "한국생활정보",
    en: "Life in Korea",
    href: "/settlement/living",
    desc: { ko: "외국인등록, 비자, 거주 정보", en: "Foreigner registration, visa, residence" },
    icon: "🏠",
  },
  {
    ko: "다국어학습정보",
    en: "Language Learning",
    href: "/settlement/language",
    desc: { ko: "한국어 및 다국어 교육 정보", en: "Korean and multilingual education" },
    icon: "📖",
  },
  {
    ko: "교육/취업정보",
    en: "Education & Jobs",
    href: "/settlement/employment",
    desc: { ko: "학교 진학 및 취업 관련 정보", en: "School admissions and job information" },
    icon: "💼",
  },
];

const galleryPreview = [
  "/images/gallery/gallery-04.png",
  "/images/gallery/gallery-06.png",
  "/images/gallery/gallery-07.png",
  "/images/gallery/gallery-09.jpg",
  "/images/gallery/gallery-10.png",
  "/images/gallery/gallery-11.png",
];

const purposes = [
  { ko: "다문화가족 안정적 정착", en: "Stable Settlement" },
  { ko: "사회 통합과 차별 해소", en: "Social Integration" },
  { ko: "정책 개발과 권익 보호", en: "Rights Protection" },
  { ko: "문화 교류와 상호 이해", en: "Cultural Exchange" },
  { ko: "심리·정서적 지원", en: "Psychological Support" },
];

export default function Home() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* 5대 설립의도 배너 */}
      <section className="bg-[#1a6db1] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-center text-sm">
            {purposes.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white font-medium">
                <span className="w-5 h-5 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {t(item.ko, item.en)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1a6db1] font-semibold text-sm uppercase tracking-wider mb-2">Programs</p>
            <h2 className="text-3xl font-bold text-gray-800">{t("위밋 프로그램", "WE MEET Programs")}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
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
                className="group rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={prog.image}
                    alt={prog.title.ko}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#1a6db1] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {t(prog.badge.ko, prog.badge.en)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1a6db1] transition-colors">
                    {t(prog.title.ko, prog.title.en)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(prog.desc.ko, prog.desc.en)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[#1a6db1] text-sm font-semibold">
                    {t("자세히 보기", "Learn more")}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 미리보기 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#1a6db1] font-semibold text-sm uppercase tracking-wider mb-1">Gallery</p>
              <h2 className="text-3xl font-bold text-gray-800">{t("활동 갤러리", "Activity Gallery")}</h2>
            </div>
            <Link
              href="/news/gallery"
              className="text-[#1a6db1] text-sm font-semibold hover:underline flex items-center gap-1"
            >
              {t("전체 보기", "View All")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPreview.map((src, i) => (
              <Link key={i} href="/news/gallery" className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`갤러리 ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 한국정착정보 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1a6db1] font-semibold text-sm uppercase tracking-wider mb-2">Settlement Guide</p>
            <h2 className="text-3xl font-bold text-gray-800">{t("한국정착정보", "Korea Settlement Guide")}</h2>
            <p className="text-gray-500 mt-3">
              {t("한국 생활에 필요한 다양한 정보를 안내해 드립니다.", "We provide various information needed for life in Korea.")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#1a6db1] hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#1a6db1] transition-colors">
                  {t(item.ko, item.en)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(item.desc.ko, item.desc.en)}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[#1a6db1] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("바로가기", "Go")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 운영시간 + CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden flex flex-col md:flex-row"
            style={{ background: "linear-gradient(135deg, #1a6db1 0%, #1557a0 60%, #0d3f7a 100%)" }}
          >
            <div className="relative hidden md:block md:w-72 flex-shrink-0">
              <Image
                src="/images/gallery/gallery-12.png"
                alt="센터 사진"
                fill
                className="object-cover opacity-60"
                sizes="288px"
              />
            </div>
            <div className="flex-1 p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
              <div>
                <p className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-2">Center Info</p>
                <h2 className="text-2xl font-bold mb-3">{t("센터 운영시간", "Center Hours")}</h2>
                <p className="text-blue-100 font-medium">{t("월~금 / 일  09:00 ~ 21:00", "Mon–Fri & Sun  09:00–21:00")}</p>
                <p className="text-blue-300 text-sm mt-1">
                  {t("(토요일 및 공휴일 휴무)", "(Closed on Saturdays and public holidays)")}
                </p>
                <p className="text-blue-200 text-sm mt-3">
                  📞 {t("위밋행복콜센터: 1555-5555", "WE MEET Call Center: 1555-5555")}
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/consultation/online"
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors text-center"
                >
                  {t("상담 신청하기", "Apply for Consultation")}
                </Link>
                <a
                  href="http://pf.kakao.com/_Hcktn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 border border-white/40 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/25 transition-colors text-center"
                >
                  {t("카카오톡 상담", "KakaoTalk")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
