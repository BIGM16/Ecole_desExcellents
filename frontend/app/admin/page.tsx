"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminDashboardStats } from "@/components/admin/admin-dashboard-stats";
import { AdminCharts } from "@/components/admin/admin-charts";
import { RecentActivities } from "@/components/admin/recent-activities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import { AdminHoraireWidget } from "@/components/admin/admin-horaire-widget";
import { AdminCoordonWidget } from "@/components/admin/admin-coordon-widget";
import { Footer } from "@/components/footer";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  if (!user || user.role !== "ADMIN") return null;
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
          Tableau de Bord
        </h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de l&apos;École des Excellents
        </p>
      </div>

      {/* Stats Cards */}
      <AdminDashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Mon Horaire</CardTitle>
                <CardDescription>
                  Emploi du temps de ma promotion
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminHoraireWidget />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Mes Coordonnateurs</CardTitle>
                <CardDescription>Contacts de ma promotion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminCoordonWidget />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <AdminCharts />

      {/* Recent Activities */}
      <RecentActivities />

      <Footer />
    </div>
  );
}
