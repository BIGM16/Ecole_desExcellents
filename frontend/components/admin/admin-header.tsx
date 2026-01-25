"use client";

import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
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
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        {/* Menu Button (Mobile) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Search */}
        <div className="flex flex-row justify-between items-center w-full">
          <div>
            Bonjour{" "}
            <span className="text-red-500">
              {user?.first_name} {user?.last_name}
            </span>{" "}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
