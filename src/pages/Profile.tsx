import {Header} from "../components/navigation/Header.tsx";
import IonIcon from "@reacticons/ionicons";

export default function Profile() {
    return (
        <div className="min-h-screen bg-white">
            <Header title="Mon Profil"/>

            <main className="px-6 py-4 pb-28">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <img
                            src="https://i.pravatar.cc/150?u=myprofile"
                            alt="Avatar"
                            className="size-24 rounded-full border-4 border-indigo-500/10 object-cover"
                        />
                        <button
                            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                            <IonIcon name="camera" style={{fontSize: '16px'}}/>
                        </button>
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Prénom Nom</h2>
                    <p className="text-gray-500">Membre depuis Janvier 2026</p>
                </div>

                {/* 2. Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-indigo-500/10 p-4 rounded-2xl text-center">
                        <span className="block text-2xl font-black text-indigo-600">12</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Missions</span>
                    </div>
                    <div className="bg-indigo-500/10 p-4 rounded-2xl text-center">
                        <span className="block text-2xl font-black text-indigo-600">4.9</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Note</span>
                    </div>
                </div>

                {/* 3. Menu Actions */}
                <div className="flex flex-col gap-y-3">
                    <h3 className="text-sm font-bold text-gray-400 uppercase ml-2 mb-1">Paramètres</h3>

                    <MenuButton icon="person" label="Informations personnelles"/>
                    <MenuButton icon="wallet" label="Mode de paiement"/>
                    <MenuButton icon="shield-checkmark" label="Sécurité"/>
                    <MenuButton icon="help-circle" label="Centre d'aide"/>

                    <button
                        className="flex items-center gap-4 w-full p-4 mt-4 bg-red-50 text-red-600 rounded-2xl font-bold transition active:scale-95">
                        <IonIcon name="log-out" style={{fontSize: '20px'}}/>
                        <span>Déconnexion</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

// Sous-composant pour les boutons du menu
function MenuButton({icon, label}: { icon: string, label: string }) {
    return (
        <button
            className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-indigo-50 rounded-2xl transition-all active:scale-[0.98] group">
            <div className="flex items-center gap-4">
                <div
                    className="bg-white p-2 rounded-lg shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <IonIcon name={icon as any} style={{fontSize: '20px'}}/>
                </div>
                <span className="font-bold text-gray-700">{label}</span>
            </div>
            <IonIcon name="chevron-forward" className="text-gray-300"/>
        </button>
    );
}