"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

export default function LocationPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("센터위치", "Center Location")}
        subtitle={t("WE MEET 다문화 행복센터 찾아오시는 방법", "How to find WE MEET Multicultural Happiness Center")}
        breadcrumb={[t("홈", "Home"), t("위밋 소개", "About Us"), t("센터위치", "Location")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-[#1a6db1] text-lg mb-4">{t("연락처 정보", "Contact Information")}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#1a6db1] font-bold w-16 flex-shrink-0">{t("이메일", "Email")}</span>
                  <a href="mailto:syjy22kr@naver.com" className="hover:text-[#1a6db1] transition-colors">
                    syjy22kr@naver.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1a6db1] font-bold w-16 flex-shrink-0">{t("카카오톡", "KakaoTalk")}</span>
                  <a
                    href="http://pf.kakao.com/_Hcktn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1a6db1] transition-colors"
                  >
                    {t("위밋다문화행복센터 채널", "WE MEET Center Channel")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-[#1a6db1] text-lg mb-4">{t("운영시간", "Operating Hours")}</h3>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 font-medium">{t("월요일 ~ 금요일", "Monday – Friday")}</td>
                    <td className="py-2 text-right">09:00 – 21:00</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 font-medium">{t("일요일", "Sunday")}</td>
                    <td className="py-2 text-right">09:00 – 21:00</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-red-500">{t("토요일 · 공휴일", "Saturday & Holidays")}</td>
                    <td className="py-2 text-right text-red-500">{t("휴무", "Closed")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#e8f2fb] rounded-xl p-6">
              <p className="text-[#1a6db1] font-semibold mb-2">{t("온라인 상담도 가능합니다", "Online consultation is also available")}</p>
              <a
                href="/consultation/online"
                className="inline-block bg-[#1a6db1] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#145591] transition-colors"
              >
                {t("상담 신청하기", "Apply Now")}
              </a>
            </div>
          </div>

          <div>
            <div className="bg-gray-100 rounded-xl overflow-hidden h-80 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">{t("지도 이미지", "Map")}</p>
                <p className="text-xs mt-1">{t("(실제 주소는 카카오톡으로 문의해 주세요)", "(Please contact us via KakaoTalk for the actual address)")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
