import {Bell, CirclePoundSterling} from 'lucide-react';
import {NavLink} from "react-router";

export function HomeHeader() {
    const haveNotification = true;
    return (
        <header className="bg-white flex items-center justify-between z-40 mb-8">
            <div>
                <h1 className="text-lg font-bold text-gray-900">
                    Heureux de te revoir,
                </h1>
                <p className="text-indigo-500 font-bold text-xl">Prénom</p>
            </div>

            <div className="flex items-center gap-4">
                <div
                    className="flex items-center gap-2 bg-indigo-600/20 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    <span>+ 10</span>
                    <span><CirclePoundSterling size={12}/></span>
                </div>

                <NavLink
                    to="/notification"
                    className="relative p-2 hover:bg-gray-100 rounded-lg transition"
                >

                    <Bell size={20} strokeWidth={3} className="text-gray-700"/>

                    {haveNotification && (
                        <span className="absolute top-1 right-1 flex size-3">
              <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
                    )}
                </NavLink>
            </div>
        </header>
    );
}