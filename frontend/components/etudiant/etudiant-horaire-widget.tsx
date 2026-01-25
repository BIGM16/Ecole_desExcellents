"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

const upcomingClasses = [
  {
    day: "Lundi",
    time: "08:00 - 10:00",
    course: "Anatomie Générale",
    instructor: "Dr. Mukendi",
    room: "Amphi A",
  },
  {
    day: "Mardi",
    time: "14:00 - 16:00",
    course: "Physiologie",
    instructor: "Prof. Kabamba",
    room: "Salle 203",
  },
  {
    day: "Mercredi",
    time: "10:00 - 12:00",
    course: "Biochimie",
    instructor: "Dr. Tshilombo",
    room: "Labo B",
  },
]

export function EtudiantHoraireWidget() {
  return (
    <div className="space-y-3">
      {upcomingClasses.map((classe, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 rounded-lg bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors"
        >
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground text-sm">{classe.course}</p>
              <Badge variant="outline" className="text-xs">
                {classe.day}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {classe.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {classe.room}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{classe.instructor}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
