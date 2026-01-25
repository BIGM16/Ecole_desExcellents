import type { Metadata } from "next";
import { LoginPageClient } from "./client";

export const metadata: Metadata = {
  title: "Connexion | École des Excellents",
  description: "Connectez-vous à votre espace membre EDE",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
