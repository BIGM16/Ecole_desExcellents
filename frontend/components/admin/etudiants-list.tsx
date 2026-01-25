"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/lib/toast-context";
import {
  getEtudiants,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
  getPromotions,
} from "@/lib/services/crud.service";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EtudiantDetailsModal } from "./etudiant-details-modal";
import { EtudiantModal } from "./etudiant-modal";
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

export function EtudiantsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNiveau, setFilterNiveau] = useState("all");
  const [etudiants, setEtudiants] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const loadEtudiants = async () => {
    setLoading(true);
    try {
      const data = await getEtudiants();
      setEtudiants(
        Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [],
      );
    } catch (error: any) {
      addToast(
        "error",
        error.message || "Erreur lors du chargement des étudiants",
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
    loadEtudiants();
    loadPromotions();
  }, []);

  const handleViewDetails = (etudiant: any) => {
    setSelectedEtudiant(etudiant);
    setIsDetailsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      await deleteEtudiant(id);
      setEtudiants((prev) => prev.filter((e) => e.id !== id));
      addToast("success", "Étudiant supprimé avec succès");
    } catch (error: any) {
      addToast("error", error.message || "Impossible de supprimer l'étudiant");
    }
  };

  const handleUpsert = async (payload: any) => {
    try {
      if (payload.id) {
        await updateEtudiant(payload.id, payload);
        addToast("success", "Étudiant mis à jour avec succès");
      } else {
        await createEtudiant(payload);
        addToast("success", "Étudiant créé avec succès");
      }
      await loadEtudiants();
      setIsModalOpen(false);
      setSelectedEtudiant(null);
    } catch (error: any) {
      addToast("error", error.message || "Erreur lors de l'opération");
    }
  };

  const filteredEtudiants = etudiants.filter((etudiant) => {
    const matchesSearch =
      (etudiant.nom || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (etudiant.email || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesNiveau =
      filterNiveau === "all" ||
      etudiant.promotion?.id?.toString() === filterNiveau;
    return matchesSearch && matchesNiveau;
  });

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un étudiant..."
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
              setSelectedEtudiant(null);
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
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEtudiants.map((etudiant) => (
                <tr
                  key={etudiant.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">
                      {etudiant.first_name} {etudiant.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {etudiant.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {etudiant.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">
                      {etudiant.promotion?.name ?? "-"}
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
                          onClick={() => handleViewDetails(etudiant)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEtudiant(etudiant);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(etudiant.id)}
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
                    colSpan={6}
                    className="p-4 text-center text-sm text-muted-foreground"
                  >
                    Chargement...
                  </td>
                </tr>
              )}
              {!loading && filteredEtudiants.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-4 text-center text-sm text-muted-foreground"
                  >
                    Aucun étudiant trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <EtudiantDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedEtudiant(null);
        }}
        etudiant={selectedEtudiant}
      />
      <EtudiantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        etudiant={selectedEtudiant}
        onSubmit={handleUpsert}
      />
    </div>
  );
}
