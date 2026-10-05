import type { Metadata } from "next";
import { auth } from "@/auth";
import { AdminFrame } from "@/components/admin-frame";
import "./admin.css";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return <AdminFrame email={session?.user?.email ?? null}>{children}</AdminFrame>;
}
