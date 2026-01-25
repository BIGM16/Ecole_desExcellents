"use client"

import { EncadreurHoraireList } from "@/components/encadreur/encadreur-horaire-list"

export default function EncadreurHorairesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Horaires de la Promotion</h1>
        <p className="text-muted-foreground mt-1">Consultez l'horaire complet avec vos cours en évidence</p>
      </div>

      <EncadreurHoraireList />
    </div>
  )
}
