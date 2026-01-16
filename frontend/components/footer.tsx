"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground font-serif">E</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-md flex items-center justify-center">
                    <span className="text-xs font-bold text-accent-foreground">DE</span>
                  </div>
                </div>
                <div>
                  <div className="font-serif text-lg font-semibold text-foreground">École des Excellents</div>
                  <div className="text-xs text-muted-foreground">Faculté de Médecine</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Structure d'étude universitaire d'élite dédiée à l'excellence médicale et académique.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Liens Rapides</h3>
              <ul className="space-y-3">
                {["Accueil", "À Propos", "Excellence", "Hiérarchie", "Admission"].map((link) => (
                  <li key={link}>
                    <a
                      href={`/#${link.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Programmes</h3>
              <ul className="space-y-3">
                {["Formation Médicale", "Recherche Avancée", "Stages Cliniques", "Mentorat", "Publications"].map(
                  (program) => (
                    <li key={program}>
                      <p className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-default">
                        {program}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Faculté de Médecine
                    <br />
                    Université Protestante au Congo
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">+243 810 792 699</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">contact@ede-medecine.edu</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © 2025 École des Excellents (EDE). Tous droits réservés.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Politique de Confidentialité
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'Utilisation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
