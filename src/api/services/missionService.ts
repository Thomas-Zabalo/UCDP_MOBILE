import type { Mission } from "../../types/mission.ts";

const getBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    return "http://10.0.2.2:3000/api";
  }
  return "/local/api";
};

const API_URL = getBaseUrl();
const getAuthHeaders = () => {
  const token = localStorage.getItem("hasToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const missionService = {
  getAll: async (): Promise<Mission[]> => {
    const ville = localStorage.getItem("ville");
    const params = ville ? `?ville=${encodeURIComponent(ville)}` : "";
    const response = await fetch(`${API_URL}/offre${params}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des missions");
    return response.json();
  },

  getById: async (id: string): Promise<Mission> => {
    const response = await fetch(`${API_URL}/offre/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Mission introuvable");
    return response.json();
  },

  create: async (data: Partial<Mission>): Promise<Mission> => {
    const response = await fetch(`${API_URL}/offre/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erreur lors de la création");
    return response.json();
  },
};
