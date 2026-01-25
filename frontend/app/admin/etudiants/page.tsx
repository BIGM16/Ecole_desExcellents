"use client";

import { EtudiantsList } from "@/components/admin/etudiants-list";

export default function EtudiantsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
          Gestion des Étudiants
        </h1>
        <p className="text-muted-foreground">
          Suivi et administration des étudiants de l&apos;EDE
        </p>
      </div>

      <EtudiantsList />
    </div>
  );
}
