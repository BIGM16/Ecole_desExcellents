"use client"

import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const horaireData = [
  { day: "Lundi", time: "08:00 - 10:00", course: "Anatomie", encadreur: "Dr. Mukendi", local: "Amphi A" },
  { day: "Lundi", time: "10:30 - 12:30", course: "Physiologie", encadreur: "Prof. Kabamba", local: "Salle 201" },
  { day: "Mardi", time: "14:00 - 16:00", course: "Biochimie", encadreur: "Dr. Tshilombo", local: "Lab 3" },
  { day: "Mercredi", time: "08:00 - 10:00", course: "Pharmacologie", encadreur: "Dr. Lumingu", local: "Amphi B" },
  { day: "Jeudi", time: "10:00 - 12:00", course: "Pathologie", encadreur: "Prof. Ngandu", local: "Amphi A" },
]

export function CoordonHoraireWidget() {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {horaireData.map((item, index) => (
        <div
          key={index}
          className="p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {item.day}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
              <div className="font-medium text-sm">{item.course}</div>
              <div className="text-xs text-muted-foreground">
                {item.encadreur} • {item.local}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
