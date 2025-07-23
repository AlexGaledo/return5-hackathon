import { useState } from "react";
import App from "../App"
import Header from "./header";
import Footer from "./footer";
import { noHeaderContext,projectsContext,userContext,themeContext, userProjectsContext, walletContext, loginStatusContext, loadingContext, chatbotContext } from "../App";

export const Wrapper = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [darkMode, setDarkMode] = useState(false); 
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [wallet, setWallet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noHeaderPage, setNoHeaderPage] = useState(false);
    const [chatbotActive, setChatbotActive] = useState(false);
    
    return(
        <chatbotContext.Provider value={{chatbotActive, setChatbotActive}}>
        <noHeaderContext.Provider value = {{noHeaderPage, setNoHeaderPage}}>
        <userProjectsContext.Provider value = {{userProjects, setUserProjects}}>
        <loadingContext.Provider value={{isLoading, setIsLoading}}>
        <walletContext.Provider value={{wallet, setWallet}}>
        <loginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
        <themeContext.Provider value={{ darkMode, setDarkMode }}>
        <userContext.Provider value={{ user, setUser }}> 
        <projectsContext.Provider value={{ projects, setProjects}}>
            {loginStatus && !noHeaderPage && <Header/>}
                <App/>
            <Footer/>
        </projectsContext.Provider>
        </userContext.Provider>
        </themeContext.Provider>
        </loginStatusContext.Provider>
        </walletContext.Provider>
        </loadingContext.Provider>
        </userProjectsContext.Provider>
        </noHeaderContext.Provider>
        </chatbotContext.Provider>

        
    );
}



