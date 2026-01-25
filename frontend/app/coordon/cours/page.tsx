"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CoordonCoursList } from "@/components/coordon/coordon-cours-list"
import { CoursModal } from "@/components/admin/cours-modal"
import { Plus } from "lucide-react"

export default function CoordonCoursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCours, setEditingCours] = useState(null)

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif">Gestion des Cours</h1>
          <p className="text-muted-foreground mt-1">Gérez les cours de votre promotion</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Ajouter un cours
        </Button>
      </div>

      {/* Cours List */}
      <CoordonCoursList
        onEdit={(cours) => {
          setEditingCours(cours)
          setIsModalOpen(true)
        }}
      />

      {/* Modal */}
      <CoursModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCours(null)
        }}
        cours={editingCours}
      />
    </div>
  )
}
