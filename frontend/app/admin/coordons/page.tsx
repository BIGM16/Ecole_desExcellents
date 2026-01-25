"use client";

import { CoordonsList } from "@/components/admin/coordons-list";

export default function CoordonsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
          Gestion des Coordons
        </h1>
        <p className="text-muted-foreground">
          Administration de l&apos;équipe de coordination
        </p>
      </div>

      <CoordonsList />
    </div>
  );
}
