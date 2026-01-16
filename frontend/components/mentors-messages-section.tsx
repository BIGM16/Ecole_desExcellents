"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

const mentors = [
  {
    name: "Dr. Marie KABALA",
    role: "Coordinatrice Principale",
    message:
      "L'excellence est le fruit d'un engagement total et d'une détermination sans faille. À l'EDE, nous formons non seulement des médecins compétents, mais des leaders visionnaires qui transformeront la santé de demain. Rejoignez-nous dans cette quête d'excellence académique et humaine.",
    image: "/african-female-doctor-professional.jpg",
  },
  {
    name: "Pr. Jean-Paul MUTOMBO",
    role: "Coordinateur Académique",
    message:
      "Chaque excellent est une étoile qui brille par son savoir, sa rigueur et son humanité. Notre mission est de polir ces joyaux jusqu'à ce qu'ils rayonnent dans toute leur splendeur. L'EDE est plus qu'une structure, c'est une famille d'excellence où chaque membre élève l'autre.",
    image: "/african-male-professor-medical.jpg",
  },
  {
    name: "Dr. Sarah MUKENDI",
    role: "Coordinatrice Recherche",
    message:
      "La recherche médicale exige passion, curiosité et persévérance. À l'EDE, nous encourageons l'innovation et la pensée critique. Nos excellents ne se contentent pas d'apprendre, ils questionnent, explorent et repoussent les frontières du savoir médical.",
    image: "/african-female-researcher-scientist.jpg",
  },
]

export function MentorsMessagesSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mots d'Encouragement</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Paroles de Nos Encadreurs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Découvrez les messages inspirants de ceux qui guident notre communauté d'excellence
            </p>
          </motion.div>

          <div className="space-y-8">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 group">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/3 relative overflow-hidden">
                      <div className="aspect-square md:aspect-auto md:h-full relative">
                        <img
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="font-serif text-2xl font-bold text-white mb-1">{mentor.name}</h3>
                          <p className="text-primary text-sm font-medium">{mentor.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="md:w-2/3 p-8 md:p-12 relative">
                      <Quote className="w-12 h-12 text-primary/20 absolute top-6 right-6" />
                      <div className="relative z-10">
                        <p className="text-lg text-foreground/90 leading-relaxed italic text-pretty mb-6">
                          "{mentor.message}"
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">Excellence Académique</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
