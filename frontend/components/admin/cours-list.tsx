"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/lib/toast-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CoursDetailsModal } from "./cours-details-modal";
import { CoursModal } from "./cours-modal";
import { Search, MoreVertical, Edit, Trash2, Eye, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCours,
  getPromotions,
  createCours,
  updateCours,
  deleteCours,
} from "@/lib/services/crud.service";

export function CoursList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [promotions, setPromotions] = useState<any[]>([]);
  const [cours, setCours] = useState<any[]>([]);
  const [selectedCours, setSelectedCours] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterNiveau, setFilterNiveau] = useState("all");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const loadCours = async () => {
    setLoading(true);
    try {
      const data = await getCours();
      setCours(Array.isArray(data) ? data : []);
    } catch (error: any) {
      addToast("error", error.message || "Erreur lors du chargement des cours");
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
    loadCours();
    loadPromotions();
  }, []);

  const handleViewDetails = (c: any) => {
    setSelectedCours(c);
    setIsDetailsOpen(true);
  };

  const handleEdit = (c: any) => {
    setSelectedCours(c);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmer la suppression de ce cours?")) return;
    try {
      await deleteCours(id);
      setCours((prev) => prev.filter((c) => c.id !== id));
      addToast("success", "Cours supprimé avec succès");
    } catch (error: any) {
      addToast("error", error.message || "Impossible de supprimer le cours");
    }
  };

  const handleCoursSubmit = async (data: any) => {
    try {
      if (selectedCours?.id) {
        await updateCours(selectedCours.id, data);
        addToast("success", "Cours mis à jour avec succès");
      } else {
        await createCours(data);
        addToast("success", "Cours créé avec succès");
      }
      await loadCours();
      setSelectedCours(null);
      setIsModalOpen(false);
    } catch (error: any) {
      addToast("error", error.message || "Erreur lors de l'opération");
    }
  };

  const filtered = cours.filter((c) => {
    const matchesSearch = (c.titre || "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtre par promotion - cours a un array de promotions
    const matchesNiveau =
      filterNiveau === "all" ||
      c.promotions?.some((p: any) => p.id?.toString() === filterNiveau);

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
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Titre
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Promotions
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Encadreurs
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(c)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{c.titre}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.description?.substring(0, 50)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.promotions?.map((p: any) => (
                        <Badge
                          key={p.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {p.name}
                        </Badge>
                      )) || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      {c.encadreurs
                        ?.map((e: any) => `${e.first_name} ${e.last_name}`)
                        .join(", ") || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(c);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(c);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(c.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td
                    colSpan={8}
                    className="p-4 text-center text-sm text-muted-foreground"
                  >
                    Chargement...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="p-4 text-center text-sm text-muted-foreground"
                  >
                    Aucun cours trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <CoursDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedCours(null);
        }}
        cours={selectedCours}
      />

      <CoursModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCours(null);
        }}
        onSubmit={handleCoursSubmit}
        initialData={selectedCours}
        isLoading={loading}
      />
    </div>
  );
}
