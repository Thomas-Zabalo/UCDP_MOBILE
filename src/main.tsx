import "./index.css";
import {createRoot} from "react-dom/client";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router";
import Login from "./pages/auth/login/Login.tsx";
import Register from "./pages/auth/register/Register.tsx";
import Home from "./pages/home/Home.tsx";


export default function AppRouter() {
    return (
        <div className="font-montserrat flex flex-col min-h-screen w-full bg-white">
            <main
                className={`flex-1 flex flex-col md:pl-20 transition-all duration-300`}
            >
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Routes>
            </main>
        </div>
    )
}
createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
);
