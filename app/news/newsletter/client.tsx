"use client";

import { useLang } from "@/context/LanguageContext";
import PageHeader from "@/components/PageHeader";
import type { NewsletterPost } from "@/lib/types";

export default function NewsletterClient({ posts }: { posts: NewsletterPost[] }) {
  const { t } = useLang();

  return (
    <div>
      <PageHeader
        title={t("알림톡톡", "Newsletter")}
        subtitle={t("위밋의 최신 공지 및 소식을 확인하세요.", "Check WE MEET's latest announcements and news.")}
        breadcrumb={[t("홈", "Home"), t("알림공간", "News"), t("알림톡톡", "Newsletter")]}
      />
      <div className="max-w-4xl mx-auto px-4 py-14">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-300">
            <p className="text-5xl mb-4">📭</p>
            <p>{t("등록된 공지사항이 없습니다.", "No announcements yet.")}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1a6db1] transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <span className="bg-[#e8f2fb] text-[#1a6db1] text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                    {t(post.tag.ko, post.tag.en)}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{t(post.title.ko, post.title.en)}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{post.date}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{t(post.content.ko, post.content.en)}</p>
              </div>
            ))}
          </div>
        )}

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
