import type {User} from "../../profil/types/user.ts";

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  mail: string;
  password: string;
}

export interface RegisterFormData {
  nom: string;
  prenom: string;
  mail: string;
  mdp: string;
  telephone: string;
  adresse: string;
  code_postal: string;
  ville: string;
  raison_sociale?: string;
}
