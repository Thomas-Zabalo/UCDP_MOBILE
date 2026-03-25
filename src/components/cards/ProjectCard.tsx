import IonIcon from "@reacticons/ionicons";

type CardProps = {
    title: string;
    category: string;
    date: string;
    image: string | null;
    infoLeft: string;
    infoRight: string;
    isAccepted?: boolean;
    iconLeft?: string;
    iconRight?: string;
    onClick?: () => void;
};

export default function ProjectCard({
                                        title,
                                        category,
                                        date,
                                        infoLeft,
                                        infoRight,
                                        isAccepted = false,
                                        iconLeft = "location-outline",
                                        iconRight = "person-outline",
                                        onClick,
                                    }: CardProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full bg-gray-50 dark:bg-neutral-900 border p-4 rounded-[28px] flex items-center gap-4 active:scale-[0.97] transition-all text-left shadow-sm ${
                isAccepted
                    ? "border-gray-200 dark:border-neutral-800 opacity-60"
                    : "border-gray-200 dark:border-neutral-800"
            }`}
        >
            <div className="size-20 shrink-0 rounded-[20px] overflow-hidden bg-gray-200 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 relative">
                <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800"
                    className="w-full h-full object-cover"
                    alt=""
                />
                {isAccepted && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <IonIcon name="lock-closed" className="text-white text-lg" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-black text-gray-400 dark:text-neutral-500 uppercase tracking-widest">
                        {category}
                    </p>
                    {isAccepted ? (
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg bg-gray-200 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400">
                            Pourvue
                        </span>
                    ) : (
                        <span className="text-[9px] font-black text-black dark:text-white transition-colors">
                            {date}
                        </span>
                    )}
                </div>

                <h3 className="font-black text-black dark:text-white text-sm uppercase tracking-tight truncate mb-3 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <IonIcon
                            name={iconLeft as any}
                            className="text-black dark:text-white text-xs transition-colors"
                        />
                        <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-500 uppercase transition-colors">
                            {infoLeft}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IonIcon
                            name={iconRight as any}
                            className="text-black dark:text-white text-xs transition-colors"
                        />
                        <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-500 uppercase transition-colors">
                            {infoRight}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}
