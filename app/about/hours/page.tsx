"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const schedule = [
  {
    day: { ko: "월요일 ~ 금요일", en: "Monday – Friday" },
    time: "09:00 – 21:00",
    note: { ko: "일반 운영", en: "Regular hours" },
    color: "bg-blue-50 border-blue-200",
  },
  {
    day: { ko: "일요일", en: "Sunday" },
    time: "09:00 – 21:00",
    note: { ko: "WE MEET 프로그램 운영일", en: "WE MEET Program day" },
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    day: { ko: "토요일 · 공휴일", en: "Saturday & Holidays" },
    time: "",
    note: { ko: "휴무", en: "Closed" },
    color: "bg-red-50 border-red-200",
  },
];

const programs = [
  {
    name: { ko: "WE MEET 프로그램", en: "WE MEET Program" },
    day: { ko: "일요일", en: "Sunday" },
    items: [
      { ko: "한식 쿠킹 클래스", en: "Korean Cooking Class" },
      { ko: "랜드마크 투어", en: "Landmark Tour" },
      { ko: "다자회 (다문화 바자회)", en: "Multicultural Fair" },
      { ko: "세계 음식 체험", en: "World Food Experience" },
    ],
  },
  {
    name: { ko: "MI MEET 프로그램", en: "MI MEET Program" },
    day: { ko: "화요일 · 목요일  19:30 ~ 21:00", en: "Tue & Thu  19:30–21:00" },
    items: [
      { ko: "한국어 수업", en: "Korean Language Class" },
      { ko: "직업 맞춤 검사", en: "Career Aptitude Test" },
    ],
  },
];

export default function HoursPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("운영시간", "Operating Hours")}
        subtitle={t("센터 운영 및 프로그램 일정을 확인하세요.", "Check center hours and program schedules.")}
        breadcrumb={[t("홈", "Home"), t("위밋 소개", "About Us"), t("운영시간", "Operating Hours")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        {/* 운영시간 표 */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{t("센터 운영시간", "Center Hours")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {schedule.map((s, i) => (
              <div key={i} className={`border rounded-xl p-6 text-center ${s.color}`}>
                <p className="font-bold text-gray-800 mb-2">{t(s.day.ko, s.day.en)}</p>
                {s.time && <p className="text-2xl font-bold text-[#1a6db1] mb-1">{s.time}</p>}
                <p className={`text-sm font-medium ${i === 2 ? "text-red-500" : "text-gray-600"}`}>
                  {t(s.note.ko, s.note.en)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 프로그램 일정 */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{t("프로그램 운영 일정", "Program Schedule")}</h2>
          <div className="space-y-5">
            {programs.map((prog, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                  <h3 className="font-bold text-[#1a6db1] text-lg">{t(prog.name.ko, prog.name.en)}</h3>
                  <span className="bg-[#e8f2fb] text-[#1a6db1] text-sm px-3 py-1 rounded-full font-medium">
                    {t(prog.day.ko, prog.day.en)}
                  </span>
                </div>
                <ul className="space-y-1">
                  {prog.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0" />
                      {t(item.ko, item.en)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-[#e8f2fb] rounded-xl p-5 text-center text-sm text-[#1a6db1]">
          {t(
            "상시 프로그램 안내는 알림공간 > 알림톡톡을 확인해 주세요.",
            "For ongoing program updates, please check News > Newsletter."
          )}
        </div>
      </div>
    </div>
  );
}
