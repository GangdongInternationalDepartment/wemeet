"use client";

import { useEffect, useRef, useState } from "react";
import type { WeMeetProgram, WeMeetActivity, ProgramPhoto } from "@/lib/types";

function genId() {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

function BilingualField({
  label,
  ko,
  en,
  onKo,
  onEn,
  multiline = false,
}: {
  label: string;
  ko: string;
  en: string;
  onKo: (v: string) => void;
  onEn: (v: string) => void;
  multiline?: boolean;
}) {
  const cls = "flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]";
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <div className="flex gap-2">
        {multiline ? (
          <>
            <textarea rows={3} value={ko} onChange={(e) => onKo(e.target.value)} placeholder="한국어" className={cls + " resize-none"} />
            <textarea rows={3} value={en} onChange={(e) => onEn(e.target.value)} placeholder="English" className={cls + " resize-none"} />
          </>
        ) : (
          <>
            <input value={ko} onChange={(e) => onKo(e.target.value)} placeholder="한국어" className={cls} />
            <input value={en} onChange={(e) => onEn(e.target.value)} placeholder="English" className={cls} />
          </>
        )}
      </div>
    </div>
  );
}

function PhotoUploadButton({ onSrc, uploading, setUploading }: { onSrc: (src: string) => void; uploading: boolean; setUploading: (v: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200 disabled:opacity-60 flex-shrink-0"
      >
        {uploading ? "업로드 중..." : "사진 업로드"}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setUploading(true);
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
          setUploading(false);
          if (res.ok) {
            const { src } = await res.json();
            onSrc(src);
          }
        }}
      />
    </>
  );
}

export default function AdminWeMeetPage() {
  const [program, setProgram] = useState<WeMeetProgram | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/pages/wemeet").then((r) => r.json()).then(setProgram);
  }, []);

  const save = async (updated: WeMeetProgram) => {
    setSaving(true);
    await fetch("/api/admin/pages/wemeet", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!program) return <div className="p-8 text-gray-400">불러오는 중...</div>;

  const p = program;

  const updateActivity = (id: string, patch: Partial<WeMeetActivity>) =>
    setProgram({ ...p, activities: p.activities.map((a) => (a.id === id ? { ...a, ...patch } : a)) });

  const deleteActivity = (id: string) => {
    if (!confirm("이 활동을 삭제할까요?")) return;
    setProgram({ ...p, activities: p.activities.filter((a) => a.id !== id) });
  };

  const moveActivity = (id: string, dir: -1 | 1) => {
    const list = [...p.activities];
    const idx = list.findIndex((a) => a.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= list.length) return;
    [list[idx], list[swap]] = [list[swap], list[idx]];
    setProgram({ ...p, activities: list });
  };

  const updatePhoto = (id: string, patch: Partial<ProgramPhoto>) =>
    setProgram({ ...p, photos: p.photos.map((ph) => (ph.id === id ? { ...ph, ...patch } : ph)) });

  const deletePhoto = (id: string) => {
    if (!confirm("이 사진을 삭제할까요?")) return;
    setProgram({ ...p, photos: p.photos.filter((ph) => ph.id !== id) });
  };

  const movePhoto = (id: string, dir: -1 | 1) => {
    const list = [...p.photos];
    const idx = list.findIndex((ph) => ph.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= list.length) return;
    [list[idx], list[swap]] = [list[swap], list[idx]];
    setProgram({ ...p, photos: list });
  };

  return (
    <div className="p-8 max-w-3xl space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">WE MEET 프로그램 관리</h1>
          <p className="text-gray-400 text-sm mt-1">/programs/wemeet 페이지 콘텐츠를 편집합니다.</p>
        </div>
        <button
          onClick={() => save(program)}
          disabled={saving}
          className="px-5 py-2.5 bg-[#1a6db1] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] disabled:opacity-60 transition-colors"
        >
          {saving ? "저장 중..." : saved ? "✓ 저장됨" : "저장하기"}
        </button>
      </div>

      {/* 히어로 배너 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">히어로 배너</h2>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">이모지</p>
          <input
            value={p.hero.emoji}
            onChange={(e) => setProgram({ ...p, hero: { ...p.hero, emoji: e.target.value } })}
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
          />
        </div>
        <BilingualField
          label="제목"
          ko={p.hero.title.ko} en={p.hero.title.en}
          onKo={(v) => setProgram({ ...p, hero: { ...p.hero, title: { ...p.hero.title, ko: v } } })}
          onEn={(v) => setProgram({ ...p, hero: { ...p.hero, title: { ...p.hero.title, en: v } } })}
        />
        <BilingualField
          label="설명"
          ko={p.hero.desc.ko} en={p.hero.desc.en}
          multiline
          onKo={(v) => setProgram({ ...p, hero: { ...p.hero, desc: { ...p.hero.desc, ko: v } } })}
          onEn={(v) => setProgram({ ...p, hero: { ...p.hero, desc: { ...p.hero.desc, en: v } } })}
        />
      </section>

      {/* 운영 정보 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">운영 정보</h2>
        {(["day", "target", "cost"] as const).map((key) => (
          <BilingualField
            key={key}
            label={key === "day" ? "운영일" : key === "target" ? "대상" : "비용"}
            ko={p.info[key].ko} en={p.info[key].en}
            onKo={(v) => setProgram({ ...p, info: { ...p.info, [key]: { ...p.info[key], ko: v } } })}
            onEn={(v) => setProgram({ ...p, info: { ...p.info, [key]: { ...p.info[key], en: v } } })}
          />
        ))}
      </section>

      {/* 주요 활동 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">주요 활동</h2>
        {p.activities.map((act, idx) => (
          <div key={act.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <input
                  value={act.icon}
                  onChange={(e) => updateActivity(act.id, { icon: e.target.value })}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                  placeholder="🍳"
                />
              </div>
              <div className="flex gap-1">
                <button disabled={idx === 0} onClick={() => moveActivity(act.id, -1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30">↑</button>
                <button disabled={idx === p.activities.length - 1} onClick={() => moveActivity(act.id, 1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30">↓</button>
                <button onClick={() => deleteActivity(act.id)} className="px-2.5 py-1 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50">삭제</button>
              </div>
            </div>
            <BilingualField
              label="이름"
              ko={act.ko} en={act.en}
              onKo={(v) => updateActivity(act.id, { ko: v })}
              onEn={(v) => updateActivity(act.id, { en: v })}
            />
            <BilingualField
              label="설명"
              ko={act.desc.ko} en={act.desc.en}
              multiline
              onKo={(v) => updateActivity(act.id, { desc: { ...act.desc, ko: v } })}
              onEn={(v) => updateActivity(act.id, { desc: { ...act.desc, en: v } })}
            />
          </div>
        ))}
        <button
          onClick={() => setProgram({ ...p, activities: [...p.activities, { id: genId(), icon: "⭐", ko: "", en: "", desc: { ko: "", en: "" } }] })}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-400 hover:border-[#1a6db1] hover:text-[#1a6db1] transition-colors"
        >
          + 활동 추가
        </button>
      </section>

      {/* 활동 사진 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-bold text-gray-700">활동 사진</h2>
        {p.photos.map((photo, idx) => (
          <div key={photo.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              {photo.src && (
                <img src={photo.src} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <input
                    value={photo.src}
                    onChange={(e) => updatePhoto(photo.id, { src: e.target.value })}
                    placeholder="/images/..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1a6db1]"
                  />
                  <PhotoUploadButton onSrc={(src) => updatePhoto(photo.id, { src })} uploading={uploading} setUploading={setUploading} />
                </div>
                <BilingualField
                  label="캡션"
                  ko={photo.caption.ko} en={photo.caption.en}
                  onKo={(v) => updatePhoto(photo.id, { caption: { ...photo.caption, ko: v } })}
                  onEn={(v) => updatePhoto(photo.id, { caption: { ...photo.caption, en: v } })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <button disabled={idx === 0} onClick={() => movePhoto(photo.id, -1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">↑</button>
                <button disabled={idx === p.photos.length - 1} onClick={() => movePhoto(photo.id, 1)} className="w-7 h-7 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">↓</button>
                <button onClick={() => deletePhoto(photo.id)} className="w-7 h-7 text-red-400 hover:text-red-600 text-xs">✕</button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setProgram({ ...p, photos: [...p.photos, { id: genId(), src: "", caption: { ko: "", en: "" } }] })}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-400 hover:border-[#1a6db1] hover:text-[#1a6db1] transition-colors"
        >
          + 사진 추가
        </button>
      </section>
    </div>
  );
}
