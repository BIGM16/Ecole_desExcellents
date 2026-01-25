"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Trash2, Calendar, MapPin, User } from "lucide-react"

const mockHoraires = [
  {
    id: 1,
    jour: "Lundi",
    heure: "08:00 - 10:00",
    cours: "Anatomie Générale",
    encadreur: "Pr. Sarah Mbuyi",
    local: "Salle A201",
  },
  {
    id: 2,
    jour: "Lundi",
    heure: "10:15 - 12:15",
    cours: "Cardiologie Clinique",
    encadreur: "Dr. David Kalala",
    local: "Salle B105",
  },
  {
    id: 3,
    jour: "Mardi",
    heure: "14:00 - 16:00",
    cours: "Pédiatrie Pratique",
    encadreur: "Dr. Grace Nsimba",
    local: "Salle A301",
  },
]

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

interface HorairesListProps {
  onEdit?: (horaire: any) => void
}

export function HorairesList({ onEdit }: HorairesListProps) {
  return (
    <div className="space-y-6">
      {jours.map((jour) => {
        const horairesJour = mockHoraires.filter((h) => h.jour === jour)

        if (horairesJour.length === 0) return null

        return (
          <div key={jour} className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {jour}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {horairesJour.map((horaire) => (
                <Card
                  key={horaire.id}
                  className="p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-primary/10 text-primary">{horaire.heure}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(horaire)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">{horaire.cours}</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {horaire.encadreur}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {horaire.local}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
