"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import type { GalleryItem } from "@/lib/types";

const tagColors: Record<string, string> = {
  위밋프로그램: "bg-blue-100 text-blue-700",
  "WE MEET": "bg-blue-100 text-blue-700",
  미밋프로그램: "bg-indigo-100 text-indigo-700",
  "MI MEET": "bg-indigo-100 text-indigo-700",
  랜드마크투어: "bg-green-100 text-green-700",
  Tour: "bg-green-100 text-green-700",
  파티: "bg-yellow-100 text-yellow-700",
  Party: "bg-yellow-100 text-yellow-700",
};

const fallbackItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/gallery/gallery-01.jpg",
    title: { ko: "한식 쿠킹 클래스 — 파전 만들기", en: "Korean Cooking Class — Pajeon" },
    date: "2025.10",
    tag: { ko: "위밋프로그램", en: "WE MEET" },
  },
];

export default function GalleryPage() {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackItems);

  useEffect(() => {
    fetch("/api/data/gallery")
      .then((r) => r.json())
      .then((data: GalleryItem[]) => {
        if (Array.isArray(data) && data.length > 0) setGalleryItems(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader
        title={t("갤러리", "Gallery")}
        subtitle={t(
          "위밋 프로그램의 소중한 순간들을 담았습니다.",
          "Capturing precious moments from WE MEET programs."
        )}
        breadcrumb={[t("홈", "Home"), t("알림공간", "News"), t("갤러리", "Gallery")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow bg-gray-100"
              onClick={() => setSelected(i)}
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={item.src}
                  alt={t(item.title.ko, item.title.en)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
              </div>
              <div className="p-3">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    tagColors[lang === "ko" ? item.tag.ko : item.tag.en] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t(item.tag.ko, item.tag.en)}
                </span>
                <p className="font-medium text-gray-800 text-sm mt-1.5 leading-snug">
                  {t(item.title.ko, item.title.en)}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          {t(
            "더 많은 활동 사진은 카카오톡 채널에서도 확인하실 수 있습니다.",
            "You can also find more activity photos on our KakaoTalk channel."
          )}
          <a
            href="http://pf.kakao.com/_Hcktn"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[#1a6db1] font-semibold hover:underline"
          >
            {t("카카오톡 채널 →", "KakaoTalk Channel →")}
          </a>
        </p>
      </div>

      {/* 라이트박스 */}
      {selected !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img
              src={galleryItems[selected].src}
              alt={t(galleryItems[selected].title.ko, galleryItems[selected].title.en)}
              className="w-full rounded-xl object-contain max-h-[80vh]"
            />
            <p className="text-white text-center mt-3 font-medium">
              {t(galleryItems[selected].title.ko, galleryItems[selected].title.en)}
            </p>
            <p className="text-gray-400 text-center text-sm">{galleryItems[selected].date}</p>
            <div className="flex justify-between mt-4">
              <button
                className="text-white hover:text-gray-300 disabled:opacity-30"
                disabled={selected === 0}
                onClick={() => setSelected(selected - 1)}
              >
                ← {t("이전", "Prev")}
              </button>
              <button
                className="text-white hover:text-gray-300 disabled:opacity-30"
                disabled={selected === galleryItems.length - 1}
                onClick={() => setSelected(selected + 1)}
              >
                {t("다음", "Next")} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
