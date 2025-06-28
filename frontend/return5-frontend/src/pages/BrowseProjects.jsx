import { useEffect } from "react"
import { projectsContext } from "../App";
import { useContext } from "react";
import axios from "../api/axios";

export const BrowseProjects = () => {
    const {projects, setProjects} = useContext(projectsContext);
    useEffect(() => {
        axios.get('/browse-projects/')
        .then(res => setProjects(res.data))
        .catch(err => console.error('Failed to fetch:', err));
    }, []);

    return(
        <>
            <div className="project-list-area">
                {projects.map(project =>(
                    <div className="project-title" key={project.id}>
                        <h3>{project.project_title}</h3>
                        <p>{project.project_description}</p>
                        <p>Goal: {project.project_goal} WEI</p>
                        <p>Duration: {project.project_duration} days</p>
                        <p>Project Type: {project.funding_type} </p>
                        <button className="view-project-button">View Project</button>
                    </div>   
                ))}
            </div>
        </>
    )
}
