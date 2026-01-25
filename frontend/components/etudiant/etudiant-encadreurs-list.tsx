"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { EncadreurDetailsModal } from "@/components/admin/encadreur-details-modal"

const encadreursData = [
  {
    id: 1,
    name: "Dr. Mukendi Pierre",
    email: "mukendi@ede.med",
    phone: "+243 XXX XXX XXX",
    specialty: "Anatomie",
    courses: ["Anatomie Générale", "Neuroanatomie"],
    experience: "15 ans",
    diplomas: ["Doctorat en Médecine", "Spécialisation en Anatomie"],
  },
  {
    id: 2,
    name: "Prof. Kabamba Marie",
    email: "kabamba@ede.med",
    phone: "+243 XXX XXX XXX",
    specialty: "Physiologie",
    courses: ["Physiologie Humaine", "Physiopathologie"],
    experience: "20 ans",
    diplomas: ["Doctorat en Médecine", "PhD en Physiologie"],
  },
  {
    id: 3,
    name: "Dr. Tshilombo Joseph",
    email: "tshilombo@ede.med",
    phone: "+243 XXX XXX XXX",
    specialty: "Biochimie",
    courses: ["Biochimie Médicale", "Biologie Moléculaire"],
    experience: "12 ans",
    diplomas: ["Doctorat en Médecine", "Master en Biochimie"],
  },
]

export function EtudiantEncadreursList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEncadreur, setSelectedEncadreur] = useState<(typeof encadreursData)[0] | null>(null)

  const filteredEncadreurs = encadreursData.filter(
    (enc) =>
      enc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enc.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un encadreur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Encadreurs List */}
          <div className="space-y-4">
            {filteredEncadreurs.map((encadreur) => (
              <Card key={encadreur.id} className="border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src="/placeholder.svg" alt={encadreur.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                        {encadreur.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{encadreur.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {encadreur.specialty}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedEncadreur(encadreur)}
                          className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                        >
                          Voir détails
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>Cours: {encadreur.courses.join(", ")}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="ghost" className="h-8 text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          {encadreur.email}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          Contacter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEncadreurs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun encadreur trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EncadreurDetailsModal encadreur={selectedEncadreur} onClose={() => setSelectedEncadreur(null)} />
    </>
  )
}
