import type {AuthResponse, RegisterFormData} from "../types/auth.ts";

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

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur lors de la connexion");
        }

        return data;
    },

    logout: () => {
        localStorage.removeItem("hasToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("status");
        window.location.href = "/login";
    },

    register: async (
        formData: RegisterFormData,
        userType: string,
    ): Promise<AuthResponse> => {
        const response = await fetch("/local/api/user/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({formData, userType}),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erreur lors de l'inscription");
        }
        return response.json();
    },
}