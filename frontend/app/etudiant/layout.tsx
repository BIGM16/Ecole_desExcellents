"use client"

import type React from "react"
import { useState } from "react"
import { EtudiantSidebar } from "@/components/etudiant/etudiant-sidebar"
import { EtudiantHeader } from "@/components/etudiant/etudiant-header"
import { useRoleGuard } from "@/lib/hooks/useRoleGuard"

export default function EtudiantLayout({ children }: { children: React.ReactNode }) {
  useRoleGuard(["ETUDIANT"]);

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <EtudiantSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <EtudiantHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
