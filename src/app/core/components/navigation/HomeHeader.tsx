import {useFetch} from "../../hooks/useFetch.tsx";
import {userService} from "../../../features/profil/services/userService.ts";

export function HomeHeader() {
    const id_user = localStorage.getItem("user_id");
    const {data: user} = useFetch(() => userService.getById(id_user || ""), [id_user]);

    return (
        <header className="pt-6 mb-10">
            <p className="text-black font-black text-5xl uppercase tracking-tighter leading-none transition-colors">
                {user?.prenom} {user?.nom}
            </p>
        </header>
    );
}
