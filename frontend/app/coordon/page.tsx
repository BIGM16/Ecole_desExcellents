"use client"

import { CoordonDashboardStats } from "@/components/coordon/coordon-dashboard-stats"
import { CoordonCharts } from "@/components/coordon/coordon-charts"
import { RecentActivities } from "@/components/admin/recent-activities"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users } from "lucide-react"
import { CoordonHoraireWidget } from "@/components/coordon/coordon-horaire-widget"
import { CoordonCoordonWidget } from "@/components/coordon/coordon-coordon-widget"

export default function CoordonDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">Tableau de Bord Coordinateur</h1>
        <p className="text-muted-foreground">Gestion de votre promotion - 5ème année</p>
      </div>

      {/* Stats Cards */}
      <CoordonDashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Mon Horaire</CardTitle>
                <CardDescription>Emploi du temps de ma promotion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CoordonHoraireWidget />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Mes Co-Coordonnateurs</CardTitle>
                <CardDescription>Autres coordons de ma promotion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CoordonCoordonWidget />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <CoordonCharts />

      {/* Recent Activities */}
      <RecentActivities />
    </div>
  )
}
