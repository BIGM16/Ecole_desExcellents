"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HorairesList } from "@/components/coordon/horaires-list"
import { HoraireModal } from "@/components/coordon/horaire-modal"
import { Plus } from "lucide-react"

export default function CoordonHorairesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHoraire, setEditingHoraire] = useState(null)

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif">Gestion des Horaires</h1>
          <p className="text-muted-foreground mt-1">Planifiez les cours d'encadrement de votre promotion</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Ajouter un horaire
        </Button>
      </div>

      {/* Horaires List */}
      <HorairesList
        onEdit={(horaire) => {
          setEditingHoraire(horaire)
          setIsModalOpen(true)
        }}
      />

      {/* Modal */}
      <HoraireModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingHoraire(null)
        }}
        horaire={editingHoraire}
      />
    </div>
  )
}
