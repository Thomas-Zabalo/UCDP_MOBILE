import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/auth/login/Login.tsx";
import Register from "./pages/auth/register/Register.tsx";
import Home from "./pages/home/Home.tsx";
import { UnreadMessagesProvider } from "./providers/UnreadMessageProvider.tsx";
import { NavBar } from "./components/Navbar.tsx";
import { useMain } from "./useMain.ts";
import Profile from "./pages/profile/Profile.tsx";
import { NavigationProvider } from "./providers/NavigationProvider.tsx";
import { RGPDPage } from "./pages/legal/RGPD.tsx";
import { TermsPage } from "./pages/legal/Terms.tsx";

export default function AppRouter() {
  const { isExcluded } = useMain();

  return (
    <div className="font-montserrat flex flex-col min-h-screen w-full bg-white">
      {!isExcluded && <NavBar />}
      <main
        className={`flex-1 flex flex-col md:pl-20 transition-all duration-300`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<Profile />} />
          <Route path="/legal/rgpd" element={<RGPDPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
        </Routes>
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UnreadMessagesProvider>
      <NavigationProvider>
        <AppRouter />
      </NavigationProvider>
    </UnreadMessagesProvider>
  </BrowserRouter>,
);
