"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { MiMeetProgram } from "@/lib/types";

export default function MiMeetProgramClient({ program }: { program: MiMeetProgram }) {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("미밋프로그램", "MI MEET Program")}
        subtitle={t("화·목 저녁 — 한국어 & 커리어 개발 프로그램", "Tue & Thu evenings — Korean language & career development")}
        breadcrumb={[t("홈", "Home"), t("위밋 프로그램", "Programs"), t("미밋프로그램", "MI MEET Program")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 운영 정보 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-10">
          <h3 className="font-bold text-[#1a6db1] text-lg mb-4">{t("프로그램 정보", "Program Info")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {program.info.map((item) => (
              <div key={item.id} className="bg-[#e8f2fb] rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">{t(item.label.ko, item.label.en)}</p>
                <p className="font-bold text-[#1a6db1]">{t(item.value.ko, item.value.en)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 수업 내용 */}
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t("수업 내용", "Curriculum")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {program.subjects.map((sub) => (
            <div key={sub.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
              <div className="text-3xl mb-3">{sub.icon}</div>
              <h4 className="font-bold text-gray-800 mb-2">{t(sub.ko, sub.en)}</h4>
              <p className="text-gray-500 text-sm">{t(sub.desc.ko, sub.desc.en)}</p>
            </div>
          ))}
        </div>

        {/* 활동 사진 */}
        {program.photos.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-6">{t("활동 사진", "Activity Photos")}</h3>
            <div className="grid grid-cols-2 gap-4 mb-12">
              {program.photos.map((photo) => (
                <div key={photo.id} className="rounded-xl overflow-hidden group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={photo.src}
                      alt={t(photo.caption.ko, photo.caption.en)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">{t(photo.caption.ko, photo.caption.en)}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="bg-[#1a6db1] text-white rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">{t(program.cta.title.ko, program.cta.title.en)}</h3>
          <p className="text-blue-100 mb-6">{t(program.cta.desc.ko, program.cta.desc.en)}</p>
          <Link
            href="/consultation/online"
            className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-full font-bold hover:bg-yellow-300 transition-colors inline-block"
          >
            {t("참여 신청하기", "Apply Now")}
          </Link>
        </div>
      </div>
    </div>
  );
}
