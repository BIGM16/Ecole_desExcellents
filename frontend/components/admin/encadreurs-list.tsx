"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/lib/toast-context";
import {
  getEncadreurs,
  createEncadreur,
  updateEncadreur,
  deleteEncadreur,
  getPromotions,
} from "@/lib/services/crud.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EncadreurDetailsModal } from "./encadreur-details-modal";
import { EncadreurModal } from "./encadreur-modal";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Eye,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EncadreursList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [encadreurs, setEncadreurs] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [selectedEncadreur, setSelectedEncadreur] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterNiveau, setFilterNiveau] = useState("all");
  const { addToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getEncadreurs();
      setEncadreurs(Array.isArray(data) ? data : []);
    } catch (error: any) {
      addToast(
        "error",
        error.message || "Erreur lors du chargement des encadreurs",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPromotions = async () => {
    try {
      const data = await getPromotions();
      setPromotions(data || []);
    } catch (error: any) {
      console.error("Erreur lors du chargement des promotions:", error);
      setPromotions([]);
    }
  };

  useEffect(() => {
    load();
    loadPromotions();
  }, []);

  const handleViewDetails = (encadreur: any) => {
    setSelectedEncadreur(encadreur);
    setIsDetailsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      await deleteEncadreur(id);
      setEncadreurs((prev) => prev.filter((e) => e.id !== id));
      addToast("success", "Encadreur supprimé avec succès");
    } catch (error: any) {
      addToast("error", error.message || "Impossible de supprimer l'encadreur");
    }
  };

  const handleUpsert = async (payload: any) => {
    try {
      if (payload.id) {
        await updateEncadreur(payload.id, payload);
        addToast("success", "Encadreur mis à jour avec succès");
      } else {
        await createEncadreur(payload);
        addToast("success", "Encadreur créé avec succès");
      }
      await load();
      setIsModalOpen(false);
      setSelectedEncadreur(null);
    } catch (error: any) {
      addToast("error", error.message || "Erreur lors de l'opération");
    }
  };

  const filtered = encadreurs.filter((enc) => {
    const matchesSearch =
      (enc.nom || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (enc.email || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (enc.specialite || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesNiveau =
      filterNiveau === "all" || enc.promotion?.id?.toString() === filterNiveau;
    return matchesSearch && matchesNiveau;
  });

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un encadreur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterNiveau} onValueChange={setFilterNiveau}>
            <SelectTrigger className="w-full sm:w-50">
              <SelectValue placeholder="Filtrer par promotion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les promotions</SelectItem>
              {promotions.map((promo) => (
                <SelectItem key={promo.id} value={promo.id.toString()}>
                  {promo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setSelectedEncadreur(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Ajouter
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Spécialité
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Cours
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((encadreur) => (
                <tr
                  key={encadreur.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">
                      {encadreur.first_name} {encadreur.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {encadreur.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {encadreur.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{encadreur.bio}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">
                      {encadreur.cours ?? "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-primary/10 text-primary">
                      {encadreur.status ?? "Actif"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(encadreur)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEncadreur(encadreur);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(encadreur.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Chargement...
            </div>
          )}
        </div>
      </Card>

      <EncadreurDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedEncadreur(null);
        }}
        encadreur={selectedEncadreur}
      />
      <EncadreurModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        encadreur={selectedEncadreur}
        onSubmit={handleUpsert}
      />
    </div>
  );
}
