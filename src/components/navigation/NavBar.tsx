import { NavLink, useLocation } from "react-router";
import { menuItems } from "../../data/menu.ts";
import IonIcon from "@reacticons/ionicons";

export function NavBar() {
    const location = useLocation();

    const activeIndex = Math.max(0, menuItems.findIndex(item => item.to === location.pathname));
    const itemWidth = 100 / menuItems.length;

    return (
        <div className="fixed bottom-6 left-0 w-full px-6 z-40">
            <nav className="relative flex items-center bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 h-20 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5 isolate transition-all duration-300">

                {/* Curseur Dynamique (Noir en Light, Blanc en Dark) */}
                <div
                    className="absolute top-1.5 bottom-1.5 left-1.5 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10"
                    style={{
                        width: `calc(${itemWidth}% - 3px)`,
                        transform: `translateX(${activeIndex * 100}%)`
                    }}
                >
                    <div className="w-full h-full bg-black dark:bg-white rounded-[26px] shadow-lg shadow-black/20 dark:shadow-white/10" />
                </div>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="flex-1 h-full flex flex-col items-center justify-center transition-all duration-300"
                    >
                        {({ isActive }) => (
                            <>
                                <div className="h-7 flex items-center justify-center">
                                    <IonIcon
                                        name={isActive ? item.icon : `${item.icon}-outline` as any}
                                        className={`transition-all duration-300 ${
                                            isActive
                                                ? "text-white dark:text-black scale-110"
                                                : "text-gray-400 dark:text-neutral-600 opacity-70"
                                        }`}
                                        style={{ fontSize: item.name === "Créer" ? '26px' : '22px' }}
                                    />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-tighter mt-1 transition-all duration-300 ${
                                    isActive
                                        ? "text-white dark:text-black translate-y-0"
                                        : "text-gray-400 dark:text-neutral-600 opacity-70"
                                }`}>
                                    {item.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}