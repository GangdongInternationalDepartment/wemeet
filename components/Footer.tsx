"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#E8541A] rounded-full flex items-center justify-center text-white font-bold text-xs">
                WM
              </div>
              <span className="text-white font-bold">WE MEET 다문화 행복센터</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {t(
                "한국에 정착하는 외국인 분들을 위해 다양한 프로그램과 상담 서비스를 제공합니다.",
                "Providing various programs and counseling services for foreigners settling in Korea."
              )}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("연락처", "Contact")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">{t("이메일", "Email")}: </span>
                <a href="mailto:syjy22kr@naver.com" className="hover:text-white transition-colors">
                  syjy22kr@naver.com
                </a>
              </li>
              <li>
                <span className="text-gray-400">{t("카카오톡", "KakaoTalk")}: </span>
                <a
                  href="http://pf.kakao.com/_Hcktn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t("위밋다문화행복센터", "WE MEET Center")}
                </a>
              </li>
              <li>
                <span className="text-gray-400">{t("운영시간", "Hours")}: </span>
                {t("월~금·일 09:00~21:00", "Mon–Fri & Sun 09:00–21:00")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("빠른 메뉴", "Quick Links")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/purpose" className="hover:text-white transition-colors">{t("설립의도", "Our Purpose")}</Link></li>
              <li><Link href="/programs/wemeet" className="hover:text-white transition-colors">{t("위밋 프로그램", "WE MEET Program")}</Link></li>
              <li><Link href="/news/events" className="hover:text-white transition-colors">{t("이벤트", "Events")}</Link></li>
              <li><Link href="/consultation/online" className="hover:text-white transition-colors">{t("상담 신청", "Apply for Consultation")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>상호명: 위밋다문화행복센터 | 대표자 이메일: syjy22kr@naver.com</p>
          <p className="mt-1">© {new Date().getFullYear()} WE MEET 다문화 행복센터. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
