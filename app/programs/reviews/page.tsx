"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";

const reviews = [
  {
    name: "Maria G.",
    country: { ko: "필리핀", en: "Philippines" },
    program: { ko: "WE MEET 프로그램", en: "WE MEET Program" },
    text: {
      ko: "한식 쿠킹 클래스에 참여했는데 너무 즐거웠어요! 새로운 친구들도 많이 사귀었고, 한국 문화를 직접 체험할 수 있어서 좋았습니다.",
      en: "I participated in the Korean cooking class and had so much fun! I made many new friends and it was wonderful to experience Korean culture firsthand.",
    },
    rating: 5,
  },
  {
    name: "Nguyen T.",
    country: { ko: "베트남", en: "Vietnam" },
    program: { ko: "MI MEET 프로그램", en: "MI MEET Program" },
    text: {
      ko: "화요일 한국어 수업이 정말 도움이 됐어요. 선생님이 친절하고 수업 방식도 좋아서 한국어 실력이 많이 늘었습니다.",
      en: "The Tuesday Korean class was really helpful. The teacher is kind and the teaching style is good, so my Korean has improved a lot.",
    },
    rating: 5,
  },
  {
    name: "Ahmed K.",
    country: { ko: "이집트", en: "Egypt" },
    program: { ko: "WE MEET 프로그램", en: "WE MEET Program" },
    text: {
      ko: "다자회에서 제 나라 음식을 가져가서 소개했는데 모두가 좋아했어요. 이런 교류의 장이 있어서 정말 감사합니다.",
      en: "I brought food from my country to the multicultural fair and everyone loved it. I'm so grateful for a place of exchange like this.",
    },
    rating: 5,
  },
];

export default function ReviewsPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("프로그램후기", "Program Reviews")}
        subtitle={t("참여자들의 생생한 이야기를 들어보세요.", "Hear firsthand stories from participants.")}
        breadcrumb={[t("홈", "Home"), t("위밋 프로그램", "Programs"), t("프로그램후기", "Reviews")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="space-y-6 mb-12">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{rev.name}</p>
                  <p className="text-sm text-gray-500">
                    {t(rev.country.ko, rev.country.en)} · {t(rev.program.ko, rev.program.en)}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{t(rev.text.ko, rev.text.en)}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF3EC] rounded-xl p-8 text-center">
          <h3 className="text-lg font-bold text-[#E8541A] mb-2">
            {t("나도 참여하고 싶어요!", "I want to join too!")}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {t("위밋 프로그램에 참여하고 소중한 추억을 만들어 보세요.", "Join the WE MEET program and create precious memories.")}
          </p>
          <a
            href="/consultation/online"
            className="inline-block bg-[#E8541A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#C4420E] transition-colors"
          >
            {t("프로그램 신청하기", "Apply for Program")}
          </a>
        </div>
      </div>
    </div>
  );
}
