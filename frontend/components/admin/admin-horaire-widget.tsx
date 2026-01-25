"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getHorairesList } from "@/lib/services/stats.service";

interface HoraireData {
  id: number;
  titre: string;
  day?: string;
  time?: string;
  date_debut?: string;
  date_fin?: string;
  course?: string;
  encadreur?: string;
  lieu?: string;
}

export function AdminHoraireWidget() {
  const { user } = useAuth();
  const [horaires, setHoraires] = useState<HoraireData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoraires = async () => {
      try {
        setLoading(true);
        // Passer la promotion_id de l'utilisateur connecté
        const data = await getHorairesList(user?.promotion?.id);
        setHoraires(data.slice(0, 5));
      } catch (err) {
        console.error("Erreur horaires:", err);
        // Fallback à des données vides
        setHoraires([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHoraires();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 bg-muted rounded-lg animate-pulse h-20" />
        ))}
      </div>
    );
  }

  if (horaires.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucun horaire disponible
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
      {horaires.map((item, index) => (
        <div
          key={item.id || index}
          className="p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Horaire
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.date_debut || "Heure non définie"} à {item.date_fin}
                </span>
              </div>
              <div className="font-medium text-sm">
                {item.titre || "Sans titre"}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.lieu || "Lieu non défini"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
