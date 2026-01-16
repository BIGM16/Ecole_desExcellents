"use client"

import { useEffect, useState, useRef } from "react"
import { Trophy, Star, Target, Zap } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Trophy,
      value: 200,
      suffix: "+",
      label: "Étudiants d'Excellence",
      description: "Membres actifs sélectionnés pour leur excellence académique",
    },
    {
      icon: Star,
      value: 95,
      suffix: "%",
      label: "Taux de Réussite",
      description: "Performance exceptionnelle aux examens nationaux",
    },
    {
      icon: Target,
      value: 50,
      suffix: "+",
      label: "Distinctions Académiques",
      description: "Prix et mentions honorifiques obtenus chaque année",
    },
    {
      icon: Zap,
      value: 100,
      suffix: "%",
      label: "Engagement Qualité",
      description: "Processus de sélection rigoureux et suivi personnalisé",
    },
  ]

  return (
    <section id="excellence" className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">Excellence & Statistiques</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Des Chiffres qui Parlent d'Eux-Mêmes
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              L'EDE s'engage à maintenir les plus hauts standards d'excellence académique, privilégiant la qualité et le
              développement optimal de chaque étudiant.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 100} />
            ))}
          </div>

          {/* Quality Message */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">L'Excellence par la Qualité</h3>
              <p className="text-muted-foreground leading-relaxed">
                À l'EDE, nous croyons fermement que{" "}
                <span className="text-primary font-semibold">la qualité prime sur la quantité</span>. Notre processus de
                sélection rigoureux et notre structure hiérarchique bien définie garantissent que chaque membre
                bénéficie d'un encadrement optimal et d'opportunités exceptionnelles pour développer ses compétences
                médicales et scientifiques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, value, suffix, label, description, delay }: any) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div
      ref={cardRef}
      className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-primary/5 rounded-2xl transition-all duration-500" />

      <div className="relative">
        {/* Icon */}
        <div className="mb-6 inline-flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        {/* Value */}
        <div className="mb-2">
          <span className="font-serif text-5xl font-bold text-foreground">{count}</span>
          <span className="font-serif text-5xl font-bold text-primary">{suffix}</span>
        </div>

        {/* Label */}
        <h3 className="font-semibold text-foreground mb-2 text-lg">{label}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
