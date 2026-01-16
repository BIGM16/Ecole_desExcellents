"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Users, Building2 } from "lucide-react"
import { Card } from "@/components/ui/card"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: [
      "Faculté de Médecine",
      "Université Protestante au Congo",
      "Avenue de la Libération, Kinshasa",
    ],
    color: "text-primary",
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: [
      "Coord. Princ. : +243 83 772 6440",
      "Coord. Adj. : +243 83 772 6440",
      "Urgences: +243 XX XXX XXXX",
    ],
    color: "text-accent",
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      "contact@ede-medecine.edu",
      "joanthanmuangala@gmail.com",
      "admission@ede-medecine.edu",
    ],
    color: "text-primary",
  },
  {
    icon: Clock,
    title: "Horaires",
    details: [
      "Lundi - Vendredi: 9h00 - 16h30",
      "Samedi: 9h00 - 13h00",
      "Dimanche: Fermé",
    ],
    color: "text-accent",
  },
];

const coordinationTeam = [
  {
    icon: Users,
    title: "Coordon Principal",
    name: "Dr. Heritier NSINDU",
    email: "coordination.principale@ede.edu",
  },
  {
    icon: Users,
    title: "Coordon Principal Adjoint",
    name: "Dr. Big M",
    email: "coordination.academique@ede.edu",
  },
  {
    icon: Users,
    title: "Coordination Recherche",
    name: "Dr. Nazir",
    email: "coordination.recherche@ede.edu",
  },
]

export function ContactInfoSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Informations de Contact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Nous sommes à votre écoute pour répondre à toutes vos questions
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-border/50 group hover:border-primary/50">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 ${item.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                    <div className="space-y-1">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Coordination Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">Équipe de Coordination</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {coordinationTeam.map((member, index) => (
                <motion.div
                  key={member.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-border/50 group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                      <member.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{member.title}</h4>
                    <p className="text-lg font-medium text-primary mb-1">{member.name}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {member.email}
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Excellence Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <div className="text-center max-w-3xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white font-serif">EDE</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4 text-balance">
                  L'Excellence est Notre Signature
                </h3>
                <p className="text-lg text-foreground/80 leading-relaxed text-pretty">
                  À l'École des Excellents, chaque interaction compte. Que vous soyez un futur excellent, un partenaire
                  académique ou simplement curieux de notre démarche, nous sommes honorés de vous accueillir. Ensemble,
                  cultivons l'excellence médicale et façonnons les leaders de demain.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
