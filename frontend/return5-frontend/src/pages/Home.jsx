import { useNavigate } from "react-router-dom"
import { loadingContext, noHeaderContext, projectsContext, userContext } from "../App";
import { useContext } from "react";
import Dashboard from '../assets/Dashboard.png';
import Project1 from '../assets/Project1.png';
import Project2 from '../assets/Project2.png';
import Project3 from '../assets/Project3.png';
import Project4 from '../assets/Project4.png';
import Globe from '../assets/Globe.png';
import Lock from '../assets/Lock.png';
import ProfIcon from '../assets/ProfIcon.png';
import CalendarIcon from '../assets/CalendarIcon.png';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Home(){

    const {isLoading} = useContext(loadingContext);
    const {projects} = useContext(projectsContext);
    const {user} = useContext(userContext);
    const { setNoHeaderPage } = useContext(noHeaderContext)
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
        <>
        <Header/>
            <div className="dashboard">
                <img src={Dashboard} className='DashboardPNG'/>
                <p className="introduction">Hello, Leony</p>
                <p className="introduction2">Ready to launch your tech startup?</p>
                <p className="introduction3">Connect your wallet to get started.</p>
                <button className="get-started">Get Started</button>
            </div>
            <div className="overview-title-container">
                My Project Overview
            </div>
            <div className="project1">
                <div className="project-left">
                    <div className="project-text">
                        <p className="project-heading">Heading</p>
                        <p className="project-desc">A subheading for this section, as long or as short as you like</p>
                    </div>
                    <div className="project-overview-buttons">
                        <button className="project-overview-button">Button</button>
                        <button className="project-overview-button2">Secondary Button</button>
                    </div>
                </div>
                <div className="project-right">
                    <img src={Project1} className='Project1PNG'/>
                </div>
            </div>
            <div className="project1">
                <div className="project-left">
                    <img src={Project2} className='Project1PNG'/>
                </div>
                <div className="project-right2">
                    <div className="project-text">
                        <p className="project-heading">Heading</p>
                        <p className="project-desc">A subheading for this section, as long or as short as you like</p>
                    </div>
                    <div className="project-overview-buttons">
                        <button className="project-overview-button">Button</button>
                        <button className="project-overview-button2">Secondary Button</button>
                    </div>
                </div>
            </div>
            <div className="below-overview">
                <div className="below-overview-left">
                    <img src={Project3} className='Project1PNG'/>
                    <p className="below-overview-text1">Subheading</p>
                    <p className="below-overview-text2">Description</p>

                </div>
                <div className="below-overview-right">
                    <img src={Project1} className='ProjectPNG'/>
                    <p className="below-overview-text1">Subheading</p>
                    <p className="below-overview-text2">Description</p>
                    <img src={Project4} className='ProjectPNG'/>
                    <p className="below-overview-text1">Subheading</p>
                    <p className="below-overview-text2">Description</p>
                </div>
            </div>
            <div className="before-footer-text">
                Section Heading
            </div>
            <div className="before-footer">
                <div className="before-footer-left">
                    <div className="before-footer-icon1">
                        <img src={Globe} className='before-footer-icon'/>
                    </div>
                        <div className="before-footer-text2">Subheading</div>
                        <div className="before-footer-text3">Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</div>
                    
                    <div className="before-footer-icon1">
                        <img src={Lock} className='before-footer-icon'/>
                    </div>
                        <div className="before-footer-text2">Subheading</div>
                        <div className="before-footer-text3">Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</div>
                </div>
                <div className="before-footer-right">
                    <div className="before-footer-icon1">
                        <img src={ProfIcon} className='before-footer-icon'/>
                    </div>
                        <div className="before-footer-text2">Subheading</div>
                        <div className="before-footer-text3">Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</div>
                    
                    <div className="before-footer-icon1">
                        <img src={CalendarIcon} className='before-footer-icon'/>
                    </div>
                        <div className="before-footer-text2">Subheading</div>
                        <div className="before-footer-text3">Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</div>   
                </div>
            </div>
            <div className="button-container">
                <button className='top-button'>Back to Top</button>
            </div>
            <Footer/>
        </>

    )
}

