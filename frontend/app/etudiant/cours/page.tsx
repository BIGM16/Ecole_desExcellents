"use client"

import { EtudiantCoursList } from "@/components/etudiant/etudiant-cours-list"

export default function EtudiantCoursPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Cours de la Promotion</h1>
        <p className="text-muted-foreground mt-1">Consultez les cours et accédez aux ressources pédagogiques</p>
      </div>

      <EtudiantCoursList />
    </div>
  )
}
