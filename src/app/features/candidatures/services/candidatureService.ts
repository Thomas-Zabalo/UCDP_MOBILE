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

const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("hasToken")}`,
});

export const candidatureService = {
    getMine: async () => {
        const response = await fetch(`${API_URL}/candidatures/me`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur de récupération");
        return response.json();
    },

    getByClient: async () => {
        const response = await fetch(`${API_URL}/candidatures/client`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur de récupération");
        return response.json();
    },

    valider: async (id_candidature: number) => {
        const response = await fetch(`${API_URL}/candidatures/${id_candidature}/valider`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la validation");
        return response.json();
    },

    refuser: async (id_candidature: number) => {
        const response = await fetch(`${API_URL}/candidatures/${id_candidature}/refuser`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors du refus");
        return response.json();
    },
};