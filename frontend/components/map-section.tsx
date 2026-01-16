"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MapSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Nous Trouver
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Visitez-nous au campus universitaire de la Faculté de Médecine
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-border/50"
          >
            {/* Map Placeholder */}
            <div className="relative h-[500px] bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Faculté de Médecine</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Campus Universitaire de Kinshasa
                    <br />
                    Avenue de la Science, Kinshasa
                  </p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Navigation className="w-4 h-4 mr-2" />
                    Obtenir l'Itinéraire
                  </Button>
                </div>
              </div>

              {/* Decorative Grid */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
