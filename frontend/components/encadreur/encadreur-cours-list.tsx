"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Upload } from "lucide-react"
import { CoursDetailsModal } from "@/components/admin/cours-details-modal"
import { EncadreurCoursModal } from "@/components/encadreur/encadreur-cours-modal"

export function EncadreurCoursList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCours, setSelectedCours] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const coursList = [
    {
      id: 1,
      code: "MED-301",
      titre: "Anatomie Générale",
      niveau: "3ème année",
      heures: 60,
      encadreur: "Dr. David Kalala",
      etudiants: 156,
      progression: 75,
      fichiers: 8,
    },
    {
      id: 2,
      code: "MED-302",
      titre: "Physiologie",
      niveau: "3ème année",
      heures: 45,
      encadreur: "Dr. David Kalala",
      etudiants: 156,
      progression: 60,
      fichiers: 5,
    },
    {
      id: 3,
      code: "MED-405",
      titre: "Cardiologie",
      niveau: "4ème année",
      heures: 50,
      encadreur: "Dr. David Kalala",
      etudiants: 142,
      progression: 40,
      fichiers: 6,
    },
  ]

  const filteredCours = coursList.filter(
    (cours) =>
      cours.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cours.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Mes Cours</CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un cours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredCours.map((cours) => (
              <div
                key={cours.id}
                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{cours.titre}</h3>
                      <Badge variant="outline" className="text-xs">
                        {cours.code}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cours.niveau}</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">Mes cours</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Heures</p>
                    <p className="font-medium">{cours.heures}h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Étudiants</p>
                    <p className="font-medium">{cours.etudiants}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Progression</p>
                    <p className="font-medium">{cours.progression}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Fichiers</p>
                    <p className="font-medium">{cours.fichiers}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCours(cours)
                      setIsDetailsOpen(true)
                    }}
                    className="gap-2"
                  >
                    <Eye className="h-3 w-3" />
                    Voir détails
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCours(cours)
                      setIsEditOpen(true)
                    }}
                    className="gap-2"
                  >
                    <Upload className="h-3 w-3" />
                    Ajouter fichiers
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CoursDetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} cours={selectedCours} />

      <EncadreurCoursModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} cours={selectedCours} />
    </>
  )
}
