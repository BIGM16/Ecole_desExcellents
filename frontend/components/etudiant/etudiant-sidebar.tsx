"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Users, GraduationCap, Calendar, X, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface EtudiantSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: Home, label: "Tableau de Bord", href: "/etudiant" },
  { icon: BookOpen, label: "Cours", href: "/etudiant/cours" },
  { icon: GraduationCap, label: "Encadreurs", href: "/etudiant/encadreurs" },
  { icon: Users, label: "Étudiants", href: "/etudiant/etudiants" },
  { icon: Calendar, label: "Horaires", href: "/etudiant/horaires" },
]

export function EtudiantSidebar({ isOpen, onClose }: EtudiantSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-72 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground font-serif">E</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-accent-foreground">DE</span>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-foreground font-serif">École des Excellents</h2>
                <p className="text-xs text-muted-foreground">Espace Étudiant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-11 transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <Link href="/etudiant/profil" onClick={onClose}>
              <Button
                variant={pathname === "/etudiant/profil" ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11 transition-all duration-200",
                  pathname === "/etudiant/profil"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Mon Profil</span>
              </Button>
            </Link>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Thème</span>
              <ThemeToggle />
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/login" onClick={onClose}>
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
