import type { User } from "../types/user";

const getAuthHeaders = () => {
    const token = localStorage.getItem("hasToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const userService = {
    getById: async (id: string): Promise<User> => {
        const response = await fetch(`/local/api/user/${id}`, {
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