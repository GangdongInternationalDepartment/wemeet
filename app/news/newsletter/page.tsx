"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const notices = [
  {
    id: 1,
    date: "2025.05.15",
    title: { ko: "[공지] 6월 WE MEET 프로그램 일정 안내", en: "[Notice] June WE MEET Program Schedule" },
    tag: { ko: "공지", en: "Notice" },
    content: {
      ko: "6월 WE MEET 프로그램 일정을 안내드립니다. 매주 일요일 다양한 문화 교류 활동이 진행될 예정입니다. 많은 참여 부탁드립니다.",
      en: "We are pleased to announce the June WE MEET program schedule. Various cultural exchange activities will take place every Sunday. We look forward to your participation.",
    },
  },
  {
    id: 2,
    date: "2025.05.01",
    title: { ko: "[안내] MI MEET 한국어 수업 5월 커리큘럼 공개", en: "[Info] MI MEET Korean Class May Curriculum" },
    tag: { ko: "안내", en: "Info" },
    content: {
      ko: "5월 MI MEET 한국어 수업 커리큘럼을 공개합니다. 화요일과 목요일 19:30~21:00에 진행되며, 초급부터 중급까지 수준별 수업이 제공됩니다.",
      en: "We are releasing the May MI MEET Korean class curriculum. Classes run Tue & Thu 19:30–21:00, with levels from beginner to intermediate.",
    },
  },
  {
    id: 3,
    date: "2025.04.20",
    title: { ko: "[이벤트] 다자회 (다문화 바자회) 개최 안내", en: "[Event] Multicultural Fair Announcement" },
    tag: { ko: "이벤트", en: "Event" },
    content: {
      ko: "다양한 나라의 음식과 문화를 나누는 다자회가 개최됩니다. 본국의 음식이나 물건을 가져오셔도 됩니다. 모든 분들을 환영합니다!",
      en: "A multicultural fair sharing food and culture from various countries is being held. Feel free to bring food or items from your home country. Everyone is welcome!",
    },
  },
];

export default function NewsletterPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("알림톡톡", "Newsletter")}
        subtitle={t("위밋의 최신 공지 및 소식을 확인하세요.", "Check WE MEET's latest announcements and news.")}
        breadcrumb={[t("홈", "Home"), t("알림공간", "News"), t("알림톡톡", "Newsletter")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="space-y-5">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <span className="bg-[#e8f2fb] text-[#1a6db1] text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                  {t(notice.tag.ko, notice.tag.en)}
                </span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{t(notice.title.ko, notice.title.en)}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{notice.date}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-0">{t(notice.content.ko, notice.content.en)}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          {t("더 많은 소식은 카카오톡 채널에서 확인하세요.", "Check our KakaoTalk channel for more updates.")}
          <a
            href="http://pf.kakao.com/_Hcktn"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-[#1a6db1] font-semibold hover:underline"
          >
            {t("카카오톡 채널 바로가기 →", "KakaoTalk Channel →")}
          </a>
        </div>
      </div>
    </div>
  );
}
