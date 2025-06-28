import { useNavigate } from "react-router-dom"
import { loadingContext, projectsContext, userContext } from "../App";
import { useContext } from "react";




export default function Home(){
    const {isLoading} = useContext(loadingContext);
    const {projects} = useContext(projectsContext);
    const {user} = useContext(userContext);
    const navigate = useNavigate();


    const createProject = async () => {
        //if (user)alert(`[debug]${user.id}(${user.access_token}) connected"`);
        const id_url = `${user.id}-${projects.length}`;
        navigate(`/create-project/${id_url}`);
    }

    const browseProjects = () => {
        navigate("/browse-projects");
    }

    const myProjects = () =>{
        
    }



    return(
        <div className="home-page">
        <button className="home-option-buttons"onClick={createProject} disabled={isLoading}>
            {isLoading?`Loading`:`Create Project`}</button>
        <button className="home-option-buttons"onClick={browseProjects} disabled={isLoading}>
            {isLoading?`Loading`:`Browse Projects`}</button>
        <button className="home-option-buttons"onClick={myProjects} disabled={isLoading}>
            {isLoading?`Loading`:`My Projects`}</button> 
        </div>
    )
}

