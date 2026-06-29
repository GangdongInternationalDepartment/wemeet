"use client";

import { useState } from "react";

export default function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(data.error || "비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">비밀번호 변경</h1>
        <p className="text-gray-400 text-sm mt-1">관리자 로그인 비밀번호를 변경합니다.</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A] focus:border-transparent transition"
              placeholder="현재 비밀번호 입력"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A] focus:border-transparent transition"
              placeholder="새 비밀번호 (6자 이상)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8541A] focus:border-transparent transition"
              placeholder="새 비밀번호 다시 입력"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm bg-green-50 rounded-lg px-4 py-3">
              비밀번호가 성공적으로 변경되었습니다.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8541A] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#c9481a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      </div>
    </div>
  );
}
