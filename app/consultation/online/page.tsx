"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

export default function OnlineConsultationPage() {
  const { t } = useLang();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        title={t("온/오프라인 상담", "Online/Offline Consultation")}
        subtitle={t("위밋다문화행복센터 오프라인 상담 신청", "WE MEET Multicultural Happiness Center — Consultation Application")}
        breadcrumb={[t("홈", "Home"), t("상담안내/신청", "Consultation"), t("온/오프라인 상담", "Online/Offline")]}
      />
      <div className="max-w-2xl mx-auto px-4 py-14">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-green-700 mb-2">{t("신청이 완료되었습니다!", "Application submitted!")}</h2>
            <p className="text-green-600">
              {t("담당자가 확인 후 연락드리겠습니다. 감사합니다.", "Our staff will contact you after reviewing. Thank you.")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-gray-100 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">
              {t("상담 신청서", "Consultation Application Form")}
            </h2>

            {[
              { id: "name", label: { ko: "이름", en: "Name" }, type: "text", required: true },
              { id: "nationality", label: { ko: "국적", en: "Nationality" }, type: "text", required: true },
              { id: "dob", label: { ko: "생년월일", en: "Date of Birth" }, type: "date", required: false },
              { id: "phone", label: { ko: "전화번호", en: "Phone Number" }, type: "tel", required: true },
              { id: "email", label: { ko: "이메일", en: "Email" }, type: "email", required: false },
              { id: "visitDate", label: { ko: "방문날짜", en: "Visit Date" }, type: "date", required: false },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t(field.label.ko, field.label.en)}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  required={field.required}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a6db1] transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("문의사항", "Inquiry Details")}
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1a6db1] transition-colors resize-none"
                placeholder={t("상담 내용을 자세히 작성해 주세요.", "Please describe your consultation in detail.")}
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-600 max-h-40 overflow-y-auto leading-relaxed">
              <p className="font-semibold mb-2">{t("[개인정보 수집·이용 동의]", "[Personal Information Collection & Use Agreement]")}</p>
              <p>{t(
                "위밋다문화행복센터는 상담 서비스 제공을 위해 개인정보를 수집합니다. 수집 항목: 이름, 국적, 생년월일, 전화번호, 이메일, 방문날짜, 문의사항. 보유 기간: 상담 완료 후 1년. 귀하는 개인정보 수집·이용에 동의하지 않을 권리가 있으나, 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.",
                "WE MEET Multicultural Happiness Center collects personal information to provide counseling services. Items collected: name, nationality, date of birth, phone number, email, visit date, inquiry details. Retention period: 1 year after consultation completion. You have the right to refuse consent, but services may be restricted without it."
              )}</p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#1a6db1]"
              />
              <span className="text-sm text-gray-700">
                {t("개인정보 수집·이용에 동의합니다.", "I agree to the collection and use of personal information.")}
              </span>
            </label>

            <button
              type="submit"
              disabled={!agreed}
              className="w-full bg-[#1a6db1] text-white py-3 rounded-lg font-semibold hover:bg-[#145591] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("신청하기", "Submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
