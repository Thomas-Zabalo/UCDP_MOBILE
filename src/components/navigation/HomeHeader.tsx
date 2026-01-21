import { NavLink } from "react-router";
import IonIcon from "@reacticons/ionicons";

export function HomeHeader() {
    const haveNotification = true;

    return (
        <header className="pt-6 mb-10">
            <div className="flex items-center justify-between mb-8">
                <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-2xl text-[11px] font-black flex items-center gap-2 transition-all shadow-lg dark:shadow-white/5">
                    <span>10.00 €</span>
                    <IonIcon name="wallet-outline" className="text-sm opacity-60"/>
                </div>

                <NavLink
                    to="/notification"
                    className="relative size-11 flex items-center justify-center bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl text-black dark:text-white active:scale-90 transition-all"
                >
                    <IonIcon name="notifications-outline" style={{fontSize: '22px'}}/>
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
                Prénom
            </p>
        </header>
    );
}