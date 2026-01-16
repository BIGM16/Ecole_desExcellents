"use client"

import { Medal, BookOpen, Award, Trophy, Star, Target } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AchievementsSection() {
  const achievements = [
    // {
    //   icon: Medal,
    //   title: "Prix d'Excellence Nationale",
    //   year: "2024",
    //   description: "Reconnu comme la meilleure structure d'étude universitaire en médecine du pays.",
    //   color: "from-yellow-500/20 to-amber-500/20",
    // },
    // {
    //   icon: Trophy,
    //   title: "Champion des Olympiades Médicales",
    //   year: "2023-2024",
    //   description: "Nos étudiants dominent les compétitions nationales et internationales.",
    //   color: "from-primary/20 to-accent/20",
    // },
    // {
    //   icon: BookOpen,
    //   title: "Publications de Recherche",
    //   year: "50+",
    //   description: "Articles scientifiques publiés dans des revues internationales prestigieuses.",
    //   color: "from-blue-500/20 to-cyan-500/20",
    // },
    {
      icon: Star,
      title: "Taux de Satisfaction",
      year: "98%",
      description: "Excellence reconnue par nos étudiants et partenaires académiques.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Award,
      title: "Bourses d'Excellence",
      year: "50+",
      description: "Bourses et exonérations obtenues pour études supérieure à des excellents.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Target,
      title: "Partenariats Nationaux",
      year: "25+",
      description: "Collaborations avec des institutions médicales et des médecins traitants experts.",
      color: "from-orange-500/20 to-red-500/20",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">Mérites & Distinctions</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Un Palmarès d'Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Les réalisations de l'EDE témoignent de notre engagement indéfectible envers l'excellence académique et la
              réussite de nos étudiants.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/30"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative">
                  {/* Icon & Year Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="px-3 py-1 bg-primary/10 rounded-full">
                      <span className="text-xs font-semibold text-primary">{achievement.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
