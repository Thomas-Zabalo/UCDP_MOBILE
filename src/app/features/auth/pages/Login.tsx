import {useState} from "react";
import {Link, useNavigate} from "react-router";
import IonIcon from "@reacticons/ionicons";
import Message from "../../../core/components/Message.tsx";
import {authService} from "../services/authService.ts";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/authSlice';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        status: number;
        message: string;
    } | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        try {
            const data = await authService.login(email, password);

            localStorage.setItem("hasToken", data.token);
            localStorage.setItem("user_id", data.user.id_utilisateur);
            localStorage.setItem("status", data.user.role);

            dispatch(setCredentials({
                token: data.token,
                user: data.user
            }));

            navigate("/");
        } catch (error) {
            const err = error as Error;
            setMessage({ status: 500, message: err.message || "Identifiants invalides" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex flex-col md:items-center md:justify-center overflow-y-auto transition-colors duration-300">

            {message && <Message data={message}/>}

            <div
                className="w-full md:max-w-xl md:p-12 px-8 pb-8 pt-12 flex flex-col min-h-full md:min-h-0">

                <div className="mb-10">
                    <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase leading-none text-[#FF791D]">
                        Bon retour <br/> parmi nous
                    </h2>
                    <div className="h-2 w-16 bg-[#FF791D] mt-4 rounded-full transition-all"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon name="mail-outline"
                                         className="text-xl text-gray-400 group-focus-within:text-[#FF791D] transition-colors"/>
                            </div>
                            <input
                                className="input-field"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <IonIcon
                                    name="lock-closed-outline"
                                    className="text-xl text-gray-400 group-focus-within:text-[#FF791D] transition-colors"
                                />
                            </div>
                            <input
                                className="input-field"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Mot de passe"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-5 flex items-center text-gray-400 text-xl hover:text-black transition-colors"
                            >
                                <IonIcon name={showPassword ? "eye-off-outline" : "eye-outline"}/>
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity"
                        >
                            Oublié ?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="action tracking-widest active:scale-95 transition-all"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Connexion...</span>
                        ) : (
                            "Se connecter"
                        )}
                    </button>
                </form>

                <div className="mt-12 md:mt-8 pt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        Pas de compte ?{" "}
                        <Link
                            to="/register"
                            className="text-black font-black uppercase ml-1 hover:text-[#FF791D] transition-colors"
                        >
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}