"use client"

import { Crown, Users, UserCheck, User } from "lucide-react"

export function HierarchySection() {
  const hierarchyLevels = [
    {
      icon: Crown,
      level: "Coordination Principale",
      role: "Conseil d'Administration",
      description: "Définit la vision stratégique et supervise l'ensemble des activités de l'EDE.",
      members: "2 membres",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: UserCheck,
      level: "Coordination par Promotion",
      role: "Coordination & Gestion",
      description: "Assure la mise en œuvre des décisions et la coordination des départements dans chaque promotion.",
      members: "16 membres",
      color: "from-primary to-accent",
    },
    {
      icon: Users,
      level: "Responsables de Départements",
      role: "Encadrement Académique",
      description: "Supervisent les activités académiques et le développement des programmes.",
      members: "25 responsables",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: User,
      level: "Membres Actifs",
      role: "Étudiants d'Excellence",
      description: "Participent activement aux programmes et représentent l'excellence de l'EDE.",
      members: "200+ étudiants",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section id="hierarchie" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">Organisation & Structure</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Une Hiérarchie Structurée
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              L'EDE s'appuie sur une structure organisationnelle claire et efficace, garantissant un encadrement optimal
              à chaque niveau.
            </p>
          </div>

          {/* Hierarchy Visualization */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-purple-500 -translate-x-1/2" />

            {/* Hierarchy Levels */}
            <div className="space-y-8">
              {hierarchyLevels.map((level, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full">
                    <div className="group relative bg-card border-2 border-border hover:border-primary/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                      />

                      <div className="relative">
                        {/* Level Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 bg-gradient-to-br ${level.color} rounded-xl`}>
                            <level.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="px-3 py-1 bg-primary/10 rounded-full">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                              Niveau {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{level.level}</h3>

                        {/* Role */}
                        <div className="text-primary font-semibold mb-3">{level.role}</div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-4">{level.description}</p>

                        {/* Members Count */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{level.members}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Node (Desktop Only) */}
                  <div className="hidden lg:block relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Une Organisation au Service de l'Excellence
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Chaque niveau de notre hiérarchie joue un rôle essentiel dans la réalisation de notre mission : former
                les médecins d'excellence de demain dans un cadre structuré, rigoureux et bienveillant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
