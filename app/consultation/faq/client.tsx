"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import type { FaqItem } from "@/lib/types";

export default function FaqClient({ items }: { items: FaqItem[] }) {
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
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-300">
            <p className="text-5xl mb-4">❓</p>
            <p>{t("등록된 FAQ가 없습니다.", "No FAQ items yet.")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[#1a6db1] font-bold text-lg flex-shrink-0">Q</span>
                    <span className="font-medium text-gray-800">{t(item.q.ko, item.q.en)}</span>
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
                    <p className="text-gray-600 text-sm leading-relaxed mt-4">{t(item.a.ko, item.a.en)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

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
