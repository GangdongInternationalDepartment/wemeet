"use client";

import { useEffect, useState } from "react";
import type { CallCenterInfo, CallCenterHour, CallCenterArea } from "@/lib/types";

const DEFAULT: CallCenterInfo = {
  email: "syjy22kr@naver.com",
  kakaoName: { ko: "위밋다문화행복센터", en: "WE MEET Center" },
  kakaoUrl: "http://pf.kakao.com/_Hcktn",
  hours: [
    { id: "h1", days: { ko: "월요일 ~ 금요일", en: "Monday – Friday" }, time: "09:00 – 21:00", closed: false },
    { id: "h2", days: { ko: "일요일", en: "Sunday" }, time: "09:00 – 21:00", closed: false },
    { id: "h3", days: { ko: "토요일 · 공휴일", en: "Saturday & Holidays" }, time: "휴무", closed: true },
  ],
  areas: [
    { id: "a1", ko: "비자 및 체류 관련", en: "Visa and Residence" },
    { id: "a2", ko: "생활 및 주거 문제", en: "Daily Life and Housing" },
    { id: "a3", ko: "취업 및 노동권 보호", en: "Employment and Labor Rights" },
    { id: "a4", ko: "교육 및 자녀 양육", en: "Education and Child Rearing" },
    { id: "a5", ko: "심리·정서 상담", en: "Psychological and Emotional Counseling" },
  ],
};

function genId() {
  return `_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export default function AdminCallCenterPage() {
  const [form, setForm] = useState<CallCenterInfo>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/callcenter")
      .then((r) => r.json())
      .then((data: CallCenterInfo) => {
        if (data?.email) setForm(data);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/callcenter", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // ── 운영시간 ─────────────────────────────────────────────────────────────

  const updateHour = (id: string, patch: Partial<CallCenterHour>) =>
    setForm((f) => ({
      ...f,
      hours: f.hours.map((h) => (h.id === id ? { ...h, ...patch } : h)),
    }));

  const addHour = () =>
    setForm((f) => ({
      ...f,
      hours: [
        ...f.hours,
        { id: genId(), days: { ko: "", en: "" }, time: "09:00 – 18:00", closed: false },
      ],
    }));

  const removeHour = (id: string) =>
    setForm((f) => ({ ...f, hours: f.hours.filter((h) => h.id !== id) }));

  // ── 상담분야 ─────────────────────────────────────────────────────────────

  const updateArea = (id: string, patch: Partial<CallCenterArea>) =>
    setForm((f) => ({
      ...f,
      areas: f.areas.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));

  const addArea = () =>
    setForm((f) => ({
      ...f,
      areas: [...f.areas, { id: genId(), ko: "", en: "" }],
    }));

  const removeArea = (id: string) =>
    setForm((f) => ({ ...f, areas: f.areas.filter((a) => a.id !== id) }));

  return (
    <div className="p-8 max-w-3xl">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">위밋행복콜센터 관리</h1>
          <p className="text-gray-400 text-sm mt-1">이메일, 카카오톡, 운영시간, 상담 분야를 수정합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-sm text-gray-400">저장 중...</span>}
          {saved && <span className="text-sm text-emerald-600 font-semibold">✓ 저장됨</span>}
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 bg-[#1a6db1] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors disabled:opacity-60"
          >
            저장
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* 이메일 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">대표 이메일</h2>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
            placeholder="syjy22kr@naver.com"
          />
        </section>

        {/* 카카오톡 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-700 mb-4">카카오톡 채널</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">채널 URL</label>
              <input
                value={form.kakaoUrl}
                onChange={(e) => setForm({ ...form, kakaoUrl: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                placeholder="http://pf.kakao.com/_Hcktn"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">채널명 (한국어)</label>
                <input
                  value={form.kakaoName.ko}
                  onChange={(e) => setForm({ ...form, kakaoName: { ...form.kakaoName, ko: e.target.value } })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                  placeholder="위밋다문화행복센터"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">채널명 (영어)</label>
                <input
                  value={form.kakaoName.en}
                  onChange={(e) => setForm({ ...form, kakaoName: { ...form.kakaoName, en: e.target.value } })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                  placeholder="WE MEET Center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 운영시간 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">상담 운영시간</h2>
            <button
              onClick={addHour}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              + 행 추가
            </button>
          </div>
          <div className="space-y-3">
            {form.hours.map((h) => (
              <div key={h.id} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
                <input
                  value={h.days.ko}
                  onChange={(e) => updateHour(h.id, { days: { ...h.days, ko: e.target.value } })}
                  placeholder="요일 (한국어)"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                />
                <input
                  value={h.closed ? "휴무" : h.time}
                  onChange={(e) => updateHour(h.id, { time: e.target.value, closed: false })}
                  placeholder="09:00 – 21:00"
                  disabled={h.closed}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1] disabled:bg-gray-50 disabled:text-gray-400"
                />
                <label className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={h.closed}
                    onChange={(e) => updateHour(h.id, { closed: e.target.checked })}
                    className="w-3.5 h-3.5"
                  />
                  휴무
                </label>
                <button
                  onClick={() => removeHour(h.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">영어 요일명은 자동 저장되지 않습니다. 아래 영어 입력란을 따로 채워주세요.</p>
          <div className="mt-3 space-y-2">
            {form.hours.map((h) => (
              <div key={`en-${h.id}`} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0 truncate">{h.days.ko || "—"}</span>
                <input
                  value={h.days.en}
                  onChange={(e) => updateHour(h.id, { days: { ...h.days, en: e.target.value } })}
                  placeholder="영어 요일명 (예: Monday – Friday)"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 상담 분야 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">상담 분야</h2>
            <button
              onClick={addArea}
              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              + 항목 추가
            </button>
          </div>
          <div className="space-y-2">
            {form.areas.map((a) => (
              <div key={a.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <input
                  value={a.ko}
                  onChange={(e) => updateArea(a.id, { ko: e.target.value })}
                  placeholder="한국어"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                />
                <input
                  value={a.en}
                  onChange={(e) => updateArea(a.id, { en: e.target.value })}
                  placeholder="English"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                />
                <button
                  onClick={() => removeArea(a.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
