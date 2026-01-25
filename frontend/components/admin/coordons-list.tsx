"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/lib/toast-context";
import {
  getCoordonateurs,
  createCoordonateur,
  updateCoordonateur,
  deleteCoordonateur,
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
import { CoordonDetailsModal } from "./coordon-details-modal";
import { CoordonModal } from "./coordon-modal";
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

export function CoordonsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coordons, setCordons] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [selectedCoordon, setSelectedCoordon] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterNiveau, setFilterNiveau] = useState("all");
  const { addToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCoordonateurs();
      setCordons(Array.isArray(data) ? data : []);
    } catch (error: any) {
      addToast(
        "error",
        error.message || "Erreur lors du chargement des coordons",
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

  const handleViewDetails = (coordon: any) => {
    setSelectedCoordon(coordon);
    setIsDetailsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      await deleteCoordonateur(id);
      setCordons((prev) => prev.filter((c) => c.id !== id));
      addToast("success", "Coordonnateur supprimé avec succès");
    } catch (error: any) {
      addToast(
        "error",
        error.message || "Impossible de supprimer le coordonnateur",
      );
    }
  };

  const handleUpsert = async (payload: any) => {
    try {
      if (payload.id) {
        await updateCoordonateur(payload.id, payload);
        addToast("success", "Coordonnateur mis à jour avec succès");
      } else {
        await createCoordonateur(payload);
        addToast("success", "Coordonnateur créé avec succès");
      }
      await load();
      setIsModalOpen(false);
      setSelectedCoordon(null);
    } catch (error: any) {
      addToast("error", error.message || "Erreur lors de l'opération");
    }
  };

  const filtered = coordons.filter((coordon) => {
    const matchesSearch =
      (coordon.nom || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (coordon.email || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesNiveau =
      filterNiveau === "all" ||
      coordon.promotion?.id?.toString() === filterNiveau;
    return matchesSearch && matchesNiveau;
  });

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un coordon..."
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
              setSelectedCoordon(null);
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
                  Promotion
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
              {filtered.map((coordon) => (
                <tr
                  key={coordon.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">
                      {coordon.first_name} {coordon.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {coordon.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {coordon.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">
                      {coordon.promotion?.name || "-"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-primary/10 text-primary">
                      {coordon.status ?? "Actif"}
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
                          onClick={() => handleViewDetails(coordon)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCoordon(coordon);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(coordon.id)}
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

      <CoordonDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedCoordon(null);
        }}
        coordon={selectedCoordon}
      />
      <CoordonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coordon={selectedCoordon}
        onSubmit={handleUpsert}
      />
    </div>
  );
}
