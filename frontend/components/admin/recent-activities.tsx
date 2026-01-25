"use client"

import { Card } from "@/components/ui/card"
import { UserPlus, BookOpen, Award, FileText } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "student",
    message: "Nouvel étudiant inscrit",
    user: "Jean Mukendi",
    time: "Il y a 5 minutes",
    icon: UserPlus,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    type: "course",
    message: "Cours ajouté",
    user: "Dr. Marie Kabila - Anatomie Avancée",
    time: "Il y a 1 heure",
    icon: BookOpen,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: 3,
    type: "achievement",
    message: "Performance excellente",
    user: "Sarah Mbuyi - Mention Très Bien",
    time: "Il y a 2 heures",
    icon: Award,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    id: 4,
    type: "document",
    message: "Nouveau document partagé",
    user: "Pr. Joseph Tshimanga - Guide de Stage",
    time: "Il y a 3 heures",
    icon: FileText,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export function RecentActivities() {
  return (
    <Card className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
      <h3 className="text-lg font-semibold text-foreground mb-4">Activités Récentes</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className={`${activity.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <p className="text-sm text-muted-foreground mt-1">{activity.user}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
