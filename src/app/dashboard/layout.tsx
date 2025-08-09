"use client";

import LayoutAdminV1 from "@components/layouts/versions/v1/admin";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutAdminV1>
      {children}
    </LayoutAdminV1>
  )
}