import { useState } from "react";
import IonIcon from "@reacticons/ionicons";

export default function OnboardingSlider({ onComplete }: { onComplete: () => void }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const slides = [
        {
            icon: "flash-outline",
            title: "UN COUP DE POUCE",
            description: "La plateforme qui connecte vos besoins en travaux avec les meilleurs prestataires locaux."
        },
        {
            icon: "chatbubbles-outline",
            title: "ÉCHANGEZ SIMPLEMENT",
            description: "Discutez de vos projets, envoyez vos photos et validez vos devis en temps réel."
        },
        {
            icon: "star-outline",
            title: "VOTRE SATISFACTION",
            description: "Des interventions de qualité notées par la communauté pour un travail en toute confiance."
        }
    ];

    // --- LOGIQUE DU SLIDE ---
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;

        // Si on slide vers la gauche (distance positive)
        if (distance > 50 && currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        // Si on slide vers la droite (distance négative)
        if (distance < -50 && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
        setTouchStart(null);
    };
    // ------------------------

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-white z-[100] flex flex-col select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Header */}
            <div className="p-6 flex justify-end">
                <button onClick={onComplete} className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                    Passer
                </button>
            </div>

            {/* Corps (L'icône et le texte changent selon l'index) */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center transition-all duration-500">
                <div key={currentSlide} className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-12 text-black flex justify-center">
                        <IonIcon name={slides[currentSlide].icon as any} style={{ fontSize: '100px' }} />
                    </div>

                    <div className="space-y-4 max-w-xs mx-auto">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">
                            {slides[currentSlide].title}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {slides[currentSlide].description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-8 space-y-8">
                <div className="flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <div key={index} className={`h-1.5 transition-all duration-300 rounded-full ${index === currentSlide ? 'w-10 bg-black' : 'w-2 bg-gray-200'}`} />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all uppercase"
                >
                    {currentSlide === slides.length - 1 ? 'Commencer' : 'Suivant'}
                </button>
            </div>
        </div>
    );
}