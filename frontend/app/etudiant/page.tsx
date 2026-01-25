"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EtudiantDashboardStats } from "@/components/etudiant/etudiant-dashboard-stats";
import { EtudiantHoraireWidget } from "@/components/etudiant/etudiant-horaire-widget";
import { EtudiantCoordonWidget } from "@/components/etudiant/etudiant-coordon-widget";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

export default function EtudiantDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ETUDIANT")) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  if (!user || user.role !== "ETUDIANT") return null;
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-serif">
          Tableau de Bord
        </h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue sur votre espace étudiant
        </p>
      </div>

      <EtudiantDashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Horaire de la Semaine</CardTitle>
                <CardDescription>
                  Emploi du temps de votre promotion
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <EtudiantHoraireWidget />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Coordonnateurs</CardTitle>
                <CardDescription>Contacts de votre promotion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <EtudiantCoordonWidget />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
