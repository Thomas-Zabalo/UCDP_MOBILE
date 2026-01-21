import {Header} from "../components/navigation/Header.tsx";

export default function MissionDetail() {

    return (
        <div className="min-h-screen bg-white">
            <Header title="Détail de la mission"/>
            <main className="p-6">
                <div className="flex w-full flex-col gap-4">
                    <div className="skeleton h-48 w-full rounded-2xl"></div>

                    <div className="skeleton h-6 w-3/4"></div>

                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-2/3"></div>

                    <div className="flex gap-2 mt-4">
                        <div className="skeleton h-10 w-24 rounded-lg"></div>
                        <div className="skeleton h-10 w-24 rounded-lg"></div>
                        <div className="skeleton h-10 w-24 rounded-lg"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}