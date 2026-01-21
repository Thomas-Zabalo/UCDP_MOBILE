import IonIcon from "@reacticons/ionicons";
import {useState} from "react";

export default function SelectedCategory() {
    const [selectedId, setSelectedId] = useState("1");

    return (
        <div className="w-full relative mb-10">
            <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-2xl py-5 pl-12 pr-10 text-black font-black uppercase text-xs tracking-widest appearance-none outline-none focus:ring-2 focus:ring-black transition-all"
            >
                <option value="1">Toutes les catégories</option>
                <option value="2">Plomberie</option>
                <option value="3">Électricité</option>
                <option value="4">Peinture</option>
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <IonIcon name="chevron-down" />
            </div>
        </div>
    );
}