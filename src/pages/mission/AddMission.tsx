import { useState } from "react";
import IonIcon from "@reacticons/ionicons";

type Step = 1 | 2 | 3;

export default function AddMission() {
    const [step, setStep] = useState<Step>(1);
    const [knowProfession, setKnowProfession] = useState<boolean | null>(null);

    const [formData, setFormData] = useState({
        profession: "",
        title: "",
        description: "",
        location: "",
        budget: "",
        urgent: false,
        images: [] as string[]
    });

    const nextStep = () => setStep((s) => (s + 1) as Step);
    const prevStep = () => setStep((s) => (s - 1) as Step);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setFormData(prev => ({ ...prev, images: [...prev.images, ...filesArray] }));
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev, images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const inputStyle = "w-full bg-gray-50 border border-gray-200 h-14 px-5 rounded-2xl focus:border-black outline-none transition-all text-sm font-medium text-black";

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans relative">

            <header className="px-10 pt-12 pb-6 shrink-0 bg-white">
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-black' : 'bg-gray-100'}`} />
                    ))}
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-black text-center">
                    {step === 1 && "Le Métier"}
                    {step === 2 && "La Mission"}
                    {step === 3 && "Détails"}
                </h1>
            </header>

            {/* Main Content : pb-20 pour laisser de la place à ta Navbar globale */}
            <main className="flex-1 overflow-y-auto px-10 pb-20">

                {/* ÉTAPE 1 */}
                {step === 1 && (
                    <div className="min-h-[50vh] flex flex-col justify-center space-y-6">
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setKnowProfession(true)}
                                className={`p-8 rounded-[32px] border-2 text-center transition-all flex flex-col items-center gap-4 ${knowProfession === true ? 'border-black bg-white shadow-xl' : 'border-gray-100 bg-gray-50'}`}
                            >
                                <div className="size-14 bg-black text-white rounded-3xl flex items-center justify-center">
                                    <IonIcon name="hammer" className="text-2xl" />
                                </div>
                                <span className="block font-black uppercase text-base">Je sais exactement</span>
                            </button>

                            <button
                                onClick={() => setKnowProfession(false)}
                                className={`p-8 rounded-[32px] border-2 text-center transition-all flex flex-col items-center gap-4 ${knowProfession === false ? 'border-black bg-white shadow-xl' : 'border-gray-100 bg-gray-50'}`}
                            >
                                <div className="size-14 bg-gray-200 text-black rounded-3xl flex items-center justify-center">
                                    <IonIcon name="help" className="text-2xl" />
                                </div>
                                <span className="block font-black uppercase text-base">Je ne sais pas trop</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ÉTAPE 2 */}
                {step === 2 && (
                    <div className="space-y-5 py-4">
                        {knowProfession && (
                            <input name="profession" placeholder="Métier recherché" className={inputStyle} value={formData.profession} onChange={handleChange} />
                        )}
                        <input name="title" placeholder="Nom de la mission" className={inputStyle} value={formData.title} onChange={handleChange} />
                        <textarea name="description" placeholder="Description des travaux..." className={`${inputStyle} h-32 py-5 resize-none`} value={formData.description} onChange={handleChange} />

                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2">Photos ({formData.images.length})</p>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
                                        <img src={img} className="w-full h-full object-cover" />
                                        <button onClick={() => removeImage(index)} className="absolute top-1 right-1 size-6 bg-black text-white rounded-full flex items-center justify-center"><IonIcon name="close" /></button>
                                    </div>
                                ))}
                                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer bg-gray-50 hover:border-black transition-colors">
                                    <input type="file" hidden multiple onChange={handleImagesChange} accept="image/*" />
                                    <IonIcon name="add-outline" className="text-2xl text-gray-400" />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* ÉTAPE 3 */}
                {step === 3 && (
                    <div className="space-y-4 py-4">
                        <input name="location" placeholder="Lieu de l'intervention" className={inputStyle} value={formData.location} onChange={handleChange} />
                        <div className="grid grid-cols-2 gap-3">
                            <input name="budget" placeholder="Budget (€)" className={inputStyle} type="number" value={formData.budget} onChange={handleChange} />
                            <button onClick={() => setFormData({...formData, urgent: !formData.urgent})} className={`h-14 rounded-2xl border flex items-center justify-center gap-2 transition-all ${formData.urgent ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                                <IonIcon name="flash" /><span className="text-[10px] font-black uppercase">Urgent</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* BOUTONS DE NAVIGATION (Intégrés au scroll) */}
                { (step > 1 || knowProfession !== null) && (
                    <div className="flex gap-3 mb-10">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="size-16 bg-gray-100 rounded-2xl flex items-center justify-center active:scale-90 transition-all text-black border border-gray-200"
                            >
                                <IonIcon name="arrow-back" className="text-2xl" />
                            </button>
                        )}

                        <button
                            onClick={step < 3 ? nextStep : () => console.log("Final Data:", formData)}
                            className="flex-1 h-16 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-xl shadow-black/10"
                        >
                            {step === 3 ? "Publier la mission" : "Continuer"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}