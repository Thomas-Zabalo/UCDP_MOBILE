import { Link } from "react-router";
import IonIcon from "@reacticons/ionicons";
import {useLogin} from "./useLogin";

export default function Login() {
    const {
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        isLoading,
        handleSubmit
    } = useLogin();

    return (
        <div className="fixed inset-0 flex flex-col md:items-center md:justify-center overflow-y-auto bg-base-100">
            <div className="w-full md:max-w-xl md:p-12 px-8 pb-8 pt-12 flex flex-col min-h-full md:min-h-0">
                <div className="mb-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-primary">
                        Bon retour <br/> parmi nous
                    </h2>
                    <div className="h-2 w-16 bg-primary mt-4 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        {/* Email Input avec DaisyUI */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-primary transition-colors">
                                <IonIcon name="mail-outline" className="text-xl"/>
                            </div>
                            <input
                                className="input input-bordered w-full pl-14 h-14 bg-base-200"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-primary">
                                <IonIcon name="lock-closed-outline" className="text-xl"/>
                            </div>
                            <input
                                className="input input-bordered w-full pl-14 h-14 bg-base-200"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mot de passe"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-primary"
                            >
                                <IonIcon name={showPassword ? "eye-off-outline" : "eye-outline"} className="text-xl"/>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full text-white tracking-widest uppercase font-bold"
                    >
                        {isLoading ? <span className="loading loading-spinner"></span> : "Se connecter"}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        Pas de compte ?
                        <Link to="/register" className="link link-primary font-black uppercase ml-1">
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}