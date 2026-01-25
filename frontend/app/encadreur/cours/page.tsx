"use client"

import { EncadreurCoursList } from "@/components/encadreur/encadreur-cours-list"

export default function EncadreurCoursPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Gestion des Cours</h1>
        <p className="text-muted-foreground mt-1">Consultez et mettez à jour les cours de votre promotion</p>
      </div>

      <EncadreurCoursList />
    </div>
  )
}
