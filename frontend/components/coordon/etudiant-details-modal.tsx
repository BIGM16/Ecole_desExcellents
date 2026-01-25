"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, Award, TrendingUp, BookOpen } from "lucide-react"

interface EtudiantDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  etudiant: any
}

export function EtudiantDetailsModal({ isOpen, onClose, etudiant }: EtudiantDetailsModalProps) {
  if (!etudiant) return null

  const mockDetails = {
    dateNaissance: "15 Mars 2001",
    dateInscription: "Septembre 2020",
    coursInscrits: ["Anatomie Générale", "Cardiologie Clinique", "Pédiatrie Pratique"],
    notes: [
      { cours: "Anatomie Générale", note: 17.5 },
      { cours: "Cardiologie Clinique", note: 16.0 },
      { cours: "Pédiatrie Pratique", note: 16.0 },
    ],
    absences: 2,
    distinctions: ["Mention Très Bien 2023", "Prix d'Excellence 2024"],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Détails de l'Étudiant</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">{etudiant.nom}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{etudiant.niveau}</Badge>
              <Badge
                className={
                  etudiant.status === "Excellent" ? "bg-primary/10 text-primary" : "bg-chart-2/10 text-chart-2"
                }
              >
                {etudiant.status}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Informations de Contact
            </h4>
            <div className="space-y-2 pl-7">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {etudiant.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {etudiant.phone}
              </div>
            </div>
          </div>

          <Separator />

          {/* Dates importantes */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Dates Importantes
            </h4>
            <div className="space-y-2 pl-7">
              <div className="text-sm">
                <span className="text-muted-foreground">Date de naissance:</span>{" "}
                <span className="text-foreground font-medium">{mockDetails.dateNaissance}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Inscription:</span>{" "}
                <span className="text-foreground font-medium">{mockDetails.dateInscription}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance académique */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance Académique
            </h4>
            <div className="space-y-3 pl-7">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Moyenne Générale</span>
                <span className="text-lg font-bold text-primary">{etudiant.moyenne}/20</span>
              </div>
              <div className="space-y-2">
                {mockDetails.notes.map((note, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{note.cours}</span>
                    <Badge variant="outline">{note.note}/20</Badge>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Absences:</span>{" "}
                <span className="text-foreground font-medium">{mockDetails.absences} jours</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cours inscrits */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Cours Inscrits ({mockDetails.coursInscrits.length})
            </h4>
            <div className="flex flex-wrap gap-2 pl-7">
              {mockDetails.coursInscrits.map((cours, index) => (
                <Badge key={index} variant="outline">
                  {cours}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Distinctions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Distinctions
            </h4>
            <div className="space-y-2 pl-7">
              {mockDetails.distinctions.map((distinction, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  {distinction}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
