"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#1a6db1] to-[#2590e0] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {breadcrumb && (
          <p className="text-blue-200 text-sm mb-2">{breadcrumb.join(" > ")}</p>
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-blue-100 text-lg">{subtitle}</p>}
      </div>
    </div>
  );
}
