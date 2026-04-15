import { useState } from "react";
import { useNavigate } from "react-router";

export const useRegister = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<"particulier" | "professionnel">("particulier");
    const [message, setMessage] = useState<{ status: number; message: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        nom: "", prenom: "", email: "", password: "", confirmMdp: "",
        telephone: "", adresse: "", code_postal: "", ville: "",
        raison_sociale: "", metiers: [] as string[],
    });

    //TODO: Remplacer par l'appel de webService sur les métiers
    const listeMetiers = ["Plombier", "Électricien", "Maçon", "Peintre", "Menuisier", "Jardinier"];

    const getBaseUrl = () => {
        if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
            return "http://10.0.2.2:3000/api";
        }
        return "/local/api";
    };

    const toggleMetier = (metier: string) => {
        setFormData((prev) => ({
            ...prev,
            metiers: prev.metiers.includes(metier)
                ? prev.metiers.filter((m) => m !== metier)
                : [...prev.metiers, metier],
        }));
    };

    const nextStep = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*().\-_]).{8,}$/;
        if (!formData.email.trim() || !formData.password.trim()) {
            setMessage({ status: 400, message: "Tous les champs sont obligatoires" });
            return;
        }
        if (!passwordRegex.test(formData.password)) {
            setMessage({ status: 400, message: "Mot de passe trop faible (8 car., 1 Maj, 1 Spécial)" });
            return;
        }
        if (formData.password !== formData.confirmMdp) {
            setMessage({ status: 400, message: "Les mots de passe ne correspondent pas" });
            return;
        }
        setMessage(null);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const bodyToPost = {
            ...formData,
            raison_sociale: formData.raison_sociale || null,
            role: userType === "professionnel" ? "PRESTATAIRE" : "CLIENT"
        };

        try {
            const response = await fetch(`${getBaseUrl()}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyToPost),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage({ status: response.status, message: data.message || "Erreur" });
                return;
            }
            localStorage.setItem("hasToken", data.token);
            localStorage.setItem("user_id", data.user.id);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("status", data.user.role);

            navigate("/");
        } catch (error) {
            setMessage({ status: 500, message: "Erreur serveur" });
        }
    };

    return {
        step, setStep, userType, setUserType, message, setMessage,
        showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword,
        formData, setFormData, listeMetiers, toggleMetier, nextStep, handleSubmit
    };
};