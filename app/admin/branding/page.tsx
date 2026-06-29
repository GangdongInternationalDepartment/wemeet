"use client";

import { useEffect, useState } from "react";
import type { SiteBranding } from "@/lib/types";

const DEFAULT: SiteBranding = {
  topBarName: { ko: "WE MEET 다문화 행복센터", en: "WE MEET Multicultural Happiness Center" },
  logoAbbr: "WM",
  siteName: { ko: "WE MEET", en: "WE MEET" },
  siteSubtitle: { ko: "다문화 행복센터", en: "Multicultural Happiness Center" },
};

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
      />
    </div>
  );
}

export default function AdminBrandingPage() {
  const [form, setForm] = useState<SiteBranding>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/branding")
      .then((r) => r.json())
      .then((data: SiteBranding) => setForm(data));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/branding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (path: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cur: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">사이트 정보 관리</h1>
          <p className="text-gray-400 text-sm mt-1">헤더에 표시되는 사이트 이름과 로고 텍스트를 수정합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-sm text-gray-400">저장 중...</span>}
          {saved && <span className="text-sm text-emerald-600 font-semibold">✓ 저장됨</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-[#E8541A] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors disabled:opacity-60"
          >
            저장
          </button>
        </div>
      </div>

      {/* 미리보기 */}
      <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="bg-[#E8541A] text-white text-xs px-4 py-2">
          <span className="font-semibold">{form.topBarName.ko}</span>
        </div>
        <div className="bg-white px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E8541A] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {form.logoAbbr || "WM"}
          </div>
          <span className="text-[#E8541A] font-bold text-sm leading-tight">
            {form.siteName.ko}<br />
            <span className="text-xs font-normal text-gray-500">{form.siteSubtitle.ko}</span>
          </span>
        </div>
        <p className="text-xs text-gray-400 text-center pb-2">미리보기 (한국어)</p>
      </div>

      <div className="space-y-6">
        {/* 상단 바 이름 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">상단 파란 바 텍스트</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="한국어"
              value={form.topBarName.ko}
              onChange={(v) => set("topBarName.ko", v)}
              placeholder="WE MEET 다문화 행복센터"
            />
            <Field
              label="영어"
              value={form.topBarName.en}
              onChange={(v) => set("topBarName.en", v)}
              placeholder="WE MEET Multicultural Happiness Center"
            />
          </div>
        </section>

        {/* 로고 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">로고 약자 (원형 배지)</h2>
          <Field
            label="약자 (최대 4자)"
            value={form.logoAbbr}
            onChange={(v) => set("logoAbbr", v.slice(0, 4))}
            placeholder="WM"
          />
        </section>

        {/* 사이트 이름 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">사이트 이름 (헤더 로고 옆 큰 글씨)</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="한국어"
              value={form.siteName.ko}
              onChange={(v) => set("siteName.ko", v)}
              placeholder="WE MEET"
            />
            <Field
              label="영어"
              value={form.siteName.en}
              onChange={(v) => set("siteName.en", v)}
              placeholder="WE MEET"
            />
          </div>
        </section>

        {/* 사이트 부제목 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">사이트 부제목 (헤더 로고 옆 작은 글씨)</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="한국어"
              value={form.siteSubtitle.ko}
              onChange={(v) => set("siteSubtitle.ko", v)}
              placeholder="다문화 행복센터"
            />
            <Field
              label="영어"
              value={form.siteSubtitle.en}
              onChange={(v) => set("siteSubtitle.en", v)}
              placeholder="Multicultural Happiness Center"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
