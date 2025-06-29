
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import LoginPage from "./pages/Login"
import ErrorPage from "./components/errorpage";
import Header from "./components/header";
import CreateProject from "./pages/createProject";
import RouteLock from "./components/routelock";
import Home from "./pages/Home";
import { BrowseProjects } from "./pages/BrowseProjects";
import { LandingPage } from "./pages/LandingPage";

export const userContext = createContext();
export const themeContext = createContext();
export const loginStatusContext = createContext();
export const walletContext = createContext();
export const projectsContext = createContext();
export const loadingContext = createContext();
export const userProjectsContext = createContext();
export const noHeaderContext = createContext();


export default function App() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [darkMode, setDarkMode] = useState(false); 
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [wallet, setWallet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noHeaderPage, setNoHeaderPage] = useState(false);

    return (
        <noHeaderContext.Provider value = {{noHeaderPage, setNoHeaderPage}}>
        <userProjectsContext.Provider value = {{userProjects, setUserProjects}}>
        <loadingContext.Provider value={{isLoading, setIsLoading}}>
        <walletContext.Provider value={{wallet, setWallet}}>
        <loginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
        <themeContext.Provider value={{ darkMode, setDarkMode }}>
        <userContext.Provider value={{ user, setUser }}> 
        <projectsContext.Provider value={{ projects, setProjects}}>
        {/*-------------------------------------------------------------------------------------------------*/}
            {loginStatus && !noHeaderPage && <Header/>}
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                {/* Rquires login status */}
                <Route path="/home" element = {<RouteLock><Home/></RouteLock>}/>
                <Route path="/create-project/:projectRouteId" element={<RouteLock><CreateProject/></RouteLock>}/>
                <Route path="/browse-projects" element={<BrowseProjects/>}/>
            </Routes>
        {/*-------------------------------------------------------------------------------------------------*/}
        </projectsContext.Provider>
        </userContext.Provider>
        </themeContext.Provider>
        </loginStatusContext.Provider>
        </walletContext.Provider>
        </loadingContext.Provider>
        </userProjectsContext.Provider>
        </noHeaderContext.Provider>

    );
}