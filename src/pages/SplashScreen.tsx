import {useEffect} from "react";

export default function SplashScreen({onComplete}: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 1500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className="fixed inset-0 bg-white dark:bg-neutral-950 flex items-center justify-center z-[100] transition-colors duration-500">
            <div className="flex flex-col items-start">
                <h1 className="text-black dark:text-white text-6xl font-black">
                    UN COUP DE POUCE
                </h1>

                <div className="mt-8 w-12 h-[2px] bg-gray-100 dark:bg-neutral-800 overflow-hidden rounded-full">
                    <div className="w-full h-full bg-black dark:bg-white origin-left animate-progress"/>
                </div>
            </div>
        </div>
    );
}