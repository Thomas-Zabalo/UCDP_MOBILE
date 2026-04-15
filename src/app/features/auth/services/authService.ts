import type {AuthResponse, RegisterFormData} from "../types/auth.ts";

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch("/local/api/user/login", {
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