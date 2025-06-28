import Computer from '../assets/Computer.png';
import ByteBuddy from '../assets/ByteBuddy.png';
import RainCheck from '../assets/RainCheck.png';
import TaglishAI from '../assets/TaglishAI.png';
import BuildStartup from '../assets/BuildStartup.png';
export const LandingPage = () =>{
  return(
    <>
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
    </>
    
  )
}