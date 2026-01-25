"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getCoordonsList } from "@/lib/services/stats.service";

interface Coordon {
  id: number;
  name?: string;
  email: string;
  first_name: string;
  last_name: string;
  telephone?: string;
  phone?: string;
  role?: string;
}

export function AdminCoordonWidget() {
  const { user } = useAuth();
  const [coordons, setCoordon] = useState<Coordon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordon = async () => {
      try {
        setLoading(true);
        // Passer la promotion_id de l'utilisateur connecté
        const data = await getCoordonsList(user?.promotion?.id);
        setCoordon(data.slice(0, 5));
      } catch (err) {
        console.error("Erreur coordons:", err);
        setCoordon([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCoordon();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="p-3 bg-muted rounded-lg animate-pulse h-24" />
        ))}
      </div>
    );
  }

  if (coordons.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucun coordonnateur disponible
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {coordons.map((coordon) => (
        <div
          key={coordon.id}
          className="p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage
                src="/placeholder.svg"
                alt={`${coordon.first_name} ${coordon.last_name}`}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {`${coordon.first_name[0]}${coordon.last_name[0]}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">
                {coordon.first_name} {coordon.last_name}
              </div>
              <Badge variant="secondary" className="text-xs mt-1">
                Coordonnateur
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="ghost" className="h-7 text-xs flex-1">
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Appeler
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
