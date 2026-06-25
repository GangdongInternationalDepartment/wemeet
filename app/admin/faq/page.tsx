"use client";

import { useEffect, useState } from "react";
import type { FaqItem } from "@/lib/types";

function genId() {
  return `f_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

function FaqModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<FaqItem>;
  onSave: (item: FaqItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FaqItem>({
    id: initial.id ?? genId(),
    order: initial.order ?? 0,
    q: initial.q ?? { ko: "", en: "" },
    a: initial.a ?? { ko: "", en: "" },
  });

  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl mt-10" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg text-gray-800 mb-5">
          {initial.id ? "FAQ 수정" : "새 FAQ 추가"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">질문 (한국어)</label>
            <input value={form.q.ko} onChange={(e) => setForm({ ...form, q: { ...form.q, ko: e.target.value } })} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Question (English)</label>
            <input value={form.q.en} onChange={(e) => setForm({ ...form, q: { ...form.q, en: e.target.value } })} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">답변 (한국어)</label>
            <textarea rows={4} value={form.a.ko} onChange={(e) => setForm({ ...form, a: { ...form.a, ko: e.target.value } })} className={cls + " resize-none"} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Answer (English)</label>
            <textarea rows={4} value={form.a.en} onChange={(e) => setForm({ ...form, a: { ...form.a, en: e.target.value } })} className={cls + " resize-none"} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => { if (!form.q.ko || !form.a.ko) return; onSave(form); }}
            className="flex-1 bg-[#1a6db1] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
          >
            저장
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-colors">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<Partial<FaqItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/faq").then((r) => r.json()).then(setItems);
  }, []);

  const saveAll = async (updated: FaqItem[]) => {
    setSaving(true);
    await fetch("/api/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  const handleSave = (item: FaqItem) => {
    const isNew = !items.find((i) => i.id === item.id);
    const updated = isNew
      ? [...items, item].map((i, idx) => ({ ...i, order: idx }))
      : items.map((i) => (i.id === item.id ? item : i));
    setItems(updated);
    setEditing(null);
    saveAll(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("이 FAQ를 삭제할까요?")) return;
    const updated = items.filter((i) => i.id !== id).map((i, idx) => ({ ...i, order: idx }));
    setItems(updated);
    saveAll(updated);
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= items.length) return;
    const updated = [...items];
    [updated[idx], updated[swap]] = [updated[swap], updated[idx]];
    const reordered = updated.map((i, n) => ({ ...i, order: n }));
    setItems(reordered);
    saveAll(reordered);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">FAQ 관리</h1>
          <p className="text-gray-400 text-sm mt-1">자주 묻는 질문을 추가·수정·삭제합니다. 변경 시 자동 저장됩니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-sm text-gray-400">저장 중...</span>}
          <button
            onClick={() => setEditing({})}
            className="px-5 py-2.5 bg-[#1a6db1] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
          >
            + FAQ 추가
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-300">
          <p className="text-5xl mb-4">❓</p>
          <p>등록된 FAQ가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className="w-7 h-7 bg-[#1a6db1] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{item.q.ko}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.a.ko}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button disabled={idx === 0} onClick={() => move(item.id, -1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-sm">↑</button>
                <button disabled={idx === items.length - 1} onClick={() => move(item.id, 1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-sm">↓</button>
                <button onClick={() => setEditing(item)}
                  className="px-2.5 py-1 text-xs text-[#1a6db1] border border-[#1a6db1] rounded-lg hover:bg-[#e8f2fb] transition-colors">
                  수정
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="px-2.5 py-1 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <FaqModal
          initial={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
