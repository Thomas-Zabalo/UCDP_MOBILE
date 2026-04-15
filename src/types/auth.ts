import type {User} from "./user.ts";

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterFormData {
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe:string;
    telephone: string;
    adresse: string;
    code_postal: string;
    ville: string;
    raison_sociale?: string;
}