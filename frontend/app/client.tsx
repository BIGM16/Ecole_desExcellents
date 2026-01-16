"use client";

import { useAuth } from "@/lib/context/AuthContext";
// import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import { AchievementsSection } from "@/components/achievements-section";
import { HierarchySection } from "@/components/hierarchy-section";
import { Footer } from "@/components/footer";

export function HomeClient() {
  const { loading } = useAuth();
  // const router = useRouter();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  }
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <AchievementsSection />
      <HierarchySection />
      <Footer />
    </main>
  );
}
