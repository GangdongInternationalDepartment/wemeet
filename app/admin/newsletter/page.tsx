"use client";

import { useEffect, useState } from "react";
import type { NewsletterPost } from "@/lib/types";

function genId() {
  return `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

const TAG_PRESETS = [
  { ko: "공지", en: "Notice" },
  { ko: "안내", en: "Info" },
  { ko: "이벤트", en: "Event" },
  { ko: "소식", en: "News" },
];

function PostModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<NewsletterPost>;
  onSave: (post: NewsletterPost) => void;
  onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const [form, setForm] = useState<NewsletterPost>({
    id: initial.id ?? genId(),
    order: initial.order ?? 0,
    date: initial.date ?? today,
    title: initial.title ?? { ko: "", en: "" },
    tag: initial.tag ?? TAG_PRESETS[0],
    content: initial.content ?? { ko: "", en: "" },
  });

  const cls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl mt-10" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg text-gray-800 mb-5">
          {initial.id ? "공지사항 수정" : "새 공지사항 추가"}
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">날짜</label>
              <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="2025.06.01" className={cls} />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">태그</label>
              <select
                value={form.tag.ko}
                onChange={(e) => { const p = TAG_PRESETS.find((t) => t.ko === e.target.value); if (p) setForm({ ...form, tag: p }); }}
                className={cls}
              >
                {TAG_PRESETS.map((t) => <option key={t.ko} value={t.ko}>{t.ko} / {t.en}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">제목 (한국어)</label>
            <input value={form.title.ko} onChange={(e) => setForm({ ...form, title: { ...form.title, ko: e.target.value } })} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title (English)</label>
            <input value={form.title.en} onChange={(e) => setForm({ ...form, title: { ...form.title, en: e.target.value } })} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">내용 (한국어)</label>
            <textarea rows={4} value={form.content.ko} onChange={(e) => setForm({ ...form, content: { ...form.content, ko: e.target.value } })} className={cls + " resize-none"} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Content (English)</label>
            <textarea rows={4} value={form.content.en} onChange={(e) => setForm({ ...form, content: { ...form.content, en: e.target.value } })} className={cls + " resize-none"} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              if (!form.title.ko || !form.content.ko) return;
              onSave(form);
            }}
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

export default function AdminNewsletterPage() {
  const [posts, setPosts] = useState<NewsletterPost[]>([]);
  const [editing, setEditing] = useState<Partial<NewsletterPost> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/newsletter").then((r) => r.json()).then(setPosts);
  }, []);

  const saveAll = async (updated: NewsletterPost[]) => {
    setSaving(true);
    await fetch("/api/admin/newsletter", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
  };

  const handleSave = (post: NewsletterPost) => {
    const isNew = !posts.find((p) => p.id === post.id);
    const updated = isNew
      ? [post, ...posts].map((p, i) => ({ ...p, order: i }))
      : posts.map((p) => (p.id === post.id ? post : p));
    setPosts(updated);
    setEditing(null);
    saveAll(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("이 공지사항을 삭제할까요?")) return;
    const updated = posts.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i }));
    setPosts(updated);
    saveAll(updated);
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = posts.findIndex((p) => p.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= posts.length) return;
    const updated = [...posts];
    [updated[idx], updated[swap]] = [updated[swap], updated[idx]];
    const reordered = updated.map((p, i) => ({ ...p, order: i }));
    setPosts(reordered);
    saveAll(reordered);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">알림톡톡 관리</h1>
          <p className="text-gray-400 text-sm mt-1">공지사항을 추가·수정·삭제합니다. 변경 시 자동 저장됩니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-sm text-gray-400">저장 중...</span>}
          <button
            onClick={() => setEditing({})}
            className="px-5 py-2.5 bg-[#1a6db1] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors"
          >
            + 공지 추가
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-300">
          <p className="text-5xl mb-4">📭</p>
          <p>공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, idx) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#e8f2fb] text-[#1a6db1] text-xs font-bold px-2.5 py-0.5 rounded-full">{post.tag.ko}</span>
                  <span className="text-gray-400 text-xs">{post.date}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm truncate">{post.title.ko}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{post.content.ko}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button disabled={idx === 0} onClick={() => move(post.id, -1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-sm">↑</button>
                <button disabled={idx === posts.length - 1} onClick={() => move(post.id, 1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-sm">↓</button>
                <button onClick={() => setEditing(post)}
                  className="px-2.5 py-1 text-xs text-[#1a6db1] border border-[#1a6db1] rounded-lg hover:bg-[#e8f2fb] transition-colors">
                  수정
                </button>
                <button onClick={() => handleDelete(post.id)}
                  className="px-2.5 py-1 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <PostModal
          initial={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
