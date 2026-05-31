import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminDashboardPage() {
  const token = (await cookies()).get("sahha_admin")?.value;
  if (!token) {
    redirect("/admin/login");
  }
  return <AdminDashboard />;
}
