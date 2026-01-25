"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { LoginForm } from "@/components/login-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function LoginPageClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Rediriger selon le rôle (adapter les rôles du backend)
      switch (user.role) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "COORDON":
          router.push("/coordon");
          break;
        case "ENCADREUR":
          router.push("/encadreur");
          break;
        case "ETUDIANT":
          router.push("/etudiant");
          break;
        default:
          router.push("/");
      }
    }
  }, [user, loading, router]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       Chargement...
  //     </div>
  //   );
  // }

  if (!loading && user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <LoginForm />
      </div>
      <Footer />
    </main>
  );
}
