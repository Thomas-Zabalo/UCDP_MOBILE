import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router';
import './index.css'
import AddMission from "./pages/AddMission.tsx";
import Accueil from "./pages/Accueil.tsx";
import Message from "./pages/Message.tsx";
import Profil from "./pages/Profil.tsx";
import Mission from "./pages/Mission.tsx";
import {NavBar} from "./navigation/NavBar.tsx";
import Notification from "./pages/Notification.tsx";
import {excludedRoutes} from "./data/excludedRoutes.ts";
import {NavigationProvider} from "./context/NavigationContext.tsx";

export default function AppRouter() {
    const location = useLocation();

    return (
        <div className="font-montserrat flex flex-col h-screen w-screen bg-white overflow-hidden">
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path="message" element={<Message/>}/>
                <Route path="user" element={<Profil/>}/>
                <Route path="mission" element={<Mission/>}/>
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

