import IonIcon from "@reacticons/ionicons";
import {NavLink} from "react-router";

export function HomeHeader() {
    const haveNotification = true;

    return (
        <header className="flex flex-col gap-y-8 mb-10">
            <div className="flex items-center justify-end w-full">
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl text-xs font-black shadow-sm">
                        <span>10.00 €</span>
                        <IonIcon name="wallet" className="text-indigo-400"/>
                    </div>

                    <NavLink
                        to="/notification"
                        className="relative p-2.5 text-black transition active:scale-90"
                    >
                        <IonIcon name="notifications" style={{fontSize: '20px'}}/>
                        {haveNotification && (
                            <span className="absolute top-2.5 right-2.5 flex size-2">
                                <span
                                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-indigo-600"></span>
                            </span>
                        )}
                    </NavLink>
                </div>
            </div>

            <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-400 leading-tight">
                    Heureux de te revoir,
                </h1>
                <p className="text-black font-black text-4xl uppercase tracking-tighter">
                    Prénom
                </p>
            </div>
        </header>
    );
}