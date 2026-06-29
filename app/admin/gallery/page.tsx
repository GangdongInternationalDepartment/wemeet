"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/types";

const TAG_PRESETS = [
  { ko: "위밋프로그램", en: "WE MEET" },
  { ko: "미밋프로그램", en: "MI MEET" },
  { ko: "랜드마크투어", en: "Tour" },
  { ko: "파티", en: "Party" },
  { ko: "기타", en: "Other" },
];

function genId() {
  return `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

function EmptyModal({
  initial,
  onSave,
  onClose,
}: {
  initial: GalleryItem;
  onSave: (item: GalleryItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<GalleryItem>(initial);
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
          {initial.id ? "사진 수정" : "새 사진 추가"}
        </h3>

        {/* Image preview */}
        <div className="mb-4">
          <div className="h-40 bg-gray-100 rounded-xl overflow-hidden mb-2 relative">
            {form.src && (
              <img src={form.src} alt="" className="w-full h-full object-cover" />
            )}
            {!form.src && (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                ⊟
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              placeholder="/images/gallery/gallery-01.jpg"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 flex-shrink-0"
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

        {/* Fields */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">제목 (한국어)</label>
              <input
                value={form.title.ko}
                onChange={(e) => setForm({ ...form, title: { ...form.title, ko: e.target.value } })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Title (English)</label>
              <input
                value={form.title.en}
                onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-28">
              <label className="block text-xs font-medium text-gray-600 mb-1">날짜</label>
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="2025.10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">태그</label>
              <select
                value={form.tag.ko}
                onChange={(e) => {
                  const preset = TAG_PRESETS.find((t) => t.ko === e.target.value);
                  if (preset) setForm({ ...form, tag: preset });
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
              >
                {TAG_PRESETS.map((t) => (
                  <option key={t.ko} value={t.ko}>
                    {t.ko} / {t.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              if (!form.src || !form.title.ko) return;
              onSave(form);
            }}
            className="flex-1 bg-[#E8541A] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
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

const EMPTY_ITEM: GalleryItem = {
  id: "",
  src: "",
  title: { ko: "", en: "" },
  date: new Date().toISOString().slice(0, 7).replace("-", "."),
  tag: { ko: "위밋프로그램", en: "WE MEET" },
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const saveAll = async (updatedItems: GalleryItem[]) => {
    setSaving(true);
    await fetch("/api/admin/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItems),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveItem = (item: GalleryItem) => {
    const isNew = !item.id || !items.find((i) => i.id === item.id);
    let updated: GalleryItem[];
    if (isNew) {
      updated = [...items, { ...item, id: genId() }];
    } else {
      updated = items.map((i) => (i.id === item.id ? item : i));
    }
    setItems(updated);
    setEditing(null);
    saveAll(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("이 사진을 갤러리에서 삭제할까요?")) return;
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveAll(updated);
  };

  const moveItem = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const next = [...items];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setItems(next);
    saveAll(next);
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">갤러리 관리</h1>
          <p className="text-gray-400 text-sm mt-1">사진을 추가·수정·삭제합니다. 변경 시 자동 저장됩니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-sm text-gray-400">저장 중...</span>}
          {saved && <span className="text-sm text-emerald-600 font-semibold">✓ 저장됨</span>}
          <button
            onClick={() => setEditing({ ...EMPTY_ITEM })}
            className="px-5 py-2.5 bg-[#E8541A] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
          >
            + 사진 추가
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-300">
          <div className="text-6xl mb-4">⊟</div>
          <p>갤러리 항목이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm group"
            >
              <div className="h-36 relative overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.title.ko}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setEditing(item)}
                    className="px-3 py-1.5 bg-white text-gray-800 rounded-lg text-xs font-semibold shadow"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold shadow"
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-gray-700 leading-snug truncate">{item.title.ko}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{item.tag.ko}</span>
                  <div className="flex gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem(item.id, -1)}
                      className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-sm"
                    >
                      ←
                    </button>
                    <button
                      disabled={idx === items.length - 1}
                      onClick={() => moveItem(item.id, 1)}
                      className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-sm"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <EmptyModal
          initial={editing}
          onSave={handleSaveItem}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
