import axios from "@/lib/axios";

interface StatsOverview {
  coordons: number;
  encadreurs: number;
  etudiants: number;
  cours: number;
}

interface EnrollmentData {
  month: string;
  etudiants: number;
  cours: number;
}

interface CoordonInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  telephone: string;
  photo?: string;
}

interface EncadreurInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  telephone: string;
  photo?: string;
}

interface HoraireInfo {
  id: number;
  titre: string;
  date_debut: string;
  date_fin: string;
  lieu: string;
  cours__titre?: string;
  promotion__name?: string;
}

// Récupérer les stats globales
export async function getStatsOverview(): Promise<StatsOverview> {
  try {
    const response = await axios.get("/academique/stats/overview/");
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des stats:", error.message);
    throw error;
  }
}

// Récupérer l'évolution des inscriptions
export async function getEnrollmentTrend(): Promise<{
  etudiants: any[];
  cours: any[];
}> {
  try {
    const response = await axios.get("/academique/stats/enrollment-trend/");
    return response.data;
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération de la tendance:",
      error.message,
    );
    throw error;
  }
}

// Récupérer la liste des coordons
export async function getCoordonsList(
  promotionId?: number,
): Promise<CoordonInfo[]> {
  try {
    const url = promotionId
      ? `/academique/stats/coordons/?promotion_id=${promotionId}`
      : "/academique/stats/coordons/";
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des coordons:",
      error.message,
    );
    throw error;
  }
}

// Récupérer la liste des encadreurs
export async function getEncadreursList(
  promotionId?: number,
): Promise<EncadreurInfo[]> {
  try {
    const url = promotionId
      ? `/academique/stats/encadreurs/?promotion_id=${promotionId}`
      : "/academique/stats/encadreurs/";
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des encadreurs:",
      error.message,
    );
    throw error;
  }
}

// Récupérer les horaires
export async function getHorairesList(
  promotionId?: number,
): Promise<HoraireInfo[]> {
  try {
    const url = promotionId
      ? `/academique/stats/horaires/?promotion_id=${promotionId}`
      : "/academique/stats/horaires/";
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des horaires:",
      error.message,
    );
    throw error;
  }
}
