import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Role } from "../../types/user.ts";
import { useFetch } from "../../hooks/useFetch.ts";
import { userService } from "../../api/services/userService.ts";

export const useProfile = () => {
  const navigate = useNavigate();
  const id_user = localStorage.getItem("user_id");
  const role = localStorage.getItem("status");

  const isAdmin = role === Role.ADMIN;
  const isPrestataire = role === Role.PRESTATAIRE;

  const [isProMode, setIsProMode] = useState(isPrestataire && !isAdmin);

  const {
    data: user,
    loading,
    error,
  } = useFetch(() => userService.getById(id_user || ""), [id_user]);

  const displayName = useMemo(() => {
    return user?.nom && user?.prenom
      ? `${user.prenom} ${user.nom}`
      : "Utilisateur";
  }, [user]);

  const initials = useMemo(() => {
    const first = user?.prenom?.[0] || "";
    const last = user?.nom?.[0] || "";
    return (first + last).toUpperCase() || "?";
  }, [user]);

  const handleLogout = () => {
    userService.logout();
  };

  const clearUser = () => {
    localStorage.removeItem("hasToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("status");
    window.location.href = "/login";
  };

  return {
    user,
    loading,
    error,
    id_user,
    isAdmin,
    isProMode,
    setIsProMode,
    displayName,
    initials,
    handleLogout,
    clearUser,
    navigate,
  };
};
