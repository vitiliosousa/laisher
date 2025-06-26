"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminHeader from "@/components/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <AdminHeader />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}