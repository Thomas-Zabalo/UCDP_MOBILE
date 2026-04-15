import { useState } from "react";
import { useMemo } from "react";
import IonIcon from "@reacticons/ionicons";
import { Role } from "../types/user";
import {useFetch} from "../../../core/hooks/useFetch.tsx";
import {userService} from "../services/userService.ts";
import {Header} from "../../../core/components/navigation/Header.tsx";

export default function Profile() {

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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="relative size-16">
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !id_user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50  p-10 text-center">
        <div className="space-y-4">
          <IonIcon
            name="alert-circle-outline"
            className="text-5xl text-red-500"
          />
          <p className="text-sm font-black uppercase tracking-tighter text-neutral-800 ">
            Session expirée ou introuvable
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-[10px] font-bold uppercase tracking-widest text-indigo-500"
          >
            Retour au login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <Header title="Mon Profil" />

      <main className="px-6 py-4 pb-32">
        {isAdmin && (
          <div className="mb-10 bg-gray-100  p-1.5 rounded-[24px] flex items-center relative h-14 border border-neutral-200 ">
            <div
              className={`absolute h-[44px] w-[calc(50%-6px)] bg-black  rounded-[18px] transition-transform duration-300 ease-out ${isProMode ? "translate-x-[calc(100%+0px)]" : "translate-x-0"}`}
            />
            <button
              onClick={() => setIsProMode(false)}
              className={`flex-1 relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${!isProMode ? "text-white " : "text-gray-400"}`}
            >
              Vue Client
            </button>
            <button
              onClick={() => setIsProMode(true)}
              className={`flex-1 relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors ${isProMode ? "text-white " : "text-gray-400"}`}
            >
              Vue Pro
            </button>
          </div>
        )}

        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="size-28 rounded-[32px] overflow-hidden border border-gray-100  p-1.5 bg-gray-50  shadow-sm flex items-center justify-center text-3xl font-black text-black ">
              {initials}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-black  text-white  size-10 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white active:scale-90 transition-all">
              <IonIcon name="camera" style={{ fontSize: "18px" }} />
            </button>
          </div>
          <h2 className="mt-6 text-2xl font-black text-black  uppercase tracking-tighter text-center">
            {displayName}
          </h2>
          <p className="text-[10px] font-black text-gray-400  uppercase tracking-[0.2em] mt-1">
            {isProMode ? user?.raison_sociale : "Client Particulier"}
          </p>
        </div>

        <div className="flex flex-col gap-y-3">
          <h3 className="text-[10px] font-black text-gray-400  uppercase tracking-[0.2em] ml-2 mb-2">
            Coordonnées
          </h3>
          <InfoRow icon="mail-outline" label="E-mail" value={user?.mail} />
          <InfoRow
            icon="call-outline"
            label="Téléphone"
            value={user?.telephone.toString()}
          />
          <InfoRow
            icon="location-outline"
            label="Localisation"
            value={`${user?.ville}, ${user?.code_postal}`}
          />
          {isProMode && (
            <InfoRow
              icon="business-outline"
              label="Entreprise"
              value={user?.raison_sociale}
            />
          )}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full p-5 mt-6 bg-red-50  border border-red-100 text-red-600  rounded-[24px] font-black uppercase text-[11px] tracking-widest transition active:scale-95 hover:bg-red-100 "
          >
            <IonIcon name="log-out" style={{ fontSize: "20px" }} />
            <span>Déconnexion</span>
          </button>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-10 rounded-2xl bg-white  border border-gray-100  flex items-center justify-center text-black shadow-sm shrink-0">
        <IonIcon name={icon as never} style={{ fontSize: "18px" }} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] font-black text-gray-400  uppercase tracking-widest leading-none mb-1">
          {label}
        </span>
        <span className="text-[14px] font-bold text-black truncate">
          {value || "Non renseigné"}
        </span>
      </div>
    </div>
  );
}
