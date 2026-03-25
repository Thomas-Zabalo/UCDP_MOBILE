import { useNavigate } from "react-router";
import IonIcon from "@reacticons/ionicons";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300 flex flex-col">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="size-11 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition-all text-black dark:text-white"
        >
          <IonIcon name="close" className="text-2xl" />
        </button>
        <h1 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
          Boutique
        </h1>
        <div className="size-11 opacity-0 pointer-events-none" />
      </header>

      <div className="flex-1 flex items-center justify-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">
          Bientôt disponible
        </p>
      </div>
    </div>
  );
}
