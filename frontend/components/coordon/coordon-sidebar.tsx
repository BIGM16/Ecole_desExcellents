"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, BookOpen, Users, UserCheck, Calendar, X, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Tableau de bord", href: "/coordon", icon: Home },
  { name: "Cours", href: "/coordon/cours", icon: BookOpen },
  { name: "Étudiants", href: "/coordon/etudiants", icon: Users },
  { name: "Encadreurs", href: "/coordon/encadreurs", icon: UserCheck },
  { name: "Horaires", href: "/coordon/horaires", icon: Calendar },
]

interface CoordonSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CoordonSidebar({ isOpen, onClose }: CoordonSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/coordon" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-primary/80 to-chart-1 flex items-center justify-center">
                <span className="text-lg font-bold text-white">EDE</span>
              </div>
              <div>
                <div className="font-bold text-foreground">Coordinateur</div>
                <div className="text-xs text-muted-foreground">École des Excellents</div>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link
              href="/coordon/profil"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === "/coordon/profil"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <User className="h-5 w-5" />
              Mon Profil
            </Link>

            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </Link>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium text-foreground">Dr. Marie Tshilombo</div>
                <div className="text-xs text-muted-foreground">Coordon 5ème année</div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
