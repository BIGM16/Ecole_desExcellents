"use client"

import { EncadreursList } from "@/components/admin/encadreurs-list"

export default function EncadreursPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
          Gestion des Encadreurs
        </h1>
        <p className="text-muted-foreground">
          Administration de l&apos;équipe pédagogique
        </p>
      </div>

      <EncadreursList />
    </div>
  );
}
