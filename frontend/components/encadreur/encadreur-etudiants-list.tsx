"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Eye } from "lucide-react"
import { EtudiantDetailsModal } from "@/components/admin/etudiant-details-modal"

export function EncadreurEtudiantsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEtudiant, setSelectedEtudiant] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const etudiantsList = [
    {
      id: 1,
      matricule: "EDE-2021-001",
      nom: "Mukendi",
      prenom: "Jean",
      email: "jean.m@ede.ac.cd",
      promotion: "3ème année",
      statut: "Actif",
      moyenne: 14.5,
      cours: 8,
    },
    {
      id: 2,
      matricule: "EDE-2021-002",
      nom: "Kabongo",
      prenom: "Marie",
      email: "marie.k@ede.ac.cd",
      promotion: "3ème année",
      statut: "Actif",
      moyenne: 15.8,
      cours: 8,
    },
    {
      id: 3,
      matricule: "EDE-2021-003",
      nom: "Tshimanga",
      prenom: "Paul",
      email: "paul.t@ede.ac.cd",
      promotion: "3ème année",
      statut: "Actif",
      moyenne: 13.2,
      cours: 8,
    },
  ]

  const filteredEtudiants = etudiantsList.filter(
    (etudiant) =>
      `${etudiant.nom} ${etudiant.prenom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etudiant.matricule.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un étudiant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Matricule</th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Nom complet</th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Promotion</th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Moyenne</th>
                  <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Statut</th>
                  <th className="text-right p-3 text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEtudiants.map((etudiant) => (
                  <tr key={etudiant.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <span className="text-sm font-medium">{etudiant.matricule}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm font-medium">{`${etudiant.nom} ${etudiant.prenom}`}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-muted-foreground">{etudiant.email}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">{etudiant.promotion}</span>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={
                          etudiant.moyenne >= 14
                            ? "bg-green-500/10 text-green-600 border-green-500/30"
                            : etudiant.moyenne >= 12
                              ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                              : "bg-orange-500/10 text-orange-600 border-orange-500/30"
                        }
                      >
                        {etudiant.moyenne}/20
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                        {etudiant.statut}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEtudiant(etudiant)
                          setIsDetailsOpen(true)
                        }}
                        className="gap-2"
                      >
                        <Eye className="h-3 w-3" />
                        Détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EtudiantDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        etudiant={selectedEtudiant}
      />
    </>
  )
}
