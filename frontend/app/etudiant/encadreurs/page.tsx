"use client"

import { EtudiantEncadreursList } from "@/components/etudiant/etudiant-encadreurs-list"

export default function EtudiantEncadreursPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Encadreurs de la Promotion</h1>
        <p className="text-muted-foreground mt-1">Liste des encadreurs assignés à votre promotion</p>
      </div>

      <EtudiantEncadreursList />
    </div>
  )
}
