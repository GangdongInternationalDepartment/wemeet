"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "로그인에 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1a6db1] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            WM
          </div>
          <h1 className="text-xl font-bold text-gray-800">관리자 로그인</h1>
          <p className="text-gray-400 text-sm mt-1">WE MEET 다문화 행복센터</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6db1] focus:border-transparent transition"
              placeholder="관리자 비밀번호"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a6db1] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#1557a0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          WE MEET 관리자만 접근 가능합니다
        </p>
      </div>
    </div>
  );
}
