import type {Metier} from "../types/metier.ts";
const getBaseUrl = () => {
    // Si on est sur l'émulateur Android, on vise l'IP magique
    // On peut détecter l'environnement mobile via l'URL (si ce n'est pas localhost)
    if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
        return "http://10.0.2.2:3000/api";
    }
    // Sinon, on garde ton proxy Vite pour le développement sur navigateur PC
    return "/local/api";
};

const API_URL = getBaseUrl();
export const metierService = {
    getAll: async (): Promise<Metier[]> => {
        const response = await fetch(`${API_URL}/metier`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des métiers");
        return response.json();
    }
}