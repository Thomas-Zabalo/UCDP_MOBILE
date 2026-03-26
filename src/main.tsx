import "./index.css";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { useState } from "react";
import { excludedRoutes } from "./app/core/data/excludedRoutes.ts";
import { NavigationProvider } from "./app/providers/NavigationProvider.tsx";
import { ThemeProvider } from "./app/providers/ThemeProvider.tsx";
import { UnreadMessagesProvider } from "./app/providers/UnreadMessagesProvider.tsx";
import ProtectedRoute from "./app/routes/ProtectedRoutes.tsx";
import Candidatures from "./app/features/candidatures/pages/Candidature.tsx";
import AddMission from "./app/features/missions/pages/AddMission.tsx";
import MissionDetail from "./app/features/missions/pages/MissionDetail.tsx";
import AllMission from "./app/features/missions/pages/AllMission.tsx";
import Profile from "./app/features/profil/pages/Profile.tsx";
import ChatDetail from "./app/features/messagerie/pages/ChatDetail.tsx";
import ChatIndex from "./app/features/messagerie/pages/ChatIndex.tsx";
import Layout from "./app/features/messagerie/pages/Layout.tsx";
import Register from "./app/features/auth/pages/Register.tsx";
import Login from "./app/features/auth/pages/Login.tsx";
import SplashScreen from "./app/features/start/pages/SplashScreen.tsx";
import OnboardingSlider from "./app/features/start/pages/OnBoardingSlider.tsx";
import {NavBar} from "./app/core/components/navigation/NavBar.tsx";
import Accueil from "./app/features/start/pages/Accueil.tsx";

export default function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleSplashComplete = () => {
    const hasToken = localStorage.getItem("hasToken");
    const hasSeenOnboarding =
      localStorage.getItem("hasSeenOnboarding") === "true";

    setShowSplash(false);

    if (hasToken) {
      setShowOnboarding(false);
      navigate("/");
    } else if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    } else {
      navigate("/login");
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
    navigate("/login");
  };

  const isExcluded = excludedRoutes.some((route) => {
    if (window.innerWidth <= 768 && route.includes(":id")) {
      const baseRoute = route.replace("/:id", "");
      return (
        location.pathname.startsWith(baseRoute) &&
        location.pathname !== baseRoute
      );
    }
    return location.pathname === route;
  });

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showOnboarding) {
    return <OnboardingSlider onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="font-montserrat flex flex-col min-h-screen w-full bg-white">
      {!isExcluded && <NavBar />}
      <main
        className={`flex-1 flex flex-col ${!isExcluded ? "md:pl-20" : ""} transition-all duration-300`}
      >
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Accueil />} />
            <Route path="/message" element={<Layout />}>
              <Route index element={<ChatIndex />} />
              <Route path=":id" element={<ChatDetail />} />
            </Route>
            <Route path="user" element={<Profile />} />
            <Route path="missions" element={<AllMission />} />
            <Route path="mission/:id" element={<MissionDetail />} />
            <Route path="new/mission" element={<AddMission />} />
            <Route path="candidatures" element={<Candidatures />} />
          </Route>

        </Routes>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <NavigationProvider>
        <UnreadMessagesProvider>
          <AppRouter />
        </UnreadMessagesProvider>
      </NavigationProvider>
    </BrowserRouter>
  </ThemeProvider>,
);
