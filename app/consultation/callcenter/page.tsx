"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import type { CallCenterInfo } from "@/lib/types";

const DEFAULT: CallCenterInfo = {
  email: "syjy22kr@naver.com",
  kakaoName: { ko: "위밋다문화행복센터", en: "WE MEET Center" },
  kakaoUrl: "http://pf.kakao.com/_Hcktn",
  hours: [
    { id: "h1", days: { ko: "월요일 ~ 금요일", en: "Monday – Friday" }, time: "09:00 – 21:00", closed: false },
    { id: "h2", days: { ko: "일요일", en: "Sunday" }, time: "09:00 – 21:00", closed: false },
    { id: "h3", days: { ko: "토요일 · 공휴일", en: "Saturday & Holidays" }, time: "휴무", closed: true },
  ],
  areas: [
    { id: "a1", ko: "비자 및 체류 관련", en: "Visa and Residence" },
    { id: "a2", ko: "생활 및 주거 문제", en: "Daily Life and Housing" },
    { id: "a3", ko: "취업 및 노동권 보호", en: "Employment and Labor Rights" },
    { id: "a4", ko: "교육 및 자녀 양육", en: "Education and Child Rearing" },
    { id: "a5", ko: "심리·정서 상담", en: "Psychological and Emotional Counseling" },
  ],
};

export default function CallCenterPage() {
  const { t } = useLang();
  const [info, setInfo] = useState<CallCenterInfo>(DEFAULT);

  useEffect(() => {
    fetch("/api/data/callcenter")
      .then((r) => r.json())
      .then((data: CallCenterInfo) => {
        if (data && data.email) setInfo(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader
        title={t("위밋행복콜센터", "WE MEET Call Center")}
        subtitle={t("전화 상담 안내", "Phone Consultation Guide")}
        breadcrumb={[t("홈", "Home"), t("상담안내/신청", "Consultation"), t("위밋행복콜센터", "Call Center")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 연락처 */}
          <div className="space-y-5">
            <div className="bg-[#1a6db1] text-white rounded-2xl p-8 text-center">
              <p className="text-blue-200 text-sm mb-2">{t("대표 이메일", "Main Email")}</p>
              <a
                href={`mailto:${info.email}`}
                className="text-xl font-bold hover:text-yellow-300 transition-colors"
              >
                {info.email}
              </a>
            </div>

            <div className="bg-yellow-400 rounded-2xl p-8 text-center">
              <p className="text-yellow-800 text-sm mb-2">{t("카카오톡 채널", "KakaoTalk Channel")}</p>
              <a
                href={info.kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 text-xl font-bold hover:text-gray-700 transition-colors"
              >
                {t(info.kakaoName.ko, info.kakaoName.en)}
              </a>
              <p className="text-yellow-800 text-xs mt-2">{t("@ 카카오톡 플러스친구", "@ KakaoTalk Plus Friend")}</p>
            </div>
          </div>

          {/* 운영 안내 */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h3 className="font-bold text-[#1a6db1] text-lg mb-5">{t("상담 운영 안내", "Consultation Hours")}</h3>
            <table className="w-full text-sm text-gray-700">
              <tbody>
                {info.hours.map((h, i) => (
                  <tr key={h.id} className={i < info.hours.length - 1 ? "border-b border-gray-50" : ""}>
                    <td className={`py-3 font-medium ${h.closed ? "text-red-500" : ""}`}>
                      {t(h.days.ko, h.days.en)}
                    </td>
                    <td className={`py-3 text-right font-semibold ${h.closed ? "text-red-500" : ""}`}>
                      {h.closed ? t("휴무", "Closed") : h.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 bg-[#e8f2fb] rounded-lg p-4 text-sm text-[#1a6db1]">
              <p className="font-semibold mb-1">{t("상담 분야", "Consultation Areas")}</p>
              <ul className="space-y-1 text-gray-600">
                {info.areas.map((area) => (
                  <li key={area.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0" />
                    {t(area.ko, area.en)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
