import { useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 1500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-[100]">
            <h1 className="text-black text-6xl font-black tracking-tighter animate-pulse">
                UN COUP DE POUCE
            </h1>
        </div>
    );
}