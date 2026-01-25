"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Users,
  Clock,
  GraduationCap,
  FileText,
  Download,
  Calendar,
  Video,
  Award,
} from "lucide-react";

interface CoursDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cours: {
    id: number;
    titre: string;
    code: string;
    promotions: string;
    encadreur: string;
    etudiants: number;
    heures: number;
    status: string;
    description?: string;
    objectifs?: string[];
    encadreurs?: Array<{ nom: string; role: string }>;
    fichiers?: Array<{
      nom: string;
      type: string;
      taille: string;
      date: string;
    }>;
    horaire?: string;
    salle?: string;
    tauxPresence?: number;
  } | null;
}

export function CoursDetailsModal({
  isOpen,
  onClose,
  cours,
}: CoursDetailsModalProps) {
  if (!cours) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground font-serif flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            Détails du Cours
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* En-tête avec infos principales */}
          <Card className="p-6 bg-linear-to-br from-background to-muted/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {cours.titre}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{cours.id}</Badge>
                  <Badge className="bg-primary/10 text-primary">
                    {cours.promotions?.name || "-"}
                  </Badge>
                  <Badge
                    className={
                      cours.status === "En cours"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-gray-500/10 text-gray-600"
                    }
                  >
                    {cours.status || "En cours"}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{cours.description}</p>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{cours.horaire}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Video className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{cours.salle}</span>
              </div>
            </div> */}
          </Card>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {cours.etudiants}
                  </p>
                  <p className="text-xs text-muted-foreground">Étudiants</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {cours.heures}h
                  </p>
                  <p className="text-xs text-muted-foreground">Volume</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {cours.encadreur}
                  </p>
                  <p className="text-xs text-muted-foreground">Encadreurs</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {cours.tauxPresence}%
                  </p>
                  <p className="text-xs text-muted-foreground">Présence</p>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          {/* Objectifs pédagogiques */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Objectifs Pédagogiques
            </h3>
            {/* <div className="grid gap-3">
              {cours.objectifs.map((objectif, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{objectif}</p>
                  </div>
                </Card>
              ))}
            </div> */}
          </div>

          <Separator />

          {/* Équipe pédagogique */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Équipe Pédagogique ({cours.encadreur})
            </h3>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cours.encadreur.map((encadreurs, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {encadreurs.nom}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {encadreur.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div> */}
          </div>

          <Separator />

          {/* Fichiers et ressources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Fichiers et Ressources
            </h3>
            {/* <div className="space-y-2">
              {cours.fichiers.map((fichier, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {getFileIcon(fichier.type)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {fichier.nom}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{fichier.type}</span>
                          <span>•</span>
                          <span>{fichier.taille}</span>
                          <span>•</span>
                          <span>{fichier.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div> */}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Gérer les Ressources
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
