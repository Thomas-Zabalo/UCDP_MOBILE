import { Home, User, BadgePlus, Clipboard, MessageCircle } from "lucide-react";

export const menuItems = [
    { name: "Accueil", to: "/", icon: Home },
    { name: "Messages", to: "/message", icon: MessageCircle },
    { name: "Ajouter une mission", to: "new/mission", icon: BadgePlus },
    { name: "Missions", to: "/mission", icon: Clipboard },
    { name: "Profil", to: "/user", icon: User },
];