"use client"

import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const coordinators = [
  {
    name: "Dr. Kasongo Jean",
    role: "Coordinateur Principal",
    email: "kasongo@ede.med",
    phone: "+243 XXX XXX XXX",
  },
  {
    name: "Dr. Mbuyi Sarah",
    role: "Coordinatrice Adjointe",
    email: "mbuyi@ede.med",
    phone: "+243 XXX XXX XXX",
  },
]

export function EtudiantCoordonWidget() {
  return (
    <div className="space-y-3">
      {coordinators.map((coord, index) => (
        <div key={index} className="p-3 rounded-lg bg-accent/30 border border-border/50 space-y-2">
          <div>
            <p className="font-semibold text-foreground text-sm">{coord.name}</p>
            <p className="text-xs text-muted-foreground">{coord.role}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs bg-transparent">
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs bg-transparent">
              <Phone className="h-3 w-3 mr-1" />
              Appeler
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
