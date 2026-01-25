"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "À Propos", href: "/#apropos" },
    { label: "Excellence", href: "/#excellence" },
    { label: "Hiérarchie", href: "/#hierarchie" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 group">
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
            <div className="hidden md:block">
              <div className="font-serif text-xl font-semibold text-foreground">
                École des Excellents
              </div>
              <div className="text-xs text-muted-foreground">
                Faculté de Médecine
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            {user?.role === "ADMIN" && (
              <a
                href="/admin"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )}
            {user?.role === "COORDON" && (
              <a
                href="/coordon"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                Coordon
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )}
            {user?.role === "ENCADREUR" && (
              <a
                href="/encadreur"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                Encadreur
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )}
            {user?.role === "ETUDIANT" && (
              <a
                href="/etudiant"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                Etudiant
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <>
                <Button
                  asChild
                  className="hidden md:flex mr-2 bg-transparent hover:bg-transparent"
                >
                  <a
                    href="/profile"
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                  >
                    Profil
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href="/auth/login">Connexion</a>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {user?.role === "ADMIN" && (
                <a
                  href="/admin"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Admin
                </a>
              )}
              {user ? (
                <>
                  <Button
                    asChild
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    <a href="/profile" className="text-sm">
                      Profil
                    </a>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 mt-2"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground mt-2"
                >
                  <a href="/auth/login">Connexion</a>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
