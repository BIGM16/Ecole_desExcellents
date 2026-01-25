"use client"

import { EncadreurEncadreursList } from "@/components/encadreur/encadreur-encadreurs-list"

export default function EncadreurEncadreursPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">Équipe Pédagogique</h1>
        <p className="text-muted-foreground mt-1">Consultez les autres encadreurs de votre promotion</p>
      </div>

      <EncadreurEncadreursList />
    </div>
  )
}
