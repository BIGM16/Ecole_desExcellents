"use client";

import type React from "react";
import { useEffect, useState } from "react";
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

interface CoordonModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordon?: any;
  onSubmit?: (data: any) => Promise<void>;
}

export function CoordonModal({
  isOpen,
  onClose,
  coordon,
  onSubmit,
}: CoordonModalProps) {
  const [formData, setFormData] = useState({
    id: coordon?.id || undefined,
    first_name: coordon?.first_name || "",
    last_name: coordon?.last_name || "",
    email: coordon?.email || "",
    telephone: coordon?.telephone || "",
    promotion: coordon?.promotion || "",
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
      id: coordon?.id || undefined,
      first_name: coordon?.first_name || "",
      last_name: coordon?.last_name || "",
      email: coordon?.email || "",
      telephone: coordon?.telephone || "",
      promotion: coordon?.promotion || "",
    });
  }, [coordon]);

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
            {coordon ? "Modifier le Coordon" : "Ajouter un Coordon"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du coordon
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
                placeholder="Jean"
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
              placeholder="j.mukendi@ede.com"
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
              placeholder="+243 812 345 678"
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
              {isSubmitting ? "..." : coordon ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
