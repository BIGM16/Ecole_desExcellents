"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Clock, GraduationCap } from "lucide-react"
import { CoursDetailsModal } from "@/components/admin/cours-details-modal"

const coursData = [
  {
    id: 1,
    code: "MED101",
    name: "Anatomie Générale",
    description: "Étude complète de l'anatomie du corps humain avec focus sur les systèmes organiques",
    credits: 6,
    hours: 60,
    instructor: "Dr. Mukendi Pierre",
    category: "Sciences Fondamentales",
    level: "1ère Année",
    semester: "Semestre 1",
  },
  {
    id: 2,
    code: "MED102",
    name: "Physiologie Humaine",
    description: "Compréhension des fonctions et mécanismes du corps humain",
    credits: 5,
    hours: 50,
    instructor: "Prof. Kabamba Marie",
    category: "Sciences Fondamentales",
    level: "1ère Année",
    semester: "Semestre 1",
  },
  {
    id: 3,
    code: "MED103",
    name: "Biochimie Médicale",
    description: "Étude des processus chimiques et biochimiques dans les systèmes vivants",
    credits: 5,
    hours: 50,
    instructor: "Dr. Tshilombo Joseph",
    category: "Sciences Fondamentales",
    level: "1ère Année",
    semester: "Semestre 2",
  },
]

export function EtudiantCoursList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCours, setSelectedCours] = useState<(typeof coursData)[0] | null>(null)

  const filteredCours = coursData.filter(
    (cours) =>
      cours.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cours.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cours.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
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
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCours.map((cours) => (
              <Card
                key={cours.id}
                className="border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg group"
                onClick={() => setSelectedCours(cours)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {cours.code}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cours.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{cours.description}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cours.hours}h
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {cours.credits} crédits
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">{cours.instructor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCours.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun cours trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CoursDetailsModal cours={selectedCours} onClose={() => setSelectedCours(null)} />
    </>
  )
}
