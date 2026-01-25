"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const scheduleData = {
  Lundi: [
    {
      time: "08:00 - 10:00",
      course: "Anatomie Générale",
      instructor: "Dr. Mukendi Pierre",
      room: "Amphi A",
      type: "Cours Magistral",
    },
    {
      time: "14:00 - 16:00",
      course: "Travaux Pratiques",
      instructor: "Dr. Mukendi Pierre",
      room: "Labo 1",
      type: "TP",
    },
  ],
  Mardi: [
    {
      time: "10:00 - 12:00",
      course: "Physiologie Humaine",
      instructor: "Prof. Kabamba Marie",
      room: "Amphi B",
      type: "Cours Magistral",
    },
    {
      time: "14:00 - 16:00",
      course: "Séminaire",
      instructor: "Prof. Kabamba Marie",
      room: "Salle 203",
      type: "Séminaire",
    },
  ],
  Mercredi: [
    {
      time: "08:00 - 10:00",
      course: "Biochimie Médicale",
      instructor: "Dr. Tshilombo Joseph",
      room: "Amphi A",
      type: "Cours Magistral",
    },
    {
      time: "10:00 - 12:00",
      course: "Travaux Pratiques",
      instructor: "Dr. Tshilombo Joseph",
      room: "Labo B",
      type: "TP",
    },
  ],
  Jeudi: [
    {
      time: "14:00 - 16:00",
      course: "Histologie",
      instructor: "Dr. Ilunga Pascal",
      room: "Amphi C",
      type: "Cours Magistral",
    },
  ],
  Vendredi: [
    {
      time: "08:00 - 10:00",
      course: "Immunologie",
      instructor: "Prof. Mwanza Rachel",
      room: "Amphi B",
      type: "Cours Magistral",
    },
    {
      time: "10:00 - 12:00",
      course: "Étude de Cas",
      instructor: "Prof. Mwanza Rachel",
      room: "Salle 305",
      type: "Séminaire",
    },
  ],
}

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

export function EtudiantHoraireList() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Emploi du Temps Hebdomadaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Lundi" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {days.map((day) => (
              <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent key={day} value={day} className="space-y-4">
              {scheduleData[day as keyof typeof scheduleData]?.map((slot, index) => (
                <Card
                  key={index}
                  className="border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{slot.course}</p>
                          <p className="text-sm text-muted-foreground">{slot.time}</p>
                        </div>
                      </div>
                      <Badge variant={slot.type === "TP" ? "default" : "secondary"}>{slot.type}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{slot.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{slot.room}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {!scheduleData[day as keyof typeof scheduleData]?.length && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Pas de cours ce jour</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
