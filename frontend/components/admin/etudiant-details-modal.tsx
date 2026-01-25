"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, GraduationCap, TrendingUp, BookOpen } from "lucide-react"

interface EtudiantDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  etudiant: any
}

export function EtudiantDetailsModal({ isOpen, onClose, etudiant }: EtudiantDetailsModalProps) {
  if (!etudiant) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Profil de l&apos;étudiant
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">
                {etudiant.first_name?.charAt(0)}
                {etudiant.last_name?.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {etudiant.first_name} {etudiant.last_name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Etudiant N°{etudiant.id}
              </p>
              <div className="flex gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {etudiant.promotion}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 border-green-500/30"
                >
                  {etudiant.statut || "Active"}
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
                    href={`mailto:${etudiant.email}`}
                    className="text-primary hover:underline"
                  >
                    {etudiant.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{etudiant.telephone}</span>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Moyenne générale</span>
                  </div>
                  <span className="font-bold text-lg">
                    {etudiant.moyenne}/20
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">Cours suivis</span>
                  </div>
                  <span className="font-bold text-lg">{etudiant.cours}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Crédits validés</span>
                  </div>
                  <span className="font-bold text-lg">180</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase">
              Cours en cours
            </h4>
            <div className="grid gap-2">
              {[
                "Anatomie Générale",
                "Physiologie",
                "Biochimie",
                "Pharmacologie",
              ].map((cours, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <span className="text-sm">{cours}</span>
                  <Badge variant="outline">En cours</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
