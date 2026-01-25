"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Appeler login et attendre que refreshUser soit fait
      await login(formData.email, formData.password);
      // Pas de redirection ici, le client.tsx gère ça
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur réseau lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-4xl font-bold text-primary-foreground font-serif">
                  E
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-accent-foreground">
                  DE
                </span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
            Espace Membres
          </h1>
          <p className="text-muted-foreground">
            École des Excellents - Faculté de Médecine
          </p>
        </div>

        {/* Carte de connexion */}
        <Card className="p-8 shadow-2xl border-border/50 backdrop-blur-sm bg-card/95 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Connexion
            </h2>
            <p className="text-sm text-muted-foreground">
              Accédez à votre espace pour continuer vers l&apos;excellence
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            {/* Email Input */}
            <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-500 delay-300">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 h-12 bg-background border-border focus:border-primary transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-500 delay-400">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Mot de passe
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10 h-12 bg-background border-border focus:border-primary transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end animate-in fade-in duration-500 delay-500">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 animate-in fade-in zoom-in-95 duration-500 delay-600"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Connexion en cours...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Se connecter
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 animate-in fade-in duration-500 delay-700">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Information
              </span>
            </div>
          </div>

          {/* Info message */}
          <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-800">
            <p className="text-sm text-muted-foreground">
              Vous n&apos;avez pas encore de compte ?
            </p>
            <Button className="inline-block text-sm font-medium text-white hover:text-primary/80 hover:bg-white duration-800 transition-colors">
              Contactez votre encadreur
            </Button>
          </div>
        </Card>

        {/* Quote d'excellence */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-700 delay-1000">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <p className="text-sm font-medium text-foreground italic">
              &ldquo;L&apos;excellence n&apos;est pas une destination,
              c&apos;est un voyage&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
