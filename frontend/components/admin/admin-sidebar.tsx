"use client"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, BookOpen, UserCog, LogOut, X, Award, User, Home, Contact } from "lucide-react"
import { useAuth } from "@/lib/context/AuthContext"

const navigationItems = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Contact,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: User,
  },
  {
    title: "Tableau de Bord",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Coordons",
    href: "/admin/coordons",
    icon: Award,
  },
  {
    title: "Encadreurs",
    href: "/admin/encadreurs",
    icon: UserCog,
  },
  {
    title: "Étudiants",
    href: "/admin/etudiants",
    icon: Users,
  },
  {
    title: "Cours",
    href: "/admin/cours",
    icon: BookOpen,
  },
];

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-2xl font-bold text-primary-foreground font-serif">
                      E
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-md flex items-center justify-center">
                    <span className="text-xs font-bold text-accent-foreground">
                      DE
                    </span>
                  </div>
                </div>
                <div className="block">
                  <div className="font-serif text-xs md:text-xl font-semibold text-foreground">
                    École des Excellents
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Administrateur
                  </div>
                </div>
              </a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isActive && "scale-110"
                      )}
                    />
                    <span className="font-medium">{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
