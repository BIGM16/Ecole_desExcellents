"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EncadreurHoraireList() {
  const horaires = [
    {
      jour: "Lundi",
      seances: [
        {
          heure: "08h00 - 10h00",
          cours: "Anatomie Générale",
          encadreur: "Dr. David Kalala",
          local: "Salle A-201",
          isMyClass: true,
        },
        {
          heure: "10h00 - 12h00",
          cours: "Physiologie",
          encadreur: "Pr. Sarah Mbuyi",
          local: "Salle B-105",
          isMyClass: false,
        },
        {
          heure: "14h00 - 16h00",
          cours: "Biochimie",
          encadreur: "Dr. Grace Nsimba",
          local: "Labo C-302",
          isMyClass: false,
        },
      ],
    },
    {
      jour: "Mardi",
      seances: [
        {
          heure: "08h00 - 10h00",
          cours: "Pharmacologie",
          encadreur: "Dr. Jean Kabamba",
          local: "Salle A-105",
          isMyClass: false,
        },
        {
          heure: "10h00 - 12h00",
          cours: "Histologie",
          encadreur: "Pr. Marie Tshimanga",
          local: "Labo B-201",
          isMyClass: false,
        },
      ],
    },
    {
      jour: "Mercredi",
      seances: [
        {
          heure: "10h00 - 12h00",
          cours: "Physiologie",
          encadreur: "Dr. David Kalala",
          local: "Salle B-105",
          isMyClass: true,
        },
        {
          heure: "14h00 - 16h00",
          cours: "Anatomie Générale",
          encadreur: "Pr. Sarah Mbuyi",
          local: "Salle A-201",
          isMyClass: false,
        },
      ],
    },
    {
      jour: "Jeudi",
      seances: [
        {
          heure: "08h00 - 10h00",
          cours: "Pathologie",
          encadreur: "Dr. Paul Mukendi",
          local: "Salle C-103",
          isMyClass: false,
        },
      ],
    },
    {
      jour: "Vendredi",
      seances: [
        {
          heure: "14h00 - 16h00",
          cours: "Anatomie Générale",
          encadreur: "Dr. David Kalala",
          local: "Salle A-201",
          isMyClass: true,
        },
      ],
    },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Horaire Hebdomadaire - 3ème année</CardTitle>
        <p className="text-sm text-muted-foreground">
          Vos cours sont mis en évidence en <span className="text-primary font-semibold">couleur dorée</span>
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Lundi" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {horaires.map((jour) => (
              <TabsTrigger key={jour.jour} value={jour.jour}>
                {jour.jour}
              </TabsTrigger>
            ))}
          </TabsList>

          {horaires.map((jour) => (
            <TabsContent key={jour.jour} value={jour.jour} className="space-y-3">
              {jour.seances.map((seance, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    seance.isMyClass
                      ? "border-primary/50 bg-primary/5 hover:bg-primary/10"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{seance.cours}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{seance.heure}</span>
                      </div>
                    </div>
                    {seance.isMyClass && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        Mes cours
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{seance.encadreur}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{seance.local}</span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
