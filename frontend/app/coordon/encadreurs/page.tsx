"use client"

import { CoordonEncadreursList } from "@/components/coordon/coordon-encadreurs-list"

export default function CoordonEncadreursPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Liste des Encadreurs</h1>
        <p className="text-muted-foreground mt-1">Consultez les encadreurs de votre promotion</p>
      </div>

      {/* Encadreurs List */}
      <CoordonEncadreursList />
    </div>
  )
}
