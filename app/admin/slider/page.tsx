"use client";

import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/types";

function genId() {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

const EMPTY_SLIDE: Slide = {
  id: "",
  src: "",
  title: { ko: "", en: "" },
  sub: { ko: "", en: "" },
};

function SlideModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Slide;
  onSave: (slide: Slide) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Slide>(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const { src } = await res.json();
      setForm((f) => ({ ...f, src }));
    } else {
      const d = await res.json();
      setUploadError(d.error || "업로드 실패");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg text-gray-800 mb-5">
          {initial.id ? "슬라이드 수정" : "새 슬라이드 추가"}
        </h3>

        {/* Image */}
        <div className="mb-4">
          <div className="h-36 bg-gray-100 rounded-xl overflow-hidden mb-2">
            {form.src ? (
              <img src={form.src} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
                ▷
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              placeholder="/images/gallery/gallery-01.jpg"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 disabled:opacity-60 flex-shrink-0"
            >
              {uploading ? "업로드 중..." : "파일 업로드"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
          </div>
          {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
        </div>

        {/* Text fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">제목 (한국어)</label>
            <input
              value={form.title.ko}
              onChange={(e) => setForm({ ...form, title: { ...form.title, ko: e.target.value } })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title (English)</label>
            <input
              value={form.title.en}
              onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">부제 (한국어)</label>
            <input
              value={form.sub.ko}
              onChange={(e) => setForm({ ...form, sub: { ...form.sub, ko: e.target.value } })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (English)</label>
            <input
              value={form.sub.en}
              onChange={(e) => setForm({ ...form, sub: { ...form.sub, en: e.target.value } })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              if (!form.src || !form.title.ko) return;
              onSave(form);
            }}
            className="flex-1 bg-[#1a6db1] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/slider")
      .then((r) => r.json())
      .then(setSlides);
  }, []);

  const saveAll = async (updated: Slide[]) => {
    setSaving(true);
    await fetch("/api/admin/slider", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveSlide = (slide: Slide) => {
    const isNew = !slide.id || !slides.find((s) => s.id === slide.id);
    let updated: Slide[];
    if (isNew) {
      updated = [...slides, { ...slide, id: genId() }];
    } else {
      updated = slides.map((s) => (s.id === slide.id ? slide : s));
    }
    setSlides(updated);
    setEditing(null);
    saveAll(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("이 슬라이드를 삭제할까요?")) return;
    const updated = slides.filter((s) => s.id !== id);
    setSlides(updated);
    saveAll(updated);
  };

  const moveSlide = (id: string, dir: -1 | 1) => {
    const idx = slides.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const next = [...slides];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setSlides(next);
    saveAll(next);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">슬라이더 관리</h1>
          <p className="text-gray-400 text-sm mt-1">메인 페이지 히어로 슬라이더를 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-sm text-gray-400">저장 중...</span>}
          {saved && <span className="text-sm text-emerald-600 font-semibold">✓ 저장됨</span>}
          <button
            onClick={() => setEditing({ ...EMPTY_SLIDE })}
            className="px-5 py-2.5 bg-[#1a6db1] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
          >
            + 슬라이드 추가
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm flex overflow-hidden"
          >
            {/* Image thumbnail */}
            <div className="w-40 h-28 flex-shrink-0 bg-gray-100 relative">
              {slide.src ? (
                <img src={slide.src} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">
                  ▷
                </div>
              )}
              <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                {idx + 1}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 p-4 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{slide.title.ko || "—"}</p>
              <p className="text-gray-400 text-xs truncate mt-0.5">{slide.title.en}</p>
              <p className="text-gray-400 text-xs mt-2 truncate">{slide.sub.ko}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center justify-center gap-2 px-4 border-l border-gray-100">
              <div className="flex gap-1">
                <button
                  disabled={idx === 0}
                  onClick={() => moveSlide(slide.id, -1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded border border-gray-200"
                  title="위로"
                >
                  ↑
                </button>
                <button
                  disabled={idx === slides.length - 1}
                  onClick={() => moveSlide(slide.id, 1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded border border-gray-200"
                  title="아래로"
                >
                  ↓
                </button>
              </div>
              <button
                onClick={() => setEditing(slide)}
                className="px-3 py-1.5 bg-[#e8f2fb] text-[#1a6db1] rounded-lg text-xs font-semibold hover:bg-[#d0e8f7] transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-20 text-gray-300">
          <div className="text-6xl mb-4">▷</div>
          <p>슬라이드가 없습니다.</p>
        </div>
      )}

      {editing && (
        <SlideModal
          initial={editing}
          onSave={handleSaveSlide}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
