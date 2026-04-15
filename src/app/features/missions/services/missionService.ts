import type {Mission} from "../types/mission.ts";

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
        const response = await fetch(`/local/api/offre${params}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des missions");
        return response.json();
    },


    getById: async (id: string): Promise<Mission> => {
        const response = await fetch(`/local/api/offre/${id}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Mission introuvable");
        return response.json();
    },


    create: async (data: Partial<Mission>): Promise<Mission> => {
        const response = await fetch(`/local/api/offre/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erreur lors de la création");
        return response.json();
    },
};