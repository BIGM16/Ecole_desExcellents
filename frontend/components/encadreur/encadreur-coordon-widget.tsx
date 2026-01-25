"use client"

import { Mail, Phone } from "lucide-react"

export function EncadreurCoordonWidget() {
  const coordons = [
    {
      nom: "Dr. Marie Tshimanga",
      role: "Coordonnatrice 3ème année",
      email: "marie.t@ede.ac.cd",
      phone: "+243 812 345 678",
    },
    {
      nom: "Dr. Jean Kabamba",
      role: "Coordonnateur Académique",
      email: "jean.k@ede.ac.cd",
      phone: "+243 898 765 432",
    },
  ]

  return (
    <div className="space-y-3">
      {coordons.map((coordon, index) => (
        <div
          key={index}
          className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="mb-2">
            <p className="font-semibold text-foreground">{coordon.nom}</p>
            <p className="text-xs text-muted-foreground">{coordon.role}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <a href={`mailto:${coordon.email}`} className="text-primary hover:underline">
                {coordon.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <a href={`tel:${coordon.phone}`} className="text-muted-foreground hover:text-primary">
                {coordon.phone}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
