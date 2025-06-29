import Computer from '../assets/Computer.png';
import ByteBuddy from '../assets/ByteBuddy.png';
import RainCheck from '../assets/RainCheck.png';
import TaglishAI from '../assets/TaglishAI.png';
import BuildStartup from '../assets/BuildStartup.png';
import Funds from '../assets/Funds.png';
import Startup from '../assets/Startup.png';
import Avatar1 from '../assets/Avatar1.png';
import Avatar2 from '../assets/Avatar2.png';
import Avatar3 from '../assets/Avatar3.png';
import Header from '../components/header';
import Footer from '../components/footer';
export const LandingPage = () =>{
  return(
    <>
    <Header/>
    <div className="title-container">
      <p className="title">Launch Your Tech Startup</p>
      <p className="title2">with Confidence</p>
      <p className="title3">Learn. Build. Launch.</p>
      <button className="start-project-button">Start a Project</button>
    </div>

    <div className="image1-container">
       <img src={Computer} className='ComputerPNG'/>
    </div>

    <div className="explore-container">
      <p>Explore Startups</p>
      <div className="see-more-container">
        <p>See More</p>
      </div>
    </div>

    <div className="sample-startup-container">
      <div className="sample">
        <img src={RainCheck} className='SamplePNG'/>
        <h1 className='sample-title'>RainCheck</h1>
        <p className='sample-text'>Uses local weather data to trigger productivity reminders a...</p>
      </div>
      <div className="sample">
        <img src={ByteBuddy} className='SamplePNG'/>
        <h1 className='sample-title'>ByteBuddy</h1>
        <p className='sample-text'>Interactive playground for learning Python with GPT-powe...</p>
      </div>
      <div className="sample">
        <img src={TaglishAI} className='SamplePNG'/>
        <h1 className='sample-title'>TaglishAI</h1>
        <p className='sample-text'>Helps users draft, rewrite, and translate English-Tagalog conte...</p>
      </div>
    </div>

    <div className="build-startup">
      <div className="build-startup-text">
        <h1>Why Build A Startup Here?</h1>
        <p className="topic1">Built for Tech Builders</p>
        <p className="explanation1">Our platform is designed for developers, makers, and startup dreamers — not generic products. Get tools and support made for your journey, from MVP to global launch.</p>
        <p className="topic1">Smart Tools, Smarter Support</p>
        <p className="explanation1">Use AI to sharpen your pitch, generate proposals, and plan your roadmap. Our AI assistant and startup courses guide you every step of the way.</p>
        <p className="topic1">Global Reach, Local Roots</p>
        <p className="explanation1">Publish projects with crypto-based smart contracts, get backed internationally, and proudly represent Filipino innovation on the global stage.</p>
        <div className="project-buttons">
          <button className='project-start'>Start a Project</button>
          <button className='project-explore'>Explore Projects</button>
        </div>
      </div>
      
      <div className="build-startup-png">
        <img src={BuildStartup} className='BuildStartupPNG'/>
      </div>
    </div>
    <p className="explore-courses-title">Explore Courses</p>
    <div className="explore-courses-container">
      <div className="course">
        <img src={Startup} className='CoursesPNG'/>
        <p className="topic2">Startup 101: From Idea to MVP</p>
        <p className="explanation2">Learn how to validate your startup idea, design a lean MVP, and prepare your product for public launch — no business degree required.</p>
      </div>
      <div className="course">
        <img src={Funds} className='CoursesPNG'/>
        <p className="topic2">Raising Funds: Equity, Donations, and Web3 M...</p>
        <p className="explanation2">Understand the differences between equity-based, donation-based, and crypto funding — and how to choose the right model for your st...</p>
      </div>
    </div>
    <p className="community-title">Community</p>
    <div className="community-container">
      <div className="community">
        <div className="community-text">
         "This platform gave me the confidence to finally pitch my side project. The AI helped...
        </div>
        <div className="community-name">
          <div className="community-picture"><img src={Avatar1} className='AvatarPNG'/></div>
          <div className="community-description">
            <p>Aira D.</p>
            <p className="profession">Student App Developer</p>
          </div>
        </div>
      </div>
      <div className="community">
         <div className="community-text">
         “I’ve joined other platforms, but this one actually understands local builders...
        </div>
        <div className="community-name">
          <div className="community-picture"><img src={Avatar2} className='AvatarPNG'/></div>
          <div className="community-description">
            <p>Carla T.</p>
            <p className="profession">Startup Founder, Cebur</p>
          </div>
        </div>
      </div>
      
      <div className="community">
         <div className="community-text">
         “I used the free courses to build my first pitch deck and got real feedback. It’s like a...
        </div>
        <div className="community-name">
          <div className="community-picture"><img src={Avatar3} className='AvatarPNG'/></div>
          <div className="community-description">
            <p>Nica R.</p>
            <p className="profession">UX Design Student</p>
          </div>
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