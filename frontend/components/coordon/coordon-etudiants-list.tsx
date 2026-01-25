"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EtudiantDetailsModal } from "./etudiant-details-modal"
import { Search, MoreVertical, Edit, Trash2, Mail, Phone, Eye } from "lucide-react"

const mockEtudiants = [
  {
    id: 1,
    nom: "Alice Mukendi",
    email: "a.mukendi@student.ede.com",
    phone: "+243 818 901 234",
    niveau: "5ème année",
    moyenne: 16.5,
    status: "Excellent",
  },
  {
    id: 2,
    nom: "Bob Kabila",
    email: "b.kabila@student.ede.com",
    phone: "+243 819 012 345",
    niveau: "5ème année",
    moyenne: 14.2,
    status: "Très Bien",
  },
]

interface CoordonEtudiantsListProps {
  onEdit?: (etudiant: any) => void
}

export function CoordonEtudiantsList({ onEdit }: CoordonEtudiantsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEtudiant, setSelectedEtudiant] = useState<(typeof mockEtudiants)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredEtudiants = mockEtudiants.filter(
    (etudiant) =>
      etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (etudiant: (typeof mockEtudiants)[0]) => {
    setSelectedEtudiant(etudiant)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Étudiants Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Moyenne</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Performance</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEtudiants.map((etudiant) => (
                <tr
                  key={etudiant.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(etudiant)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{etudiant.nom}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {etudiant.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {etudiant.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{etudiant.moyenne}/20</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        etudiant.status === "Excellent" ? "bg-primary/10 text-primary" : "bg-chart-2/10 text-chart-2"
                      }
                    >
                      {etudiant.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetails(etudiant)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit?.(etudiant)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de détails */}
      <EtudiantDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedEtudiant(null)
        }}
        etudiant={selectedEtudiant}
      />
    </div>
  )
}
