"use client"

import { EtudiantEtudiantsList } from "@/components/etudiant/etudiant-etudiants-list"

export default function EtudiantEtudiantsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Étudiants de la Promotion</h1>
        <p className="text-muted-foreground mt-1">Restez en contact avec vos camarades de promotion</p>
      </div>

      <EtudiantEtudiantsList />
    </div>
  )
}
