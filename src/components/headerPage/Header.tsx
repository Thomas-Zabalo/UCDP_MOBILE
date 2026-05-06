import { NavLink, useLocation } from "react-router";
import IonIcon from "@reacticons/ionicons";
import { useEffect, useState } from "react";
import { mainRoutes } from "../../data/data.ts";

interface HeaderProps {
  title: string;
  showButton: string;
  className?: string;
}

export function Header({ title, showButton, className }: HeaderProps) {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  const prevPath = showButton;

  const showBackButton =
    showButton !== undefined || !mainRoutes.includes(location.pathname);

  console.log("Path de retour :", prevPath);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] w-full px-6 transition-all duration-300 border-b
            ${
              isSticky
                ? "bg-white/80 backdrop-blur-md border-gray-100 pt-14 pb-4"
                : "bg-white border-transparent pt-14 pb-6"
            } ${className ?? ""}`}
    >
      <div className="flex items-center gap-4 h-10">
        {showBackButton && (
          <NavLink
            to={prevPath}
            className="size-10 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center active:scale-90 transition-all text-black shrink-0 shadow-sm"
          >
            <IonIcon name={"chevron-back" as never} className="text-xl" />
          </NavLink>
        )}

        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-black truncate py-2">
          {title}
        </h2>
      </div>
    </header>
  );
}
