"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const galleryItems = [
  { title: { ko: "한식 쿠킹 클래스", en: "Korean Cooking Class" }, date: "2025.05", emoji: "🍳" },
  { title: { ko: "다자회 행사", en: "Multicultural Fair" }, date: "2025.05", emoji: "🎪" },
  { title: { ko: "경복궁 랜드마크 투어", en: "Gyeongbokgung Landmark Tour" }, date: "2025.04", emoji: "🏯" },
  { title: { ko: "세계 음식 체험", en: "World Food Experience" }, date: "2025.04", emoji: "🌮" },
  { title: { ko: "MI MEET 한국어 수업", en: "MI MEET Korean Class" }, date: "2025.03", emoji: "📚" },
  { title: { ko: "첫 수업 파티 🍕🍗", en: "First Class Party 🍕🍗" }, date: "2025.03", emoji: "🎉" },
];

export default function GalleryPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("갤러리", "Gallery")}
        subtitle={t("위밋 프로그램의 소중한 순간들을 담았습니다.", "Capturing precious moments from WE MEET programs.")}
        breadcrumb={[t("홈", "Home"), t("알림공간", "News"), t("갤러리", "Gallery")]}
      />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div key={i} className="bg-gray-100 rounded-xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative">
                <span className="text-6xl">{item.emoji}</span>
                <div className="absolute inset-0 bg-[#1a6db1] bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
              </div>
              <div className="p-3">
                <p className="font-medium text-gray-800 text-sm">{t(item.title.ko, item.title.en)}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          {t(
            "실제 활동 사진은 카카오톡 채널에서도 확인하실 수 있습니다.",
            "You can also find actual activity photos on our KakaoTalk channel."
          )}
        </p>
      </div>
    </div>
  );
}
