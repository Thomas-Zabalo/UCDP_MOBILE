import { NavLink, useLocation } from "react-router";
import { menuItems } from "../../data/menu.ts";
import IonIcon from "@reacticons/ionicons";

export function NavBar() {
    const location = useLocation();

    return (
        <div className="fixed bottom-6 left-0 w-full px-6 z-40">
            <nav className="relative flex items-center bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-gray-100 dark:border-neutral-800 h-20 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-1.5 transition-all duration-300">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="flex-1 h-full flex flex-col items-center justify-center transition-all duration-300 relative"
                    >
                        {({ isActive }) => (
                            <>
                                <div className="h-7 flex items-center justify-center">
                                    <IonIcon
                                        name={isActive ? item.icon : `${item.icon}-outline` as any}
                                        className={`transition-all duration-300 ${
                                            isActive
                                                ? "text-black dark:text-white scale-110"
                                                : "text-gray-300 dark:text-neutral-700"
                                        }`}
                                        style={{ fontSize: item.name === "Créer" ? '28px' : '22px' }}
                                    />
                                </div>

                                <span className={`text-[9px] font-black uppercase tracking-widest mt-1 transition-all duration-300 ${
                                    isActive
                                        ? "text-black dark:text-white opacity-100"
                                        : "text-gray-300 dark:text-neutral-700 opacity-0 h-0" // On cache le texte quand c'est pas actif pour un look plus aérien, ou laisse le si tu préfères
                                }`}>
                                    {isActive ? item.name : ""}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}