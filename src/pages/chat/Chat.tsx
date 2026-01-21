import { Header } from "../../components/navigation/Header.tsx";
import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";

const DISCUSSIONS = [
    { id: 1, name: "Lucas Bernard", lastMsg: "C'est parfait, à demain !", time: "10:45", unread: 2, img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Marie Durand", lastMsg: "Pouvez-vous m'envoyer le brief ?", time: "Hier", unread: 0, img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Jean Petit", lastMsg: "Merci beaucoup !", time: "Lun", unread: 0, img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Sophie Martin", lastMsg: "Je suis en route pour la mission.", time: "Lun", unread: 0, img: "https://i.pravatar.cc/150?u=4" },
];

export default function Chat() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
            <Header title="Messages" />

            <main className="px-6 pt-2 pb-32">
                <div className="flex flex-col gap-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-neutral-600 mb-2 ml-1">
                        Discussions récentes
                    </p>

                    {DISCUSSIONS.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => navigate(`/message/${chat.id}`)}
                            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-4 rounded-[28px] flex items-center gap-4 active:scale-[0.97] transition-all text-left group"
                        >
                            <div className="relative size-16 shrink-0">
                                <div className="w-full h-full rounded-[20px] overflow-hidden border border-gray-200 dark:border-neutral-700">
                                    <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
                                </div>
                                {chat.unread > 0 && (
                                    <div className="absolute -top-1 -right-1 size-6 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black rounded-full flex items-center justify-center border-4 border-white dark:border-neutral-900 transition-colors">
                                        {chat.unread}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-black text-black dark:text-white text-sm uppercase tracking-tight truncate">
                                        {chat.name}
                                    </h3>
                                    <span className={`text-[9px] font-black uppercase ${chat.unread > 0 ? "text-black dark:text-white" : "text-gray-400 dark:text-neutral-600"}`}>
                                        {chat.time}
                                    </span>
                                </div>

                                <p className={`text-[11px] truncate leading-tight ${chat.unread > 0 ? "font-black text-gray-900 dark:text-neutral-200" : "font-medium text-gray-500 dark:text-neutral-500"}`}>
                                    {chat.lastMsg}
                                </p>
                            </div>

                            <IonIcon name="chevron-forward" className="text-gray-300 dark:text-neutral-700 text-lg group-hover:translate-x-1 transition-transform" />
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}