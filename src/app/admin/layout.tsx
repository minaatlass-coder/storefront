import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Sahhaonline",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#0f1419] text-[#e8eaed]">{children}</div>
  );
}
