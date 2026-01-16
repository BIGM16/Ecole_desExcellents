"use client"

import { ArrowRight, Award, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Centre d'Excellence Académique</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-top-6 duration-700 delay-100 text-balance">
            École des{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                Excellents
              </span>
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-in fade-in slide-in-from-top-8 duration-700 delay-200 max-w-3xl mx-auto leading-relaxed">
            Structure d'Étude Universitaire d'Élite de la Faculté de Médecine
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 mb-12 animate-in fade-in slide-in-from-top-10 duration-700 delay-300 max-w-2xl mx-auto leading-relaxed">
            Forger l'excellence médicale de demain à travers une formation rigoureuse, une hiérarchie structurée et un
            engagement sans faille envers la qualité académique.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 group">
              Découvrir EDE
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-2 bg-transparent">
              Nous Contacter
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-700">
            {[
              { icon: Users, value: "200+", label: "Étudiants d'Elite" },
              { icon: Award, value: "95%", label: "Taux de Réussite" },
              { icon: TrendingUp, value: "#1", label: "Classement Universitaire" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <stat.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
                  <div className="text-3xl font-bold text-foreground font-serif mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
