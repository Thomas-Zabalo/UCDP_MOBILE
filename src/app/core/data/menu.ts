import type {Role} from "../../features/profil/types/user.ts";

export interface MenuItem {
  readonly name: string;
  readonly to: string;
  readonly icon: string;
  readonly roles?: readonly Role[];
}

export const menuItems: readonly MenuItem[] = [
  { name: "Accueil", to: "/", icon: "home", roles: ["CLIENT", "PRESTATAIRE", "ADMIN"] },
  { name: "Messages", to: "/message", icon: "chatbubble-ellipses", roles: ["CLIENT", "PRESTATAIRE", "ADMIN"] },
  { name: "Créer", to: "/new/mission", icon: "add-circle", roles: ["CLIENT", "ADMIN"] },
  { name: "Missions", to: "/candidatures", icon: "clipboard", roles: ["CLIENT", "PRESTATAIRE", "ADMIN"] },
  { name: "Profil", to: "/user", icon: "person", roles: ["CLIENT", "PRESTATAIRE", "ADMIN"] },
] as const;
