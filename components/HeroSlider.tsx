"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";

const slides = [
  {
    src: "/images/gallery/gallery-01.jpg",
    title: { ko: "WE MEET 다문화 행복센터", en: "WE MEET Multicultural Happiness Center" },
    sub: { ko: "한국에 정착하는 외국인 분들과 함께합니다", en: "Together with foreigners settling in Korea" },
  },
  {
    src: "/images/gallery/gallery-02.jpg",
    title: { ko: "다양한 프로그램과 함께", en: "Diverse Programs for Everyone" },
    sub: { ko: "요리 클래스, 랜드마크 투어, 다자회, 세계 음식 체험", en: "Cooking class, landmark tour, multicultural fair, world food" },
  },
  {
    src: "/images/gallery/gallery-03.jpg",
    title: { ko: "함께하는 문화 교류", en: "Cultural Exchange Together" },
    sub: { ko: "다양한 문화가 하나로 어우러지는 공간", en: "A space where diverse cultures come together as one" },
  },
  {
    src: "/images/gallery/gallery-08.jpg",
    title: { ko: "MI MEET 프로그램", en: "MI MEET Program" },
    sub: { ko: "한국어 수업, 직업 맞춤 검사, 다양한 교육 지원", en: "Korean class, career aptitude test, educational support" },
  },
  {
    src: "/images/gallery/gallery-05.jpg",
    title: { ko: "온/오프라인 상담 서비스", en: "Online & Offline Counseling" },
    sub: { ko: "비자, 생활, 취업, 심리 상담까지 전문 서비스", en: "Professional counseling on visa, life, employment & mental health" },
  },
];

export default function HeroSlider() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(420px, 60vh, 680px)" }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.title.ko}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Text content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">
              WM Global Community
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
            >
              {t(slides[current].title.ko, slides[current].title.en)}
            </h1>
            <p
              className="text-white/90 text-base md:text-lg mb-8 leading-relaxed"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              {t(slides[current].sub.ko, slides[current].sub.en)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/consultation/online"
                className="bg-yellow-400 text-gray-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors shadow-lg"
              >
                {t("상담 신청하기", "Apply for Consultation")}
              </Link>
              <Link
                href="/about/purpose"
                className="bg-white/20 backdrop-blur-sm border border-white/60 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-white/30 transition-colors"
              >
                {t("위밋 소개", "About WE MEET")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="이전 슬라이드"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="다음 슬라이드"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              background: i === current ? "#facc15" : "rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-20 text-white/70 text-xs font-medium">
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
