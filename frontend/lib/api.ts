import axios from "@/lib/axios";

export default async function fetchWithRefresh(url: string, options?: any) {
  try {
    const response = await axios.request({
      url,
      ...options,
    });

    // Retourner une Response-like pour compatibilité
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      json: async () => response.data,
    };
  } catch (error: any) {
    // Si axios lance une erreur (ex: 404, 401, 500), retourner une Response-like d'erreur
    const response = error.response;
    if (response) {
      return {
        ok: false,
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        json: async () => response.data,
      };
    }
    // Erreur réseau/autre
    console.error("Fetch error:", error.message);
    throw error;
  }
}
