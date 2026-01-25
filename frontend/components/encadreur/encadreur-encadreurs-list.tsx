"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Eye, Mail, Phone } from "lucide-react"
import { EncadreurDetailsModal } from "@/components/admin/encadreur-details-modal"

export function EncadreurEncadreursList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEncadreur, setSelectedEncadreur] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const encadreursList = [
    {
      id: 1,
      nom: "Dr. David Kalala",
      specialite: "Anatomie",
      email: "david.k@ede.ac.cd",
      phone: "+243 812 345 678",
      cours: 5,
      promotion: "3ème année",
      grade: "Docteur",
    },
    {
      id: 2,
      nom: "Pr. Sarah Mbuyi",
      specialite: "Physiologie",
      email: "sarah.m@ede.ac.cd",
      phone: "+243 898 765 432",
      cours: 4,
      promotion: "3ème année",
      grade: "Professeur",
    },
    {
      id: 3,
      nom: "Dr. Grace Nsimba",
      specialite: "Cardiologie",
      email: "grace.n@ede.ac.cd",
      phone: "+243 856 123 456",
      cours: 3,
      promotion: "3ème année",
      grade: "Docteur",
    },
  ]

  const filteredEncadreurs = encadreursList.filter(
    (encadreur) =>
      encadreur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      encadreur.specialite.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Équipe Pédagogique</CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un encadreur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredEncadreurs.map((encadreur) => (
              <div
                key={encadreur.id}
                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{encadreur.nom}</h3>
                    <Badge variant="outline" className="text-xs">
                      {encadreur.grade}
                    </Badge>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">{encadreur.specialite}</Badge>
                </div>

                <div className="space-y-2 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <a href={`mailto:${encadreur.email}`} className="hover:text-primary">
                      {encadreur.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <a href={`tel:${encadreur.phone}`} className="hover:text-primary">
                      {encadreur.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div>
                    <span className="font-medium text-foreground">{encadreur.cours}</span> cours
                  </div>
                  <div>{encadreur.promotion}</div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedEncadreur(encadreur)
                    setIsDetailsOpen(true)
                  }}
                  className="w-full gap-2"
                >
                  <Eye className="h-3 w-3" />
                  Voir le profil
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EncadreurDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        encadreur={selectedEncadreur}
      />
    </>
  )
}
