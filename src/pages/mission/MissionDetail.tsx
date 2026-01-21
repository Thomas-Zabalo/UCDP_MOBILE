import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";

export default function MissionDetail() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <header className="fixed top-0 left-0 w-full z-50 px-6 pt-12 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="size-12 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl flex items-center justify-center active:scale-90 transition-all shadow-lg pointer-events-auto"
                >
                    <IonIcon name="chevron-back" className="text-2xl text-black" />
                </button>

                <button className="size-12 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl flex items-center justify-center shadow-lg pointer-events-auto">
                    <IonIcon name="share-social-outline" className="text-xl text-black" />
                </button>
            </header>

            <div className="relative w-full h-[40vh] bg-gray-200">
                <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Mission"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
            </div>

            <main className="relative -mt-8 bg-white rounded-t-[32px] px-6 pt-8 pb-32 shadow-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Plomberie • Aujourd'hui
                </p>

                <h1 className="text-3xl font-black text-black uppercase tracking-tighter leading-none mb-6">
                    Réparation fuite évier
                </h1>

                <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                        <IonIcon name="location" className="text-black" />
                        <span className="text-[11px] font-black uppercase">Toulouse</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                        <IonIcon name="person" className="text-black" />
                        <span className="text-[11px] font-black uppercase">Gérard</span>
                    </div>
                </div>

                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-3">Description</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
                    Bonjour, j'ai une fuite importante sous mon évier de cuisine.
                    Le siphon semble bouché et l'eau s'écoule lentement.
                    J'aurais besoin d'une intervention rapide si possible.
                </p>

                <div className="bg-black rounded-[28px] p-6 flex justify-between items-center text-white">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Budget estimé</p>
                        <p className="text-2xl font-black italic">45.00 €</p>
                    </div>
                    <button className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all">
                        Postuler
                    </button>
                </div>
            </main>
        </div>
    );
}