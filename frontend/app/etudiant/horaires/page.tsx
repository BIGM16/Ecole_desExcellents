"use client"

import { EtudiantHoraireList } from "@/components/etudiant/etudiant-horaire-list"

export default function EtudiantHorairesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Horaires de la Promotion</h1>
        <p className="text-muted-foreground mt-1">Consultez l'emploi du temps complet de votre promotion</p>
      </div>

      <EtudiantHoraireList />
    </div>
  )
}
