"use client"

import { Card } from "@/components/ui/card"
import { Users, BookOpen, UserCheck } from "lucide-react"

const stats = [
  {
    title: "Étudiants",
    value: "42",
    description: "5ème année",
    icon: Users,
    trend: "+3 ce mois",
    color: "text-primary",
  },
  {
    title: "Cours",
    value: "12",
    description: "Matières actives",
    icon: BookOpen,
    trend: "Programme complet",
    color: "text-chart-1",
  },
  {
    title: "Encadreurs",
    value: "8",
    description: "Équipe pédagogique",
    icon: UserCheck,
    trend: "Tous actifs",
    color: "text-chart-2",
  },
]

export function CoordonDashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <p className="text-xs text-primary font-medium">{stat.trend}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
