"use client"

import type React from "react"
import { useState } from "react"
import { CoordonSidebar } from "@/components/coordon/coordon-sidebar"
import { CoordonHeader } from "@/components/coordon/coordon-header"
import { useRoleGuard } from "@/lib/hooks/useRoleGuard"

export default function CoordonLayout({ children }: { children: React.ReactNode }) {
  useRoleGuard(["COORDON"]);

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <CoordonSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <CoordonHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
