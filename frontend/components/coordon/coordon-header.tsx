"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface CoordonHeaderProps {
  onMenuClick: () => void
}

export function CoordonHeader({ onMenuClick }: CoordonHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/login")}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
