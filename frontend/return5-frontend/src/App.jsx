
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import LoginPage from "./pages/Login"
import ErrorPage from "./components/errorpage";

export const userContext = createContext();
export const themeContext = createContext();
export const loginStatusContext = createContext();
export const walletContext = createContext();
export const projectsContext = createContext();
export const loadingContext = createContext();

export default function App() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [darkMode, setDarkMode] = useState(false); 
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [latest_project_id, set_latest_project_id] = useState(null);
    const [wallet, setWallet] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    return (
        <loadingContext.Provider value={{isLoading, setIsLoading}}>
        <walletContext.Provider value={{wallet, setWallet}}>
        <loginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
        <themeContext.Provider value={{ darkMode, setDarkMode }}>
        <userContext.Provider value={{ user, setUser }}> 
        <projectsContext.Provider value={{ projects, setProjects, latest_project_id, set_latest_project_id }}>
        {/*-------------------------------------------------------------------------------------------------*/}

            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="sign-account" element={!loginStatus?<LoginPage/>:<Home/>}/>
                {/* Rquires login status */}
            </Routes>

        {/*-------------------------------------------------------------------------------------------------*/}
        </projectsContext.Provider>
        </userContext.Provider>
        </themeContext.Provider>
        </loginStatusContext.Provider>
        </walletContext.Provider>
        </loadingContext.Provider>
    );
}