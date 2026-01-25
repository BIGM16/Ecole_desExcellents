"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

export function EncadreurHoraireWidget() {
  const mesHoraires = [
    {
      jour: "Lundi",
      heure: "08h00 - 10h00",
      cours: "Anatomie Générale",
      local: "Salle A-201",
      isMyClass: true,
    },
    {
      jour: "Mercredi",
      heure: "10h00 - 12h00",
      cours: "Physiologie",
      local: "Salle B-105",
      isMyClass: true,
    },
    {
      jour: "Vendredi",
      heure: "14h00 - 16h00",
      cours: "Anatomie Générale",
      local: "Salle A-201",
      isMyClass: true,
    },
  ]

  return (
    <div className="space-y-3">
      {mesHoraires.map((horaire, index) => (
        <div
          key={index}
          className="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-foreground">{horaire.cours}</p>
              <p className="text-sm text-muted-foreground">{horaire.jour}</p>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              Mes cours
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{horaire.heure}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{horaire.local}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
