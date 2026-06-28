"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  navCategories: number;
  navTotal: number;
  galleryItems: number;
  sliderSlides: number;
  newsletterPosts: number;
  faqItems: number;
  submissionsTotal: number;
  submissionsPending: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/navigation").then((r) => r.json()),
      fetch("/api/admin/gallery").then((r) => r.json()),
      fetch("/api/admin/slider").then((r) => r.json()),
      fetch("/api/admin/newsletter").then((r) => r.json()),
      fetch("/api/admin/faq").then((r) => r.json()),
      fetch("/api/admin/submissions").then((r) => r.json()),
    ]).then(([nav, gallery, slider, newsletter, faq, submissions]) => {
      const navTotal = nav.reduce(
        (acc: number, item: { children: unknown[] }) => acc + item.children.length,
        nav.length
      );
      setStats({
        navCategories: nav.length,
        navTotal,
        galleryItems: gallery.length,
        sliderSlides: slider.length,
        newsletterPosts: newsletter.length,
        faqItems: faq.length,
        submissionsTotal: submissions.length,
        submissionsPending: submissions.filter((s: { status: string }) => s.status === "pending").length,
      });
    });
  }, []);

  const cards = [
    {
      label: "메뉴 카테고리",
      value: stats?.navCategories,
      sub: `전체 메뉴 ${stats?.navTotal ?? "—"}개`,
      href: "/admin/menu",
      color: "bg-blue-500",
      icon: "≡",
    },
    {
      label: "갤러리 사진",
      value: stats?.galleryItems,
      sub: "갤러리 전체 항목",
      href: "/admin/gallery",
      color: "bg-emerald-500",
      icon: "⊟",
    },
    {
      label: "슬라이더 슬라이드",
      value: stats?.sliderSlides,
      sub: "메인 페이지 슬라이더",
      href: "/admin/slider",
      color: "bg-violet-500",
      icon: "▷",
    },
    {
      label: "알림톡톡 공지",
      value: stats?.newsletterPosts,
      sub: "뉴스레터 게시글",
      href: "/admin/newsletter",
      color: "bg-orange-500",
      icon: "📢",
    },
    {
      label: "FAQ 항목",
      value: stats?.faqItems,
      sub: "자주 묻는 질문",
      href: "/admin/faq",
      color: "bg-teal-500",
      icon: "❓",
    },
    {
      label: "상담 신청",
      value: stats?.submissionsTotal,
      sub: stats?.submissionsPending ? `미확인 ${stats.submissionsPending}건` : "전체 접수",
      href: "/admin/submissions",
      color: "bg-rose-500",
      icon: "📋",
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">대시보드</h1>
        <p className="text-gray-400 text-sm mt-1">
          WE MEET 다문화 행복센터 콘텐츠를 관리합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1a6db1]/30 transition-all group"
          >
            <div className={`w-11 h-11 ${card.color} text-white rounded-xl flex items-center justify-center text-xl mb-4`}>
              {card.icon}
            </div>
            <p className="text-gray-500 text-sm">{card.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1 mb-1">
              {card.value ?? "—"}
            </p>
            <p className="text-gray-400 text-xs">{card.sub}</p>
            <p className="text-[#1a6db1] text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              관리하기 →
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">빠른 이동</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {[
            { href: "/admin/branding", label: "사이트 정보 수정" },
            { href: "/admin/submissions", label: "상담 신청서 확인" },
            { href: "/admin/menu", label: "메뉴 추가/수정/삭제" },
            { href: "/admin/gallery", label: "갤러리 사진 관리" },
            { href: "/admin/slider", label: "메인 슬라이더 관리" },
            { href: "/admin/programs/wemeet", label: "WE MEET 프로그램 편집" },
            { href: "/admin/programs/mimeet", label: "MI MEET 프로그램 편집" },
            { href: "/admin/newsletter", label: "알림톡톡 공지 관리" },
            { href: "/admin/faq", label: "FAQ 관리" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-600 hover:bg-[#e8f2fb] hover:text-[#1a6db1] transition-colors font-medium"
            >
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
