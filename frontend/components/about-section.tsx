"use client"

import { BookOpen, Microscope, Stethoscope, GraduationCap } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Formation d'Excellence",
      description:
        "Un cursus rigoureux conçu pour développer les compétences médicales et scientifiques de haut niveau.",
    },
    {
      icon: Microscope,
      title: "Recherche Avancée",
      description: "Accès à des ressources de pointe et participation à des projets de recherche innovants.",
    },
    {
      icon: Stethoscope,
      title: "Pratique Clinique",
      description: "Préparation pour des stages pratiques dans les hôpitaux universitaires pour une expérience concrète.",
    },
    {
      icon: GraduationCap,
      title: "Mentorat d'Elite",
      description: "Accompagnement personnalisé par des encadreurs renommés et des médecins experts.",
    },
  ]

  return (
    <section id="apropos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">À Propos de l'EDE</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              L'Excellence au Cœur de Notre Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              L'École des Excellents (EDE) est une structure d'étude universitaire prestigieuse au sein de la Faculté de
              Médecine, dédiée à former les leaders médicaux de demain à travers une approche structurée et exigeante.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* About Details */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-1">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <img
                    src="/medical-student-studying-with-books-and-stethoscop.jpg"
                    alt="Étudiant en médecine"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </div>

            <div>
              <h3 className="font-serif text-3xl font-bold text-foreground mb-6">Notre Vision</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  L'EDE se distingue par sa{" "}
                  <span className="text-primary font-semibold">hiérarchie bien organisée</span> et son engagement envers
                  l'excellence académique. Chaque membre de notre structure bénéficie d'un parcours structuré favorisant
                  le développement personnel et professionnel.
                </p>
                <p>
                  Nous cultivons un environnement où la{" "}
                  <span className="text-primary font-semibold">qualité prime sur la quantité</span>, où chaque étudiant
                  reçoit l'attention et les ressources nécessaires pour exceller dans ses études médicales et atteindre
                  son plein potentiel.
                </p>
                <p>
                  Notre structure intègre des programmes de mentorat, des sessions de formation avancées et des
                  opportunités de recherche qui préparent nos étudiants à devenir des professionnels de santé
                  d'exception.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
