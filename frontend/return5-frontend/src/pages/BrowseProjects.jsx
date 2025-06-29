import { useEffect } from "react"
import { projectsContext } from "../App";
import { useContext } from "react";
import axios from "../api/axios";
import Project1 from '../assets/Project1.png';
import Project5 from '../assets/Project5.png';
import Header from '../components/header';
import Footer from '../components/footer';


export const BrowseProjects = () => {
    const {projects, setProjects} = useContext(projectsContext);
    useEffect(() => {
        axios.get('/browse-projects/')
        .then(res => setProjects(res.data))
        .catch(err => console.error('Failed to fetch:', err));
    }, []);

    return(
        <>
            <Header/>
            <div className="project-name-container">
                <div className="project-name-left">
                    <img src={Project5} className='Project5PNG'/>
                </div>
                <div className="project-name-right">
                    <div className="project-name-text">Project Name</div>
                    <div className="project-name-subheading">Subheading</div>
                    <div className="project-funding-text">Funding goal + Funding Type</div>
                    <div className="project-description">Body text Body text Body text Body text Body text Body text Body text Body text Body text</div>
                    <button className="see-startup-button">See Startup</button>
                    <div className="additional-details">Text box for additional details or fine print</div>
                </div>
            </div>
            <div className="other-startup-text">Other Startups</div>
            <div className="other-startup-container">
                <div className="startup-row1">
                    <div className="startup">
                        <div className="startup-png"><img src={Project1} className='Project5PNG'/></div>
                        <div className="startup-project-name">Project Name</div>
                        <div className="startup-description">Description of the project</div>
                        <div className="startup-funding">Funding goal + Funding type</div>
                    </div>
                    <div className="startup">
                        <div className="startup-png"><img src={Project1} className='Project5PNG'/></div>
                        <div className="startup-project-name">Project Name</div>
                        <div className="startup-description">Description of the project</div>
                        <div className="startup-funding">Funding goal + Funding type</div>
                    </div>
                    <div className="startup">
                        <div className="startup-png"><img src={Project1} className='Project5PNG'/></div>
                        <div className="startup-project-name">Project Name</div>
                        <div className="startup-description">Description of the project</div>
                        <div className="startup-funding">Funding goal + Funding type</div>
                    </div>
                </div>
                <div className="startup-row1">
                    <div className="startup">
                        <div className="startup-png"><img src={Project1} className='Project5PNG'/></div>
                        <div className="startup-project-name">Project Name</div>
                        <div className="startup-description">Description of the project</div>
                        <div className="startup-funding">Funding goal + Funding type</div>
                    </div>
                    <div className="startup">
                        <div className="startup-png"><img src={Project1} className='Project5PNG'/></div>
                        <div className="startup-project-name">Project Name</div>
                        <div className="startup-description">Description of the project</div>
                        <div className="startup-funding">Funding goal + Funding type</div>
                    </div>
                    <div className="startup">
                        <div className="startup-png"><img src={Project1} className='Project5PNG'/></div>
                        <div className="startup-project-name">Project Name</div>
                        <div className="startup-description">Description of the project</div>
                        <div className="startup-funding">Funding goal + Funding type</div>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className='top-button'>Back to Top</button>
            </div>
            <Footer/>
        </>
    )
}
