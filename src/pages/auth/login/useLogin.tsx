import { useState } from "react";
import { useNavigate } from "react-router";
import {authService} from "../service/authService.ts";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ status: number; message: string } | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        try {
            const data = await authService.login(email, password);

            console.log(data)

            localStorage.setItem("hasToken", data.token);
            localStorage.setItem("user_id", data.user.id_utilisateur);
            localStorage.setItem("status", data.user.role);

            navigate("/");
        } catch (error) {
            const err = error as Error;
            setMessage({ status: 500, message: err.message || "Identifiants invalides" });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        isLoading,
        message,
        handleSubmit
    };
};