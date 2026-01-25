"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Users,
  Award,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface CoordonDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordon?: any;
}

export function CoordonDetailsModal({
  isOpen,
  onClose,
  coordon,
}: CoordonDetailsModalProps) {
  if (!coordon) return null;

  return (
    // <Dialog open={isOpen} onOpenChange={onClose}>
    //   <DialogContent className="sm:max-w-125">
    //     <DialogHeader>
    //       <DialogTitle>Détails du Coordon</DialogTitle>
    //     </DialogHeader>
    //     <div className="space-y-4">
    //       <div>
    //         <h3 className="text-lg font-semibold">
    //           {coordon.first_name} {coordon.last_name}
    //         </h3>
    //         <Badge className="mt-2 bg-primary/10 text-primary">
    //           {coordon.status ?? "Actif"}
    //         </Badge>
    //       </div>

    //       <div className="grid grid-cols-2 gap-4">
    //         <div>
    //           <p className="text-sm text-muted-foreground">Email</p>
    //           <div className="flex items-center gap-2 mt-1">
    //             <Mail className="h-4 w-4" />
    //             <p className="text-sm font-medium">{coordon.email}</p>
    //           </div>
    //         </div>
    //         <div>
    //           <p className="text-sm text-muted-foreground">Téléphone</p>
    //           <div className="flex items-center gap-2 mt-1">
    //             <Phone className="h-4 w-4" />
    //             <p className="text-sm font-medium">{coordon.telephone}</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-2 gap-4">
    //         <div>
    //           <p className="text-sm text-muted-foreground">Promotion</p>
    //           <p className="text-sm font-medium mt-1">
    //             {coordon.promotion || "-"}
    //           </p>
    //         </div>
    //         <div>
    //           <p className="text-sm text-muted-foreground">ID Utilisateur</p>
    //           <p className="text-sm font-medium mt-1">{coordon.id}</p>
    //         </div>
    //       </div>

    //       {coordon.date_joined && (
    //         <div>
    //           <p className="text-sm text-muted-foreground">
    //             Date d&apos;adhésion
    //           </p>
    //           <div className="flex items-center gap-2 mt-1">
    //             <Calendar className="h-4 w-4" />
    //             <p className="text-sm font-medium">
    //               {new Date(coordon.date_joined).toLocaleDateString("fr-FR")}
    //             </p>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </DialogContent>
    //   </Dialog>

    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Profil du Coordon
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">
                {coordon.first_name?.charAt(0)}
                {coordon.last_name?.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {coordon.first_name} {coordon.last_name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {coordon.bio}
              </p>
              <div className="flex gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {coordon.promotion}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 border-green-500/30"
                >
                  {coordon.status || "Active"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                Coordonnées
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${coordon.email}`}
                    className="text-primary hover:underline"
                  >
                    {coordon.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{coordon.telephone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Inscrit le 15 Sept 2021</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                Statistiques
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {coordon.cours}
                      </p>
                      <p className="text-xs text-muted-foreground">Cours</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {coordon.etudiants}
                      </p>
                      <p className="text-xs text-muted-foreground">Étudiants</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {coordon.publications}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Publications
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase">
              Cours en cours
            </h4>
            <div className="grid gap-2">RIEN</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
