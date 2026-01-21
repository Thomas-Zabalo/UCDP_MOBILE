import {Header} from "../components/navigation/Header.tsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import Loader from "../components/Loader.tsx";

const DISCUSSIONS = [
    {
        id: 1,
        name: "Lucas Bernard",
        lastMsg: "C'est parfait, à demain !",
        time: "10:45",
        unread: 2,
        img: "https://i.pravatar.cc/150?u=1"
    },
    {
        id: 2,
        name: "Marie Durand",
        lastMsg: "Pouvez-vous m'envoyer le brief ?",
        time: "Hier",
        unread: 0,
        img: "https://i.pravatar.cc/150?u=2"
    },
    {
        id: 3,
        name: "Jean Petit",
        lastMsg: "Merci beaucoup !",
        time: "Lun",
        unread: 0,
        img: "https://i.pravatar.cc/150?u=3"
    }, {
        id: 4,
        name: "Jean Petit",
        lastMsg: "Merci beaucoup !",
        time: "Lun",
        unread: 0,
        img: "https://i.pravatar.cc/150?u=3"
    },
];

export default function Chat() {
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && (
                <Loader/>
            )}

            {!loading && (
                <>
                    <Header title="Messages"/>
                    <main className="px-6 py-10 pb-24">
                        <div className="flex flex-col gap-y-10">
                            {DISCUSSIONS.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => navigate(`/message/${chat.id}`)}
                                        className="w-full max-w-sm mx-auto rounded-xl cursor-pointer active:scale-95 transition-all"
                                    >
                                        <div className="flex items-center w-full gap-4">

                                            <div className="skeleton size-14 shrink-0 rounded-full"></div>

                                            <div className="flex-1 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="skeleton h-4 w-24 rounded"></div>
                                                    <div className="skeleton h-3 w-10 rounded"></div>
                                                </div>
                                                <div className="skeleton h-3 w-full rounded"></div>
                                                <div className="skeleton h-3 w-3/4 rounded"></div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </main>
                </>
            )}
        </>
    );
}