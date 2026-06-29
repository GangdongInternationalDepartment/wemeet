"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

export default function PartnersPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("협력기관", "Partner Organizations")}
        subtitle={t("WE MEET와 함께하는 협력 기관을 소개합니다.", "Meet the organizations that partner with WE MEET.")}
        breadcrumb={[t("홈", "Home"), t("위밋 소개", "About Us"), t("협력기관", "Partners")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-[#E8541A] rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              ICM
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                I.C.M (Inner Core Mentoring)
              </h2>
              <p className="text-[#E8541A] font-medium text-sm mb-4">
                {t("자기 성찰 기반의 깊이 있는 코칭 & 멘토링 기관", "A coaching & mentoring organization based on self-reflection")}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t(
                  "내면의 핵심을 중심으로 삶의 방향과 자기를 재정립하는 과정을 지원합니다. 단순한 문제 해결이 아닌, 존재의 성숙과 자기 이해를 중심으로 한 진정한 성장을 추구합니다.",
                  "Supporting individuals in redefining life direction and self through inner-core focused processes. Pursuing authentic growth centered on maturity and self-understanding, not merely problem-solving."
                )}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {t(
                  "ICM의 전문적 상담 서비스를 위밋 센터와 협력하여 외국인들에게 제공합니다.",
                  "ICM provides professional counseling services to foreigners in collaboration with WE MEET Center."
                )}
              </p>
              <a
                href="https://www.icmconsulting.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#E8541A] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#C4420E] transition-colors"
              >
                {t("웹사이트 방문 →", "Visit Website →")}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          {t("협력기관에 대한 문의는 이메일(syjy22kr@naver.com)로 연락해 주세요.", "For partnership inquiries, please contact syjy22kr@naver.com")}
        </p>
      </div>
    </div>
  );
}
