
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import LoginPage from "./pages/Login"
import ErrorPage from "./components/errorpage";
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
export const chatbotContext = createContext();


export default function App() {
    return (
        <>
        {/*-------------------------------------------------------------------------------------------------*/}
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
        </>

    );
}