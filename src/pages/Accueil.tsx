import { HomeHeader } from "../components/navigation/HomeHeader.tsx";
import SelectedCategory from "../components/SelectedCategory.tsx";
import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";

const MISSIONS = [
    {
        id: "101",
        title: "Réparation fuite évier",
        date: "Aujourd'hui",
        category: "Plomberie",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop",
        location: "Toulouse",
        author: "Gérard"
    },
    {
        id: "102",
        title: "Installation prise électrique",
        date: "Demain",
        category: "Électricité",
        image: "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=200&auto=format&fit=crop",
        location: "Toulouse",
        author: "Gérard"
    },
    {
        id: "103",
        title: "Peinture chambre 15m²",
        date: "22 Janv.",
        category: "Peinture",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200&auto=format&fit=crop",
        location: "Toulouse",
        author: "Gérard"
    },
];

export default function Accueil() {
    const navigate = useNavigate();

    return (
        <main className="px-6 pb-24 min-h-screen bg-white">
            <HomeHeader />
            <SelectedCategory />

            <div className="flex flex-col gap-y-5">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
                    Missions à proximité
                </h2>

                {MISSIONS.map((mission) => (
                    <div
                        key={mission.id}
                        onClick={() => navigate(`/mission/${mission.id}`)}
                        className="w-full bg-white flex items-center gap-4 py-3 border-b border-gray-100 active:bg-gray-50 transition-colors"
                    >
                        {/* Image Compacte */}
                        <div className="size-20 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                            <img
                                src={mission.image}
                                alt={mission.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Infos condensées */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="font-black text-black text-xs uppercase tracking-tight truncate pr-4">
                                    {mission.title}
                                </h3>
                                <span className="text-[10px] font-black text-indigo-600 shrink-0 uppercase">
                    {mission.date}
                </span>
                            </div>

                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                                {mission.category}
                            </p>

                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                    <IonIcon name="location" className="text-black text-[10px]" />
                                    <span className="text-[10px] font-bold text-gray-500">{mission.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <IonIcon name="person" className="text-black text-[10px]" />
                                    <span className="text-[10px] font-bold text-gray-500">{mission.author}</span>
                                </div>
                            </div>
                        </div>

                        {/* Indicateur discret */}
                        <div className="text-gray-200">
                            <IonIcon name="chevron-forward" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}