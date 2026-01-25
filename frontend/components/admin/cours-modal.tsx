"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/toast-context";
import { getPromotions, getEncadreurs } from "@/lib/services/crud.service";

interface CoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  isLoading?: boolean;
}

export function CoursModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: CoursModalProps) {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    encadreurs: [] as number[],
    promotions: [] as number[],
  });

  const [promotions, setPromotions] = useState<any[]>([]);
  const [encadreurs, setEncadreurs] = useState<any[]>([]);
  const [selectedEncadreur, setSelectedEncadreur] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const [promoData, encData] = await Promise.all([
            getPromotions(),
            getEncadreurs(),
          ]);
          setPromotions(promoData || []);
          setEncadreurs(Array.isArray(encData) ? encData : []);
        } catch (error) {
          console.error("Erreur chargement données:", error);
        }
      };

      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          titre: initialData.titre || "",
          description: initialData.description || "",
          encadreurs: Array.isArray(initialData.encadreurs)
            ? initialData.encadreurs.map((e: any) => e.id)
            : [],
          promotions: Array.isArray(initialData.promotions)
            ? initialData.promotions.map((p: any) => p.id)
            : [],
        });
      } else {
        setFormData({
          titre: "",
          description: "",
          encadreurs: [],
          promotions: [],
        });
      }
    }
  }, [isOpen, initialData]);

  const handleAddEncadreur = () => {
    if (
      selectedEncadreur &&
      !formData.encadreurs.includes(parseInt(selectedEncadreur))
    ) {
      setFormData({
        ...formData,
        encadreurs: [...formData.encadreurs, parseInt(selectedEncadreur)],
      });
      setSelectedEncadreur("");
    }
  };

  const handleRemoveEncadreur = (id: number) => {
    setFormData({
      ...formData,
      encadreurs: formData.encadreurs.filter((e) => e !== id),
    });
  };

  const handleAddPromotion = () => {
    if (
      selectedPromotion &&
      !formData.promotions.includes(parseInt(selectedPromotion))
    ) {
      setFormData({
        ...formData,
        promotions: [...formData.promotions, parseInt(selectedPromotion)],
      });
      setSelectedPromotion("");
    }
  };

  const handleRemovePromotion = (id: number) => {
    setFormData({
      ...formData,
      promotions: formData.promotions.filter((p) => p !== id),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre.trim()) {
      addToast("error", "Le titre est obligatoire");
      return;
    }
    if (formData.promotions.length === 0) {
      addToast("error", "Sélectionnez au moins une promotion");
      return;
    }
    try {
      await onSubmit(formData);
      onClose();
    } catch (error: any) {
      addToast("error", error.message || "Erreur lors de l'opération");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Modifier le cours" : "Créer un nouveau cours"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="titre">Titre du cours *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) =>
                setFormData({ ...formData, titre: e.target.value })
              }
              placeholder="Ex: Mathématiques Avancées"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description du cours"
              rows={3}
            />
          </div>

          {/* Encadreurs */}
          <div className="space-y-3">
            <Label>Encadreurs</Label>
            <div className="flex gap-2">
              <Select
                value={selectedEncadreur}
                onValueChange={setSelectedEncadreur}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner un encadreur" />
                </SelectTrigger>
                <SelectContent>
                  {encadreurs.map((enc) => (
                    <SelectItem key={enc.id} value={enc.id.toString()}>
                      {enc.first_name} {enc.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddEncadreur}
                disabled={!selectedEncadreur}
              >
                Ajouter
              </Button>
            </div>

            {formData.encadreurs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.encadreurs.map((encId) => {
                  const enc = encadreurs.find((e) => e.id === encId);
                  return (
                    <div
                      key={encId}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {enc?.first_name} {enc?.last_name}
                      <button
                        type="button"
                        onClick={() => handleRemoveEncadreur(encId)}
                        className="ml-1 hover:text-primary/70"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Promotions */}
          <div className="space-y-3">
            <Label>Promotions concernées *</Label>
            <div className="flex gap-2">
              <Select
                value={selectedPromotion}
                onValueChange={setSelectedPromotion}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une promotion" />
                </SelectTrigger>
                <SelectContent>
                  {promotions.map((promo) => (
                    <SelectItem key={promo.id} value={promo.id.toString()}>
                      {promo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPromotion}
                disabled={!selectedPromotion}
              >
                Ajouter
              </Button>
            </div>

            {formData.promotions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.promotions.map((promoId) => {
                  const promo = promotions.find((p) => p.id === promoId);
                  return (
                    <div
                      key={promoId}
                      className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {promo?.name}
                      <button
                        type="button"
                        onClick={() => handleRemovePromotion(promoId)}
                        className="ml-1 hover:opacity-70"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
