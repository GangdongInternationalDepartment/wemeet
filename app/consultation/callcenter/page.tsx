"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

export default function CallCenterPage() {
  const { t } = useLang();

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
                href="mailto:syjy22kr@naver.com"
                className="text-xl font-bold hover:text-yellow-300 transition-colors"
              >
                syjy22kr@naver.com
              </a>
            </div>

            <div className="bg-yellow-400 rounded-2xl p-8 text-center">
              <p className="text-yellow-800 text-sm mb-2">{t("카카오톡 채널", "KakaoTalk Channel")}</p>
              <a
                href="http://pf.kakao.com/_Hcktn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 text-xl font-bold hover:text-gray-700 transition-colors"
              >
                {t("위밋다문화행복센터", "WE MEET Center")}
              </a>
              <p className="text-yellow-800 text-xs mt-2">{t("@ 카카오톡 플러스친구", "@ KakaoTalk Plus Friend")}</p>
            </div>
          </div>

          {/* 운영 안내 */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h3 className="font-bold text-[#1a6db1] text-lg mb-5">{t("상담 운영 안내", "Consultation Hours")}</h3>
            <table className="w-full text-sm text-gray-700">
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 font-medium">{t("월요일 ~ 금요일", "Monday – Friday")}</td>
                  <td className="py-3 text-right font-semibold">09:00 – 21:00</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 font-medium">{t("일요일", "Sunday")}</td>
                  <td className="py-3 text-right font-semibold">09:00 – 21:00</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-red-500">{t("토요일 · 공휴일", "Saturday & Holidays")}</td>
                  <td className="py-3 text-right font-semibold text-red-500">{t("휴무", "Closed")}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 bg-[#e8f2fb] rounded-lg p-4 text-sm text-[#1a6db1]">
              <p className="font-semibold mb-1">{t("상담 분야", "Consultation Areas")}</p>
              <ul className="space-y-1 text-gray-600">
                {[
                  { ko: "비자 및 체류 관련", en: "Visa and Residence" },
                  { ko: "생활 및 주거 문제", en: "Daily Life and Housing" },
                  { ko: "취업 및 노동권 보호", en: "Employment and Labor Rights" },
                  { ko: "교육 및 자녀 양육", en: "Education and Child Rearing" },
                  { ko: "심리·정서 상담", en: "Psychological and Emotional Counseling" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1a6db1] rounded-full flex-shrink-0" />
                    {t(item.ko, item.en)}
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
