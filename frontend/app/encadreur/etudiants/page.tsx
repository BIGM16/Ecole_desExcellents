"use client"

import { EncadreurEtudiantsList } from "@/components/encadreur/encadreur-etudiants-list"

export default function EncadreurEtudiantsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Liste des Étudiants</h1>
        <p className="text-muted-foreground mt-1">Consultez les étudiants de votre promotion</p>
      </div>

      <EncadreurEtudiantsList />
    </div>
  )
}
