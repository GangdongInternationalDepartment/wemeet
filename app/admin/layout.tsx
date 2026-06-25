"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/admin/dashboard", label: "대시보드", icon: "⊞", group: null },
  { href: "/admin/menu", label: "메뉴 관리", icon: "≡", group: "사이트 설정" },
  { href: "/admin/gallery", label: "갤러리 관리", icon: "⊟", group: null },
  { href: "/admin/slider", label: "슬라이더 관리", icon: "▷", group: null },
  { href: "/admin/programs/wemeet", label: "WE MEET 프로그램", icon: "☀", group: "페이지 콘텐츠" },
  { href: "/admin/programs/mimeet", label: "MI MEET 프로그램", icon: "✏", group: null },
  { href: "/admin/newsletter", label: "알림톡톡", icon: "📢", group: null },
  { href: "/admin/faq", label: "FAQ", icon: "❓", group: null },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-gray-50 overflow-hidden">
      {/* Top bar */}
      <header className="bg-[#1a6db1] text-white h-14 flex items-center px-5 flex-shrink-0 shadow-md">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
            WM
          </div>
          <span className="font-bold text-base">WE MEET 관리자</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            target="_blank"
            className="hover:text-yellow-300 transition-colors flex items-center gap-1"
          >
            사이트 보기 →
          </Link>
          <span className="text-white/30">|</span>
          <button
            onClick={handleLogout}
            className="hover:text-yellow-300 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-auto">
          <nav className="p-3 flex-1">
            {navLinks.map(({ href, label, icon, group }, idx) => (
              <div key={href}>
                {group && (
                  <p className={`text-xs font-semibold text-gray-400 px-3 pb-1 ${idx === 0 ? "pt-1" : "pt-4"}`}>
                    {group}
                  </p>
                )}
                <Link
                  href={href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href || pathname.startsWith(href + "/")
                      ? "bg-[#e8f2fb] text-[#1a6db1]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span className="text-base leading-none">{icon}</span>
                  {label}
                </Link>
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">WE MEET Admin v1.0</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
