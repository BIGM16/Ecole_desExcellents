"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BookOpen, Users, UserCheck, Calendar, X, User, LogOut } from "lucide-react"

interface EncadreurSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function EncadreurSidebar({ isOpen, onClose }: EncadreurSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Tableau de bord", href: "/encadreur", icon: LayoutDashboard },
    { name: "Cours", href: "/encadreur/cours", icon: BookOpen },
    { name: "Étudiants", href: "/encadreur/etudiants", icon: Users },
    { name: "Encadreurs", href: "/encadreur/encadreurs", icon: UserCheck },
    { name: "Horaires", href: "/encadreur/horaires", icon: Calendar },
  ]

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border/50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div>
              <h2 className="text-xl font-bold font-serif bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Espace Encadreur
              </h2>
              <p className="text-xs text-muted-foreground mt-1">École des Excellents</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border/50 space-y-2">
            <Link
              href="/encadreur/profil"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                pathname === "/encadreur/profil"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Mon Profil</span>
            </Link>

            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Déconnexion</span>
            </Link>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mt-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">DK</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Dr. David Kalala</p>
                <p className="text-xs text-muted-foreground truncate">Encadreur</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
