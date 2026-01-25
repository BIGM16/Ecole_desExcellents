"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const etudiantsData = [
  {
    id: 1,
    name: "Kalala André",
    email: "kalala.andre@ede.med",
    phone: "+243 XXX XXX XXX",
    promotion: "1ère Année",
    status: "Actif",
  },
  {
    id: 2,
    name: "Mwamba Sophie",
    email: "mwamba.sophie@ede.med",
    phone: "+243 XXX XXX XXX",
    promotion: "1ère Année",
    status: "Actif",
  },
  {
    id: 3,
    name: "Nkongolo David",
    email: "nkongolo.david@ede.med",
    phone: "+243 XXX XXX XXX",
    promotion: "1ère Année",
    status: "Actif",
  },
  {
    id: 4,
    name: "Tshimanga Grace",
    email: "tshimanga.grace@ede.med",
    phone: "+243 XXX XXX XXX",
    promotion: "1ère Année",
    status: "Actif",
  },
  {
    id: 5,
    name: "Kabulo Emmanuel",
    email: "kabulo.emmanuel@ede.med",
    phone: "+243 XXX XXX XXX",
    promotion: "1ère Année",
    status: "Actif",
  },
]

export function EtudiantEtudiantsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEtudiants = etudiantsData.filter(
    (etudiant) =>
      etudiant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un camarade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEtudiants.map((etudiant) => (
            <Card key={etudiant.id} className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src="/placeholder.svg" alt={etudiant.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {etudiant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold text-foreground">{etudiant.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{etudiant.email}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {etudiant.promotion}
                    </Badge>
                  </div>

                  <div className="flex gap-1 w-full pt-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8 bg-transparent">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 bg-transparent">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 bg-transparent">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEtudiants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun étudiant trouvé</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
