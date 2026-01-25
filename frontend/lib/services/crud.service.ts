import axios from "@/lib/axios";
import { AxiosError } from "axios";

// ============================================
// HELPER: Formater les erreurs API
// ============================================
function formatError(error: any): string {
  if (error instanceof AxiosError) {
    if (error.response?.status === 403) {
      return "Accès refusé - Vous n'avez pas les droits nécessaires";
    }
    if (error.response?.status === 400) {
      const detail = error.response.data?.detail;
      return detail || "Données invalides";
    }
    if (error.response?.data) {
      if (typeof error.response.data === "string") return error.response.data;
      if (error.response.data.detail) return error.response.data.detail;
      // Si c'est un objet d'erreurs de champs
      const firstError = Object.values(error.response.data)[0];
      if (Array.isArray(firstError)) return firstError[0];
      if (typeof firstError === "string") return firstError;
    }
    return error.message || "Erreur serveur";
  }
  return error?.message || "Erreur inconnue";
}

// ============================================
// HELPER: Préparer les données utilisateur
// ============================================
function prepareUserPayload(data: any, isCreate: boolean): any {
  const payload: any = {
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    email: data.email || "",
    telephone: data.telephone || "",
    promotion: data.promotion ? parseInt(data.promotion) : null,
  };

  // En création, on génère un username et optionnellement un password
  if (isCreate) {
    payload.username =
      data.username ||
      (data.first_name || "user").toString().replace(/\s+/g, "_").toLowerCase();
    // Ne pas envoyer de password si l'API le gère (généralement elle le crée)
    if (data.password) {
      payload.password = data.password;
    }
  }

  return payload;
}

// ============================================
// PROMOTIONS
// ============================================

export async function getPromotions() {
  try {
    const response = await axios.get("/academique/promotions/");
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getPromotions:", formatError(error));
    throw new Error(formatError(error));
  }
}

// ============================================
// SERVICES COURS
// ============================================

export async function getCours() {
  try {
    const response = await axios.get("/academique/cours/");
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getCours:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function getCour(id: number) {
  try {
    const response = await axios.get(`/academique/cours/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getCours:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function createCours(data: any) {
  try {
    const payload = {
      titre: data.titre || "",
      description: data.description || "",
      encadreurs: data.encadreurs || [],
      promotions: data.promotions || [],
    };
    console.log("📤 Création cours:", payload);
    const response = await axios.post("/academique/cours/", payload);
    console.log("✅ Cours créé:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur createCours:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function updateCours(id: number, data: any) {
  try {
    const payload = {
      titre: data.titre || "",
      description: data.description || "",
      encadreurs: data.encadreurs || [],
      promotions: data.promotions || [],
    };
    console.log("📤 Mise à jour cours:", payload);
    const response = await axios.put(`/academique/cours/${id}/`, payload);
    console.log("✅ Cours mis à jour:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur updateCours:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function deleteCours(id: number) {
  try {
    console.log("📤 Suppression cours:", id);
    await axios.delete(`/academique/cours/${id}/`);
    console.log("✅ Cours supprimé");
    return true;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur deleteCours:", errorMsg);
    throw new Error(errorMsg);
  }
}

// ============================================
// SERVICES ENCADREURS
// ============================================

export async function getEncadreurs() {
  try {
    const response = await axios.get("/academique/encadreurs/");
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getEncadreurs:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function getEncadreur(id: number) {
  try {
    const response = await axios.get(`/academique/encadreurs/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getEncadreur:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function createEncadreur(data: any) {
  try {
    const payload = prepareUserPayload(data, true);
    console.log("📤 Création encadreur:", payload);
    const response = await axios.post("/academique/encadreurs/", payload);
    console.log("✅ Encadreur créé:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur createEncadreur:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function updateEncadreur(id: number, data: any) {
  try {
    const payload = prepareUserPayload(data, false);
    console.log(`📤 Mise à jour encadreur ${id}:`, payload);
    const response = await axios.patch(
      `/academique/encadreurs/${id}/`,
      payload,
    );
    console.log("✅ Encadreur mis à jour:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur updateEncadreur:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function deleteEncadreur(id: number) {
  try {
    console.log(`📤 Suppression encadreur ${id}`);
    await axios.delete(`/academique/encadreurs/${id}/`);
    console.log("✅ Encadreur supprimé");
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur deleteEncadreur:", errorMsg);
    throw new Error(errorMsg);
  }
}

// ============================================
// SERVICES ÉTUDIANTS
// ============================================

export async function getEtudiants() {
  try {
    const response = await axios.get("/academique/etudiants/");
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getEtudiants:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function getEtudiant(id: number) {
  try {
    const response = await axios.get(`/academique/etudiants/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getEtudiant:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function createEtudiant(data: any) {
  try {
    const payload = prepareUserPayload(data, true);
    console.log("📤 Création étudiant:", payload);
    const response = await axios.post("/academique/etudiants/", payload);
    console.log("✅ Étudiant créé:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur createEtudiant:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function updateEtudiant(id: number, data: any) {
  try {
    const payload = prepareUserPayload(data, false);
    console.log(`📤 Mise à jour étudiant ${id}:`, payload);
    const response = await axios.patch(`/academique/etudiants/${id}/`, payload);
    console.log("✅ Étudiant mis à jour:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur updateEtudiant:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function deleteEtudiant(id: number) {
  try {
    console.log(`📤 Suppression étudiant ${id}`);
    await axios.delete(`/academique/etudiants/${id}/`);
    console.log("✅ Étudiant supprimé");
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur deleteEtudiant:", errorMsg);
    throw new Error(errorMsg);
  }
}

// ============================================
// SERVICES COORDONNATEURS
// ============================================

export async function getCoordonateurs() {
  try {
    const response = await axios.get("/academique/coordons/");
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getCoordonateurs:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function getCoordonateur(id: number) {
  try {
    const response = await axios.get(`/academique/coordons/${id}/`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur getCoordonateur:", formatError(error));
    throw new Error(formatError(error));
  }
}

export async function createCoordonateur(data: any) {
  try {
    const payload = prepareUserPayload(data, true);
    console.log("📤 Création coordonnateur:", payload);
    const response = await axios.post("/academique/coordons/", payload);
    console.log("✅ Coordonnateur créé:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur createCoordonateur:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function updateCoordonateur(id: number, data: any) {
  try {
    const payload = prepareUserPayload(data, false);
    console.log(`📤 Mise à jour coordonnateur ${id}:`, payload);
    const response = await axios.patch(`/academique/coordons/${id}/`, payload);
    console.log("✅ Coordonnateur mis à jour:", response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur updateCoordonateur:", errorMsg);
    throw new Error(errorMsg);
  }
}

export async function deleteCoordonateur(id: number) {
  try {
    console.log(`📤 Suppression coordonnateur ${id}`);
    await axios.delete(`/academique/coordons/${id}/`);
    console.log("✅ Coordonnateur supprimé");
  } catch (error: any) {
    const errorMsg = formatError(error);
    console.error("❌ Erreur deleteCoordonateur:", errorMsg);
    throw new Error(errorMsg);
  }
}
