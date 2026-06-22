"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const faqs = [
  {
    q: { ko: "위밋 프로그램은 누구나 참여할 수 있나요?", en: "Can anyone join the WE MEET programs?" },
    a: { ko: "네, 한국에 거주하는 외국인이라면 누구나 참여할 수 있습니다. 국적, 체류 유형에 상관없이 환영합니다.", en: "Yes, any foreigner living in Korea is welcome to join. We welcome participants regardless of nationality or visa status." },
  },
  {
    q: { ko: "프로그램 참여 비용이 있나요?", en: "Is there a fee to participate in programs?" },
    a: { ko: "대부분의 위밋 프로그램은 무료로 제공됩니다. 일부 특별 프로그램의 경우 소정의 비용이 발생할 수 있으며, 사전 안내드립니다.", en: "Most WE MEET programs are free of charge. Some special programs may have a small fee, and we will notify you in advance." },
  },
  {
    q: { ko: "한국어를 못해도 참여할 수 있나요?", en: "Can I participate even if I don't speak Korean?" },
    a: { ko: "물론입니다! 다국어 지원 서비스를 통해 영어, 중국어, 베트남어 등으로 소통할 수 있습니다. 한국어를 못하셔도 걱정하지 마세요.", en: "Of course! Through our multilingual support services, we can communicate in English, Chinese, Vietnamese, and more. Don't worry if you don't speak Korean." },
  },
  {
    q: { ko: "상담은 어떻게 신청하나요?", en: "How do I apply for consultation?" },
    a: { ko: "온라인 상담 신청 페이지에서 신청서를 작성하거나, 카카오톡 채널(@위밋다문화행복센터)로 메시지를 보내주세요.", en: "Fill out the form on our online consultation page, or send a message to our KakaoTalk channel (@WEMEETCenter)." },
  },
  {
    q: { ko: "센터의 정확한 위치는 어디인가요?", en: "Where exactly is the center located?" },
    a: { ko: "정확한 위치는 상담 신청 후 개별 안내드립니다. 카카오톡 채널로 문의하시면 빠르게 안내받으실 수 있습니다.", en: "The exact location will be provided individually after your consultation application. Contact us via KakaoTalk for quick assistance." },
  },
  {
    q: { ko: "MI MEET 한국어 수업의 수준은 어떻게 되나요?", en: "What levels are available for MI MEET Korean classes?" },
    a: { ko: "초급부터 중급까지 수준별 수업을 제공합니다. 첫 수업 전에 간단한 레벨 테스트를 진행하여 적합한 반에 배정합니다.", en: "We offer classes from beginner to intermediate level. A brief level test is conducted before the first class to place you in the appropriate group." },
  },
];

export default function FaqPage() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader
        title="FAQ"
        subtitle={t("자주 묻는 질문에 대한 답변을 확인하세요.", "Find answers to frequently asked questions.")}
        breadcrumb={[t("홈", "Home"), t("상담안내/신청", "Consultation"), "FAQ"]}
      />
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#1a6db1] font-bold text-lg flex-shrink-0">Q</span>
                  <span className="font-medium text-gray-800">{t(faq.q.ko, faq.q.en)}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 flex items-start gap-3 border-t border-gray-50">
                  <span className="text-yellow-500 font-bold text-lg flex-shrink-0 mt-4">A</span>
                  <p className="text-gray-600 text-sm leading-relaxed mt-4">{t(faq.a.ko, faq.a.en)}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#e8f2fb] rounded-xl p-6 text-center">
          <p className="text-[#1a6db1] font-semibold mb-2">
            {t("원하는 답변을 찾지 못하셨나요?", "Can't find the answer you're looking for?")}
          </p>
          <a
            href="/consultation/online"
            className="inline-block bg-[#1a6db1] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#145591] transition-colors"
          >
            {t("직접 상담 신청하기", "Apply for Consultation")}
          </a>
        </div>
      </div>
    </div>
  );
}
