"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CoordonEtudiantsList } from "@/components/coordon/coordon-etudiants-list"
import { EtudiantModal } from "@/components/admin/etudiant-modal"
import { Plus } from "lucide-react"

export default function CoordonEtudiantsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEtudiant, setEditingEtudiant] = useState(null)

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif">Gestion des Étudiants</h1>
          <p className="text-muted-foreground mt-1">Gérez les étudiants de votre promotion</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Ajouter un étudiant
        </Button>
      </div>

      {/* Étudiants List */}
      <CoordonEtudiantsList
        onEdit={(etudiant) => {
          setEditingEtudiant(etudiant)
          setIsModalOpen(true)
        }}
      />

      {/* Modal */}
      <EtudiantModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingEtudiant(null)
        }}
        etudiant={editingEtudiant}
      />
    </div>
  )
}
