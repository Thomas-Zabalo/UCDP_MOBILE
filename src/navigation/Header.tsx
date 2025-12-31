import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";
import { useNavigationStack } from "../context/NavigationContext.tsx";

export function Header({ title }: { title: string }) {
    const navStack = useNavigationStack();

    // On récupère le chemin précédent sans modifier la stack
    const prevPath = navStack.getPreviousPath();

    return (
        <header className="flex items-center gap-2 sticky top-0 z-40 bg-white px-4 py-4 mb-8">
            {prevPath ? (
                <NavLink
                    to={prevPath}
                    className="p-2 rounded-lg hover:bg-gray-200 transition"
                >
                    <ArrowLeft size={24} />
                </NavLink>
            ) : (
                <div className="w-10" />
            )}
            <h1 className="text-xl font-bold">{title}</h1>
        </header>
    );
}