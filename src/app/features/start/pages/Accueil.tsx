import {useNavigate} from "react-router";
import {useFetch} from "../../../core/hooks/useFetch.tsx";
import {missionService} from "../../missions/services/missionService.ts";
import {HomeHeader} from "../../../core/components/navigation/HomeHeader.tsx";
import type {Mission} from "../../missions/types/mission.ts";
import ProjectCard from "../../../core/components/cards/ProjectCard.tsx";


export default function Accueil() {
    const navigate = useNavigate();

    const { data: missions, loading } = useFetch(
        () => missionService.getAll(),
        []
    );

    return (
        <main className="min-h-screen bg-neutral-50  transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 pb-28">
                <div className="py-4 md:py-8">
                    <HomeHeader />
                </div>
                <div className="flex flex-col gap-y-6">
                    <div className="flex justify-between items-end px-1">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ">
                            Missions à proximité
                        </h2>
                        <button
                            onClick={() => navigate("/missions")}
                            className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors"
                        >
                            Voir tout
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading ? (
                            [1, 2, 3, 4].map((n) => (
                                <div key={n} className="w-full h-44 bg-white rounded-[32px] animate-pulse border border-neutral-100 " />
                            ))
                        ) : missions && missions.length > 0 ? (
                            missions.slice(0, 4).map((m: Mission) => (
                                <ProjectCard
                                    key={m.id_offre}
                                    title={m.titre}
                                    category={m.metier?.nom || "Mission générale"}
                                    date={new Date(m.date_offre).toLocaleDateString()}
                                    image={null}
                                    infoLeft={m.localisation}
                                    infoRight={`${m.utilisateur.prenom} ${m.utilisateur.nom}`}
                                    isAccepted={m.is_accepted}
                                    onClick={() => navigate(`/mission/${m.id_offre}`)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center opacity-40">
                                <p className="text-[10px] font-black uppercase tracking-widest">Aucune mission disponible</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}