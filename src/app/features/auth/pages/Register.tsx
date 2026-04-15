import {useState} from "react";
import {Link, useNavigate} from "react-router";
import Message from "../../../core/components/Message.tsx";
import IonIcon from "@reacticons/ionicons";
import {authService} from "../services/authService.ts";

export default function Register() {
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

    const listeMetiers = [
        "Plombier",
        "Électricien",
        "Maçon",
        "Peintre",
        "Menuisier",
        "Jardinier",
    ];

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

    const allowedChars = /^[A-Za-z0-9!@#$%^&*()\-_]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_]).{8,}$/;
    const nextStep = () => {
        if (
            !formData.mail.trim() ||
            !formData.mdp.trim() ||
            !formData.confirmMdp.trim()
        ) {
            setMessage({status: 400, message: "Tous les champs sont obligatoires"});
            return;
        }

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
        const roleBDD = userType === "professionnel" ? "PRESTATAIRE" : "CLIENT";

        const dataToSend = {
            ...formData,
            role: roleBDD
        };

        e.preventDefault();
        try {
            const response = await fetch("/local/api/user/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({dataToSend, userType}),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage({
                    status: response.status,
                    message: data.errors[0].message || "Erreur lors de l'inscription",
                });
                return;
            }
            setMessage({status: 200, message: data.message});
            localStorage.setItem("hasToken", data.token);
            localStorage.setItem("user_id", data.user.id_utilisateur);
            localStorage.setItem("status", data.user.role);
            navigate("/");
        } catch (error) {
            console.error(error);
            setMessage({status: 500, message: "Erreur serveur"});
        }
    };

    return (
        <div
            className="fixed inset-0 flex flex-col md:items-center md:justify-center overflow-y-auto transition-colors duration-300">

            {message && <Message data={message}/>}

            <div
                className="w-full md:max-w-xl md:p-12 px-8 pb-8 pt-12 flex flex-col min-h-full md:min-h-0">

            {/* Stepper Progress */}
                <div className="flex gap-2 mb-10">
                    <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? "bg-[#FF791D]" : "bg-gray-100"}`} />
                    <div className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? "bg-[#FF791D]" : "bg-gray-100"}`} />
                </div>

                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase leading-none text-[#FF791D]">
                        {step === 1 ? "Tes accès" : "Tes infos"}
                    </h2>
                    <div className="h-1.5 w-12 bg-[#FF791D] mt-4 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Sélecteur Type Utilisateur */}
                            <div className="grid grid-cols-2 bg-gray-100 p-1.5 rounded-2xl mb-6">
                                <button
                                    type="button"
                                    onClick={() => setUserType("particulier")}
                                    className={`py-3 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 transition-all ${userType === "particulier" ? "bg-white text-[#FF791D] shadow-sm" : "text-gray-400"}`}
                                >
                                    <IonIcon name="person-outline" className="text-lg"/> Particulier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType("professionnel")}
                                    className={`py-3 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 transition-all ${userType === "professionnel" ? "bg-white text-[#FF791D] shadow-sm" : "text-gray-400"}`}
                                >
                                    <IonIcon name="briefcase-outline" className="text-lg"/> Professionnel
                                </button>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF791D] transition-colors">
                                    <IonIcon name="mail-outline" className="text-xl"/>
                                </div>
                                <input
                                    type="email"
                                    placeholder="Adresse email"
                                    className="input-field"
                                    value={formData.mail}
                                    onChange={(e) => setFormData({...formData, mail: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF791D] transition-colors">
                                    <IonIcon name="lock-closed-outline" className="text-xl"/>
                                </div>
                                <input
                                    className="input-field"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.mdp}
                                    onChange={(e) => setFormData({...formData, mdp: e.target.value})}
                                    placeholder="Mot de passe"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-black transition-colors">
                                    <IonIcon name={showPassword ? "eye-off-outline" : "eye-outline"} className="text-xl"/>
                                </button>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF791D] transition-colors">
                                    <IonIcon name="shield-checkmark-outline" className="text-xl"/>
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmer mot de passe"
                                    className="input-field"
                                    value={formData.confirmMdp}
                                    onChange={(e) => setFormData({...formData, confirmMdp: e.target.value})}
                                    required
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-black transition-colors">
                                    <IonIcon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} className="text-xl"/>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={nextStep}
                                className="action tracking-widest active:scale-95 transition-all"
                            >
                                Continuer <IonIcon name="arrow-forward-outline" className="text-lg"/>
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            {userType === "professionnel" ? (
                                <>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF791D] transition-colors">
                                            <IonIcon name="business-outline" className="text-xl"/>
                                        </div>
                                        <input
                                            placeholder="Raison Sociale"
                                            className="input-field"
                                            value={formData.raison_sociale}
                                            onChange={(e) => setFormData({...formData, raison_sociale: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                            Spécialités
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {listeMetiers.map((metier) => (
                                                <button
                                                    key={metier}
                                                    type="button"
                                                    onClick={() => toggleMetier(metier)}
                                                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all border-2 ${
                                                        formData.metiers.includes(metier)
                                                            ? "bg-[#FF791D] text-white border-[#FF791D] shadow-lg shadow-[#FF791D]/20"
                                                            : "bg-transparent border-gray-100 text-gray-400 hover:border-gray-300"
                                                    }`}
                                                >
                                                    {metier}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="Prénom"
                                        className="input-field px-6" // On écrase le padding gauche pour ceux sans icône
                                        style={{paddingLeft: '1.5rem'}}
                                        value={formData.prenom}
                                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                                        required
                                    />
                                    <input
                                        placeholder="Nom"
                                        className="input-field px-6"
                                        style={{paddingLeft: '1.5rem'}}
                                        value={formData.nom}
                                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                        required
                                    />
                                </div>
                            )}

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF791D] transition-colors">
                                    <IonIcon name="call-outline" className="text-xl"/>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Téléphone"
                                    className="input-field"
                                    maxLength={10}
                                    value={formData.telephone}
                                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF791D] transition-colors">
                                    <IonIcon name="location-outline" className="text-xl"/>
                                </div>
                                <input
                                    placeholder="Adresse"
                                    className="input-field"
                                    value={formData.adresse}
                                    onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    placeholder="CP"
                                    className="input-field text-center"
                                    style={{paddingLeft: '1rem', paddingRight: '1rem'}}
                                    value={formData.code_postal}
                                    onChange={(e) => setFormData({...formData, code_postal: e.target.value})}
                                    maxLength={5}
                                    required
                                />
                                <input
                                    placeholder="Ville"
                                    className="input-field col-span-2 px-6"
                                    style={{paddingLeft: '1.5rem'}}
                                    value={formData.ville}
                                    onChange={(e) => setFormData({...formData, ville: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-100 text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-[0.98] transition-all"
                                >
                                    Retour
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] bg-[#FF791D] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#FF791D]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    Finaliser <IonIcon name="checkmark-circle-outline" className="text-xl"/>
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="mt-10 md:mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Déjà inscrit ?{" "}
                        <Link to="/login" className="text-black font-black uppercase ml-1 hover:text-[#FF791D] transition-colors">
                            Connexion
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}