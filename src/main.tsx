import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router';
import './index.css'
import AddMission from "./pages/AddMission.tsx";
import Accueil from "./pages/Accueil.tsx";
import Chat from "./pages/Chat.tsx";
import Profile from "./pages/Profile.tsx";
import Mission from "./pages/Mission.tsx";
import {NavBar} from "./components/navigation/NavBar.tsx";
import Notification from "./pages/Notification.tsx";
import {excludedRoutes} from "./data/excludedRoutes.ts";
import {NavigationProvider} from "./context/NavigationContext.tsx";
import ChatDetail from "./pages/ChatDetail.tsx";
import MissionDetail from "./pages/MissionDetail.tsx";
import {useEffect, useState} from "react";
import SplashScreen from "./pages/SplashScreen.tsx";
import OnboardingSlider from "./pages/OnBoardingSlider.tsx";

export default function AppRouter() {
    const location = useLocation();
    const navigate = useNavigate();

    const [showSplash, setShowSplash] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        localStorage.setItem('hasSeenOnboarding', 'false');
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding') === 'true';
        if (showSplash) {
            return;
        }

        if (!hasSeenOnboarding && !isReady) {
            setShowOnboarding(true);
        } else if (!isReady) {
                        setIsReady(true);
            navigate('/');
        }
    }, [showSplash, isReady, navigate]);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'false');
        setShowOnboarding(false);
        setIsReady(true);
        navigate('/');
    };

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />;
    }

    if (showOnboarding) {
        return <OnboardingSlider onComplete={handleOnboardingComplete} />;
    }

    return (
        <div className="font-montserrat flex flex-col min-h-screen w-full bg-white">
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path="message" element={<Chat/>}/>
                <Route path="message/:id" element={<ChatDetail/>}/>
                <Route path="user" element={<Profile/>}/>
                <Route path="mission" element={<Mission/>}/>
                <Route path="mission/:id" element={<MissionDetail />} />
                <Route path="new/mission" element={<AddMission/>}/>
                <Route path="notification" element={<Notification/>}/>
            </Routes>
            {!excludedRoutes.includes(location.pathname) && <NavBar/>}
        </div>
    );
}


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <NavigationProvider>
            <AppRouter/>
        </NavigationProvider>
    </BrowserRouter>
);

