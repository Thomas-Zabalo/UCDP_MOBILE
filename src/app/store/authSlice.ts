import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {User} from "../features/profil/types/user.ts";

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem("hasToken"),
    user: null,
    isAuthenticated: !!localStorage.getItem("hasToken"),
};

export const authSlice = createSlice({
    name: '[User]',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string, user: User }>) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;

            // Centralisation du stockage
            localStorage.setItem("hasToken", token);
            localStorage.setItem("user_id", String(user.id_utilisateur));
            localStorage.setItem("status", user.role);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;