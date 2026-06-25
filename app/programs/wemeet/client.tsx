"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import type { WeMeetProgram } from "@/lib/types";

export default function WeMeetProgramClient({ program }: { program: WeMeetProgram }) {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("위밋프로그램", "WE MEET Program")}
        subtitle={t("일요일 — 문화 교류와 함께하는 특별한 시간", "Sundays — Special time for cultural exchange")}
        breadcrumb={[t("홈", "Home"), t("위밋 프로그램", "Programs"), t("위밋프로그램", "WE MEET Program")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 히어로 배너 */}
        <div className="bg-[#e8f2fb] rounded-2xl p-8 mb-10 text-center">
          <p className="text-4xl mb-3">{program.hero.emoji}</p>
          <h2 className="text-xl font-bold text-[#1a6db1] mb-2">
            {t(program.hero.title.ko, program.hero.title.en)}
          </h2>
          <p className="text-gray-700">
            {t(program.hero.desc.ko, program.hero.desc.en)}
          </p>
        </div>

        {/* 운영 정보 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-10 flex flex-col sm:flex-row gap-6 items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("운영일", "Day")}</p>
            <p className="text-2xl font-bold text-[#1a6db1]">{t(program.info.day.ko, program.info.day.en)}</p>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("대상", "For")}</p>
            <p className="text-lg font-bold text-gray-800">{t(program.info.target.ko, program.info.target.en)}</p>
          </div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("비용", "Cost")}</p>
            <p className="text-lg font-bold text-gray-800">{t(program.info.cost.ko, program.info.cost.en)}</p>
          </div>
        </div>

        {/* 주요 활동 */}
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t("주요 활동", "Key Activities")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {program.activities.map((act) => (
            <div key={act.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#1a6db1] transition-colors">
              <div className="text-3xl mb-3">{act.icon}</div>
              <h4 className="font-bold text-gray-800 mb-1">{t(act.ko, act.en)}</h4>
              <p className="text-gray-500 text-sm">{t(act.desc.ko, act.desc.en)}</p>
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

        <div className="text-center">
          <Link
            href="/consultation/online"
            className="bg-[#1a6db1] text-white px-8 py-3 rounded-full font-bold hover:bg-[#145591] transition-colors inline-block"
          >
            {t("프로그램 참여 신청", "Apply to Join")}
          </Link>
        </div>
      </div>
    </div>
  );
}
