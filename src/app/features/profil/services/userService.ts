import type { User } from "../types/user";

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

const getAuthHeaders = () => {
    const token = localStorage.getItem("hasToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const userService = {
    getById: async (id: string): Promise<User> => {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Utilisateur introuvable");
        return response.json();
    },

    logout: () => {
        localStorage.removeItem("hasToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("status");
        window.location.href = "/login";
    }
};