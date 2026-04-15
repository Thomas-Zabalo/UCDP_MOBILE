import type {User} from "../../../types/user.ts";

const getBaseUrl = () => {
    if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
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