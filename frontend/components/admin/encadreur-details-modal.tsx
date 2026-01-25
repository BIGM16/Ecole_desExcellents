"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  Clock,
  TrendingUp,
} from "lucide-react"

interface EncadreurDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  encadreur: {
    id: number
    first_name : string
    email: string
    phone: string
    specialite: string
    etudiants: number
    cours: number
    status: string
    bio?: string
    adresse?: string
    dateRecrutement?: string
    diplomes?: string[]
    coursEnseignes?: Array<{ titre: string; niveau: string; etudiants: number }>
    publications?: number
    experience?: string
    tauxReussite?: number
  } | null
}

export function EncadreurDetailsModal({ isOpen, onClose, encadreur }: EncadreurDetailsModalProps) {
  if (!encadreur) return null

  // Mock data enrichi
  const detailsComplets = {
    ...encadreur,
    bio:
      encadreur.bio ||
      "Professeur expérimenté avec plus de 15 ans d'expérience dans l'enseignement médical et la recherche clinique.",
    adresse: encadreur.adresse || "Avenue de l'Université, Kinshasa",
    dateRecrutement: encadreur.dateRecrutement || "Septembre 2015",
    diplomes: encadreur.diplomes || [
      "Doctorat en Médecine - Université de Kinshasa",
      "Spécialisation en " + encadreur.specialite,
      "Master en Pédagogie Médicale",
    ],
    coursEnseignes: encadreur.coursEnseignes || [
      { titre: "Anatomie Générale", niveau: "3ème année", etudiants: 48 },
      { titre: encadreur.specialite + " Clinique", niveau: "5ème année", etudiants: 35 },
      { titre: encadreur.specialite + " Avancée", niveau: "6ème année", etudiants: 28 },
    ],
    publications: encadreur.publications || 24,
    experience: encadreur.experience || "15 ans",
    tauxReussite: encadreur.tauxReussite || 94,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground font-serif flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            Profil de l&apos;Encadreur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* En-tête avec infos principales */}
          <Card className="p-6 bg-linear-to-br from-background to-muted/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {detailsComplets.first_name} {detailsComplets.last_name}
                </h2>
                <Badge className="bg-primary/10 text-primary">
                  {detailsComplets.specialite || "RIEN"}
                </Badge>
              </div>
              <Badge
                className={
                  detailsComplets.status === "Actif"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : "bg-gray-500/10 text-gray-600"
                }
              >
                {detailsComplets.status || "Active"}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-4">{detailsComplets.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {detailsComplets.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {detailsComplets.telephone}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {detailsComplets.adresse}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Recruté: {detailsComplets.dateRecrutement}
                </span>
              </div>
            </div>
          </Card>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {detailsComplets.cours}
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
                    {detailsComplets.etudiants}
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
                    {detailsComplets.publications}
                  </p>
                  <p className="text-xs text-muted-foreground">Publications</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {detailsComplets.tauxReussite}%
                  </p>
                  <p className="text-xs text-muted-foreground">Réussite</p>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          {/* Cours enseignés */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Cours Enseignés ({detailsComplets.coursEnseignes.length})
            </h3>
            <div className="space-y-3">
              {detailsComplets.coursEnseignes.map((cours, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {cours.titre}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {cours.niveau}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {cours.etudiants} étudiants
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Diplômes et qualifications */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Diplômes et Qualifications
            </h3>
            <div className="space-y-2">
              {detailsComplets.diplomes.map((diplome, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{diplome}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Expérience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Expérience</h4>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {detailsComplets.experience}
              </p>
              <p className="text-sm text-muted-foreground">
                d&apos;enseignement et de recherche
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">Disponibilité</h4>
              </div>
              <p className="text-sm text-muted-foreground">Lundi - Vendredi</p>
              <p className="text-sm text-muted-foreground">8h00 - 17h00</p>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Contacter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
