"use client"

import { useState } from "react"
import { CoursList } from "@/components/admin/cours-list"
import { CoursModal } from "@/components/admin/cours-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CoursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">Gestion des Cours</h1>
          <p className="text-muted-foreground">Organisation et administration des matières</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-5 w-5" />
          Ajouter un Cours
        </Button>
      </div>

      <CoursList />
      <CoursModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
