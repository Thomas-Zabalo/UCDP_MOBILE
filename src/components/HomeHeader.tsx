import { useFetch } from "../hooks/useFetch.ts";
import { userService } from "../api/services/userService.ts";

export function HomeHeader() {
  const id = localStorage.getItem("user_id");
  const { data: user } = useFetch(() => userService.getById(id || ""), [id]);

  return (
    <header className="pt-6 mb-10">
      <p className="text-black font-black text-5xl uppercase tracking-tighter leading-none transition-colors">
        {user?.prenom} {user?.nom}
      </p>
    </header>
  );
}
