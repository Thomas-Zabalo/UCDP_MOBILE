import { NavLink } from "react-router";
import IonIcon from "@reacticons/ionicons";
import {useFetch} from "../../hooks/useFetch.tsx";
import {userService} from "../../services/userService.ts";

export function HomeHeader() {
    const haveNotification = true;
    const id_user = localStorage.getItem("user_id");
    const {data: user} = useFetch(() => userService.getById(id_user || ""), [id_user]);

    return (
        <header className="pt-6 mb-10">
            <div className="flex items-center justify-between mb-8">
                <div/>
                <NavLink
                    to="/notification"
                    className="relative size-11 flex items-center justify-center bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-2xl text-black dark:text-white active:scale-90 transition-all"
                >
                    <IonIcon name="notifications-outline" style={{fontSize: "22px"}}/>
                    {haveNotification && (
                        <span className="absolute top-3 right-3 flex size-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative size-2 rounded-full bg-red-500"></span>
            </span>
                    )}
                </NavLink>
            </div>

            {/* Prénom en mode "Statement" */}
            <p className="text-black dark:text-white font-black text-5xl uppercase tracking-tighter leading-none transition-colors">
                {user?.nom} {user?.prenom}
            </p>
        </header>
    );
}
