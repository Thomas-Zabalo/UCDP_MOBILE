import {useHome} from "./useHome.ts";
import ProjectCard from "../../components/ProjectCard.tsx";
import {HomeHeader} from "../../components/HomeHeader.tsx";

export default function Home() {
    const { missions, loading, goToMissions, goToMissionDetail } = useHome();

    return (
        <main className="min-h-screen bg-white transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 pb-28">

                <div className="py-4 md:py-8">
                    <HomeHeader />
                </div>

                <div className="flex flex-col gap-y-6">
                    {/* Header de section */}
                    <div className="flex justify-between items-end px-1">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            Missions à proximité
                        </h2>
                        <button
                            onClick={goToMissions}
                            className="btn btn-ghost btn-xs text-primary font-black tracking-widest uppercase hover:bg-transparent"
                        >
                            Voir tout
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading ? (
                            [1, 2, 3, 4].map((n) => (
                                <div key={n} className="skeleton w-full h-44 rounded-[32px] bg-gray-100" />
                            ))
                        ) : missions && missions.length > 0 ? (
                            missions.slice(0, 4).map((m) => (
                                <ProjectCard
                                    key={m.id_offre}
                                    title={m.titre}
                                    category={m.metier?.nom || "Mission générale"}
                                    date={new Date(m.date_offre).toLocaleDateString()}
                                    image={null}
                                    infoLeft={m.localisation}
                                    infoRight={`${m.utilisateur.prenom} ${m.utilisateur.nom}`}
                                    isAccepted={m.is_accepted}
                                    onClick={() => goToMissionDetail(m.id_offre)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center opacity-40">
                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral">
                                    Aucune mission disponible
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}