"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const coordonsData = [
  {
    id: 1,
    name: "Kalamba Emmanuel",
    role: "Coordon Général",
    email: "kalamba@ede.med",
    phone: "+243 XXX XXX XXX",
  },
  {
    id: 2,
    name: "Mwamba Grâce",
    role: "Coordon Académique",
    email: "mwamba@ede.med",
    phone: "+243 XXX XXX XXX",
  },
]

export function CoordonCoordonWidget() {
  return (
    <div className="space-y-3">
      {coordonsData.map((coordon) => (
        <div
          key={coordon.id}
          className="p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg" alt={coordon.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {coordon.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{coordon.name}</div>
              <Badge variant="secondary" className="text-xs mt-1">
                {coordon.role}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="ghost" className="h-7 text-xs flex-1">
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Appeler
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
