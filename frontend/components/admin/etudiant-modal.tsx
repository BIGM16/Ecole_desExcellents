"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { getPromotions } from "@/lib/services/crud.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EtudiantModalProps {
  isOpen: boolean;
  onClose: () => void;
  etudiant?: any;
  onSubmit?: (data: any) => Promise<void>;
}

export function EtudiantModal({
  isOpen,
  onClose,
  etudiant,
  onSubmit,
}: EtudiantModalProps) {
  const [formData, setFormData] = useState({
    id: etudiant?.id || undefined,
    first_name: etudiant?.first_name || "",
    last_name: etudiant?.last_name || "",
    email: etudiant?.email || "",
    telephone: etudiant?.telephone || "",
    promotion: etudiant?.promotion || "",
  });
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await getPromotions();
        setPromotions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des promotions:", error);
      }
    };
    if (isOpen) {
      loadPromotions();
    }
  }, [isOpen]);

  useEffect(() => {
    setFormData({
      id: etudiant?.id || undefined,
      first_name: etudiant?.first_name || "",
      last_name: etudiant?.last_name || "",
      email: etudiant?.email || "",
      telephone: etudiant?.telephone || "",
      promotion: etudiant?.promotion || "",
    });
  }, [etudiant, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {etudiant ? "Modifier l'Étudiant" : "Ajouter un Étudiant"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de l&apos;étudiant
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                placeholder="Alice"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                placeholder="Mukendi"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="a.mukendi@student.ede.com"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
              placeholder="+243 818 901 234"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="promotion">Promotion</Label>
            <Select
              value={formData.promotion?.toString() || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, promotion: value })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une promotion" />
              </SelectTrigger>
              <SelectContent>
                {promotions.map((promo) => (
                  <SelectItem key={promo.id} value={promo.id.toString()}>
                    {promo.name} ({promo.annee})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "..." : etudiant ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
