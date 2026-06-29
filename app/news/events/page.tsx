"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const events = [
  {
    date: "2025.06.08",
    day: { ko: "일요일", en: "Sunday" },
    title: { ko: "WE MEET 한식 쿠킹 클래스", en: "WE MEET Korean Cooking Class" },
    desc: { ko: "함께 한국 음식을 만들어 보는 즐거운 시간!", en: "A fun time making Korean food together!" },
    status: { ko: "예정", en: "Upcoming" },
    color: "border-orange-300 bg-orange-50",
  },
  {
    date: "2025.06.15",
    day: { ko: "일요일", en: "Sunday" },
    title: { ko: "랜드마크 투어 — 경복궁", en: "Landmark Tour — Gyeongbokgung Palace" },
    desc: { ko: "경복궁을 함께 방문하고 한국 역사를 배웁니다.", en: "Visit Gyeongbokgung Palace together and learn Korean history." },
    status: { ko: "예정", en: "Upcoming" },
    color: "border-indigo-300 bg-indigo-50",
  },
  {
    date: "2025.05.25",
    day: { ko: "일요일", en: "Sunday" },
    title: { ko: "다자회 (다문화 바자회)", en: "Multicultural Fair" },
    desc: { ko: "각자 나라의 음식과 물건을 나누는 소중한 자리", en: "A precious gathering to share food and items from each country" },
    status: { ko: "완료", en: "Completed" },
    color: "border-gray-200 bg-gray-50",
  },
];

export default function EventsPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("이벤트", "Events")}
        subtitle={t("위밋 센터의 이벤트 일정을 확인하세요.", "Check WE MEET's upcoming events.")}
        breadcrumb={[t("홈", "Home"), t("알림공간", "News"), t("이벤트", "Events")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="space-y-5">
          {events.map((ev, i) => (
            <div key={i} className={`border-2 rounded-xl p-6 ${ev.color}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="text-center bg-white rounded-lg px-3 py-2 shadow-sm flex-shrink-0 min-w-[70px]">
                  <p className="text-xs text-gray-500">{ev.date.slice(0, 7)}</p>
                  <p className="text-xl font-bold text-[#E8541A]">{ev.date.slice(8)}</p>
                  <p className="text-xs text-gray-500">{t(ev.day.ko, ev.day.en)}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{t(ev.title.ko, ev.title.en)}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      ev.status.ko === "예정" ? "bg-[#E8541A] text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      {t(ev.status.ko, ev.status.en)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{t(ev.desc.ko, ev.desc.en)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#FFF3EC] rounded-xl p-6 text-center text-sm">
          <p className="text-[#E8541A] font-semibold mb-1">
            {t("이벤트 알림을 받고 싶으신가요?", "Want to receive event notifications?")}
          </p>
          <a
            href="http://pf.kakao.com/_Hcktn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8541A] font-bold hover:underline"
          >
            {t("카카오톡 채널 구독하기 →", "Subscribe to KakaoTalk Channel →")}
          </a>
        </div>
      </div>
    </div>
  );
}
