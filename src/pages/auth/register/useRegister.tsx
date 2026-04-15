import { useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../../api/services/authService.ts";
import type { RegisterFormData } from "../../../types/auth.ts";

export const useRegister = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"particulier" | "professionnel">(
    "particulier",
  );
  const [message, setMessage] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    mdp: "",
    confirmMdp: "",
    telephone: "",
    adresse: "",
    code_postal: "",
    ville: "",
    raison_sociale: "",
    metiers: [] as string[],
  });

  const navigate = useNavigate();

  const toggleMetier = (metier: string) => {
    setFormData((prev) => ({
      ...prev,
      metiers: prev.metiers.includes(metier)
        ? prev.metiers.filter((m) => m !== metier)
        : [...prev.metiers, metier],
    }));
  };

  const nextStep = () => {
    if (
      !formData.mail.trim() ||
      !formData.mdp.trim() ||
      !formData.confirmMdp.trim()
    ) {
      setMessage({ status: 400, message: "Tous les champs sont obligatoires" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_]).{8,}$/;
    const allowedChars = /^[A-Za-z0-9!@#$%^&*()\-_]+$/;

    if (!allowedChars.test(formData.mdp)) {
      setMessage({
        status: 400,
        message: "Le mot de passe contient des caractères non autorisés",
      });
      return;
    }

    if (!passwordRegex.test(formData.mdp)) {
      setMessage({
        status: 400,
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial (!@#$%^&*()-_)",
      });
      return;
    }

    if (formData.mdp !== formData.confirmMdp) {
      setMessage({
        status: 400,
        message: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    setMessage(null);
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const roleBDD = userType === "professionnel" ? "PRESTATAIRE" : "CLIENT";

    const bodyPayload: RegisterFormData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.mail,
      password: formData.mdp,
      telephone: formData.telephone,
      adresse: formData.adresse,
      code_postal: formData.code_postal,
      ville: formData.ville,
      raison_sociale:
        userType === "professionnel" ? formData.raison_sociale : undefined,
      role: roleBDD,
    };

    if (userType === "professionnel") {
      bodyPayload.metiers = formData.metiers;
    }

    try {
      const data = await authService.register(bodyPayload);

      localStorage.setItem("hasToken", data.token);
      localStorage.setItem("user_id", data.user.id_utilisateur);
      localStorage.setItem("status", data.user.role);

      navigate("/");
    } catch (error) {
      const err = error as Error;
      setMessage({ status: 500, message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    userType,
    setUserType,
    message,
    setMessage,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    formData,
    setFormData,
    toggleMetier,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
