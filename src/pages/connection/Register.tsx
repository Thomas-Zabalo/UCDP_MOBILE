import { useState } from "react";
import { Link, useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";

export default function Register() {
    const [step, setStep] = useState(1); // Gère l'étape actuelle
    const [userType, setUserType] = useState<"particulier" | "professionnel">("particulier");

    // États du formulaire
    const [formData, setFormData] = useState({
        nom: "", prenom: "", mail: "", mdp: "", confirmMdp: "",
        telephone: "", adresse: "", code_postal: "", ville: "", raison_sociale: ""
    });

    const navigate = useNavigate();

    // Styles réutilisables
    const inputStyle = "w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 h-14 px-5 rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none text-black dark:text-white";

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'envoi final à ta BDD ici
        navigate("/login");
    };

    return (
        <div className="fixed inset-0 bg-white dark:bg-neutral-950 flex flex-col px-7 pb-8 pt-12 overflow-y-auto transition-colors duration-300">

            <div className="flex gap-2 mb-8">
                <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-black dark:bg-white' : 'bg-gray-100 dark:bg-neutral-800'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-black dark:bg-white' : 'bg-gray-100 dark:bg-neutral-800'}`} />
            </div>

            <div className="mb-8">
                <h2 className="text-4xl font-black tracking-tighter uppercase leading-none text-black dark:text-white">
                    {step === 1 ? "Tes accès" : "Tes infos"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 bg-gray-100 dark:bg-neutral-900 p-1 rounded-2xl mb-4">
                            <button type="button" onClick={() => setUserType("particulier")} className={`py-2 rounded-xl font-bold text-xs uppercase ${userType === "particulier" ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm" : "text-gray-400"}`}>Particulier</button>
                            <button type="button" onClick={() => setUserType("professionnel")} className={`py-2 rounded-xl font-bold text-xs uppercase ${userType === "professionnel" ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm" : "text-gray-400"}`}>Pro</button>
                        </div>

                        <input type="email" placeholder="Adresse email" className={inputStyle} onChange={(e) => setFormData({...formData, mail: e.target.value})} required />
                        <input type="password" placeholder="Mot de passe" className={inputStyle} onChange={(e) => setFormData({...formData, mdp: e.target.value})} required />
                        <input type="password" placeholder="Confirmer mot de passe" className={inputStyle} onChange={(e) => setFormData({...formData, confirmMdp: e.target.value})} required />

                        <button type="button" onClick={nextStep} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase mt-4">Continuer</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        {userType === "professionnel" && (
                            <input placeholder="Raison Sociale" className={inputStyle} onChange={(e) => setFormData({...formData, raison_sociale: e.target.value})} required />
                        )}
                        <div className="grid grid-cols-2 gap-3">
                            <input placeholder="Prénom" className={inputStyle} onChange={(e) => setFormData({...formData, prenom: e.target.value})} required />
                            <input placeholder="Nom" className={inputStyle} onChange={(e) => setFormData({...formData, nom: e.target.value})} required />
                        </div>
                        <input type="tel" placeholder="Téléphone" className={inputStyle} onChange={(e) => setFormData({...formData, telephone: e.target.value})} required />
                        <input placeholder="Adresse" className={inputStyle} onChange={(e) => setFormData({...formData, adresse: e.target.value})} required />
                        <div className="grid grid-cols-3 gap-3">
                            <input type="tel" placeholder="CP" className={inputStyle} onChange={(e) => setFormData({...formData, code_postal: e.target.value})} maxLength={5} required />
                            <input placeholder="Ville" className={`${inputStyle} col-span-2`} onChange={(e) => setFormData({...formData, ville: e.target.value})} required />
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button type="button" onClick={prevStep} className="flex-1 bg-gray-100 dark:bg-neutral-900 text-black dark:text-white py-5 rounded-2xl font-black uppercase">Retour</button>
                            <button type="submit" className="flex-[2] bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase">S'inscrire</button>
                        </div>
                    </div>
                )}
            </form>

            <div className="mt-auto pt-6 text-center">
                <p className="text-gray-400 text-sm">Déjà inscrit ? <Link to="/login" className="text-black dark:text-white font-black uppercase">Connexion</Link></p>
            </div>
        </div>
    );
}