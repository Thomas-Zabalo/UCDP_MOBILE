import {NavLink, useLocation} from "react-router";
import {useNavigationStack} from "../../provider/NavigationProvider.tsx";
import IonIcon from "@reacticons/ionicons";
import {useEffect, useState} from "react";
import { mainRoutes } from "../../data/navigationStack.ts";

export function Header({title}: { title: string }) {
    const navStack = useNavigationStack();
    const location = useLocation();
    const prevPath : string = navStack.getPreviousPath();

    const [isSticky, setIsSticky] = useState(false);

    const showBackButton = !mainRoutes.includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`flex items-center gap-2 sticky top-0 z-40 bg-white dark:bg-neutral-950 px-6 transition-all ${
            isSticky ? "py-4 shadow-md" : "py-6"
        }`}>
            {showBackButton && (
                <NavLink
                    to={prevPath}
                    className="p-2 rounded-lg hover:bg-gray-200 transition"
                >
                    <IonIcon name="arrow-back"/>
                </NavLink>
            )}
            <h1 className="text-xl font-bold dark:text-white">{title}</h1>
        </header>
    );
}