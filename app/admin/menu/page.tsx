"use client";

import { useEffect, useState } from "react";
import type { NavItem, NavChild } from "@/lib/types";

type EditingItem =
  | { type: "category"; id: string }
  | { type: "child"; parentId: string; id: string }
  | null;

type AddingItem =
  | { type: "category" }
  | { type: "child"; parentId: string }
  | null;

function genId() {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [editing, setEditing] = useState<EditingItem>(null);
  const [adding, setAdding] = useState<AddingItem>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/navigation")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await fetch("/api/admin/navigation", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateCategory = (id: string, patch: Partial<NavItem>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch } : it))
    );
  };

  const deleteCategory = (id: string) => {
    if (!confirm("이 메뉴 카테고리를 삭제할까요?")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const moveCategory = (id: string, dir: -1 | 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };

  const updateChild = (parentId: string, childId: string, patch: Partial<NavChild>) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === parentId
          ? {
              ...it,
              children: it.children.map((c) =>
                c.id === childId ? { ...c, ...patch } : c
              ),
            }
          : it
      )
    );
  };

  const deleteChild = (parentId: string, childId: string) => {
    if (!confirm("이 하위 메뉴를 삭제할까요?")) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === parentId
          ? { ...it, children: it.children.filter((c) => c.id !== childId) }
          : it
      )
    );
  };

  const moveChild = (parentId: string, childId: string, dir: -1 | 1) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== parentId) return it;
        const children = [...it.children];
        const idx = children.findIndex((c) => c.id === childId);
        const swap = idx + dir;
        if (swap < 0 || swap >= children.length) return it;
        [children[idx], children[swap]] = [children[swap], children[idx]];
        return { ...it, children };
      })
    );
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">메뉴 관리</h1>
          <p className="text-gray-400 text-sm mt-1">메뉴 추가·수정·삭제 후 저장 버튼을 눌러주세요.</p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="px-5 py-2.5 bg-[#E8541A] text-white rounded-lg font-semibold text-sm hover:bg-[#1557a0] disabled:opacity-60 transition-colors"
        >
          {saving ? "저장 중..." : saved ? "✓ 저장됨" : "저장하기"}
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, catIdx) => (
          <CategoryCard
            key={item.id}
            item={item}
            catIdx={catIdx}
            totalCats={items.length}
            editing={editing}
            adding={adding}
            setEditing={setEditing}
            setAdding={setAdding}
            onUpdateCategory={updateCategory}
            onDeleteCategory={deleteCategory}
            onMoveCategory={moveCategory}
            onUpdateChild={updateChild}
            onDeleteChild={deleteChild}
            onMoveChild={moveChild}
            onAddChild={(parentId, child) => {
              setItems((prev) =>
                prev.map((it) =>
                  it.id === parentId
                    ? { ...it, children: [...it.children, child] }
                    : it
                )
              );
              setAdding(null);
            }}
          />
        ))}
      </div>

      {/* Add category */}
      {adding?.type === "category" ? (
        <AddCategoryForm
          onAdd={(cat) => {
            setItems((prev) => [...prev, cat]);
            setAdding(null);
          }}
          onCancel={() => setAdding(null)}
        />
      ) : (
        <button
          onClick={() => setAdding({ type: "category" })}
          className="mt-4 w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-400 hover:border-[#E8541A] hover:text-[#E8541A] transition-colors"
        >
          + 메뉴 카테고리 추가
        </button>
      )}
    </div>
  );
}

function CategoryCard({
  item,
  catIdx,
  totalCats,
  editing,
  adding,
  setEditing,
  setAdding,
  onUpdateCategory,
  onDeleteCategory,
  onMoveCategory,
  onUpdateChild,
  onDeleteChild,
  onMoveChild,
  onAddChild,
}: {
  item: NavItem;
  catIdx: number;
  totalCats: number;
  editing: EditingItem;
  adding: AddingItem;
  setEditing: (v: EditingItem) => void;
  setAdding: (v: AddingItem) => void;
  onUpdateCategory: (id: string, patch: Partial<NavItem>) => void;
  onDeleteCategory: (id: string) => void;
  onMoveCategory: (id: string, dir: -1 | 1) => void;
  onUpdateChild: (parentId: string, childId: string, patch: Partial<NavChild>) => void;
  onDeleteChild: (parentId: string, childId: string) => void;
  onMoveChild: (parentId: string, childId: string, dir: -1 | 1) => void;
  onAddChild: (parentId: string, child: NavChild) => void;
}) {
  const isEditingCat = editing?.type === "category" && editing.id === item.id;
  const [draft, setDraft] = useState({ ko: item.ko, en: item.en, href: item.href });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Category header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <div className="flex-1">
          {isEditingCat ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  value={draft.ko}
                  onChange={(e) => setDraft({ ...draft, ko: e.target.value })}
                  placeholder="한국어 이름"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
                />
                <input
                  value={draft.en}
                  onChange={(e) => setDraft({ ...draft, en: e.target.value })}
                  placeholder="English name"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
                />
              </div>
              <input
                value={draft.href}
                onChange={(e) => setDraft({ ...draft, href: e.target.value })}
                placeholder="URL (예: /about)"
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onUpdateCategory(item.id, draft);
                    setEditing(null);
                  }}
                  className="px-3 py-1.5 bg-[#E8541A] text-white rounded-lg text-xs font-semibold"
                >
                  적용
                </button>
                <button
                  onClick={() => {
                    setDraft({ ko: item.ko, en: item.en, href: item.href });
                    setEditing(null);
                  }}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span className="font-semibold text-gray-800">{item.ko}</span>
              <span className="text-gray-400 text-sm ml-2">/ {item.en}</span>
              <span className="text-gray-400 text-xs ml-2 font-mono">{item.href}</span>
            </div>
          )}
        </div>

        {!isEditingCat && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              disabled={catIdx === 0}
              onClick={() => onMoveCategory(item.id, -1)}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded"
              title="위로"
            >
              ↑
            </button>
            <button
              disabled={catIdx === totalCats - 1}
              onClick={() => onMoveCategory(item.id, 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded"
              title="아래로"
            >
              ↓
            </button>
            <button
              onClick={() => setEditing({ type: "category", id: item.id })}
              className="px-2.5 py-1 text-xs text-[#E8541A] border border-[#E8541A] rounded-lg hover:bg-[#FFF3EC] transition-colors"
            >
              수정
            </button>
            <button
              onClick={() => onDeleteCategory(item.id)}
              className="px-2.5 py-1 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* Children */}
      <div className="px-5 py-3 space-y-1.5">
        {item.children.map((child, childIdx) => (
          <ChildRow
            key={child.id}
            child={child}
            childIdx={childIdx}
            totalChildren={item.children.length}
            editing={editing}
            setEditing={setEditing}
            parentId={item.id}
            onUpdate={(patch) => onUpdateChild(item.id, child.id, patch)}
            onDelete={() => onDeleteChild(item.id, child.id)}
            onMove={(dir) => onMoveChild(item.id, child.id, dir)}
          />
        ))}

        {adding?.type === "child" && adding.parentId === item.id ? (
          <AddChildForm
            onAdd={(child) => onAddChild(item.id, child)}
            onCancel={() => setAdding(null)}
          />
        ) : (
          <button
            onClick={() => setAdding({ type: "child", parentId: item.id })}
            className="w-full text-left text-xs text-gray-400 hover:text-[#E8541A] py-1 px-2 rounded hover:bg-gray-50 transition-colors"
          >
            + 하위 메뉴 추가
          </button>
        )}
      </div>
    </div>
  );
}

function ChildRow({
  child,
  childIdx,
  totalChildren,
  editing,
  setEditing,
  parentId,
  onUpdate,
  onDelete,
  onMove,
}: {
  child: NavChild;
  childIdx: number;
  totalChildren: number;
  editing: EditingItem;
  setEditing: (v: EditingItem) => void;
  parentId: string;
  onUpdate: (patch: Partial<NavChild>) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const isEditing =
    editing?.type === "child" &&
    editing.parentId === parentId &&
    editing.id === child.id;

  const [draft, setDraft] = useState({ ko: child.ko, en: child.en, href: child.href });

  return (
    <div className="flex items-center gap-2 py-1 pl-3 border-l-2 border-gray-100">
      {isEditing ? (
        <div className="flex-1 space-y-1.5">
          <div className="flex gap-2">
            <input
              value={draft.ko}
              onChange={(e) => setDraft({ ...draft, ko: e.target.value })}
              placeholder="한국어"
              className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
            />
            <input
              value={draft.en}
              onChange={(e) => setDraft({ ...draft, en: e.target.value })}
              placeholder="English"
              className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
            />
            <input
              value={draft.href}
              onChange={(e) => setDraft({ ...draft, href: e.target.value })}
              placeholder="URL"
              className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => {
                onUpdate(draft);
                setEditing(null);
              }}
              className="px-2.5 py-1 bg-[#E8541A] text-white rounded text-xs font-semibold"
            >
              적용
            </button>
            <button
              onClick={() => {
                setDraft({ ko: child.ko, en: child.en, href: child.href });
                setEditing(null);
              }}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="text-gray-700 text-sm flex-1">{child.ko}</span>
          <span className="text-gray-400 text-xs">{child.en}</span>
          <span className="text-gray-300 text-xs font-mono">{child.href}</span>
          <div className="flex items-center gap-1 ml-2">
            <button disabled={childIdx === 0} onClick={() => onMove(-1)} className="w-5 h-5 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">↑</button>
            <button disabled={childIdx === totalChildren - 1} onClick={() => onMove(1)} className="w-5 h-5 text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs">↓</button>
            <button
              onClick={() => setEditing({ type: "child", parentId, id: child.id })}
              className="px-2 py-0.5 text-xs text-[#E8541A] border border-[#E8541A] rounded hover:bg-[#FFF3EC] transition-colors"
            >
              수정
            </button>
            <button
              onClick={onDelete}
              className="px-2 py-0.5 text-xs text-red-500 border border-red-200 rounded hover:bg-red-50 transition-colors"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function AddCategoryForm({
  onAdd,
  onCancel,
}: {
  onAdd: (item: NavItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ko: "", en: "", href: "" });
  return (
    <div className="mt-4 bg-white rounded-xl border border-[#E8541A] p-4 space-y-2">
      <p className="text-sm font-semibold text-gray-700">새 카테고리 추가</p>
      <div className="flex gap-2">
        <input
          value={form.ko}
          onChange={(e) => setForm({ ...form, ko: e.target.value })}
          placeholder="한국어 이름"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
        />
        <input
          value={form.en}
          onChange={(e) => setForm({ ...form, en: e.target.value })}
          placeholder="English name"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
        />
      </div>
      <input
        value={form.href}
        onChange={(e) => setForm({ ...form, href: e.target.value })}
        placeholder="URL (예: /about)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#E8541A]"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!form.ko || !form.href) return;
            onAdd({ id: genId(), ...form, children: [] });
          }}
          className="px-4 py-2 bg-[#E8541A] text-white rounded-lg text-sm font-semibold"
        >
          추가
        </button>
        <button onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
          취소
        </button>
      </div>
    </div>
  );
}

function AddChildForm({
  onAdd,
  onCancel,
}: {
  onAdd: (child: NavChild) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ko: "", en: "", href: "" });
  return (
    <div className="mt-1 bg-orange-50 rounded-lg p-3 space-y-2">
      <div className="flex gap-2">
        <input
          value={form.ko}
          onChange={(e) => setForm({ ...form, ko: e.target.value })}
          placeholder="한국어"
          className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8541A] bg-white"
        />
        <input
          value={form.en}
          onChange={(e) => setForm({ ...form, en: e.target.value })}
          placeholder="English"
          className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#E8541A] bg-white"
        />
        <input
          value={form.href}
          onChange={(e) => setForm({ ...form, href: e.target.value })}
          placeholder="URL"
          className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E8541A] bg-white"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!form.ko || !form.href) return;
            onAdd({ id: genId(), ...form });
          }}
          className="px-3 py-1.5 bg-[#E8541A] text-white rounded-lg text-xs font-semibold"
        >
          추가
        </button>
        <button onClick={onCancel} className="px-3 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-xs">
          취소
        </button>
      </div>
    </div>
  );
}
