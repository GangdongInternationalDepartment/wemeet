"use client";

import { useEffect, useState } from "react";
import type { ConsultationSubmission } from "@/lib/types";

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<ConsultationSubmission[]>([]);
  const [selected, setSelected] = useState<ConsultationSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const markReviewed = async (id: string) => {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "reviewed" }),
    });
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "reviewed" } : s))
    );
    if (selected?.id === id) setSelected((s) => s && { ...s, status: "reviewed" });
  };

  const pending = items.filter((s) => s.status === "pending").length;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">상담 신청서</h1>
          <p className="text-gray-400 text-sm mt-1">
            온라인 상담 신청 내역을 확인합니다.
            {pending > 0 && (
              <span className="ml-2 bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full text-xs">
                미확인 {pending}건
              </span>
            )}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-300">
          <div className="text-5xl mb-4">📋</div>
          <p>접수된 신청서가 없습니다.</p>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* 목록 */}
          <div className="flex-1 min-w-0 space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  selected?.id === item.id
                    ? "border-[#E8541A] bg-[#FFF3EC]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.status === "pending" && (
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      )}
                      <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{item.nationality}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{item.inquiry || "문의 없음"}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{formatDate(item.submittedAt)}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                        item.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {item.status === "pending" ? "미확인" : "확인됨"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 상세 */}
          {selected && (
            <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">신청서 상세</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <dl className="space-y-3 text-sm">
                {[
                  { label: "이름", value: selected.name },
                  { label: "국적", value: selected.nationality },
                  { label: "생년월일", value: selected.dob || "—" },
                  { label: "전화번호", value: selected.phone },
                  { label: "이메일", value: selected.email || "—" },
                  { label: "방문 희망일", value: selected.visitDate || "—" },
                  { label: "접수 일시", value: formatDate(selected.submittedAt) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-medium text-gray-500">{label}</dt>
                    <dd className="text-gray-800 mt-0.5">{value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs font-medium text-gray-500">문의사항</dt>
                  <dd className="text-gray-800 mt-0.5 whitespace-pre-wrap leading-relaxed">
                    {selected.inquiry || "—"}
                  </dd>
                </div>
              </dl>

              {selected.status === "pending" && (
                <button
                  onClick={() => markReviewed(selected.id)}
                  className="mt-5 w-full bg-[#E8541A] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1557a0] transition-colors"
                >
                  ✓ 확인 완료로 표시
                </button>
              )}
              {selected.status === "reviewed" && (
                <p className="mt-5 text-center text-sm text-emerald-600 font-semibold">✓ 확인 완료</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
